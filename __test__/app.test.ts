import request from 'supertest';
import App from '../src/app';
const fs = require('fs')


describe('Testing Index', () => {
    let app: any;

    beforeAll(async () => {
        app = await new App().startServer();
    });

    afterAll(done => {
        app.close(done);
    });

    describe('When App is started', () => {
        it('it should list to default port 2001 when started', () => {

            expect(app.listen).toBeTruthy();
            expect(app.address().port).toEqual(2001);
        });

        // it('it should scrape the URL and save the results in results.json file', async () => {

        //     const fileContents = await fs.promises.readFile('results.json', 'utf8');
        //     const parsedData = JSON.parse(fileContents);

        //     expect(parsedData).toBeInstanceOf(Array);
        //     expect(parsedData.length).toBeGreaterThan(0);

        //     const firstProduct = parsedData[0];
        //     expect(firstProduct).toHaveProperty('title');
        //     expect(firstProduct).toHaveProperty('description');
        //     expect(firstProduct).toHaveProperty('price');
        //     expect(firstProduct).toHaveProperty('discount');

        // });
    });
});