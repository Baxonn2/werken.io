# Werken.io
Werken is a tool for managing schedules tasks for your APIs. It is designed to be a simple and easy
to use. 

## Getting Started
Clone the repository and install the dependencies:
```bash
npm install
```
Configure the database connection in a .env file. You can use the .env.example file as a template.
Then you can run the migrations by running the following command:
```bash
npm run migration:run
```
Now you can run the server by running the following command:
```bash
npm run start
```
Now you can send hook requests to the server. The server will then send the request to the 
specified URL.

## For Developers
This section is for developers who want to contribute to the project.

### Migrations
When you make changes to the models, you need to create a migration file. This can be done by 
running the following command:
```bash
npm run migration:generate migrations/$migration_name
```
This will create a migration file in the migrations folder. You can then run the migration by 
running the following command:
```bash
npm run migration:run
```