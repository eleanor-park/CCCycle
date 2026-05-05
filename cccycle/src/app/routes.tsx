import { createBrowserRouter } from "react-router";
import { Home } from "./screens/Home";
import { Onboarding } from "./screens/Onboarding";
import { SymptomLog } from "./screens/SymptomLog";
import { Insights } from "./screens/Insights";
import { Education } from "./screens/Education";
import { ProviderFinder } from "./screens/ProviderFinder";
import { Privacy } from "./screens/Privacy";
import { CalendarView } from "./screens/CalendarView";
import { Root } from "./screens/Root";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "onboarding", Component: Onboarding },
      { path: "symptom-log", Component: SymptomLog },
      { path: "insights", Component: Insights },
      { path: "education", Component: Education },
      { path: "provider-finder", Component: ProviderFinder },
      { path: "privacy", Component: Privacy },
      { path: "calendar", Component: CalendarView },
    ],
  },
]);
