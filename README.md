Link to repository: https://github.com/YehonatanHayat/part3_server.git

Link to web repository: https://github.com/YehonatanHayat/part2.git

Link to android repository: https://github.com/mocharish/A.S_part2.git

This repository represents the FeedBook server which is the backend for our project, it connects between the client and the data base. It provides APIs for user authentication proccess,
manages friend connections and posts and more.

Running instructions:

1. Clone the repository and initialize the users and posts collections in your MongoDB with the Json files in the "db" folder in the main branch.

2. Create a 'env.local' file in the config folder and add the environment variables. For example:

   CONNECTION_STRING="mongodb://localhost:27017/Feedbook"
PORT=8080

4. Navigate to the project and install the dependencies using npm.

5. Start the server:  "npm start"







# Social Media Backend Project

This repository contains the backend code for a social media application, built with Node.js, Express, and MongoDB.

## Prerequisites

Before running the project, ensure the following are installed:
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB** (local or remote instance)

## Getting Started

### Clone and Install Dependencies

1. Clone the repository:

   ```bash
   git clone https://github.com/YehonatanHayat/FeedBook-server.git
   cd FeedBook-server
   ```

2. Install required packages:

   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=8080
CONNECTION_STRING=<your-mongo-db-connection-string>
NODE_ENV=development
```

Replace `<your-mongo-db-connection-string>` with your MongoDB URI.

### Running the Server

Start the server with:

```bash
npm start
```

By default, the server will run on `http://localhost:8080`.

## Project Structure

The project is organized as follows:

- **Controllers**: Handle the business logic and processing for each feature.
- **Routes**: Define the API endpoints and link them to their respective controllers.
- **Models**: Represent the database schema and handle data-related operations.
- **Services**: Provide reusable functions and utilities.

This separation ensures modularity and makes the code easier to maintain.

## Notes

- MongoDB must be running for the application to work.
- The `CONNECTION_STRING` in the `.env` file must point to a valid MongoDB instance.



6. Start the web according to the instructions given in the web repository.

Workflow: After reading and understanding the instructions of the project we came up with ideas of how to operate and then divided the tasks between us. We created a Jira accordingly.
Each one of us worked on parts of both the web and the server and merged the work through the git hub to stay on the same page. We both had our own branches.
We made sure to structure our code with the MCV structure.

