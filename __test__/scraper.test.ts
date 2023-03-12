
const http = require('http');
const fs = require('fs')
import { Scraper, ChildSelector } from '../src/services/scraper.service'

describe("Testing Scraper functions", () => {
    const scraper = new Scraper()
    describe("getHTML", () => {

        it("should get HTML string from  URL passed ", () => {
            // Initialising a server to send HHTP request for testing
            const server = http.createServer((req: any, res: any) => {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.write("Working Scraper");
                res.end();
            })
            server.listen(4109)

            // Getting the HTML from the mock resource
            return scraper.getHTML('http://localhost:4109')
                .then(response => {
                    expect(response).toEqual("Working Scraper")
                    server.close()
                })
        })

        it('should return an error with invalid url', () => {
            // Initialising a server to send HHTP request for testing
            const server = http.createServer((req: any, res: any) => {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.write("Working Example");
                res.end();
            })
            server.listen(4109)
              // Getting the HTML from the mock resource
            return scraper.getHTML('http://local:4109')
                .catch(err => {
                    expect(err).toBeDefined();
                })

        })
    })

    describe("scrapeHTML", () => {
        it("should return JSON array of properties provided if correct HTML and parent and child selectors are provided", () => {
            const exampleHtml = "<!doctype html>\n<html>\n<head>\n    <title>Example Domain</title>\n\n    <meta charset=\"utf-8\" />\n    <meta http-equiv=\"Content-type\" content=\"text/html; charset=utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <style type=\"text/css\">\n    body {\n        background-color: #f0f0f2;\n        margin: 0;\n        padding: 0;\n        font-family: -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", \"Open Sans\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n        \n    }\n    div {\n        width: 600px;\n        margin: 5em auto;\n        padding: 2em;\n        background-color: #fdfdff;\n        border-radius: 0.5em;\n        box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.02);\n    }\n    a:link, a:visited {\n        color: #38488f;\n        text-decoration: none;\n    }\n    @media (max-width: 700px) {\n        div {\n            margin: 0 auto;\n            width: auto;\n        }\n    }\n    </style>    \n</head>\n\n<body>\n<div>\n    <h1>Example Domain</h1>\n    <p>This domain is for use in illustrative examples in documents. You may use this\n    domain in literature without prior coordination or asking for permission.</p>\n    <p><a href=\"https://www.iana.org/domains/example\">More information...</a></p>\n</div>\n</body>\n</html>\n"

            const parenSelector = "div"
            const childSeletors: ChildSelector[] = [{ property: "parent", selector: "h1" }, { property: "child", selector: "p" }]

            // Passing the variables to scrapeHtml to get the JSON response.
            const results = scraper.scrapeHTML(exampleHtml, parenSelector, childSeletors)
            expect(results).toBeInstanceOf(Array);
            expect(results.length).toBeGreaterThan(0);
            const firstProduct = results[0]
            expect(firstProduct).toHaveProperty('parent');

        })
    })

    describe('writeResultsToFile', () => {

        it('writes data to a results.json file', async () => {
            const data = { foo: 'bar' };
            await scraper.writeResultsToFile(data);

            // Check that file was written and contains expected data
            const fileContents = await fs.promises.readFile('results.json', 'utf8');
            const parsedData = JSON.parse(fileContents);
            expect(parsedData).toEqual(data)

            // Clean up test file
           // await fs.promises.unlink('results.json');
        });
    });
})