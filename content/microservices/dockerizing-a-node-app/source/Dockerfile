FROM node:latest
# node:<any version>

# The root of your application on the Docker machine.
WORKDIR /usr/src/app

# package.json and package-lock.json
COPY package*.json ./

# Node Package Manager comes preinstalled with this image.
RUN npm install

# Copy the rest of the files.

# Use CMD ["node", "index.js"] if you didn't add the start script.
CMD ["npm", "start"]