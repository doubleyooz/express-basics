import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Define the type for the messages object
type Messages = { [key: string]: string };

// Convert file URL to directory path
const __dirname = dirname(fileURLToPath(import.meta.url));

// Read and parse the JSON file
const messages: Messages = JSON.parse(
    fs.readFileSync(`${__dirname}/messages.json`, 'utf-8')
);

// Function to get a message by path
export const getMessage = (path: string): string | undefined => {
    return messages[path] || undefined;
};