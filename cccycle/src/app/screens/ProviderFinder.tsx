import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  ArrowLeft,
  Search,
  MapPin,
  Star,
  Phone,
  Globe,
  Heart,
  Stethoscope,
  CheckCircle2,
  Filter,
  X,
} from "lucide-react";

export function ProviderFinder() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [selectedProviderTypes, setSelectedProviderTypes] = useState<string[]>([]);
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const providerTypes = [
    "Gynecology",
    "Family Medicine",
    "Endocrinology",
    "Naturopathic Medicine",
    "Reproductive Endocrinology",
    "Urology",
    "Pelvic Floor Therapy",
  ];

  const specializations = [
    "Menstrual disorders",
    "Menopause",
    "Pediatric/Adolescent",
    "PCOS",
    "Endometriosis",
    "Fibroids",
    "Pelvic pain",
    "Contraception",
    "Fertility",
    "Hormone therapy",
    "Gender-affirming care",
  ];

  const features = [
    "Telehealth",
    "Accepts insurance",
    "Multiple languages",
    "Evening/weekend hours",
    "Same-day appointments",
  ];

  const providers = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      specialty: "Gynecology",
      practice: "Inclusive Health Center",
      distance: "1.2 miles",
      rating: 4.9,
      reviews: 127,
      lgbtqFriendly: true,
      acceptsInsurance: true,
      telehealth: true,
      languages: ["English", "Mandarin"],
      specialties: ["Menstrual disorders", "PCOS", "Endometriosis"],
    },
    {
      id: 2,
      name: "Dr. Jamie Rodriguez",
      specialty: "Family Medicine",
      practice: "Community Care Clinic",
      distance: "2.5 miles",
      rating: 4.8,
      reviews: 94,
      lgbtqFriendly: true,
      acceptsInsurance: true,
      telehealth: false,
      languages: ["English", "Spanish"],
      specialties: ["Primary care", "Menopause", "Contraception"],
    },
    {
      id: 3,
      name: "Dr. Alex Thompson",
      specialty: "Endocrinology",
      practice: "Hormone Health Associates",
      distance: "3.8 miles",
      rating: 4.7,
      reviews: 68,
      lgbtqFriendly: true,
      acceptsInsurance: false,
      telehealth: true,
      languages: ["English"],
      specialties: ["Hormone therapy", "PCOS", "Perimenopause"],
    },
    {
      id: 4,
      name: "Dr. Morgan Lee",
      specialty: "Naturopathic Medicine",
      practice: "Whole Body Wellness",
      distance: "4.1 miles",
      rating: 4.9,
      reviews: 152,
      lgbtqFriendly: true,
      acceptsInsurance: true,
      telehealth: true,
      languages: ["English", "Korean"],
      specialties: ["Natural remedies", "Nutrition", "Pain management"],
    },
    {
      id: 5,
      name: "Dr. Priya Patel",
      specialty: "Gynecology",
      practice: "Women's Health Specialists",
      distance: "2.8 miles",
      rating: 4.9,
      reviews: 203,
      lgbtqFriendly: true,
      acceptsInsurance: true,
      telehealth: true,
      languages: ["English", "Hindi", "Gujarati"],
      specialties: ["Menstrual disorders", "Fibroids", "Contraception"],
    },
    {
      id: 6,
      name: "Dr. Taylor Martinez",
      specialty: "Reproductive Endocrinology",
      practice: "Fertility & Hormone Clinic",
      distance: "5.2 miles",
      rating: 4.8,
      reviews: 156,
      lgbtqFriendly: true,
      acceptsInsurance: true,
      telehealth: false,
      languages: ["English", "Spanish"],
      specialties: ["Fertility", "PCOS", "Hormone therapy"],
    },
    {
      id: 7,
      name: "Dr. Jordan Kim",
      specialty: "Family Medicine",
      practice: "Rainbow Health Collective",
      distance: "1.8 miles",
      rating: 5.0,
      reviews: 89,
      lgbtqFriendly: true,
      acceptsInsurance: true,
      telehealth: true,
      languages: ["English", "Korean"],
      specialties: ["Gender-affirming care", "Hormone therapy", "Primary care"],
    },
    {
      id: 8,
      name: "Dr. Aisha Johnson",
      specialty: "Gynecology",
      practice: "Center for Women's Wellness",
      distance: "3.1 miles",
      rating: 4.7,
      reviews: 142,
      lgbtqFriendly: true,
      acceptsInsurance: true,
      telehealth: true,
      languages: ["English", "French"],
      specialties: ["Endometriosis", "Pelvic pain", "Menstrual disorders"],
    },
    {
      id: 9,
      name: "Dr. Sam Nguyen",
      specialty: "Pelvic Floor Therapy",
      practice: "Healing Hands Physical Therapy",
      distance: "2.3 miles",
      rating: 4.9,
      reviews: 98,
      lgbtqFriendly: true,
      acceptsInsurance: true,
      telehealth: false,
      languages: ["English", "Vietnamese"],
      specialties: ["Pelvic pain", "Pain management", "Physical therapy"],
    },
    {
      id: 10,
      name: "Dr. Rachel Goldstein",
      specialty: "Gynecology",
      practice: "Compassionate Care OB/GYN",
      distance: "4.5 miles",
      rating: 4.8,
      reviews: 178,
      lgbtqFriendly: true,
      acceptsInsurance: true,
      telehealth: true,
      languages: ["English", "Hebrew"],
      specialties: ["Menopause", "Contraception", "Adolescent health"],
    },
  ];

  const toggleProviderType = (type: string) => {
    setSelectedProviderTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleSpecialization = (spec: string) => {
    setSelectedSpecializations((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
    );
  };

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  const clearAllFilters = () => {
    setSelectedProviderTypes([]);
    setSelectedSpecializations([]);
    setSelectedFeatures([]);
  };

  const filteredProviders = providers.filter((provider) => {
    const matchesSearch =
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesProviderType =
      selectedProviderTypes.length === 0 || selectedProviderTypes.includes(provider.specialty);

    const matchesSpecialization =
      selectedSpecializations.length === 0 ||
      selectedSpecializations.some((spec) => {
        if (spec === "LGBTQ+ friendly") return provider.lgbtqFriendly;
        return provider.specialties.some((s) => s.toLowerCase().includes(spec.toLowerCase()));
      });

    const matchesFeatures =
      selectedFeatures.length === 0 ||
      selectedFeatures.every((feature) => {
        if (feature === "Telehealth") return provider.telehealth;
        if (feature === "Accepts insurance") return provider.acceptsInsurance;
        if (feature === "Multiple languages") return provider.languages.length > 1;
        return true;
      });

    return matchesSearch && matchesProviderType && matchesSpecialization && matchesFeatures;
  });

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Provider Finder</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6 pb-24">
        {/* Intro */}
        <Card className="p-6 bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
          <div className="flex items-start space-x-3">
            <Stethoscope className="w-8 h-8 text-teal-600 mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-neutral-900 mb-2">Connect with a Provider</h2>
              <p className="text-neutral-700 text-sm">
                Find a healthcare provider who is specialized in menstrual health and can support any of your individual needs.
              </p>
            </div>
          </div>
        </Card>

        {/* Search */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <Input
              placeholder="Search by name, specialty, or condition..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-neutral-600" />
              <h3 className="font-semibold text-neutral-900">Filters</h3>
            </div>
            {(selectedProviderTypes.length > 0 ||
              selectedSpecializations.length > 0 ||
              selectedFeatures.length > 0) && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-teal-600">
                Clear all
              </Button>
            )}
          </div>

          {/* Provider Types */}
          <div>
            <p className="text-sm font-medium text-neutral-700 mb-2">Provider Type</p>
            <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
              {providerTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => toggleProviderType(type)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedProviderTypes.includes(type)
                      ? "bg-teal-600 text-white"
                      : "bg-white border border-neutral-200 text-neutral-700 hover:border-teal-300"
                  }`}
                >
                  {type}
                  {selectedProviderTypes.includes(type) && (
                    <X className="w-3 h-3 inline ml-1.5" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Specializations */}
          <div>
            <p className="text-sm font-medium text-neutral-700 mb-2">Specializations</p>
            <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
              {specializations.map((spec) => (
                <button
                  key={spec}
                  onClick={() => toggleSpecialization(spec)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedSpecializations.includes(spec)
                      ? "bg-teal-600 text-white"
                      : "bg-white border border-neutral-200 text-neutral-700 hover:border-teal-300"
                  }`}
                >
                  {spec}
                  {selectedSpecializations.includes(spec) && (
                    <X className="w-3 h-3 inline ml-1.5" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <p className="text-sm font-medium text-neutral-700 mb-2">Features</p>
            <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
              {features.map((feature) => (
                <button
                  key={feature}
                  onClick={() => toggleFeature(feature)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedFeatures.includes(feature)
                      ? "bg-teal-600 text-white"
                      : "bg-white border border-neutral-200 text-neutral-700 hover:border-teal-300"
                  }`}
                >
                  {feature}
                  {selectedFeatures.includes(feature) && <X className="w-3 h-3 inline ml-1.5" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          <p className="text-sm text-neutral-600 mb-3">
            {filteredProviders.length} provider{filteredProviders.length !== 1 ? "s" : ""} found
          </p>
          <div className="space-y-3">
            {filteredProviders.map((provider) => (
              <Card key={provider.id} className="p-5 hover:shadow-md transition-all">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-900 text-lg">{provider.name}</h3>
                      <p className="text-sm text-neutral-600">{provider.specialty}</p>
                      <p className="text-sm text-neutral-500">{provider.practice}</p>
                    </div>
                    <div className="flex items-center space-x-1 bg-amber-50 px-2 py-1 rounded">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium">{provider.rating}</span>
                      <span className="text-xs text-neutral-500">({provider.reviews})</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 text-sm text-neutral-600">
                    <MapPin className="w-4 h-4" />
                    <span>{provider.distance} away</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {provider.lgbtqFriendly && (
                      <Badge variant="secondary" className="bg-teal-100 text-teal-700">
                        <Heart className="w-3 h-3 mr-1" />
                        LGBTQ+ friendly
                      </Badge>
                    )}
                    {provider.telehealth && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        <Globe className="w-3 h-3 mr-1" />
                        Telehealth
                      </Badge>
                    )}
                    {provider.acceptsInsurance && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Insurance
                      </Badge>
                    )}
                  </div>

                  <div>
                    <p className="text-xs text-neutral-600 mb-1">Specialties:</p>
                    <div className="flex flex-wrap gap-1">
                      {provider.specialties.map((specialty, idx) => (
                        <span key={idx} className="text-xs bg-neutral-100 px-2 py-1 rounded">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="w-4 h-4 mr-1" />
                      Contact
                    </Button>
                    <Button size="sm" className="flex-1 bg-teal-600 hover:bg-teal-700">
                      View Profile
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {filteredProviders.length === 0 && (
          <div className="text-center py-12">
            <Stethoscope className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
            <p className="text-neutral-600 mb-2">No providers match your criteria.</p>
            <Button variant="link" onClick={clearAllFilters} className="text-teal-600">
              Clear filters
            </Button>
          </div>
        )}

        {/* Disclaimer */}
        <Card className="p-4 bg-neutral-100 border-neutral-200">
          <p className="text-xs text-neutral-600">
            <strong>Note:</strong> This directory is for informational purposes. Please verify provider credentials and availability before booking. We don't receive any compensation for referrals.
          </p>
        </Card>
      </div>
    </div>
  );
}
