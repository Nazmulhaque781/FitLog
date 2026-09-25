# FITLOG

FITLOG is a modern workout library and workout planning web application. It allows users to explore exercises, view detailed workout information, save exercises for later, and create their own daily workout plan.

## 🚀 Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- DaisyUI
- REST API
- React Context API
- Local Storage

## ✨ Key Features

### 1. Workout Library

Browse a collection of exercises with information such as muscle groups, equipment, difficulty, duration, calories, and rating.

### 2. Exercise Details

View detailed information about each exercise, including description, instructions, sets, reps, duration, calories, and rating.

### 3. My Plan

Add exercises to your daily workout plan and manage your planned workouts from the My Plan page.

### 4. Save for Later

Save your favorite exercises and access them later from the Saved section.

### 5. Sort & Track Workouts

Sort workouts by Duration, Calories, or Rating. Mark completed workouts as done and remove workouts from your plan when needed.

## 📁 Project Structure

```text
src/
├── app/
│   ├── exercise/
│   │   └── [id]/
│   ├── plan/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── shared/
│   │   ├── navbar.tsx
│   │   └── footer.tsx
│   └── ExerciseActions.tsx
│
├── context/
│   └── PlanContext.tsx
│
├── services/
│   └── exerciseApi.ts
│
└── assets/
    └── logo.png
```
