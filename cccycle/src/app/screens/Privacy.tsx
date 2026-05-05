import { useState } from "react";
import { useNavigate } from "react-router";
import {
  useUserProfile,
  useSymptomLogs,
  useCycleData,
  shouldShowPhaseByDefault,
} from "../hooks/useStorage";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Slider } from "../components/ui/slider";
import {
  ArrowLeft,
  Shield,
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

  const [settings, setSettings] = useState({
    notifications: true,
    dataSharing: false,
    anonymousAnalytics: true,
    autoDelete: true,
    retentionDays: userProfile.dataRetentionDays || 60,
  });

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    if (key === "retentionDays") {
      setUserProfile({
        ...userProfile,
        dataRetentionDays: value,
      });
    }
  };

  const handleDeleteAllData = () => {
    if (
      window.confirm(
        "Are you sure you want to delete all your data? This cannot be undone.",
      )
    ) {
      setSymptomLogs([]);
      window.alert("All symptom logs deleted.");
    }
  };

  const handleExportData = () => {
    const data = {
      profile: userProfile,
      symptomLogs,
      cycleData,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cycle-data-export-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const dataStats = {
    symptomLogs: symptomLogs.length,
    storageUsed: "~2.4 KB",
    oldestEntry:
      symptomLogs.length > 0
        ? new Date(symptomLogs[0].date).toLocaleDateString()
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
            <Shield className="w-10 h-10" />
            <div>
              <h1 className="text-2xl font-semibold">
                Privacy & Data
              </h1>
              <p className="text-teal-100 text-sm">
                You're in complete control
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6 pb-24">
        {/* Privacy Commitment */}
        <Card className="p-6 bg-teal-50 border-teal-200">
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-6 h-6 text-teal-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">
                Our Privacy Promise
              </h3>
              <ul className="space-y-1 text-sm text-neutral-700">
                <li>✓ We never sell your data</li>
                <li>✓ All data is encrypted</li>
                <li>✓ You control what we keep</li>
                <li>✓ Delete anytime, no questions asked</li>
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
                    <p className="font-medium text-neutral-900">
                      Symptom logs
                    </p>
                    <p className="text-sm text-neutral-500">
                      {dataStats.symptomLogs} entries
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
                <div>
                  <p className="text-sm text-neutral-600">
                    Storage used
                  </p>
                  <p className="font-medium text-neutral-900">
                    {dataStats.storageUsed}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-neutral-600">
                    Oldest entry
                  </p>
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
                checked={settings.notifications}
                onCheckedChange={(checked) =>
                  updateSetting("notifications", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
              <div className="flex-1">
                <Label className="font-semibold text-neutral-900">
                  Anonymous analytics
                </Label>
                <p className="text-sm text-neutral-600 mt-1">
                  Help us improve the app (no personal data)
                </p>
              </div>
              <Switch
                checked={settings.anonymousAnalytics}
                onCheckedChange={(checked) =>
                  updateSetting("anonymousAnalytics", checked)
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
                  setUserProfile({
                    ...userProfile,
                    showPhaseIndicator: checked,
                  });
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
                  Automatically delete detailed symptom logs
                  after a set period
                </p>
              </div>
              <Switch
                checked={settings.autoDelete}
                onCheckedChange={(checked) =>
                  updateSetting("autoDelete", checked)
                }
              />
            </div>
            {settings.autoDelete && (
              <div className="pt-4 border-t border-neutral-200">
                <div className="mb-3">
                  <Label className="text-sm">
                    Delete after {settings.retentionDays} days
                  </Label>
                </div>
                <Slider
                  value={[settings.retentionDays]}
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
                  Note: Cycle summaries are kept for patterns,
                  but personal notes are deleted.
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
                      {userProfile.wearableType?.replace(
                        "-",
                        " ",
                      )}
                    </p>
                    <p className="text-sm text-neutral-500">
                      Connected
                    </p>
                  </div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-neutral-600 mb-3">
                We only access temperature and heart rate data.
                No other health information.
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

        {/* Security Info */}
        <Card className="p-5 bg-neutral-100 border-neutral-200">
          <div className="flex items-start space-x-3">
            <Lock className="w-5 h-5 text-neutral-600 mt-1" />
            <div>
              <h3 className="font-semibold text-neutral-900 mb-1">
                Your data is encrypted
              </h3>
              <p className="text-sm text-neutral-600">
                All information is encrypted both in transit and
                at rest. We use industry-standard security
                practices to protect your privacy.
              </p>
            </div>
          </div>
        </Card>

        {/* Privacy Policy */}
        <div className="text-center">
          <Button variant="link" className="text-teal-600">
            Read Full Privacy Policy
          </Button>
        </div>
      </div>
    </div>
  );
}