/*

Manually run this script to generate a single JSON file containing all credit card data (/data/credit-cards/all-card-data.json).

Usage: node ./js/generate-all-card-data.js

*/

const fs = require('fs');
const path = require('path');

// Root folder where all card JSONs are stored
const rootDir = path.join(__dirname, '..', 'data', 'credit-cards');

// Output file
const outputFile = path.join(rootDir, 'all-card-data.json');

function readAllJsonFiles(dir) {
    let results = [];
    const files = fs.readdirSync(dir, { withFileTypes: true });

    for (const file of files) {
        const fullPath = path.join(dir, file.name);

        if (file.isDirectory()) {
            // Recursively read subfolders
            results = results.concat(readAllJsonFiles(fullPath));
        } else if (file.isFile() && file.name.endsWith('.json')) {
            try {
                const content = fs.readFileSync(fullPath, 'utf-8');
                const json = JSON.parse(content);
                results.push(json);
            } catch (err) {
                console.error(`Error reading JSON file: ${fullPath}`, err);
            }
        }
    }

    return results;
}

// Generate the array
const allCards = readAllJsonFiles(rootDir);

// Sort by lastUpdateDate descending (optional)
allCards.sort((a, b) => b.lastUpdateDate - a.lastUpdateDate);

// Write to output file
fs.writeFileSync(outputFile, JSON.stringify(allCards, null, 2), 'utf-8');

console.log(`Generated ${outputFile} with ${allCards.length} cards.`);
