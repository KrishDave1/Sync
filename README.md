# Sync - Realtime Messaging Chat Application

## Introduction
Sync is a real-time messaging chat application designed for developers. It offers a seamless and responsive user experience with features like real-time messaging, friend requests, and Google authentication. The application is built using modern technologies such as TypeScript, Tailwind CSS, and Next.js, ensuring high performance and scalability.

## Website Link
[Sync Application](http://localhost:3000)

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Running the Project Without Docker](#running-the-project-without-docker)
  - [Running the Project with Docker](#running-the-project-with-docker)
  - [Running the Project Using Docker Hub Image](#running-the-project-using-docker-hub-image)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [Contact](#contact)
- [License](#license)

## Features

- Realtime messaging
- Adding friends and sending friend requests via email
- Performant database queries with Redis
- Responsive UI with complete mobile responsiveness built with TailwindCSS
- Protection of sensitive routes
- Google authentication using OAuth2.0

- Built with TypeScript, Tailwind CSS
- Icons from Lucide

- Class merging with tailwind-merge
- Conditional classes with clsx
- Variants with class-variance-authority

## Technologies Used
- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Node.js, Next.js API routes
- **Database**: Redis (Upstash)
- **Authentication**: NextAuth.js with Google OAuth2.0
- **Real-time Communication**: Pusher
- **Icons**: Lucide
- **Utilities**: clsx, tailwind-merge, class-variance-authority

## Installation

### Running the Project Without Docker

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/KrishDave1/Sync.git
   cd Sync
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

4. **Build and Start for Production**:
   ```bash
   npm run build
   npm start
   ```

### Running the Project with Docker

1. **Build the Docker Image** (if needed):
   ```bash
   docker build -t sync .
   ```

2. **Run the Docker Container**:
   ```bash
   docker run -p 3000:3000 --name sync-container sync
   ```

3. **Stop the Docker Container**:
   ```bash
   docker stop sync-container
   ```

4. **Remove the Docker Container** (optional):
   ```bash
   docker rm sync-container
   ```

### Running the Project Using Docker Hub Image

1. **Pull the Image from Docker Hub**:
   ```bash
   docker pull krishd01/sync
   ```

2. **Run the Container**:
   ```bash
   docker run -p 3000:3000 --name sync-container krishd01/sync
   ```

3. **Stop and Remove the Container**:
   ```bash
   docker stop sync-container
   docker rm sync-container
   ```

## Usage
1. **Sign In**: Use Google authentication to sign in.
2. **Add Friends**: Send friend requests via email.
3. **Chat**: Start real-time messaging with your friends.
4. **Responsive Design**: Use the application on any device with a responsive UI.

## Screenshots
![Login Page](screenshots/login.png)
![Dashboard](screenshots/dashboard.png)
![Chat](screenshots/chat.png)

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure that your code follows the project's coding standards and includes appropriate tests.

## Contact
If you have any feedback or questions, please reach out to me at krish.dave@iiitb.ac.in.

## License
This project is licensed under the MIT License.
