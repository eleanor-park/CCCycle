import { Link, useNavigate } from "react-router";
import { useCycleData, useSymptomLogs, useUserProfile, shouldShowPhaseByDefault } from "../hooks/useStorage";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import {
  Home as HomeIcon,
  BookOpen,
  Stethoscope,
  Settings,
  Plus,
  Thermometer,
  TrendingUp,
  Droplet,
  Activity,
  Moon,
  Calendar,
  EyeOff,
  Eye,
} from "lucide-react";

export function Home() {
  const navigate = useNavigate();
  const [cycleData] = useCycleData();
  const [symptomLogs] = useSymptomLogs();
  const [userProfile, setUserProfile] = useUserProfile();

  const cycleProgress = (cycleData.currentDay / cycleData.cycleLength) * 100;
  const daysUntilPeriod = cycleData.cycleLength - cycleData.currentDay;

  const showPhaseIndicator =
    userProfile.showPhaseIndicator !== undefined
      ? userProfile.showPhaseIndicator
      : shouldShowPhaseByDefault(userProfile);

  // Mock wearable data
  const wearableData = userProfile.wearableConnected
    ? {
        temperature: 98.4,
        heartRate: 48,
        hrv: 89,
        sleep: 7.5,
      }
    : null;

  // Get today's insights
  const todayInsights = [
    {
      icon: Activity,
      title: "Energy forecast",
      description: "Moderate energy today. Light exercise recommended.",
      color: "text-blue-600",
    },
    {
      icon: Droplet,
      title: "Hydration reminder",
      description: "Your body needs extra water during this phase.",
      color: "text-cyan-600",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-teal-600 to-teal-700 text-white px-6 py-8 rounded-b-3xl">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-semibold mb-1">Welcome back</h1>
              <p className="text-teal-100">Day {cycleData.currentDay} of your cycle</p>
            </div>
            <Link to="/privacy">
              <Button variant="ghost" size="icon" className="text-white hover:bg-teal-500">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Cycle Progress Card */}
          <Card className="bg-white/10 backdrop-blur border-white/20 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-teal-100 text-sm mb-1">Next period expected in</p>
                <p className="text-3xl font-semibold">{daysUntilPeriod} days</p>
              </div>
              <Button
                variant="ghost"
                onClick={() => navigate("/calendar")}
                className="text-teal-200 hover:text-white hover:bg-white/20 gap-2 px-3"
              >
                <span className="text-sm font-medium">View Calendar</span>
                <Calendar className="w-8 h-8" />
              </Button>
            </div>
            <Progress value={cycleProgress} className="bg-white/20 h-2 mb-2" />
            <div className="flex items-center justify-between">
              {showPhaseIndicator && (
                <p className="text-sm text-teal-100">
                  {cycleData.currentDay <= 5 && "Menstrual phase"}
                  {cycleData.currentDay > 5 && cycleData.currentDay <= 14 && "Follicular phase"}
                  {cycleData.currentDay > 14 && cycleData.currentDay <= 16 && "Ovulation phase"}
                  {cycleData.currentDay > 16 && "Luteal phase"}
                </p>
              )}
              {/* <button
                onClick={() => {
                  setUserProfile({
                    ...userProfile,
                    showPhaseIndicator: !showPhaseIndicator,
                  });
                }}
                className="ml-auto text-teal-100 hover:text-white transition-colors"
                aria-label={showPhaseIndicator ? "Hide phase indicator" : "Show phase indicator"}
              >
                {showPhaseIndicator ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button> */}
            </div>
          </Card>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6">
        {/* Wearable Data */}
        {wearableData && (
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">Today's Data</h2>
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-neutral-600">Temperature</span>
                  <Thermometer className="w-4 h-4 text-rose-500" />
                </div>
                <p className="text-2xl font-semibold text-neutral-900">{wearableData.temperature}°F</p>
                <p className="text-xs text-neutral-500 mt-1">Normal range</p>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-neutral-600">Heart Rate</span>
                  <Activity className="w-4 h-4 text-red-500" />
                </div>
                <p className="text-2xl font-semibold text-neutral-900">{wearableData.heartRate} bpm</p>
                <p className="text-xs text-neutral-500 mt-1">Resting</p>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-neutral-600">HRV</span>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <p className="text-2xl font-semibold text-neutral-900">{wearableData.hrv} ms</p>
                <p className="text-xs text-neutral-500 mt-1">Good</p>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-neutral-600">Sleep</span>
                  <Moon className="w-4 h-4 text-indigo-500" />
                </div>
                <p className="text-2xl font-semibold text-neutral-900">{wearableData.sleep}h</p>
                <p className="text-xs text-neutral-500 mt-1">Last night</p>
              </Card>
            </div>
          </div>
        )}

        {/* symptom log */}
        <div>
          <Link to="/symptom-log">
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-2 border-teal-200 bg-teal-50">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900">Log Symptoms</h3>
                  <p className="text-sm text-neutral-600">Track how you're feeling today</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Today's Insights */}
        <div>
          <h2 className="text-lg font-semibold text-neutral-900 mb-3">Today's Insights</h2>
          <div className="space-y-3">
            {todayInsights.map((insight, idx) => (
              <Card key={idx} className="p-4">
                <div className="flex items-start space-x-3">
                  <div className={`${insight.color} mt-1`}>
                    <insight.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-neutral-900">{insight.title}</h3>
                    <p className="text-sm text-neutral-600 mt-1">{insight.description}</p>
                  </div>
                </div>
              </Card>
            ))}
            <Link to="/insights">
              <Button variant="outline" className="w-full">
                View All Insights
              </Button>
            </Link>
          </div>
        </div>

        {/* Recent Logs */}
        {symptomLogs.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">Recent Logs</h2>
            <Card className="p-4">
              <p className="text-sm text-neutral-600">You've logged {symptomLogs.length} entries this cycle</p>
            </Card>
          </div>
        )}

        {/* Bottom Spacing for Navigation */}
        <div className="h-20" />
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 px-6 py-3 safe-area-bottom">
        <div className="max-w-md mx-auto flex justify-around items-center">
          <Link to="/" className="flex flex-col items-center space-y-1 text-teal-600">
            <HomeIcon className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
          </Link>
          <Link to="/insights" className="flex flex-col items-center space-y-1 text-neutral-500 hover:text-teal-600">
            <TrendingUp className="w-6 h-6" />
            <span className="text-xs font-medium">Cycle</span>
          </Link>
          <Link to="/education" className="flex flex-col items-center space-y-1 text-neutral-500 hover:text-teal-600">
            <BookOpen className="w-6 h-6" />
            <span className="text-xs font-medium">Classroom</span>
          </Link>
          <Link to="/provider-finder" className="flex flex-col items-center space-y-1 text-neutral-500 hover:text-teal-600">
            <Stethoscope className="w-6 h-6" />
            <span className="text-xs font-medium">Connect</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
