# SecureAPI_UserAPI

This project is a part of SecureAPI, which provides a secure way to manage your API data.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm
- A PostgreSQL database

### Installation

1. **Generate a key pair**

   You will need a private and public key for the JWT. You can generate these keys using OpenSSL. The private key should be named `private.key` and the public key should be named `public.pem`.

2. **Configure the database connection**

   Edit the `.env` file in the root of the project to include your database connection information. It should look something like this:

   ```properties
   PRIVATE_KEY_PATH=./private.key
   PUBLIC_KEY_PATH=./public.pem
   DB_HOST=your_database_host
   DB_POST=your_database_port
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password

3. **Install dependencies and run the project**

Run the following commands in the project root directory:
   ```properties
   npm install
   npm run start
   ```

The API server should now be running at http://localhost:3000.

## Deployment on Kubernetes
If you want to run this project in a Kubernetes cluster, you can follow these steps:

Build the project and publish it to a private repository

Run the following command to build the project:
   ```properties
   npm run build
   ```

Then, publish the built project to your private repository.

Set up Kubernetes

Check out my Kubernetes repository for instructions on how to set up and configure Kubernetes to run this project.
