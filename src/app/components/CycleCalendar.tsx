interface CycleCalendarProps {
  currentDay: number;
  cycleLength: number;
}

export function CycleCalendar({ currentDay, cycleLength }: CycleCalendarProps) {
  const days = Array.from({ length: cycleLength }, (_, i) => i + 1);
  
  const getPhaseColor = (day: number) => {
    if (day <= 5) return "bg-rose-400";
    if (day <= 14) return "bg-emerald-400";
    if (day <= 16) return "bg-amber-400";
    return "bg-indigo-400";
  };

  return (
    <div className="grid grid-cols-7 gap-1">
      {days.map((day) => (
        <div
          key={day}
          className={`aspect-square rounded-full flex items-center justify-center text-xs ${
            day === currentDay
              ? `${getPhaseColor(day)} text-white font-semibold`
              : "bg-neutral-100 text-neutral-600"
          }`}
        >
          {day}
        </div>
      ))}
    </div>
  );
}
