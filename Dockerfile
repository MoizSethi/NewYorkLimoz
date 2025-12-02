FROM node:18-alpine

# Create and set working directory
WORKDIR /app

# Install dependencies separately for caching
COPY package*.json ./
RUN npm install --force

# Copy the rest of the project
COPY . .

# Expose the Vite dev port
EXPOSE 5000

# Run Vite dev server
CMD ["npm", "start", "--", "--host"]
