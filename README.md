# StudyNook

StudyNook is a student-first platform for discovering, booking, and listing quiet study rooms. Browse rooms, filter by amenities and price, manage bookings, and create listings—all in one place.

---

## Key Features

- **Room discovery & filtering**: Search by name, filter by amenities, floor, and hourly rate range.
- **Authentication**: Sign in using email/password and **Google**.
- **Bookings**: Create and manage room bookings.
- **Room listings**: Add and manage your own study room listings.
- **Room details**: Dedicated pages for room information.

---

## Tech Stack

- **Next.js** (App Router)
- **React**
- **HerUI** (UI components)
- **react-hot-toast** (notifications)
- **API routes** under `src/app/api/**`

---

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Install Dependencies

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

Then open:

- http://localhost:3000

---

## Project Structure

- `src/app/`
  - UI pages/routes
  - API endpoints under `src/app/api/**`
- `src/components/`
  - Reusable UI components (room cards, alerts, booking UI, etc.)
- `src/lib/`
  - Authentication utilities and client helpers

---

## API Endpoints

The application uses Next.js API routes located at:

- `src/app/api/rooms/**`
- `src/app/api/bookings/**`
- `src/app/api/auth/**`

---

## Configuration / Environment Variables

If your authentication or API layer requires environment variables, create a local `.env` file and add the required values for your setup.

---

## Deployment

This project can be deployed on any Next.js-compatible hosting platform (e.g., **Vercel**).

---

## Notes

If you run a separate backend for rooms/bookings, ensure the frontend requests (base URL / proxy settings) match your backend configuration.

