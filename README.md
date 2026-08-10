# Client Project Tracker

This project is a lightweight web app for tracking client projects, statuses, priorities, and deadlines. I built it as a simple internal tool with a clear dashboard and a straightforward project management flow.

## Setup instructions

1. Clone the repository and open it in your terminal.
2. Copy the example environment file:

```bash
cp .env.example .env
```

3. Update the API URL in the .env file so it points to your backend:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

4. Install the dependencies:

```bash
npm install
```

5. Start the development server:

```bash
npm run dev
```

6. Open the local Vite URL shown in the terminal to view the app.

## Technology choices

I used React with TypeScript for the frontend because it keeps the UI structured and easier to maintain as the app grows. Vite was chosen for a fast development experience and lightweight build setup. Tailwind was used for styling, while Redux Toolkit Query with Axios handles API communication. I also used React Hook Form and Zod to keep form handling and validation simple.

## How to run the application

From the project root, run:

```bash
npm install
npm run dev
```

The app will be available locally in the browser through the Vite dev server URL.

## Features implemented

- Search projects by client name, project name, or description
- Filter projects by status and priority
- Sort projects by due date, priority, client name, or project name
- Clear the active filters
- Create a new project
- Edit an existing project
- Delete a project
- View summary stats for total projects, in-progress projects, high-priority projects, and overdue projects
- Show loading and empty states for a smoother experience

## Assumptions made

- A backend API is available at the URL defined in the environment file and supports the expected project CRUD endpoints.
- The app is intended as a practical frontend project tracker rather than a full-scale enterprise tool.
- The UI focuses on clarity and usability over complex workflow automation.
