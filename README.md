# FoodFleet - React & Manifest Food App

This is a complete food delivery application built with React for the frontend and Manifest for the backend. It allows users to browse restaurants, view menus, and track their orders.

## Features

- **User Authentication**: Secure signup and login for customers.
- **Restaurant Browsing**: Publicly accessible list of restaurants with details.
- **Menu Viewing**: Each restaurant has a menu with items, descriptions, and prices.
- **Order Management**: Authenticated users can place and view their own orders.
- **Role-Based Access**: Clear separation between customer and admin roles.
- **Admin Panel**: A complete backend interface for managing all data (restaurants, users, orders) is available at `/admin`.

## Tech Stack

- **Backend**: Manifest (YAML-based schema, auto-generated API)
- **Frontend**: React, Vite
- **Styling**: Tailwind CSS
- **SDK**: `@mnfst/sdk` for all backend communication

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation & Running

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to `http://localhost:5173`.

## Demo Credentials

- **Customer**: `customer@manifest.build` / `password`
- **Admin**: `admin@manifest.build` / `admin` (access via the Admin Panel)
