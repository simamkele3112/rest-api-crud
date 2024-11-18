Simple Item Management API
This is a basic Node.js HTTP server that implements a RESTful API to manage a list of items. The server can perform the following CRUD operations on a collection of items stored in a data.json file:

GET: Retrieve all items.
POST: Add a new item.
PUT: Update an existing item by its id.
DELETE: Remove an item by its id.
The items are stored in a JSON file (data.json) on the server's filesystem.

🚀 Features
GET /items: Retrieve all items in the list.
POST /items: Add a new item to the list. The item must have a unique id.
PUT /items: Update an existing item by providing its id.
DELETE /items: Delete an item by its id.
The server validates all input data and ensures proper handling of invalid or missing IDs.

📂 Project Structure
server.js: The main file that creates the HTTP server and handles routing logic for CRUD operations.
data.json: The JSON file where the list of items is stored. This file is read and written to when performing CRUD operations.
💻 Getting Started
Requirements
Node.js (preferably the latest LTS version)
Basic knowledge of HTTP requests and JSON data
Installation
Clone or download the repository:

You can clone the project via Git or download it directly.

bash
Copy code
git clone https://github.com/your-username/simple-item-management-api.git
cd simple-item-management-api
Install dependencies:

This project doesn't require any external dependencies beyond the built-in Node.js modules, so there are no additional packages to install.

Run the server:

To start the server, run the following command in the project directory:

bash
Copy code
node server.js
The server will start listening on port 3000.

You should see the following message:

arduino
Copy code
Server running on port 3000
Test the API:

You can test the API using tools like Postman or by making HTTP requests from the command line using curl.

📡 API Endpoints
1. GET /items - Retrieve all items
URL: http://localhost:3000/items
Method: GET
Response: A list of all items in JSON format.
Example Response:
json
Copy code
[
  {
    "id": 1,
    "name": "Item 1",
    "description": "Description of Item 1"
  },
  {
    "id": 2,
    "name": "Item 2",
    "description": "Description of Item 2"
  }
]
2. POST /items - Add a new item
URL: http://localhost:3000/items
Method: POST
Request Body: JSON object containing the item data (must include a unique id).
Example Request:
json
Copy code
{
  "id": 3,
  "name": "Item 3",
  "description": "Description of Item 3"
}
Response: The newly added item.
Example Response:
json
Copy code
{
  "id": 3,
  "name": "Item 3",
  "description": "Description of Item 3"
}
3. PUT /items - Update an existing item
URL: http://localhost:3000/items
Method: PUT
Request Body: JSON object with the id and the fields to update.
Example Request:
json
Copy code
{
  "id": 3,
  "name": "Updated Item 3",
  "description": "Updated description"
}
Response: The updated item.
Example Response:
json
Copy code
{
  "id": 3,
  "name": "Updated Item 3",
  "description": "Updated description"
}
4. DELETE /items - Delete an item
URL: http://localhost:3000/items
Method: DELETE
Request Body: JSON object containing the id of the item to delete.
Example Request:
json
Copy code
{
  "id": 3
}
Response: A success message.
Example Response:
json
Copy code
{
  "message": "Deleted successfully"
}
⚠️ Error Handling
The API provides meaningful error messages for invalid requests:

Missing id: If a POST, PUT, or DELETE request is made without an id, the API will respond with a 400 status code and an error message.
Item Not Found: If an item with the specified id cannot be found for PUT or DELETE, the API will return a 404 status code and an error message.
Invalid JSON: If the request body contains invalid JSON, the API will respond with a 400 status code and an error message.
