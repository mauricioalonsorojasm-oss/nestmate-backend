# 🏡 NestMate -- Backend API

NestMate is a backend API designed to support a flatmate and shared
housing platform. It provides authentication, user management, listings,
messaging, and favorites functionality for the NestMate frontend
application.

This API was built as part of the Ironhack Web Development Bootcamp
project.

------------------------------------------------------------------------

# 🚀 Live API

Production API: https://nestmate-server.vercel.app/api

Frontend: https://nestmate-app.vercel.app

------------------------------------------------------------------------

# 👩‍💻 Authors

Developed by:

-   Mauricio Rojas Morales
-   Maria Pol Pujol

Ironhack Web Development Bootcamp Project.

------------------------------------------------------------------------

# ✨ Features

-   JWT authentication
-   User profile management
-   Create, edit, and delete listings
-   Browse listings
-   Favorite listings
-   Messaging between users
-   Filter listings by city
-   Image upload via Cloudinary
-   Protected routes using authentication middleware

------------------------------------------------------------------------

# 🛠 Tech Stack

Backend:

-   Node.js
-   Express
-   MongoDB
-   Mongoose

Authentication:

-   JWT
-   bcrypt

Media Storage:

-   Cloudinary

Deployment:

-   Vercel

------------------------------------------------------------------------

# 📂 Project Structure

routes/ auth.routes.js users.routes.js listings.routes.js
messages.routes.js conversations.routes.js

models/ User.model.js Listing.model.js Message.model.js
Conversation.model.js

middlewares/ auth.middleware.js

config/ cloudinary.config.js

server.js app.js

------------------------------------------------------------------------

# ⚙️ Installation

Clone the repository:

git clone
https://github.com/mauricioalonsorojasm-oss/nestmate-backend.git

Move into the project folder:

cd nestmate-backend

Install dependencies:

npm install

Create a .env file:

PORT=5005 MONGODB_URI=your_mongodb_connection 
TOKEN_SECRET=your_secret
CLOUDINARY_NAME=your_cloudinary_name 
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret

Start the server:

npm run dev

Server runs on:

http://localhost:5005/api

------------------------------------------------------------------------

# 🔑 API Endpoints

Authentication

POST /auth/signup POST /auth/login GET /auth/verify

Users

GET /users/me GET /users/:id PUT /users/edit

Listings

GET /listings GET /listings/:id POST /listings PUT /listings/:id DELETE
/listings/:id

Favorites

POST /favorites/:listingId DELETE /favorites/:listingId GET /favorites

Conversations & Messages

GET /conversations POST /conversations

GET /messages/:conversationId POST /messages

------------------------------------------------------------------------

# 🔒 Authentication

Protected routes require a JWT token sent in the header:

Authorization: Bearer `<token>`{=html}

------------------------------------------------------------------------

# 🌱 Future Improvements

-   Real-time messaging with WebSockets
-   Notifications system
-   Pagination for listings
-   Rate limiting for API protection
-   Unit and integration tests

------------------------------------------------------------------------

# 📄 License

This project was developed for educational purposes during the Ironhack
Bootcamp.

