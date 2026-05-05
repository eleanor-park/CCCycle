Check out CCCycle [here](https://eleanor-park.github.io/CCCycle/)!

## About CCCycle
This is a prototype of our proposed inclusive menstrual tracking web app. We built this with React, Vite, and a very basic local Node backend. 

Some of the main features of this app include:
- **Wearable device data integration:** develops cycle insights based on wearable device metrics for increased accuracy and ease of use.
- **Simplified symptom tracking:** a short, simple form that makes menstrual tracking easier and more understandable for all groups.
- **Cycle-based health recommendations:** suggestions for diet, rest, and exercise based on cycle phases and symptoms.
- **Educative resources:** articles that provide information and support about various menstrual phases, disorders, and identities.
- **Provider connection:** in-app connection to specialists who can address diverse and specific menstrual health needs.

## App Structure
The pages of the app are:
- **Onboarding:** collects optional profile details and privacy preferences to make the main app experience customized to diverse individual needs.
- **Home:** shows the current cycle day, next period estimate, quick insights, and navigation into the rest of the app.
- **Calendar View:** displays period and ovulation estimates across multiple months. Clicking a day opens the symptom log for that date.
- **Symptom Log:** lets the user create or edit a daily log with bleeding, pain, mood, energy, symptoms, and notes.
- **Insights:** shows cycle-phase-based recommendations (food, exercise, rest) and summaries.
- **Settings:** manages settings, data export & deletion, and visibility preferences.
- **Classroom:** provides education resources for users to learn more about their body and cycle.
- **Connect:** allows users to view and search/filter for a wide variety of healthcare providers.

There's a basic JSON backend that retains data for the purposes of this prototype (server/data/store.json)!
The app stores three main kinds of data:
1. **Profile:** Onboarding answers and privacy/settings preferences.
2. **Cycle:** Current cycle day, cycle length, period length, and estimated dates. 
3. **Symptom logs:** Daily log entries, including bleeding, pain, mood, energy, symptoms, and notes.

## To run locally
Use Node 20+ and pnpm.
1. ```pnpm install```
2. ```pnpm dev```
Open the local URL printed by Vite, usually http://localhost:5173.
<br><br><br>

_Note: We generated the initial code sketch by prompting Figma Make with our ideas, then edited the code manually to create the final result. Therefore, there are some Figma make folders / artifacts._
