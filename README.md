# Sync - Realtime messaging chat application

## Features

- Realtime messaging
- Adding friends and sending friend requests via email
- Performant database queries with Redis
- Responsive UI with complete mobile responsiveness built with TailwindCSS
- Protection of sensitive routes
- Google authentication using OAuth2.0

- Built with TypeScript
- TailwindCSS
- Icons from Lucide

- Class merging with tailwind-merge
- Conditional classes with clsx
- Variants with class-variance-authority

## Getting Started

### **Running the Project Without Docker**

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

### **Running the Project with Docker**

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

### **Running the Project Using Docker Hub Image**

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

### **Docker Hub Link**
- [Docker Hub Image - krishd01/sync](https://hub.docker.com/r/krishd01/sync)

## Acknowledgements

- [UI Components](https://ui.shadcn.com/)
- [Redis Database](https://upstash.com/)

## Feedback

If you have any feedback, please reach out to me at krish.dave@iiitb.ac.in
