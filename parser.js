import { procesUrl } from './urlProcessor.js';

const squareBracketsRegex = /(?<!\\)\[(?:[^\[\]]|\\\[|\\\]|(?<!\\)\[[^\[\]]*(?:[^\[\]]|(?<!\\)\[[^\[\]]*\])*\])*\]/g;
const urlPattern = /www\.[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}/g;

export const checkForUrls = async (dataChunk) => {
    let match;
    let lastIndex = 0;
    let matchedUrls = [];

    while ((match = squareBracketsRegex.exec(dataChunk)) !== null) {
        const string = match[0];
        const urlsInMatch = string.match(urlPattern);
        const url = urlsInMatch ? `https://${urlsInMatch[urlsInMatch.length - 1]}` : null;
        if (url && !matchedUrls.includes(url)) {
            matchedUrls.push(url)
            await procesUrl(url);
        }
        lastIndex = match.index + match[0].length;
    }
    return lastIndex;
};
