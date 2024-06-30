# ExpressJS Project - Stage One Task Backend

[![StartEase](https://img.shields.io/badge/Generated%20by-StartEase-blue)](https://github.com/JC-Coder/startease)

## Overview

This project is a basic web server that exposes an API endpoint for the Stage One Task of the Backend Track. It provides information about the client's IP address, location, and current temperature.

## Features

-   Retrieves the client's IP address
-   Determines the client's location (city) based on their IP
-   Fetches the current temperature for the client's city
-   Responds with a personalized greeting including the visitor's name and temperature information

## API Endpoint

```
GET /api/hello?visitor_name=
```

### Example Response

```json
{
    "client_ip": "127.0.0.1",
    "location": "New York",
    "greeting": "Hello, Mark!, the temperature is 11 degrees Celsius in New York"
}
```

## Prerequisites

Before you begin, ensure you have the following installed:

-   Node.js and npm: Download and install from [nodejs.org](https://nodejs.org)

## Installation

1. Clone the repository
2. Install dependencies:
    ```bash
    npm install
    ```

## Configuration

1. Create a `.env` file in the project root directory
2. Add the following environment variables:
    ```
    APP_NAME=YourAppName
    APP_PORT=3000
    APP_ENV=development
    OPEN_WEATHER_API_KEY=your_api_key_here
    ```

Replace `YourAppName` and `your_api_key_here` with your actual project name and OpenWeather API key.

## Running the Project

Start the development server:

```bash
npm run dev
```

The server will be running at `http://localhost:3000`.

## Deployment

This project can be deployed to any free hosting platform that supports Node.js applications.

## Technologies Used

-   Express.js
-   Axios for API requests
-   GeoIP-lite for IP geo location
-   Winston for logging
