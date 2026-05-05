import { useNavigate } from "react-router";
import { useCycleData, useSymptomLogs, useUserProfile, shouldShowPhaseByDefault } from "../hooks/useStorage";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { ArrowLeft } from "lucide-react";
import { normalizeDateKey } from "../lib/data";

export function CalendarView() {
  const navigate = useNavigate();
  const [cycleData] = useCycleData();
  const [symptomLogs] = useSymptomLogs();
  const [userProfile] = useUserProfile();

  const showPhaseIndicator =
    userProfile.showPhaseIndicator !== undefined
      ? userProfile.showPhaseIndicator
      : shouldShowPhaseByDefault(userProfile);

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isPeriodDay = (date: Date) => {
    const lastPeriodStart = new Date(cycleData.lastPeriodStart);
    const diffDays = Math.floor((date.getTime() - lastPeriodStart.getTime()) / (1000 * 60 * 60 * 24));
    const cycleDayNumber = ((diffDays % cycleData.cycleLength) + cycleData.cycleLength) % cycleData.cycleLength;
    return cycleDayNumber < cycleData.periodLength;
  };

  const isOvulationDay = (date: Date) => {
    if (!showPhaseIndicator) return false;
    const lastPeriodStart = new Date(cycleData.lastPeriodStart);
    const diffDays = Math.floor((date.getTime() - lastPeriodStart.getTime()) / (1000 * 60 * 60 * 24));
    const cycleDayNumber = ((diffDays % cycleData.cycleLength) + cycleData.cycleLength) % cycleData.cycleLength + 1;
    return cycleDayNumber > 14 && cycleDayNumber <= 16;
  };

  const hasSymptomLog = (date: Date) => {
    const dayKey = normalizeDateKey(date);
    return symptomLogs.some((log: any) => normalizeDateKey(log.date) === dayKey);
  };

  const renderMonth = (monthOffset: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for accurate comparison
    const targetMonth = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
    const daysInMonth = getDaysInMonth(targetMonth);
    const firstDay = getFirstDayOfMonth(targetMonth);
    const days = [];

    // Empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12" />);
    }

    // Render actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(targetMonth.getFullYear(), targetMonth.getMonth(), day);
      date.setHours(0, 0, 0, 0);
      const isPeriod = isPeriodDay(date);
      const isOvulation = isOvulationDay(date);
      const hasLog = hasSymptomLog(date);
      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
      const isPast = date < today;

      // Determine background color based on type and whether it's past
      let bgColor = "";
      if (isPeriod) {
        bgColor = isPast ? "bg-rose-200" : "bg-rose-50";
      } else if (isOvulation) {
        bgColor = isPast ? "bg-amber-200" : "bg-amber-50";
      }

      days.push(
        <button
          type="button"
          key={day}
          onClick={() => navigate(`/symptom-log?date=${normalizeDateKey(date)}`)}
          className={`h-12 flex flex-col items-center justify-center rounded-lg border ${
            isToday ? "border-teal-600 bg-teal-50" : "border-neutral-100"
          } ${bgColor} relative transition-colors hover:border-teal-400 hover:bg-teal-50/70`}
        >
          <span className={`text-sm ${isToday ? "font-semibold text-teal-900" : "text-neutral-700"}`}>
            {day}
          </span>
          {hasLog && <div className="w-1 h-1 rounded-full bg-teal-600 absolute bottom-1" />}
        </button>
      );
    }

    return (
      <Card key={monthOffset} className="p-6 mb-6">
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">
          {targetMonth.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        {/* Day labels */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-xs font-medium text-neutral-500 py-2">
              {day}
            </div>
          ))}
        </div>
        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">{days}</div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Cycle Calendar</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 pb-24">
        {/* Legend */}
        <Card className="p-4 mb-6">
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-rose-200 border border-neutral-100" />
              <span className="text-neutral-700">Period</span>
            </div>
            {showPhaseIndicator && (
              <>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-amber-200 border border-neutral-100" />
                  <span className="text-neutral-700">Estimated Ovulation</span>
                </div>
              </>
            )}
            <div className="flex items-center space-x-2">
              <div className="w-1 h-1 rounded-full bg-teal-600" />
              <span className="text-neutral-700">Symptom logged</span>
            </div>
          </div>
        </Card>

        {/* Scrollable Months */}
        {/* Show 3 months in the past and 3 months in the future */}
        {[-3, -2, -1, 0, 1, 2, 3].map((offset) => renderMonth(offset))}
      </div>
    </div>
  );
}
