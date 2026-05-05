import { Outlet, useNavigate, useLocation } from "react-router";
import { useEffect } from "react";
import { useUserProfile } from "../hooks/useStorage";

export function Root() {
  const [userProfile] = useUserProfile();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only redirect to onboarding if not complete and we're at root path
    if (!userProfile.onboardingComplete && location.pathname === "/") {
      navigate("/onboarding", { replace: true });
    }
  }, [userProfile.onboardingComplete, location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Outlet />
    </div>
  );
}