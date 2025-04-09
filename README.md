# LearnLingo

LearnLingo is an interactive web platform designed to connect learners with professional English tutors. The application allows users to browse available teachers, book trial lessons, and manage their favorite tutors. It emphasizes a seamless user experience, responsive design, and real-time interaction powered by Firebase services.

---

## ✨ Features

- 🔍 Browse a list of available tutors for the language
- 📌 Add/remove teachers from favorites
- 📅 Book a trial lesson via a modal form
- 🔐 Authentication with Firebase (register, log in, log out)
- 📱 Fully responsive design for mobile and desktop
- 🟨 Smooth and friendly UI based on Figma design

---

## 🛠️ Tech Stack

- **React** with Vite
- **React Router** for navigation
- **Redux Toolkit** for state management
- **Firebase** (Authentication, Firestore, Hosting)
- **CSS Modules** for styling
- **React Hook Form** + **Yup** for form handling and validation
- **React Toastify** for user notifications

---

## 📂 Project Structure

```
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   ├── services/
|   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── index.html
├── firebase.js
├── package.json
```

---

## 🚀 How to Run the Project Locally

To run **LearnLingo** on your local machine, follow these steps:

### 1. Clone the repository:

```bash
git clone https://learn-lingo-sage-eta.vercel.app/
cd learnlingo
```

### 2. Install dependencies:

Make sure you have **Node.js** and **npm** or **yarn** installed.

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

### 3. Set up environment variables:

Create a `.env` file in the root of the project and add your Firebase config:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_DATABASE_URL=your_database_url
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

> You can find this info in your Firebase project settings.

### 4. Start the development server:

```bash
npm run dev
```

Or using yarn:

```bash
yarn dev
```

The app will be available at:
👉 `http://localhost:5173/`

---

## 🌐 Deployment

You can easily deploy LearnLingo using [Vercel](https://vercel.com/) or [Netlify](https://netlify.com/).

### Example steps for Vercel:

1. Push your project to GitHub
2. Import the repo into Vercel
3. Add the Firebase environment variables
4. Deploy 🎉

---

## 🔐 Authentication

Authentication is powered by Firebase and supports:

- Email/password sign-up
- Login/logout
- Session persistence

All authentication logic is handled via Firebase’s SDK and stored in Redux.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 💡 Inspiration

The project design is based on a Figma concept you can view [here](https://www.figma.com/design/dewf5jVviSTuWMMyU3d8Mc/Learn-Lingo?node-id=0-1&p=f&t=nVTH7Tdw2lfGjvd2-0).

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Good luck! 🌍✨
