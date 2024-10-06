import axios from 'axios';
import crypto from 'crypto';

let errorMessages = [];
const titleRegex = /<title>(.*?)<\/title>/i;
const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

export const makeGetRequest = async (url) => {
    try {
        const resp = await axios.get(url);
        const titleMatch = resp.data?.match(titleRegex);
        const title = titleMatch ? titleMatch[1] : null;
        const emailsMatch = resp.data?.match(emailRegex);
        const email = emailsMatch ? emailsMatch[0] : null;
        const hashedEmail = email ? crypto.createHash('sha256').update(email + process.env.IM_SECRET).digest('hex') : null;
        const objectToLog = title ? email ? { url, title, email: hashedEmail } : { url, title } : { url };
        console.log(objectToLog);
        return true;
    } catch (err) {
        const errorMessage = err.message;
        errorMessages.push(errorMessage);
        return false;
    }
};

export const procesUrl = async (url) => {
    const firstAttempt = await makeGetRequest(url);
    if (!firstAttempt) {
        await new Promise(resolve => setTimeout(resolve, 60000));  
        const secondAttempt = await makeGetRequest(url);
        if (!secondAttempt) {
            console.error("Request failed after two attempts! URL: ", url, 
                "\nFirst attempt error message: ", errorMessages[0], 
                "\nSecond attempt error message: ", errorMessages[1]);
            errorMessages = [];
        }
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
};
