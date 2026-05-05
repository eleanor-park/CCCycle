import { useState } from "react";
import { useNavigate } from "react-router";
import { useSymptomLogs } from "../hooks/useStorage";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Slider } from "../components/ui/slider";
import { Textarea } from "../components/ui/textarea";
import { ArrowLeft, Check, Droplet, Zap, Heart, Frown, Smile, Meh, Circle } from "lucide-react";

export function SymptomLog() {
  const navigate = useNavigate();
  const [logs, setLogs] = useSymptomLogs();

  const [formData, setFormData] = useState({
    date: new Date().toISOString(),
    bleeding: 0,
    pain: 0,
    mood: "neutral",
    energy: 50,
    notes: "",
    selectedSymptoms: [] as string[],
  });

  const symptoms = [
    "Cramps", "Headache", "Bloating", "Fatigue", "Nausea",
    "Back pain", "Breast tenderness", "Acne", "Cravings", "Irritability",
  ];

  const toggleSymptom = (symptom: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedSymptoms: prev.selectedSymptoms.includes(symptom)
        ? prev.selectedSymptoms.filter((s) => s !== symptom)
        : [...prev.selectedSymptoms, symptom],
    }));
  };

  const handleSave = () => {
    setLogs([...logs, { ...formData, id: Date.now() }]);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Log Symptoms</h1>
          <Button onClick={handleSave} size="icon" className="bg-teal-600 hover:bg-teal-700">
            <Check className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6 pb-12">
        {/* Bleeding */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Droplet className="w-6 h-6 text-rose-600" />
            <Label className="text-lg font-semibold">Bleeding</Label>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-5 gap-2">
              {[0, 1, 2, 3, 4].map((level) => {
                const getBackgroundColor = () => {
                  if (formData.bleeding !== level) {
                    return "bg-white border-neutral-200 hover:border-neutral-300";
                  }
                  switch(level) {
                    case 0: return "bg-teal-50 border-teal-600";
                    case 1: return "bg-rose-50 border-rose-600";
                    case 2: return "bg-rose-100 border-rose-600";
                    case 3: return "bg-rose-200 border-rose-600";
                    case 4: return "bg-rose-300 border-rose-600";
                    default: return "bg-white border-neutral-200";
                  }
                };

                const getDropletColor = () => {
                  return formData.bleeding === level ? "text-rose-600 fill-rose-600" : "text-neutral-400";
                };

                return (
                  <button
                    key={level}
                    onClick={() => setFormData({ ...formData, bleeding: level })}
                    className={`p-3 rounded-lg border-2 transition-all ${getBackgroundColor()} flex flex-col items-center justify-center`}
                  >
                    {level === 0 ? (
                      <Circle className={`w-5 h-5 mx-auto ${formData.bleeding === level ? "text-teal-600" : "text-neutral-400"}`} />
                    ) : (
                      <Droplet className={`w-6 h-6 mx-auto ${getDropletColor()}`} />
                    )}
                    <p className="text-xs mt-1 text-neutral-600 text-center">
                      {level === 0 ? "None" : level === 1 ? "Spotting" : level === 2 ? "Light" : level === 3 ? "Medium" : "Heavy"}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Pain */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Zap className="w-6 h-6 text-amber-600" />
            <Label className="text-lg font-semibold">Pain Level</Label>
          </div>
          <div className="space-y-3">
            <Slider
              value={[formData.pain]}
              onValueChange={(value) => setFormData({ ...formData, pain: value[0] })}
              max={5}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-neutral-600">
              <span>No pain</span>
              <span className="font-semibold text-neutral-900">{formData.pain}/5</span>
              <span>Severe</span>
            </div>
          </div>
        </Card>

        {/* Mood */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Heart className="w-6 h-6 text-pink-600" />
            <Label className="text-lg font-semibold">Mood</Label>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setFormData({ ...formData, mood: "bad" })}
              className={`p-4 rounded-lg border-2 transition-all ${
                formData.mood === "bad" ? "border-rose-600 bg-rose-50" : "border-neutral-200 hover:border-neutral-300"
              }`}
            >
              <Frown className={`w-8 h-8 mx-auto mb-2 ${formData.mood === "bad" ? "text-rose-600" : "text-neutral-400"}`} />
              <p className="text-sm font-medium">Not great</p>
            </button>
            <button
              onClick={() => setFormData({ ...formData, mood: "neutral" })}
              className={`p-4 rounded-lg border-2 transition-all ${
                formData.mood === "neutral" ? "border-amber-600 bg-amber-50" : "border-neutral-200 hover:border-neutral-300"
              }`}
            >
              <Meh className={`w-8 h-8 mx-auto mb-2 ${formData.mood === "neutral" ? "text-amber-600" : "text-neutral-400"}`} />
              <p className="text-sm font-medium">Okay</p>
            </button>
            <button
              onClick={() => setFormData({ ...formData, mood: "good" })}
              className={`p-4 rounded-lg border-2 transition-all ${
                formData.mood === "good" ? "border-green-600 bg-green-50" : "border-neutral-200 hover:border-neutral-300"
              }`}
            >
              <Smile className={`w-8 h-8 mx-auto mb-2 ${formData.mood === "good" ? "text-green-600" : "text-neutral-400"}`} />
              <p className="text-sm font-medium">Good</p>
            </button>
          </div>
        </Card>

        {/* Energy */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Zap className="w-6 h-6 text-yellow-600" />
            <Label className="text-lg font-semibold">Energy Level</Label>
          </div>
          <div className="space-y-3">
            <Slider
              value={[formData.energy]}
              onValueChange={(value) => setFormData({ ...formData, energy: value[0] })}
              max={100}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-neutral-600">
              <span>Exhausted</span>
              <span className="font-semibold text-neutral-900">{formData.energy}%</span>
              <span>Energized</span>
            </div>
          </div>
        </Card>

        {/* Common Symptoms */}
        <Card className="p-6">
          <Label className="text-lg font-semibold mb-4 block">Other Symptoms</Label>
          <div className="flex flex-wrap gap-2">
            {symptoms.map((symptom) => (
              <button
                key={symptom}
                onClick={() => toggleSymptom(symptom)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  formData.selectedSymptoms.includes(symptom)
                    ? "bg-teal-600 text-white"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                {symptom}
              </button>
            ))}
          </div>
        </Card>

        {/* Notes */}
        <Card className="p-6">
          <Label className="text-lg font-semibold mb-4 block">Notes (Optional)</Label>
          <Textarea
            placeholder="How are you feeling? Any additional details..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="min-h-[100px]"
          />
          <p className="text-xs text-neutral-500 mt-2">
            Your notes are private and will be auto-deleted after 60 days.
          </p>
        </Card>

        <Button onClick={handleSave} className="w-full bg-teal-600 hover:bg-teal-700">
          Save Log
        </Button>
      </div>
    </div>
  );
}
