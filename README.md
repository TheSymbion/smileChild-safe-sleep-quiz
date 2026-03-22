# SmileChild Safe Sleep Quiz

A mobile quiz app that teaches caregivers about safe infant sleep practices.

## What It Does
- Players see real infant sleep scenarios and decide Safe or Unsafe
- After each answer, they see whether they were correct
- A Progress tab shows lifetime stats fetched from the backend

## Tech Stack
- **Frontend:** React Native + Expo
- **Backend:** Node.js + Express
- **Database:** SQLite (better-sqlite3)

## Why These Choices
React Native + Expo lets me build for iOS directly and test on 
a real device instantly without needing Xcode. SQLite requires 
zero setup & no separate database server - which keeps the project 
simple to run locally. Express was the fastest way to get three 
clean API endpoints working in Node.js.
## How To Run

### Backend
cd smileChild-App
npm install
node server.js

### Frontend
cd SmileChildApp2
npm install
npx expo start --tunnel

## API Endpoints
- POST /sessions — creates a new game session
- PUT /sessions/:id — saves results when game ends
- GET /stats — returns aggregated player statistics

## Tradeoffs
Since this was a mini-technical task, I focused on making the core "engine" work perfectly rather than adding every possible feature.

Database: I used a local SQLite file instead of a cloud database. This makes the app much easier for an interviewer to run instantly, but in a real production app, I’d move this to a hosted service like PostgreSQL.

User Tracking: Right now, the app tracks "Global Stats" for everyone who plays. I skipped a login system to keep the user experience fast, but if I had more time, I’d add Firebase Auth so each person could see their own private score history.

Infrastructure: I’m using ngrok as a temporary bridge for my local server. It works great for a demo, but the next step would be deploying the backend to Render so the link never changes and stays "always on."

## Tests
cd smileChild-App
npm test

