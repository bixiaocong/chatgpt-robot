# Use the official Node.js 16 image.
FROM node:18.17.0

# Create and change to the app directory.
WORKDIR /app

# Copy the package.json and package-lock.json files.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application code.
COPY . .

# Build the application.
RUN npm run build

# Set the environment variable to use production mode.
ENV NODE_ENV production

# Expose the port that the app runs on.
EXPOSE 3000

# Start the application.
CMD ["npm", "start"]
