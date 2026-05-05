import { useState } from "react";
import { useNavigate } from "react-router";
import { useUserProfile } from "../hooks/useStorage";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Checkbox } from "../components/ui/checkbox";
import { Progress } from "../components/ui/progress";
import { Shield, Heart, Watch, ChevronRight, ChevronLeft } from "lucide-react";

export function Onboarding() {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useUserProfile();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    lifeStage: profile.lifeStage || "",
    genderIdentity: profile.genderIdentity || "",
    isTrans: profile.isTrans || "",
    isOnHormones: profile.isOnHormones || "",
    pregnancyStatus: profile.pregnancyStatus || "",
    contraceptives: profile.contraceptives || [] as string[],
    wearableType: profile.wearableType || "",
    agreedToPrivacy: false,
  });

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleComplete = () => {
    const updatedProfile = {
      ...profile,
      onboardingComplete: true,
      lifeStage: formData.lifeStage,
      genderIdentity: formData.genderIdentity,
      isTrans: formData.isTrans,
      isOnHormones: formData.isOnHormones,
      pregnancyStatus: formData.pregnancyStatus,
      contraceptives: formData.contraceptives,
      wearableType: formData.wearableType,
      wearableConnected: formData.wearableType !== "none" && formData.wearableType !== "",
    };
    setProfile(updatedProfile);

    // Use setTimeout to ensure state is updated before navigation
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 0);
  };

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-neutral-50 px-6 py-8">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-4">
          <Progress value={progress} className="flex-1 mr-4" />
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => {
              setProfile({ ...profile, onboardingComplete: true });
              navigate("/");
            }}
            className="text-neutral-500 hover:text-neutral-700"
          >
            Skip
          </Button>
        </div>
        <div className="text-sm text-neutral-600 mb-2">Step {step} of {totalSteps}</div>

        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold text-neutral-900">Welcome to CCCycle</h1>
              <p className="text-neutral-400 text-sm">
                We use this information to personalize menstrual tracking to your specific body and needs, because we know every user is different. If you would prefer us not to use any of this information, feel free to leave the fields blank.
              </p>
            </div>

            <div className="space-y-6">
              {/* Question 1: Life Stage */}
              <div>
                <Label className="text-neutral-700">What stage of menstrual health are you in? (Optional)</Label>
                <RadioGroup
                  value={formData.lifeStage}
                  onValueChange={(v) => updateField("lifeStage", v)}
                  className="mt-4 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="new-menstruator" id="new-menstruator" />
                    <Label htmlFor="new-menstruator" className="font-normal">New menstruator (less than 3 years)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="reproductive-age" id="reproductive-age" />
                    <Label htmlFor="reproductive-age" className="font-normal">Reproductive age / Pre-menopause</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="perimenopause" id="perimenopause" />
                    <Label htmlFor="perimenopause" className="font-normal">Perimenopause / Menopause</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-neutral-700">Do you identify as transgender? (Optional)</Label>
                <RadioGroup
                  value={formData.isTrans}
                  onValueChange={(v) => updateField("isTrans", v)}
                  className="mt-4 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="trans-yes" />
                    <Label htmlFor="trans-yes" className="font-normal">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="trans-no" />
                    <Label htmlFor="trans-no" className="font-normal">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="prefer-not-to-say-trans" id="prefer-not-to-say-trans" />
                    <Label htmlFor="prefer-not-to-say-trans" className="font-normal">Prefer not to say</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Question 3: Gender-affirming hormones (conditional) */}
              {(formData.isTrans === "yes" || formData.genderIdentity === "non-binary") && (
                <div>
                  <Label className="text-neutral-700">Are you on any gender-affirming hormones? (Optional)</Label>
                  <RadioGroup
                    value={formData.isOnHormones}
                    onValueChange={(v) => updateField("isOnHormones", v)}
                    className="mt-4 space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="hormones-yes" />
                      <Label htmlFor="hormones-yes" className="font-normal">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="hormones-no" />
                      <Label htmlFor="hormones-no" className="font-normal">No</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="prefer-not-to-say-hormones" id="prefer-not-to-say-hormones" />
                      <Label htmlFor="prefer-not-to-say-hormones" className="font-normal">Prefer not to say</Label>
                    </div>
                  </RadioGroup>
                </div>
              )}

              {/* Question 4: Pregnancy Status */}
              <div>
                <Label className="text-neutral-700">Are you pregnant or trying to conceive? (Optional)</Label>
                <RadioGroup
                  value={formData.pregnancyStatus}
                  onValueChange={(v) => updateField("pregnancyStatus", v)}
                  className="mt-4 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pregnant" id="pregnant" />
                    <Label htmlFor="pregnant" className="font-normal">Pregnant</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="trying" id="trying" />
                    <Label htmlFor="trying" className="font-normal">Trying to conceive</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="not-pregnant" id="not-pregnant" />
                    <Label htmlFor="not-pregnant" className="font-normal">Neither</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Question 5: Contraceptives (conditional) */}
              {formData.pregnancyStatus === "not-pregnant" && (
                <div>
                  <Label className="text-neutral-700">Are you currently using any hormonal contraception? (Optional)</Label>
                  <div className="mt-4 space-y-2">
                    {[
                      { value: "none", label: "None" },
                      { value: "pill", label: "Birth control pill" },
                      { value: "iud-hormonal", label: "Hormonal IUD" },
                      { value: "implant", label: "Implant (Nexplanon)" },
                      { value: "patch", label: "Patch" },
                      { value: "ring", label: "Vaginal ring (NuvaRing)" },
                      { value: "shot", label: "Depo shot" },
                      { value: "diaphragm", label: "Diaphragm" },
                      { value: "other", label: "Other" },
                    ].map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`contraceptive-${option.value}`}
                          checked={formData.contraceptives.includes(option.value)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              if (option.value === "none") {
                                updateField("contraceptives", ["none"]);
                              } else {
                                const newContraceptives = formData.contraceptives.filter(c => c !== "none");
                                updateField("contraceptives", [...newContraceptives, option.value]);
                              }
                            } else {
                              updateField("contraceptives", formData.contraceptives.filter((c) => c !== option.value));
                            }
                          }}
                        />
                        <Label htmlFor={`contraceptive-${option.value}`} className="font-normal cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Button
              onClick={() => setStep(2)}
              className="w-full bg-teal-600 hover:bg-teal-700"
            >
              Continue <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Shield className="w-12 h-12 text-teal-600 mb-4" />
              <h1 className="text-3xl font-semibold text-neutral-900">How we protect your privacy</h1>
            </div>

            <div className="space-y-4 bg-white rounded-lg p-6 border border-neutral-200">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-teal-600 mt-2" />
                  <p className="text-sm text-neutral-700">
                    <strong>No data selling:</strong> We do not share any of your data with third parties.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-teal-600 mt-2" />
                  <p className="text-sm text-neutral-700">
                    <strong>Auto-deletion:</strong> Detailed symptom logs are automatically deleted after 60 days (but you can modify this in Settings).
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-teal-600 mt-2" />
                  <p className="text-sm text-neutral-700">
                    <strong>You're in control:</strong> You decide what to track, what to share, and when to delete.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-teal-600 mt-2" />
                  <p className="text-sm text-neutral-700">
                    <strong>Encrypted & local:</strong> All data is encrypted and most is stored locally by default.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-teal-600 mt-2" />
                  <p className="text-sm text-neutral-700">
                    <strong>No ads:</strong> We don't use your data for targeted advertising.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                <ChevronLeft className="mr-2 w-4 h-4" /> Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                className="flex-1 bg-teal-600 hover:bg-teal-700"
              >
                Continue <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Watch className="w-12 h-12 text-teal-600 mb-4" />
              <h1 className="text-3xl font-semibold text-neutral-900">Connect Your Wearable Device</h1>
            </div>

            <div className="space-y-3">
              <Label className="text-neutral-700">Choose your device</Label>
              <RadioGroup value={formData.wearableType} onValueChange={(v) => updateField("wearableType", v)} className="mt-4 space-y-2">
                <div className="flex items-center space-x-2 p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 cursor-pointer">
                  <RadioGroupItem value="apple-health" id="apple-health" />
                  <Label htmlFor="apple-health" className="font-normal cursor-pointer flex-1">Apple Watch</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 cursor-pointer">
                  <RadioGroupItem value="oura" id="oura" />
                  <Label htmlFor="oura" className="font-normal cursor-pointer flex-1">Oura Ring</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 cursor-pointer">
                  <RadioGroupItem value="whoop" id="whoop" />
                  <Label htmlFor="whoop" className="font-normal cursor-pointer flex-1">Whoop</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 cursor-pointer">
                  <RadioGroupItem value="garmin" id="garmin" />
                  <Label htmlFor="garmin" className="font-normal cursor-pointer flex-1">Garmin</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 cursor-pointer">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other" className="font-normal cursor-pointer flex-1">Other</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 cursor-pointer">
                  <RadioGroupItem value="none" id="no-wearable" />
                  <Label htmlFor="no-wearable" className="font-normal cursor-pointer flex-1">Skip for now</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.wearableType && formData.wearableType !== "none" && (
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                <p className="text-sm text-teal-900">
                  We'll only access temperature, heart rate, and fitness data. You can disconnect at any time.
                </p>
              </div>
            )}

            <div className="flex space-x-3">
              <Button onClick={() => setStep(2)} variant="outline" className="flex-1">
                <ChevronLeft className="mr-2 w-4 h-4" /> Back
              </Button>
              <Button onClick={handleComplete} className="flex-1 bg-teal-600 hover:bg-teal-700">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}