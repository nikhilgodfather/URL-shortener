# URL Shortener Web App

Welcome to the **URL Shortener Web App**! This project is a simple yet powerful web application that allows users to shorten URLs, track clicks, scans, and even edit or manage URLs.

## Features

- **URL Shortening**: Quickly shorten long URLs.
- **URL Management**: Users can edit, delete, and manage the shortened URLs.
- **Click Tracking**: Track the number of times the shortened URL has been clicked.
- **QR Code Generation**: Generate QR codes for shortened URLs.
- **QR Code Tracking**: Track how many times the QR code has been scanned.
- **User-Friendly Interface**: Simple and intuitive interface for managing shortened URLs.
  
---

## Table of Contents

1. [Screenshots](#screenshots)
2. [Installation](#installation)
3. [Usage](#usage)
4. [API Endpoints](#api-endpoints)
5. [Technologies Used](#technologies-used)
6. [Contributing](#contributing)
7. [Acknowledgements](#acknowledgements)
8. [License](#license)

---

## Screenshots

### 1. Dashboard Overview
![Dashboard](path/to/dashboard-image.png)

### 2. URL Shortening Page
![Shorten URL](path/to/shorten-url-image.png)

### 3. QR Code Generation
![QR Code](path/to/qr-code-image.png)

### 4. URL Click and Scan Tracking
![Tracking](path/to/tracking-image.png)

---

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/nikhilgodfather/URL-shortener.git
    ```

2. Navigate to the project directory:
    ```bash
    cd URL-shortener
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Create an `.env` file in the root of your project and add necessary environment variables such as MongoDB connection string and port.

5. Run the application:
    ```bash
    npm start
    ```

6. The app will be available on `http://localhost:3000`.

---

## Usage

### Shorten a URL
1. Enter the long URL in the input field and click the "Shorten URL" button.
2. The app generates a shortened URL and displays it with options for tracking, editing, or deleting.

### Track URL Clicks and Scans
- The dashboard will show the total number of clicks and QR code scans for each shortened URL.

### Edit URL
- Edit the original URL or shortened URL directly from the dashboard by clicking the edit button.

---

## API Endpoints

### POST /api/shorten
- Shorten a new URL.

### GET /api/urls
- Retrieve all shortened URLs with tracking information.

### PUT /api/edit/:id
- Edit an existing shortened URL by ID.

### DELETE /api/delete/:id
- Delete a shortened URL by ID.

---

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **QR Code Generation**: `qrcode` package
- **Tracking**: Custom click and scan tracking logic

---

## Contributing

Contributions are welcome! Please fork the repository and create a pull request to suggest improvements.

---

## Acknowledgements

Special thanks to the following resources and contributors for making this project possible:

- [QR Code Generator - qrcode](https://www.npmjs.com/package/qrcode)
- [MongoDB](https://www.mongodb.com)
- [Express.js](https://expressjs.com)

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
