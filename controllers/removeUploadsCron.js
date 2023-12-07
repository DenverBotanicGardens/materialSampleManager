const cron = require('node-cron');
const fs = require('fs');
const path = require('path');


// Define the schedule for deleting files (runs every day at midnight)
cron.schedule('0 0 * * *', () => {
    // Path to the directory where CSV files are stored
    const directory = 'resources/static/assets/uploads';

    // Read directory contents
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        // Filter CSV files based on your naming convention (if any)
        const csvFiles = files.filter(file => file.endsWith('.csv'));

        // Loop through the files and delete them
        csvFiles.forEach(file => {
            const filePath = path.join(directory, file);

            // Delete the file
            fs.unlink(filePath, err => {
                if (err) {
                    console.error(`Error deleting file ${filePath}:`, err);
                } else {
                    console.log(`Deleted file: ${filePath}`);
                }
            });
        });
    });
})

