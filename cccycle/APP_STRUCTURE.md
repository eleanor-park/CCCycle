# Cycle - Inclusive Menstrual Health Platform

## Overview
A mobile-first progressive web app for inclusive menstrual health tracking with wearable integration.

## Key Features
- **Cycle Tracking**: Temperature & heart rate data from Apple Health, Oura, Whoop
- **Symptom Logging**: Pain, bleeding, mood, energy with customizable entries
- **Personalized Insights**: Food, exercise, and rest recommendations based on cycle phase
- **Education Hub**: Stigma-free lessons about menstrual health
- **Provider Finder**: Directory of menstrual-health-informed healthcare providers
- **Privacy Controls**: Auto-delete, data export, no selling, user-controlled sharing

## Design Principles
- **Inclusive**: Supports all genders, contraceptives, menopause, and beginners
- **Privacy-First**: Strong encryption, auto-delete after 60 days, no data selling
- **Accessible**: Calm, modern design avoiding stereotypical feminine aesthetics
- **Supportive**: Non-judgmental tone, no pushy notifications

## App Structure

### Screens
- `/` - Home Dashboard (cycle overview, insights, wearable data)
- `/onboarding` - 3-step onboarding (identity, privacy, wearable connection)
- `/symptom-log` - Detailed symptom logging interface
- `/insights` - Personalized recommendations by cycle phase
- `/education` - Educational content hub with searchable lessons
- `/provider-finder` - Healthcare provider directory with filters
- `/privacy` - Privacy controls and data management

### Data Storage
Uses localStorage for prototype (recommend Supabase for production):
- User profile & preferences
- Cycle data & predictions
- Symptom logs (auto-delete after 60 days)
- Privacy settings

### Color Scheme
- Primary: Teal (#0d9488 / teal-600)
- Accent colors based on cycle phase:
  - Menstrual: Rose
  - Follicular: Emerald
  - Ovulation: Amber
  - Luteal: Indigo

### Mobile-First Design
- Responsive layouts optimized for mobile
- Bottom navigation for easy thumb access
- Touch-friendly tap targets
- Smooth scrolling and transitions

## Tech Stack
- React with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Radix UI components
- Lucide React icons
- LocalStorage for data persistence
