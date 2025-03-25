# Task Management Application

## Overview

A full-stack Task Management application built using the MERN stack (MongoDB, Express, React, Node.js).

## Features

- Create new tasks
- View all tasks
- Mark tasks as completed
- Delete tasks

## Live Application

Task Management Application (https://task-management-orcin-six.vercel.app/)
Server (https://task-management-server-s336.onrender.com/)

## Prerequisites

- Node.js
- MongoDB
- npm

## Backend Setup

1. Navigate to backend directory
2. Install dependencies: `npm install`
3. Create a `.env` file with `MONGODB_URI` and `PORT`
4. Run server: `npm start`

## Frontend Setup

1. Navigate to frontend directory
2. Install dependencies: `npm install`
3. Run application: `npm run dev`

## Tech Stack

- MongoDB: Database
- Express.js: Backend framework
- React: Frontend library
- Node.js: Runtime environment

## API Endpoints

- `GET /api/tasks`: Retrieve all tasks
- `POST /api/tasks`: Create a new task
- `PUT /api/tasks/:id`: Update a task
- `DELETE /api/tasks/:id`: Delete a task
