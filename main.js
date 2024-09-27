const fs = require('fs');

// Step 1: Read the JSON Input
function readInput(filePath) {
    const data = fs.readFileSync(filePath, 'utf8'); // Ensure UTF-8 encoding
    return JSON.parse(data);
}

// Step 2: Decode the Base Values
function decodeValue(base, value) {
    return parseInt(value, parseInt(base));
}

function extractAndDecode(input) {
    const points = [];
    const keys = Object.keys(input).filter(key => !isNaN(key)); // Only numeric keys
    
    for (const key of keys) {
        const base = input[key].base;
        const value = input[key].value;
        const decodedY = decodeValue(base, value);
        points.push({ x: parseInt(key), y: decodedY });
    }
    return points;
}

// Step 3: Lagrange Interpolation
function lagrangeInterpolation(points, x) {
    let total = 0;
    const n = points.length;

    for (let i = 0; i < n; i++) {
        let term = points[i].y;
        for (let j = 0; j < n; j++) {
            if (j !== i) {
                term *= (x - points[j].x) / (points[i].x - points[j].x);
            }
        }
        total += term;
    }
    return total;
}

// Step 4: Find the Constant Term
function findConstantTerm(points) {
    return lagrangeInterpolation(points, 0); // Evaluate at x = 0
}

// Main Function
function main() {
    try {
        const input = readInput('input.json');
        console.log("Input Data:", input); // Debug log

        const points = extractAndDecode(input);
        console.log("Decoded Points:", points); // Debug log

        const c = findConstantTerm(points);
        console.log(`The constant term c is: ${c.toFixed(1)}`); // Format to one decimal point
    } catch (error) {
        console.error("Error:", error.message);
    }
}

main();
