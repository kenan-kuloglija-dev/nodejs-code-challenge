import fs from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';
import { checkForUrls } from './parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = process.argv[2];

const processStream = async (stream) => {
    let dataChunk = '';
    for await (const chunk of stream) {
        dataChunk += chunk;
        const lastIndex = await checkForUrls(dataChunk);
        dataChunk = dataChunk.substring(lastIndex);
    }
    await checkForUrls(dataChunk);
};

try {
    if (filePath) {
        const fullPath = resolve(__dirname, filePath);
        const readStream = fs.createReadStream(fullPath, { encoding: 'utf-8', highWaterMark: 8 * 1024 });
        readStream.on('error', (error) => {
            console.error(`Error reading file: ${error.message}`);
            process.exit(1);
        });
        processStream(readStream);
    } else {
        const inputStream = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false,
        });
        inputStream.on('line', async (line) => {
            await checkForUrls(line);
        });

        inputStream.on('close', () => {
            process.exit(0);
        });

        process.on('SIGINT', () => {
            console.log('Script interrupted. Exiting...');
            process.exit(0);
        });
    }
} catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
}