import { useNavigate } from "react-router";
import {
  useUserProfile,
  useSymptomLogs,
  useCycleData,
  shouldShowPhaseByDefault,
} from "../hooks/useStorage";
import { fetchExportData } from "../lib/api";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Slider } from "../components/ui/slider";
import {
  ArrowLeft,
  Shield,
  Settings,
  Trash2,
  Download,
  Lock,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle2,
  Bell,
  Database,
} from "lucide-react";

export function Privacy() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useUserProfile();
  const [symptomLogs, setSymptomLogs] = useSymptomLogs();
  const [cycleData] = useCycleData();

  const updateSetting = (key: string, value: any) => {
    if (key === "retentionDays") {
      setUserProfile((previousProfile) => ({
        ...previousProfile,
        dataRetentionDays: value,
      }));
      return;
    }

    setUserProfile((previousProfile) => ({
      ...previousProfile,
      [key]: value,
    }));
  };

  const handleDeleteAllData = () => {
    if (
      window.confirm(
        "Are you sure you want to delete all your data? This cannot be undone."
      )
    ) {
      setSymptomLogs([]);
      window.alert("All symptom logs deleted.");
    }
  };

  const handleExportData = async () => {
    try {
      const data = await fetchExportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cycle-data-export-${
        new Date().toISOString().split("T")[0]
      }.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Unable to export backend data", error);
      window.alert("Couldn't download data from the backend right now.");
    }
  };

  const dataStats = {
    symptomLogs: symptomLogs.length,
    storageUsed: `${(
      new Blob([JSON.stringify({ userProfile, cycleData, symptomLogs })]).size /
      1024
    ).toFixed(1)} KB`,
    oldestEntry:
      symptomLogs.length > 0
        ? new Date(
            [...symptomLogs].sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            )[0].date
          ).toLocaleDateString()
        : "N/A",
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-teal-600 to-teal-700 text-white px-6 py-8 rounded-b-3xl">
        <div className="max-w-md mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-white hover:bg-teal-500 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-3">
            <Settings className="w-10 h-10" />
            <div>
              <h1 className="text-2xl font-semibold">Settings</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6 pb-24">
        {/* Privacy Commitment */}
        <Card className="p-6 bg-teal-50 border-teal-200">
          <div className="flex items-start space-x-3">
            <Shield className="w-6 h-6 text-teal-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">
                How we protect your privacy
              </h3>
              <ul className="space-y-1 text-sm text-neutral-700">
                <li>✓ We do not share any of your data with third parties.</li>
                <li>
                  ✓ All data is encrypted and most is stored locally by default.
                </li>
                <li>
                  ✓ You decide what to track, what to share, and when to delete.
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Data Overview */}
        <div>
          <h2 className="text-lg font-semibold text-neutral-900 mb-3">
            Your Data
          </h2>
          <Card className="p-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Database className="w-5 h-5 text-neutral-600" />
                  <div>
                    <p className="font-medium text-neutral-900">Symptom logs</p>
                    <p className="text-sm text-neutral-500">
                      {dataStats.symptomLogs} entries
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
                <div>
                  <p className="text-sm text-neutral-600">Storage used</p>
                  <p className="font-medium text-neutral-900">
                    {dataStats.storageUsed}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-neutral-600">Oldest entry</p>
                  <p className="font-medium text-neutral-900">
                    {dataStats.oldestEntry}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sharing & Permissions */}
        <div>
          <h2 className="text-lg font-semibold text-neutral-900 mb-3">
            Sharing & Permissions
          </h2>
          <Card className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label className="font-semibold text-neutral-900">
                  Notifications
                </Label>
                <p className="text-sm text-neutral-600 mt-1">
                  Period predictions, reminders
                </p>
              </div>
              <Switch
                checked={userProfile.notifications}
                onCheckedChange={(checked) =>
                  updateSetting("notifications", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
              <div className="flex-1">
                <Label className="font-semibold text-neutral-900">
                  Show cycle phases
                </Label>
                <p className="text-sm text-neutral-600 mt-1">
                  Display ovulation and menstrual phases
                </p>
              </div>
              <Switch
                checked={
                  userProfile.showPhaseIndicator !== undefined
                    ? userProfile.showPhaseIndicator
                    : shouldShowPhaseByDefault(userProfile)
                }
                onCheckedChange={(checked) => {
                  setUserProfile((previousProfile) => ({
                    ...previousProfile,
                    showPhaseIndicator: checked,
                  }));
                }}
              />
            </div>
          </Card>
        </div>

        {/* Auto-Delete Settings */}
        <div>
          <h2 className="text-lg font-semibold text-neutral-900 mb-3">
            Data Retention
          </h2>
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <Label className="font-semibold text-neutral-900">
                  Auto-delete old data
                </Label>
                <p className="text-sm text-neutral-600 mt-1">
                  Automatically delete detailed symptom logs after a set period
                </p>
              </div>
              <Switch
                checked={userProfile.autoDelete}
                onCheckedChange={(checked) =>
                  updateSetting("autoDelete", checked)
                }
              />
            </div>
            {userProfile.autoDelete && (
              <div className="pt-4 border-t border-neutral-200">
                <div className="mb-3">
                  <Label className="text-sm">
                    Delete after {userProfile.dataRetentionDays} days
                  </Label>
                </div>
                <Slider
                  value={[userProfile.dataRetentionDays]}
                  onValueChange={(value) =>
                    updateSetting("retentionDays", value[0])
                  }
                  min={30}
                  max={365}
                  step={30}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-neutral-500">
                  <span>30 days</span>
                  <span>1 year</span>
                </div>
                <p className="text-xs text-neutral-500 mt-3">
                  Note: Cycle summaries are kept for patterns, but personal
                  notes are deleted.
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* Wearable Connection */}
        {userProfile.wearableConnected && (
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">
              Connected Devices
            </h2>
            <Card className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                    <Lock className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900 capitalize">
                      {userProfile.wearableType?.replace("-", " ")}
                    </p>
                    <p className="text-sm text-neutral-500">Connected</p>
                  </div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-neutral-600 mb-3">
                We only access temperature and heart rate data. No other health
                information.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-red-600 border-red-200 hover:bg-red-50"
              >
                Disconnect Device
              </Button>
            </Card>
          </div>
        )}

        {/* Data Actions */}
        <div>
          <h2 className="text-lg font-semibold text-neutral-900 mb-3">
            Data Management
          </h2>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleExportData}
            >
              <Download className="w-5 h-5 mr-3" />
              Export All Data
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
              onClick={handleDeleteAllData}
            >
              <Trash2 className="w-5 h-5 mr-3" />
              Delete All Data
            </Button>
          </div>
        </div>

        {/* Privacy Policy */}
        <div className="text-center">
          <Button variant="link" className="text-teal-600">
            See How We Protect Your Privacy
          </Button>
        </div>
      </div>
    </div>
  );
}
