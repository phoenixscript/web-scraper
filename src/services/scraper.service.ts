import axios from "axios";
import { ChildNode } from "domhandler";

const Cheerio = require("cheerio")
const fs = require('fs')

/*Defining the type for the child selector.
Selector is the selector as defined by Cheerior and P
Property is the property name to save the value of the selector.
*/

type ChildSelector = {
    property: string,
    selector: string
}

class Scraper {

    constructor() {
        console.log("Scraper Initialised")
    }
    /**
     * Get the HTML DOM from the URL
     * @date 12/03/2023 - 19:53:42
     *
     * @async
     * @param {string} url
     * @returns {HTML}
     */
    public getHTML = async (url: string) => {
        return axios.get(url)
            .then(response => response.data)
            .catch(err => {
                throw new Error("Error getting URL")
            })
    }


    /**
    * Function takes HTML DOM and uses Cheerio to convert into readable DOM and Parent Cheerio selector containing the repeated elemenets and the class names of the child elements.
     * @date 12/03/2023 - 21:34:16
     *
     * @param {*} htmlDom
     * @param {string} parentElement
     * @param {ChildSelector[]} childElements
     * @returns {{}}
     */
    public scrapeHTML = (htmlDom: string, parentElement: string, childElements: ChildSelector[]) => {
        try {
            const $ = Cheerio.load(htmlDom)
            let results: any[] = []
            $(parentElement).each((i: number, ele: ChildNode) => {
                const scrapeResult: any = {}
                childElements.forEach((childElement: ChildSelector) => {
                    scrapeResult[childElement.property] = $(ele).find(childElement.selector).text().trim()
                })
                results.push(scrapeResult)
            })
            return results
        }
        catch (e) {
            throw new Error("Unable to Scrape provided HTML")
        }

    }


    /**
     * Write data to file
     * @date 12/03/2023 - 20:24:08
     *
     * @param {any} data
     */
    public writeResultsToFile = (data: any) => {

        return fs.writeFile('results.json', JSON.stringify(data, null, 2), (err: any) => {
            if (err) {
                throw new Error("Error writing to file")
            }
        })

    }
}

export { Scraper, ChildSelector };