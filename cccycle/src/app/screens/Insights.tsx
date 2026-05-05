import { Link, useNavigate } from "react-router";
import { useCycleData, useUserProfile, shouldShowPhaseByDefault } from "../hooks/useStorage";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  ArrowLeft,
  TrendingUp,
  Activity,
  Utensils,
  Dumbbell,
  Bed,
  Brain,
  Heart,
  Droplet,
  Sun,
} from "lucide-react";

export function Insights() {
  const navigate = useNavigate();
  const [cycleData] = useCycleData();
  const [userProfile] = useUserProfile();

  const showPhaseIndicator =
    userProfile.showPhaseIndicator !== undefined
      ? userProfile.showPhaseIndicator
      : shouldShowPhaseByDefault(userProfile);

  const currentPhase = (() => {
    const day = cycleData.currentDay;
    if (day <= 5) return "menstrual";
    if (day <= 14) return "follicular";
    if (day <= 16) return "ovulation";
    return "luteal";
  })();

  const phaseInfo = {
    menstrual: {
      name: "Menstrual Phase",
      description: "Your body is shedding the uterine lining. Energy may be lower.",
      color: "rose",
    },
    follicular: {
      name: "Follicular Phase",
      description: "Energy is rising. Great time for new projects and social activities.",
      color: "emerald",
    },
    ovulation: {
      name: "Ovulation Phase",
      description: "Peak energy and mood. You might feel more social and confident.",
      color: "amber",
    },
    luteal: {
      name: "Luteal Phase",
      description: "Energy begins to wind down. Focus on rest and self-care.",
      color: "indigo",
    },
  }[currentPhase];

  const recommendations = {
    food: [
      {
        icon: Utensils,
        title: "Iron-rich foods",
        description: "Add leafy greens, lentils, and lean meats to support your body.",
      },
      {
        icon: Droplet,
        title: "Stay hydrated",
        description: "Aim for 8-10 glasses of water daily to reduce bloating.",
      },
      {
        icon: Brain,
        title: "Omega-3s",
        description: "Fish, walnuts, and flax seeds can help reduce inflammation.",
      },
    ],
    exercise: [
      {
        icon: Dumbbell,
        title: "Light strength training",
        description: "Your body responds well to resistance training in this phase.",
      },
      {
        icon: Activity,
        title: "Gentle cardio",
        description: "Walking or light jogging can help with energy and mood.",
      },
      {
        icon: Sun,
        title: "Yoga or stretching",
        description: "Help ease cramps and improve flexibility.",
      },
    ],
    rest: [
      {
        icon: Bed,
        title: "Prioritize sleep",
        description: "Aim for 7-9 hours to support hormone balance.",
      },
      {
        icon: Heart,
        title: "Stress management",
        description: "Try meditation, breathing exercises, or journaling.",
      },
      {
        icon: Brain,
        title: "Gentle activities",
        description: "Give yourself permission to rest when needed.",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Insights & Recommendations</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6 pb-24">
        {/* Current Phase */}
        {showPhaseIndicator && (
          <Card className={`p-6 bg-gradient-to-br from-${phaseInfo?.color}-50 to-${phaseInfo?.color}-100 border-${phaseInfo?.color}-200`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm text-neutral-600 mb-1">You're in your</p>
                <h2 className="text-2xl font-semibold text-neutral-900">{phaseInfo?.name}</h2>
              </div>
              <TrendingUp className={`w-8 h-8 text-${phaseInfo?.color}-600`} />
            </div>
            <p className="text-neutral-700">{phaseInfo?.description}</p>
          </Card>
        )}

        {/* Wearable Insights */}
        {userProfile.wearableConnected && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Your Patterns</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Activity className="w-5 h-5 text-teal-600 mt-1" />
                <div>
                  <p className="font-medium text-neutral-900">Temperature trend</p>
                  <p className="text-sm text-neutral-600">
                    Your basal temperature is rising slightly, which is normal for this cycle phase.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Heart className="w-5 h-5 text-red-600 mt-1" />
                <div>
                  <p className="font-medium text-neutral-900">Heart rate variability</p>
                  <p className="text-sm text-neutral-600">
                    Your HRV is in a healthy range. This suggests good recovery and low stress.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Bed className="w-5 h-5 text-indigo-600 mt-1" />
                <div>
                  <p className="font-medium text-neutral-900">Sleep quality</p>
                  <p className="text-sm text-neutral-600">
                    You're averaging 7.5 hours per night. Great job prioritizing rest!
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Recommendations Tabs */}
        <Tabs defaultValue="food" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="food">Food</TabsTrigger>
            <TabsTrigger value="exercise">Exercise</TabsTrigger>
            <TabsTrigger value="rest">Rest</TabsTrigger>
          </TabsList>
          <TabsContent value="food" className="space-y-3 mt-4">
            {recommendations.food.map((rec, idx) => (
              <Card key={idx} className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="text-teal-600 mt-1">
                    <rec.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-neutral-900">{rec.title}</h4>
                    <p className="text-sm text-neutral-600 mt-1">{rec.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="exercise" className="space-y-3 mt-4">
            {recommendations.exercise.map((rec, idx) => (
              <Card key={idx} className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="text-teal-600 mt-1">
                    <rec.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-neutral-900">{rec.title}</h4>
                    <p className="text-sm text-neutral-600 mt-1">{rec.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="rest" className="space-y-3 mt-4">
            {recommendations.rest.map((rec, idx) => (
              <Card key={idx} className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="text-teal-600 mt-1">
                    <rec.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-neutral-900">{rec.title}</h4>
                    <p className="text-sm text-neutral-600 mt-1">{rec.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Learn More */}
        <Card className="p-6 bg-teal-50 border-teal-200">
          <h3 className="font-semibold text-neutral-900 mb-2">Want to learn more?</h3>
          <p className="text-sm text-neutral-700 mb-4">
            Explore our education hub for simple lessons about your cycle and health.
          </p>
          <Link to="/education">
            <Button variant="outline" className="w-full border-teal-600 text-teal-700 hover:bg-teal-100">
              Go to Education Hub
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
