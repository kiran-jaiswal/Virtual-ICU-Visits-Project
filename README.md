# 🏥 Virtual ICU Visits System

A modern, secure, and animated web platform that enables real-time **virtual ICU visits**, patient monitoring, and healthcare collaboration between **doctors** and **patient families** with role-based access, video calls, AI assistance, and appointment scheduling.

> ⚙️ Built with cutting-edge technologies, stunning animations, and scalable architecture to simulate real-world ICU operations digitally.

---

## 🚀 Demo Credentials

| Role           | Email                          | Password    |
|----------------|--------------------------------|-------------|
| Doctor         | sarah.johnson@hospital.com     | doctor123   |
| Family Member  | john.smith@email.com           | family123   |

---

## 📷 System Preview

![System Architecture](https://i.imgur.com/j4IWGlL.png)

> 📌 Diagram: High-level flow of Virtual ICU System

---

## 🧠 Features Overview

### ✅ Core Features
- 👤 **Role-Based Login & Registration**
- 📅 **Appointment Scheduling System**
- 🖥 **Separate Dashboards for Doctor & Family**
- 🎥 **Integrated Video Calling & Chat (WebRTC)**
- 📝 **Medical Records Management**
- 💓 **Real-Time Patient Monitoring Dashboard**
- 💬 **Messaging System Between Family & Doctors**

### 💡 Advanced Healthcare Features
- 🤖 **AI Health Assistant** – Smart assistant with speech support
- 🧠 **Mental Health Support** – Resources, meditation, counseling
- 📱 **Telehealth Integration** – Connect smart health devices
- 🚨 **Emergency Protocols** – Real-time crisis guidance with timers

---

## 🎨 UI/UX Highlights
- 🌈 Modern gradient theme with medical blue-green palette
- 🔄 Animated transitions, modals, pulse effects, and hover states
- 📱 Fully responsive & mobile-first design
- ♿ Accessible: keyboard navigation, screen reader support

---

## 🛠️ Tech Stack

| Frontend                | Backend             | Others                           |
|-------------------------|---------------------|----------------------------------|
| React + TypeScript      | Node.js / Express   | WebRTC for Video Calls           |
| Tailwind CSS / SCSS     | MongoDB / Firebase  | Chart.js for Vitals Visualization |
| Zustand / Redux Toolkit | JWT Authentication  | AI Assistant via OpenAI APIs     |

---

## 📁 Folder Structure

src/
├── components/
│ ├── Login.tsx
│ ├── Register.tsx
│ ├── DoctorDashboard.tsx
│ ├── FamilyDashboard.tsx
│ ├── VideoCall.tsx
│ ├── AppointmentScheduler.tsx
│ ├── PatientMonitoring.tsx
│ ├── MedicalRecords.tsx
│ ├── AIHealthAssistant.tsx
│ ├── EmergencyProtocols.tsx
│ └── MentalHealthSupport.tsx
├── assets/
│ └── icons, animations, css
├── App.tsx
├── index.css
└── main.tsx



---

## 🏃‍♂️ Getting Started

1. **Clone the Repo**
   ```bash
   git clone https://github.com/your-username/Virtual-ICU-System.git
   cd Virtual-ICU-System
  npm install
  npm run dev


+---------------------+
|      Landing Page   |
+----------+----------+
           |
     Login / Register
           |
      Role-Based Login
       /            \
+----------+    +------------+
| Doctor   |    | Family     |
| Dashboard|    | Dashboard  |
+----+-----+    +-----+------+
     |                |
Video Call,   View Patient, 
Monitor,      Request Visit,
Chat          View Records

graph TD
A[Client - React App] -->|Video| B[WebRTC Server]
A -->|API| C[Node.js Backend]
C --> D[MongoDB / Firebase]
C --> E[OpenAI API - AI Assistant]
A --> F[Auth0 / Firebase Auth]


🛡️ Security & Compliance
🔒 JWT-based Authentication

🏥 HIPAA-Compliant Practices

🔐 Role-based Access Control

📈 Audit Logs for Patient Interaction

✨ Future Enhancements
🌍 Multi-language Support (i18n)

📆 Calendar Sync (Google / Outlook)

📞 Emergency Auto-Dial from App

📊 Advanced Analytics Dashboard

🧑‍💻 Contributors
👩‍💻 Kiran Jaiswal – Developer & Project Lead

👩‍⚕️ Medical Consultant – [Optional Placeholder]

💬 UI/UX Designer – [Optional Placeholder]

📬 Contact
If you’d like to contribute, request features, or need help, feel free to reach out:

📧 kiranjaiswalkj2002@gmail.com
🌐 GitHub - Virtual-ICU-Visits Porject
