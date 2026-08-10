# Client Project Tracker

This project is a lightweight web app for tracking client projects, statuses, priorities, and deadlines. I built it as a simple but polished internal tool with a clear dashboard and project management flow.

## Setup instructions

1. Clone the repository and open it in your terminal.
2. Install dependencies:

```bash
cp .env.example .env
```

3. Update the database values in the .env file so they match your local setup.

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local URL shown in the terminal to view the app.

## Technology choices

I used React with TypeScript for the frontend because it keeps the UI structured and easier to maintain as the app grows. Vite was chosen for a fast development experience and lightweight build setup. Tailwind-style utility classes were used for layout and styling, with a custom theme to keep the design consistent and closer to the Figma direction I was following.

## How to run the application

From the project root, run:

```bash
cp .env.example .env
npm install
npm run dev
```

The app will be available locally in the browser via the Vite dev server URL.

## Features Implemented

- filters (search, status, priority, sort, and clear)
- create new project
- update existing project
- delete existing project
- show/display total numbers of project group by status

## Assumptions made

- Created mockup data at first for easily evaluating the design and layouts.
- The UI is designed to feel practical and clean rather than overly complex, since the main goal was to demonstrate project tracking clearly.
