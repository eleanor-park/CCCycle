import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  ArrowLeft,
  BookOpen,
  Search,
  Clock,
  Activity,
  Heart,
  Brain,
  Pill,
  Users,
  Lightbulb,
  ChevronRight,
  Sparkles,
  Baby,
  AlertCircle,
  Sunrise,
} from "lucide-react";

export function Education() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const lessons = [
    {
      id: 1,
      title: "Your First Period & First Years",
      description: "A gentle guide for new menstruators on what to expect and how to manage.",
      duration: "8 min read",
      category: "New Menstruators",
      icon: Sparkles,
      color: "teal",
      progress: 0,
    },
    {
      id: 2,
      title: "Talking to Parents & Caregivers",
      description: "How to start conversations about periods and menstrual health.",
      duration: "5 min read",
      category: "New Menstruators",
      icon: Users,
      color: "teal",
      progress: 0,
    },
    {
      id: 3,
      title: "Understanding Menopause",
      description: "What happens during perimenopause and menopause, and how to navigate symptoms.",
      duration: "10 min read",
      category: "Menopause",
      icon: Sunrise,
      color: "amber",
      progress: 0,
    },
    {
      id: 4,
      title: "Hormone Changes During Menopause",
      description: "Learn about the hormonal shifts and how they affect your body and mind.",
      duration: "8 min read",
      category: "Menopause",
      icon: Brain,
      color: "amber",
      progress: 0,
    },
    {
      id: 5,
      title: "Birth Control Pills & Your Cycle",
      description: "How the pill affects your hormones and what to expect.",
      duration: "7 min read",
      category: "Contraceptives",
      icon: Pill,
      color: "blue",
      progress: 0,
    },
    {
      id: 6,
      title: "IUDs: What to Expect",
      description: "Understanding hormonal and copper IUDs and their effects on menstruation.",
      duration: "8 min read",
      category: "Contraceptives",
      icon: Pill,
      color: "blue",
      progress: 0,
    },
    {
      id: 7,
      title: "Other Contraceptive Methods",
      description: "Learn about patches, rings, implants, and how they impact your cycle.",
      duration: "6 min read",
      category: "Contraceptives",
      icon: Pill,
      color: "blue",
      progress: 0,
    },
    {
      id: 8,
      title: "Living with PCOS",
      description: "Understanding Polycystic Ovary Syndrome and managing symptoms.",
      duration: "10 min read",
      category: "Disorders",
      icon: AlertCircle,
      color: "rose",
      progress: 0,
    },
    {
      id: 9,
      title: "Endometriosis Explained",
      description: "What is endometriosis, how it's diagnosed, and treatment options.",
      duration: "12 min read",
      category: "Disorders",
      icon: AlertCircle,
      color: "rose",
      progress: 0,
    },
    {
      id: 10,
      title: "Managing Menstrual Pain",
      description: "When cramps are normal and when to see a doctor.",
      duration: "7 min read",
      category: "Disorders",
      icon: Heart,
      color: "rose",
      progress: 0,
    },
    {
      id: 11,
      title: "Tracking for Conception",
      description: "How to use cycle tracking to understand your fertile window.",
      duration: "9 min read",
      category: "Trying to Conceive",
      icon: Baby,
      color: "purple",
      progress: 0,
    },
    {
      id: 12,
      title: "Understanding Ovulation",
      description: "Learn the signs of ovulation and how to track them.",
      duration: "8 min read",
      category: "Trying to Conceive",
      icon: Activity,
      color: "purple",
      progress: 0,
    },
    {
      id: 13,
      title: "Menstruation for Trans Men",
      description: "Managing periods while on testosterone and navigating dysphoria.",
      duration: "10 min read",
      category: "Trans Health",
      icon: Users,
      color: "indigo",
      progress: 0,
    },
    {
      id: 14,
      title: "Gender-Affirming Hormone Therapy",
      description: "How testosterone and other hormones affect menstruation.",
      duration: "11 min read",
      category: "Trans Health",
      icon: Lightbulb,
      color: "indigo",
      progress: 0,
    },
    {
      id: 15,
      title: "Tracking for Non-Binary People",
      description: "Inclusive approaches to cycle tracking for all gender identities.",
      duration: "7 min read",
      category: "Trans Health",
      icon: Heart,
      color: "indigo",
      progress: 0,
    },
  ];

  const categories = [
    "All",
    "New Menstruators",
    "Menopause",
    "Contraceptives",
    "Disorders",
    "Trying to Conceive",
    "Trans Health",
  ];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredLessons = lessons.filter((lesson) => {
    const matchesCategory = selectedCategory === "All" || lesson.category === selectedCategory;
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const colorClasses: Record<string, string> = {
    teal: "bg-teal-100 text-teal-700",
    purple: "bg-purple-100 text-purple-700",
    rose: "bg-rose-100 text-rose-700",
    blue: "bg-blue-100 text-blue-700",
    amber: "bg-amber-100 text-amber-700",
    indigo: "bg-indigo-100 text-indigo-700",
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Education Hub</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6 pb-24">
        {/* Intro */}
        <Card className="p-6 bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
          <div className="flex items-start space-x-3">
            <BookOpen className="w-8 h-8 text-teal-600 mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-neutral-900 mb-2">Classroom</h2>
              <p className="text-neutral-700 text-sm">
                Everything you need to know about menstrual health, hormones, and your body, explained by experts.
              </p>
            </div>
          </div>
        </Card>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <Input
            placeholder="Search lessons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-teal-600 hover:bg-teal-700" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Lessons */}
        <div className="space-y-3">
          {filteredLessons.map((lesson) => {
            const Icon = lesson.icon;
            return (
              <Card
                key={lesson.id}
                className="p-4 hover:shadow-md transition-all cursor-pointer"
                onClick={() => {}}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-lg ${colorClasses[lesson.color]} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold text-neutral-900 pr-2">{lesson.title}</h3>
                      <ChevronRight className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                    </div>
                    <p className="text-sm text-neutral-600 mb-2">{lesson.description}</p>
                    <div className="flex items-center space-x-3">
                      <Badge variant="secondary" className="text-xs">
                        {lesson.category}
                      </Badge>
                      <div className="flex items-center space-x-1 text-xs text-neutral-500">
                        <Clock className="w-3 h-3" />
                        <span>{lesson.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {filteredLessons.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
            <p className="text-neutral-600">No lessons match your search.</p>
            <Button variant="link" onClick={() => setSearchQuery("")} className="mt-2">
              Clear search
            </Button>
          </div>
        )}

        {/* Coming Soon */}
        <Card className="p-6 bg-neutral-100 border-neutral-200">
          <h3 className="font-semibold text-neutral-900 mb-2">More Coming Soon</h3>
          <p className="text-sm text-neutral-600">
            We're constantly adding new lessons based on what our community wants to learn. Have a topic request? Let us know!
          </p>
        </Card>
      </div>
    </div>
  );
}
