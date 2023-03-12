
import express from 'express';
import { NODE_ENV, PORT } from './config';
import { Product } from './models/product.model';
import { ChildSelector, Scraper } from './services/scraper.service';

// Defining all constants to be supplied to the scraper app.
const URL: any = 'https://wltest.dns-systems.net/';
const PARENT_SELECTOR: string = '.pricing-table .package'
const CHILD_SELECTOR: ChildSelector[] = [
    { property: 'title', selector: '.header' },
    { property: 'price', selector: '.price-big' },
    { property: 'description', selector: '.package-description' },
    { property: 'discount', selector: '.package-price p' }]

class App {
    public app: express.Application;
    public env: string;
    public port: string | number;

    // Constructor init for the App class
    constructor() {
        this.app = express();
        this.env = NODE_ENV || 'development';
        this.port = PORT || 2001;
    }

    // Starting sever and listening to the port declared
    public startServer() {
        return this.app.listen(this.port, async () => {
            console.info(`=================================`);
            console.info(`======= ENV: ${this.env} =======`);
            console.info(`🚀 App listening on the port ${this.port}`);
            console.info(`================================now=`);
            await this.initialiseScrape();
        });
    }


    // Initialise to scrape the URl provdied based on the selectoes provided in the constants
    public async initialiseScrape() {

        try {
            const scraper = new Scraper();
            console.log("Strating to scrape the URL")
            // Getting the HTML from the URL
            const html = await scraper.getHTML(URL)
            console.log("URL downloaded and now scraping based on the selectors provided")
            // Scraping the HTML based on the selectors provided using the Scraper module
            const results: Product[] = scraper.scrapeHTML(html, PARENT_SELECTOR, CHILD_SELECTOR)
            console.log("Sorting the array based on the price descending")
            // Sort the products by annual price in descending order
            const sortedResults = results.sort((a, b) => +b.price.replace("£", "") - +a.price.replace("£", ""))

            // Writing the results to file
            await scraper.writeResultsToFile(sortedResults)
            console.log("Succesfully written to file. Please check 'results.json' under the root folder ")
        }
        catch (e) {
            console.log("Error scrapping URL")
        }


    }


}

export default App;
