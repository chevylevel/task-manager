# Task Manager

A simple task manager web app built with **Astro**, **Svelte**, **Prisma**, and **TailwindCSS**.

---

## Features

- Create, edit, delete tasks
- Toggle task completion
- Filter tasks by priority and completion
- Fully typed with **TypeScript**
- Modern, modular frontend architecture (SOLID, DRY principles)
- Unit and component tests with **Vitest** and **Testing Library**

---

## Tech Stack

- Astro
- Svelte (for interactive components)
- TailwindCSS (styling)
- Prisma + SQLite (database)
- Vitest + Testing Library (testing)
  
---

## Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/task-manager.git
cd task-manager

# Install dependencies
npm install
```

### Setup Database

```bash
# Initialize the SQLite database
npx prisma migrate dev --name init
```

This will create a local `dev.db` SQLite database.

### Running the App

```bash
npm run dev
```

The app will be running at [http://localhost:4321](http://localhost:4321)

### Building for Production

```bash
npm run build
npm run preview
```

### Running Tests

```bash
npm run test
```

---

## Project Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Start local dev server |
| `npm run build` | Build the production app |
| `npm run preview` | Preview the built app locally |
| `npm run test` | Run unit and component tests |

---

## License

This project is licensed under the MIT License.

---

## Acknowledgements

- [Astro](https://astro.build/)
- [Svelte](https://svelte.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [Vitest](https://vitest.dev/)
