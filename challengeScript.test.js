import fs from 'fs';
import { exec } from 'child_process';
import { resolve } from 'path';

const scriptPath = resolve(__dirname, './challengeScript.js');
const testFilePath = resolve(__dirname, './public/files/test-text-1.txt');

const createTestFile = (content) => {
    fs.writeFileSync(testFilePath, content);
};

const cleanupTestFile = () => {
    fs.unlinkSync(testFilePath);
};

describe('Integration Tests for challengeSctipt.js', () => {
    beforeAll(() => {
        createTestFile('Check these URLs: other [bla www.first.com asdfasdf www.second.com truc] example [ https://www.gpp.io/ ] fg - match www.lipsum.com[www.google.com] [www.second.com]');
    });

    afterAll(() => {
        cleanupTestFile();
    });

    jest.setTimeout(120000);

    test('Should process URLs from a file input', (done) => {
        const process = exec(`node ${scriptPath} ${testFilePath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                done(error);
                return;
            }

            expect(stdout).toContain('https://www.gpp.io');
            expect(stdout).toContain('Headless CMS and 1st party data platform | Glide');
            expect(stdout).toContain('https://www.google.com');
            expect(stdout).toContain('Google');

            expect(stderr).toMatch('Request failed after two attempts! URL:');
            expect(stderr).toMatch('First attempt error message:  connect ETIMEDOUT');
            expect(stderr).toMatch('Second attempt error message:  connect ETIMEDOUT');

            done();
        });
    });
});
