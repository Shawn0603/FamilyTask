# 🏡 FamilyTask

**FamilyTask** is a lightweight fullstack task management system designed for family use. It allows family members to assign, track, and complete shared tasks with reminders and status updates.

---

## 🌟 Highlights

- 👪 Built specifically for family collaboration
- ✅ Simple task assignment and completion tracking
- ⏰ Reminder system for time-sensitive tasks
- 🔄 Real-time status feedback between members

---

## 👤 User Stories

### 1. Parents and Children

Parents create a list of tasks (e.g., homework, chores) for their child. The child can view tasks in their interface and mark them as "Done" when completed. Parents are notified when tasks are finished.

### 2. Elderly and Caregiver

A son or daughter creates a reminder task (e.g., take medicine, check blood pressure) for their elderly parent. The system sends a timely reminder to the parent, who confirms completion by marking the task as done.

### 3. Couples

One spouse assigns a reminder to the other (e.g., "buy gardening supplies after work"). The system delivers a reminder during the appropriate time window, ensuring the task is not forgotten and reducing miscommunication.

---

## 🛠 Tech Stack

### Frontend

- **React 18** + **TypeScript**
- **Vite** for bundling
- **Tailwind CSS** for styling
- **React Router DOM** for navigation
- **Zustand** for state management

### Backend

- **Java + Spring Boot** (User authentication completed)
- **Spring Security** with JWT-based authentication
- **PostgreSQL** database
- **RESTful API** development in progress

---

## 🧪 Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev


cd backend
./mvnw spring-boot:run


Database: familytask
User: postgres
Password: your_password

