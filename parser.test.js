import { checkForUrls } from './parser.js';
import { procesUrl, makeGetRequest } from './urlProcessor.js';

jest.mock('./urlProcessor.js', () => ({
    procesUrl: jest.fn(),
    makeGetRequest: jest.fn(),
}));

describe("checkForUrls", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Should call procesUrl for valid URLs inside square brackets", async () => {
        const dataChunk = `other [bla www.first.com asdfasdf www.second.com truc] example [ https://www.gpp.io/ ] fg - match www.lipsum.com[www.google.com] [www.second.com] multiple levels[ [www.google.com] www.youtube.com] multiple levels[ www.google.com [www.google.com] [www.ingemark.com]]`;

        makeGetRequest.mockResolvedValue(true);

        await checkForUrls(dataChunk);
      
        expect(procesUrl).toHaveBeenCalledWith('https://www.second.com');
        expect(procesUrl).toHaveBeenCalledWith('https://www.gpp.io');
        expect(procesUrl).toHaveBeenCalledWith('https://www.google.com');
        expect(procesUrl).toHaveBeenCalledWith('https://www.youtube.com');
        expect(procesUrl).toHaveBeenCalledWith('https://www.ingemark.com');
        expect(procesUrl).toHaveBeenCalledTimes(5);
    });

    it('Should handle failure in makeGetRequest', async () => {
        const dataChunk = "[www.example.com] [www.test.com]";
        
        makeGetRequest.mockResolvedValueOnce(false);
        makeGetRequest.mockResolvedValueOnce(false);
        
        await checkForUrls(dataChunk);

        expect(procesUrl).toHaveBeenCalledTimes(2);
    });

    it('Should return the last index after processing', async () => {
        const dataChunk = "Links: [www.example.com] and [www.test.com]";

        makeGetRequest.mockResolvedValue(true);
        
        const lastIndex = await checkForUrls(dataChunk);
        
        expect(lastIndex).toBe(dataChunk.length);
    });
});
