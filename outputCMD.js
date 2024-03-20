// program to print required output on the terminal

import fs from 'fs';

// Function to read CSV data from file
function readCSV(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}

// Function to sanitize and restructure CSV data
async function sanitizeAndRestructureCSV(inputFilePath) {
    try {
        // Read CSV data from input file
        const csvData = await readCSV(inputFilePath);

        // Split CSV data into lines and extract URL and description
        const rows = csvData.trim().split('\n').map(row => {
            const [url, description] = row.split(',');
            return [url.trim(), description ? description.trim() : ''];
        });

        // Initialize rows for each category
        let aiRows = [], phpRows = [], pythonRows = [];

        // Process each row and categorize based on URL content
        rows.forEach(row => {
            const [url, description] = row;
            if (url.includes('/ai')) {
                aiRows.push(description);
            } else if (url.includes('/php')) {
                phpRows.push(description);
            } else if (url.includes('/python')) {
                pythonRows.push(description);
            }
        });

        // Prepare the 2D array with 8 columns and 3 rows
        const output = [
            ['URL', 'overview', 'campus', 'courses', 'scholarships', 'admission', 'placements', 'results'],
            ['https://example.com/data/ai', ...aiRows],
            ['https://example.com/data/php', ...phpRows],
            ['https://example.com/data/python', ...pythonRows]
        ];

        // Print the output in table format
        output.forEach(row => {
            console.log(row.join('\t'));
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// Define input file path
const inputFilePath = 'input_data.csv';

// Call the function to sanitize and restructure CSV data
sanitizeAndRestructureCSV(inputFilePath);
