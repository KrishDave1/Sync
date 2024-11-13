# Sync - Realtime Messaging Chat Application

<p align="center">
	<!-- local repository, no metadata badges. --></p>
<p align="center">Built with the tools and technologies:</p>
<p align="center">
	<img src="https://img.shields.io/badge/npm-CB3837.svg?style=default&logo=npm&logoColor=white" alt="npm">
	<img src="https://img.shields.io/badge/PostCSS-DD3A0A.svg?style=default&logo=PostCSS&logoColor=white" alt="PostCSS">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=default&logo=JavaScript&logoColor=black" alt="JavaScript">
	<img src="https://img.shields.io/badge/sharp-99CC00.svg?style=default&logo=sharp&logoColor=white" alt="sharp">
	<img src="https://img.shields.io/badge/React-61DAFB.svg?style=default&logo=React&logoColor=black" alt="React">
	<img src="https://img.shields.io/badge/Docker-2496ED.svg?style=default&logo=Docker&logoColor=white" alt="Docker">
	<br>
	<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=default&logo=TypeScript&logoColor=white" alt="TypeScript">
	<img src="https://img.shields.io/badge/Zod-3E67B1.svg?style=default&logo=Zod&logoColor=white" alt="Zod">
	<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=default&logo=ESLint&logoColor=white" alt="ESLint">
	<img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=default&logo=Axios&logoColor=white" alt="Axios">
	<img src="https://img.shields.io/badge/Pusher-300D4F.svg?style=default&logo=Pusher&logoColor=white" alt="Pusher">
	<img src="https://img.shields.io/badge/datefns-770C56.svg?style=default&logo=date-fns&logoColor=white" alt="datefns">
</p>

<br />

## Introduction
Sync is a real-time messaging chat application designed for developers. It offers a seamless and responsive user experience with features like real-time messaging, friend requests, and Google authentication. The application is built using modern technologies such as TypeScript, Tailwind CSS, and Next.js, ensuring high performance and scalability.

## Website Link
[Sync Application](https://sync-gules.vercel.app/login)

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
- Protection of sensitive routes using middleware
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
