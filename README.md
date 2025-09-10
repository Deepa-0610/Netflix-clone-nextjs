# 🎬 Netflix Clone  

A full-stack Netflix Clone built with **React, Next.js, Tailwind CSS, and Firebase**.  
It features **authentication, a role-based admin panel, and a dynamic movie browsing experience**.  
This project demonstrates skills in building scalable, production-ready web applications.

---

## 🚀 Features  
- **Authentication** – Firebase login/sign-up with session management  
- **Admin Panel** – Add, edit, and delete movies/shows (CRUD operations)  
- **Role-Based Access Control** – Securely restrict admin routes  
- **Dynamic Movie Fetching** – Browse movies and watch trailers  
- **Responsive UI** – Built with Tailwind CSS for all screen sizes  
- **Protected Routes** – Only logged-in users can access content  

---

## 🛠 Tech Stack  
**Frontend:** React, Next.js, Tailwind CSS  
**Backend / Auth:** Firebase Authentication  
**Database:** Firebase Firestore  
**Hosting:** Vercel  

---

## 📂 Folder Structure  

netflix-clone/
│
├── app/ # Next.js App Router pages & layouts
│ ├── admin/ # Admin panel pages
│ ├── browse/ # Main browse page
│ ├── api/ # API routes (if any)
│ ├── layout.tsx # Root layout
│ └── page.tsx # Landing page
│
├── components/ # Reusable UI components (Navbar, Cards, Modals)
├── lib/ # Helper functions, Firebase config, auth utils
├── hooks/ # Custom React hooks
├── public/ # Static assets (images, icons)
├── styles/ # Global styles & Tailwind config
├── .env.local # Environment variables
├── package.json # Project dependencies & scripts
├── tailwind.config.js # Tailwind CSS configuration
└── next.config.js # Next.js configuration

yaml
Copy code

---


## 📦 Installation & Setup  

Clone the repository and install dependencies:  
```bash
git clone https://github.com/yourusername/netflix-clone.git
cd netflix-clone
npm install
Create a .env.local file in the root folder and add:

env
Copy code
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
Run the development server:

bash
Copy code
npm run dev
Build for production:

bash
Copy code
npm run build
npm start
🏆 Learning Highlights
Implemented role-based authentication with Next.js middleware

Solved tricky redirect issues by refactoring route protection

Improved debugging skills and gained experience with deployment on Vercel

📧 Contact
For feedback or collaboration:deepalinges06@gmail.com

