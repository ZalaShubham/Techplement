# Daily-Quotes
 "Daily Quote is a full-stack web app that delivers inspiring quotes every day. Users can browse,send,comment and save their favorite quotes, and even submit their own. Built with EJS, Node.js, Express, and MySQL.",


## 🚀 Key Features of a Daily Quotes App
1. Quote of the Day – Display a new quote daily, fetched from an API or database.
2. User Authentication – Users can sign up/log in to save their favorite quotes.
3. Quote Categories – Users can filter quotes by motivation, success, love, etc.
4. Like & Save Quotes – Users can like and save quotes to their personal collection.
5. Random Quote Generator – Generate and display a random quote on demand.
6. API Integration – Fetch quotes from third-party APIs like Quotable API or FavQs.
7. Admin Panel – Allow admins to add/edit/delete quotes.
8. Social Sharing – Users can share quotes on social media platforms.

## 🛠 Tech Stack (Full Stack)
### Front-end:
- IJS,CSS,Javascript – For dynamic UI.

### Back-end:
- Node.js & Express.js – For handling API requests and user authentication.
- MongoDB / MySQL – To store quotes and user data.
- JWT (JSON Web Tokens) – For secure authentication.
- Bcrypt.js - For Hashing

## 📂 Full-Stack App Folder Structure
```bash
📦 daily-quotes-app
 ┣ 📂 client             # (Frontend - Simply EJS)
 ┃ ┣ 📂 public           # Static assets (images, icons, fonts)
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 pages          # Pages 
 ┃ ┃ ┣ 📂 services       # API calls (e.g., axios fetch requests)
 ┃ ┃ ┣ 📂 styles         # CSS, Tailwind, Styled Components
 ┃ ┃ ┣ 📂 utils          # Helper functions (e.g., date format, text truncation)
 ┃ ┃ ┣ 📜 index.ejs
 ┃ ┃ ┣ 📜 index.js
 ┣ 📂 errors             # (Errors and Problems History)
 ┣ 📂 server             # (Backend - Node.js + Express)
 ┃ ┣ 📂 config           # Database & environment configurations
 ┃ ┣ 📂 controllers      # Business logic for API routes
 ┃ ┣ 📂 models           # Database models (MongoDB, PostgreSQL, etc.)
 ┃ ┣ 📂 routes           # API endpoints (e.g., /api/quotes, /api/auth)
 ┃ ┣ 📂 middleware       # Auth middleware, error handling
 ┃ ┣ 📂 utils            # Helper functions (e.g., JWT generation)
 ┃ ┣ 📜 server.js        # Main Express app entry file
 ┣ 📜 .env               # Environment variables
 ┣ 📜 .gitignore         # Ignore unnecessary files
 ┣ 📜 README.md          # Documentation
 ┣ 📜 package.json       # Backend dependencies
```
## UI Screenshots

![allUI](https://github.com/user-attachments/assets/795bbbc9-5436-479a-8ac8-60d9c62ca73e)

### 📱 Mobile UI
![MobileUI (2)](https://github.com/user-attachments/assets/f18a703f-47e9-4e83-86cf-52be695acced)
![image](https://github.com/user-attachments/assets/a05d9abb-eb9b-461c-b4a8-0340fffb9492)
![image](https://github.com/user-attachments/assets/a2270035-515d-4d43-9fcb-b4dd9251aeb4)




## 🎯 Possible Future Enhancements 
- Add AI-generated quotes using OpenAI’s API.
- Build a mobile version with React Native.
- Include a dark mode UI for better accessibility.
