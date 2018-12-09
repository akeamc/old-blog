---
title: Dockerizing a Node.js application
description: In this guide, you will learn how to make a simple Node.js RESTful application and dockerize it. There are hundreds of guides just like this one out there. Thank you for choosing this one!
author: thepiconerd
date_posted: 2018-12-08
tags:
  - Guide
  - JavaScript
  - Docker
---

Source code available [here](https://github.com/ThePicoNerd/Blog/tree/master/content/microservices/dockerizing-a-node-app/source).

## Writing the application

If you're just trying Docker out and don't have an application, write a simple [Express.js](https://npmjs.com/package/express) RESTful application:

```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello 🌍\n");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
}); // Remember the port number!
```

Install Express with `npm install express --save` and add a start script to `package.json` if you want to.

```json
{
  "name": "dockerized-node-app",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node ."
  },
  "keywords": [],
  "author": "thepiconerd",
  "license": "ISC",
  "dependencies": {
    "express": "^4.16.4"
  }
}
```

Your project tree should look something like this:

```sh
$ tree
.
├── index.js
├── node_modules
│   ├── ...
│   └── express
│       └── ...
├── package-lock.json
└── package.json

67 directories, 305 files
```

Now that your Node.js application is done, test it! Run `node index.js`, or `npm start` if you added the start script. Check if your application is working by visiting [localhost:3000](http://localhost:3000/) in your browser or with [cURL](https://curl.haxx.se/):

```sh
$ curl -X GET http://localhost:3000/
Hello 🌍
```

If you have done everything correctly, you should be greeted with `Hello 🌍`.

## Dockerizing 🐋

First, create a file named `Dockerfile` in the root of your project. Add the following code:

```Dockerfile
FROM node:latest
# node:<any version>

# The root of your application on the Docker machine.
WORKDIR /usr/src/app

# package.json and package-lock.json
COPY package*.json ./

# Node Package Manager comes preinstalled with this image.
RUN npm install

# Copy the rest of the files.
COPY . .

# Use CMD ["node", "index.js"] if you didn't add the start script.
CMD ["npm", "start"]
```

The reason that you don't want to run `COPY . .` right off is because of the way that Docker treats changes. By default, Docker only re-runs the commands that have a difference from the previous, i.e. if you edit `package.json` or any other file in the project. By copying the rest of the files *after* `package.json`, Docker only reinstalls the packages if `package.json` changes: Not every time that you change `index.js`, for example.

Before building the image, we need to make sure that the `node_modules` directory is omitted when building. We can do this by creating another file, `.dockerignore`. If you have ever used Git, you will feel like home. Docker ignores all of the files and directories that are listed here. If you for example want Docker to ignore `build.js` and `node_modules` when building, simply add them to `.dockerignore`:

```.dockerignore
build.js
node_modules
```

This time, you want Docker to only ignore `node_modules` to make sure that the packages are up-to-date.

```.dockerignore
node_modules
```

The file structure should be like this:

```sh
$ tree
.
├── Dockerfile
├── index.js
├── node_modules
|   └── ...
├── package-lock.json
└── package.json

67 directories, 307 files
```

You are ready to build and run your application! Yay! 😆

```sh
$ docker build -t my-node-app .
# The "." supposes that you are in the same directory as your Dockerfile.

$ docker run -p 5000:3000 -d my-node-app
# The -p flag specifies a port forwarding rule ($EXTERNAL_PORT:$INTERNAL_PORT).
# -d means detached mode.
```

Your application should be running now, test it with cURL!

```sh
$ curl -X GET http://localhost:5000/
Hello 🌍
```

Congratulations! You have successfully coded and dockerized a simple Node.js application.
