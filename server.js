const http = require('http');
const fs = require('fs');
const PORT = 3000;
const filePath = './data.json';

// Helper functions to read and write data
function readData() {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading file:", err);
        return []; // Return an empty array if there is an error
    }
}

const writeData = (data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Error writing to file:", err);
    }
};

// Create server
const server = http.createServer((req, res) => {
    const { method, url } = req;

    // Handle /items endpoint
    if (url === '/items') {
        let items = readData();
        res.setHeader('Content-Type', 'application/json');

        if (method === 'GET') {
            // Return all items
            res.statusCode = 200;
            res.end(JSON.stringify(items));

        } else if (['POST', 'PUT', 'DELETE'].includes(method)) {
            let body = '';

            // Collect the body of the request
            req.on('data', chunk => {
                body += chunk.toString();
            });

            // Process the request once all data is received
            req.on('end', () => {
                try {
                    const item = JSON.parse(body);

                    // Ensure the ID exists and is valid for PUT and DELETE
                    if (!item.id && method !== 'POST') {
                        res.statusCode = 400;
                        res.end(JSON.stringify({ message: 'ID is required' }));
                        return;
                    }

                    if (method === 'POST') {
                        // Check for duplicate IDs
                        if (items.some(i => i.id === item.id)) {
                            res.statusCode = 400;
                            res.end(JSON.stringify({ message: 'Item with this ID already exists' }));
                        } else {
                            // Add new item
                            items.push(item);
                            writeData(items);
                            res.statusCode = 201; // Resource created
                            res.end(JSON.stringify(item));
                        }

                    } else if (method === 'PUT') {
                        // Update item if found
                        const itemId = Number(item.id); // Ensure the ID is treated as a number
                        const index = items.findIndex(i => i.id === itemId); // Compare IDs as numbers

                        if (index > -1) {
                            // Update the item with the new data
                            items[index] = { ...items[index], ...item }; // Merge existing and new data
                            writeData(items);
                            res.statusCode = 200;
                            res.end(JSON.stringify(items[index])); // Return updated item
                        } else {
                            res.statusCode = 404;
                            res.end(JSON.stringify({ message: 'Item not found' }));
                        }

                    } else if (method === 'DELETE') {
                        // Delete item if found
                        const itemId = Number(item.id); // Ensure the ID is treated as a number
                        const filteredItems = items.filter(i => i.id !== itemId); // Filter out the item

                        if (filteredItems.length === items.length) {
                            res.statusCode = 404;
                            res.end(JSON.stringify({ message: 'Item not found' }));
                        } else {
                            writeData(filteredItems);
                            res.statusCode = 200;
                            res.end(JSON.stringify({ message: 'Deleted successfully' }));
                        }
                    }
                } catch (err) {
                    res.statusCode = 400;
                    res.end(JSON.stringify({ message: 'Invalid JSON data' }));
                }
            });

        } else {
            // Method not allowed
            res.statusCode = 405;
            res.end(JSON.stringify({ message: 'Method not allowed' }));
        }

    } else {
        // If route is not found
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
