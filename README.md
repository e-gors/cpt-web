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

## Assumptions made

- Created mockup data at first for easily evaluating the design and layouts.
- The UI is designed to feel practical and clean rather than overly complex, since the main goal was to demonstrate project tracking clearly.

## Technical reflection

1. Why did you choose this implementation approach?

I chose this approach because it keeps the app simple, fast to build, and easy to understand and maintain. React and TypeScript gave me strong and safety foundation for my UI. I also wanted the app feel polished without over-engineer it.

2. What tradeoffs did you make?

I prioritized the UI design and validation over behind actions but don't worry because I was able to add also the backend features to be able to connect with the frontend technologies that I've built. They can communicate each other but limited to the requirements given.

3. What would you improve if given additional time?

I would like to improve and optimize the fetching of data as well as in filters because it might crush if it has more than 10k data I guess but I added a limiter of 2 refetch cycle only also I can add some throttle in the api side if needed.

4. What was the most challenging part of this assessment?

The most challenging part of the assessment was the UI design at first since I don't have much talent when it comes to creating designs although I do have some basic understandings and principles but overall it was great experience.

5. Did you use AI tools during development?

Yes. I used Figma for the interface direction and ChatGPT for guidance, especially when refining the structure, component flow, and correcting the phrases and grammar for the project documentation. I used them as support tools rather than as a substitute for the final implementation.
