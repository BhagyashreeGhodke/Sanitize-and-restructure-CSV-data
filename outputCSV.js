//program to create a output_data csv file

import fs from 'fs'

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

// Function to write CSV data to file
function writeCSV(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, 'utf8', (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

// Function to sanitize and restructure CSV data
async function sanitizeAndRestructureCSV(inputFilePath, outputFilePath) {
    try {
        // Read CSV data from input file
        const csvData = await readCSV(inputFilePath);

        // Split CSV data into lines and extract URL and description
        const rows = csvData.trim().split('\n').map(row => {
            const [url, description] = row.split(',');
            return [url.trim(), description ? description.trim() : ''];
        });

        // Initialize rows for each category
        let aiRows = ['', '', ''], phpRows = ['', '', ''], pythonRows = ['', '', ''];

        // Process each row and categorize based on URL content
        rows.forEach(row => {
            const [url, description] = row;
            if (url.includes('/ai')) {
                if (description.toLowerCase().includes('overview')) {
                    aiRows[0] = description;
                } else {
                    aiRows.push(description);
                }
            } else if (url.includes('/php')) {
                phpRows.push(description);
            } else if (url.includes('/python')) {
                if (description.toLowerCase().includes('overview')) {
                    pythonRows[0] = description;
                } else {
                    pythonRows.push(description);
                }
            }
        });

        // Generate output CSV data
        let outputCSV = 'URL,overview,campus,courses,scholarships,admission,placements,results\n';
        outputCSV += '"https://example.com/data/ai",';
        outputCSV += aiRows.join(',') + '\n';
        outputCSV += '"https://example.com/data/php",';
        outputCSV += phpRows.join(',') + '\n';
        outputCSV += '"https://example.com/data/python",';
        outputCSV += pythonRows.join(',') + '\n';

        // Write output CSV data to file
        await writeCSV(outputFilePath, outputCSV);

        console.log('Output CSV generated:', outputFilePath);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Define input and output file paths
const inputFilePath = 'input_data.csv';
const outputFilePath = 'output_data.csv';

// Call the function to sanitize and restructure CSV data
sanitizeAndRestructureCSV(inputFilePath, outputFilePath);
