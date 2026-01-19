# RAHMAN ESTATES

Welcome to Rahman Estates, a premier online platform for discovering and exploring luxury real estate. This application is built with a modern tech stack to provide a seamless, beautiful, and performant user experience.

Rahman Estates is a Next.js-powered web application that allows users to browse high-end property listings. It features user authentication, allowing visitors to create an account, sign in, and save their favorite properties. The front-end is built with React, TypeScript, and styled with the sleek and customizable ShadCN UI components and Tailwind CSS. All data, including users and their liked properties, is managed in real-time using Google Firebase.

## Key Features

*   **Modern UI/UX:** A clean, dark-themed, and fully responsive interface built with ShadCN UI and animated with Framer Motion.
*   **Property Listings:** Browse, search, and filter an extensive catalog of luxury properties.
*   **Detailed Property Pages:** View comprehensive details, image galleries, and key features for each property.
*   **User Authentication:** Secure sign-up and sign-in functionality using Firebase Authentication (Email & Password).
*   **Personalized Accounts:** Registered users can "like" properties and view all their saved listings on a dedicated "My Liked Properties" page.
*   **Real-time Database:** Utilizes Firebase Firestore to instantly save and retrieve user data and liked properties.

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (with App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **Backend & Database:** [Firebase](https://firebase.google.com/) (Authentication & Firestore)
*   **Form Management:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## Getting Started

### Prerequisites

*   Node.js (v18 or later)
*   npm or yarn

### Firebase Setup

This project is configured to work with Firebase. You will need to create your own Firebase project to connect the application to a backend.

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Create a new project.
3.  In your new project, go to **Project Settings** > **General**.
4.  Under "Your apps", click the web icon (`</>`) to register a new web app.
5.  After registering, you will be given a `firebaseConfig` object. Copy these credentials.
6.  In the root of this project, you will find a file at `src/firebase/config.ts`. Replace the placeholder configuration with the one from your Firebase project.

### Running the Development Server

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will now be running on [http://localhost:9002](http://localhost:9002).

## Project Structure

*   `src/app/`: Contains all the pages and layouts for the Next.js App Router.
*   `src/components/`: Houses all reusable React components, including UI components from ShadCN.
*   `src/firebase/`: Manages the Firebase connection, providers, and custom hooks for interacting with Firebase services.
*   `src/lib/`: Includes utility functions, data types, and static data like property information.
*   `firestore.rules`: Defines the security rules for the Firestore database, ensuring users can only access their own data.
*   `docs/backend.json`: A blueprint file that describes the data models and Firestore structure for the application.