# Why Docker required - Docker is a way to package the application and its dependencies in a container. So, it is easy to deploy, run, and scale the application. It is like a zip file that contains the application and its dependencies.If not using it, we will have to install the backend server, database, etc. on the server where we want to run the application. And it is not easy to manage the dependencies, scaling, etc. 
# Other major benefit is it solves the version conflict issue. For example, if the application requires a specific version of the database, etc. and the server has a different version, then it will not work. But with Docker, we can package the application and its dependencies in a container. So, it will work on any server.

# VM vs Container - VM is a virtual machine that runs on the host machine. It has its own OS, memory, etc. So, it is heavy and takes time to start. On the other hand, the container is lightweight and shares the host machine's OS, memory, etc. In simple words, it has nothing to do with the kernel , OS ,etc.It just contains the application and its dependencies. So, it is fast and takes less time to start.

# Images vs containers - Image is the docker artifact consider it like zip file which knows which commands are required to run the application. 
# Now, when we run the image, it creates a container.So, one can create multiple containers from a single image.And the container is how we can run the application and see the web page.
# And the orchestration tool like Kubernetes, Docker Swarm, etc. can manage the containers traffic, scaling, etc using load balancer, etc.

#Now, the new problem is I agree we need to use Docker but how will I get Redis or Maven or some DB like SQL, MongoDB, etc. in my Docker container. Here comes conept of Docker Registry. Docker Registry is a place where we can find the images of the software like Redis, Maven, etc. So, we can use those images in our Dockerfile to create our image.And where to find the Docker Registry? Docker Hub is the most popular Docker Registry. So, we can find the images of the software like Redis, Maven, etc. on Docker Hub.
# From the same Docker Registry, we can find multiple images of same software.For example I need redis 6.0.17 , I will find the image for that particular version on Docker Hub.


# Useful Docker commands :-
# docker ps - list the running containers
# docker pull <image-name>:<tag> - pull the image from the Docker Registry
# docker run <image-name>:<tag> - run the image and create the container.If not found locally, it will pull the image from the Docker Registry.
# docker run --name <Name container> -d -p 8080:80 <image-name>:<tag> - run the image in the background(detach mode) and map the port 8080 of the host machine to the port 80 of the container.Standard is to use same port number for host and container.

# Base image - It is the image that we use as the base for our image. For example, if we want to create an image for our application, we can use the base image like Ubuntu, Alpine, etc.
# Basically if I want to run a Java application, I will use the base image as OpenJDK or Oracle JDK. If I want to run a Node.js application, I will use the base image as Node.js, etc. to have those dependecies pre-installed in the image.

# Use a specific Node.js version
FROM node:21.2.0-alpine

# Use Environment variables
ENV UPSTASH_REDIS_REST_URL=$UPSTASH_REDIS_REST_URL
ENV UPSTASH_REDIS_REST_TOKEN=$UPSTASH_REDIS_REST_TOKEN
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV PUSHER_APP_ID=$PUSHER_APP_ID
ENV NEXT_PUBLIC_PUSHER_KEY=$NEXT_PUBLIC_PUSHER_KEY
ENV PUSHER_SECRET=$PUSHER_SECRET
ENV PUSHER_CLUSTER=$PUSHER_CLUSTER
ENV NEXTAUTH_URL=$NEXTAUTH_URL

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port the app will run on
EXPOSE 3000

# Use production start command
CMD ["npm", "run", "start"]
