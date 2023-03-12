# Node.js Web Scraper using Express and TypeScript

This is a console application that scrapes a sample website to retrieve information about the available products, such as the product title, description, price, and discount. The application then sorts the products by annual price, with the most expensive package first, and returns the data in console and also saves the data in a JSON file.

The details of the URL and the selectors are defined in the app.ts file under src folder. This can be replaced by the URL and selectors of any website to be scrapped.

The selectors are based on the API from Cheerio selectors. [Click here for reference](https://www.npmjs.com/package/cheerio)

Following are the constants used.

- URL : URL of the website that needs to be scrapped.
- PARENT_SELECTOR: This is the selector for the element that repeats across the HTML of the URL given.
- CHILD_SELECTOR: This is provided as a array of selectors of type ChildSelector that contains the property name for the selector and the selector for all elemebts under the parent selector that needs to be scrapped

For any questions or suggestions, please open a Github issue.

## Installation

To run the application, you need to have Node.js version 14 or greater and package manager npm or yarn installed on your machine. If you don't have them installed, you can download them from the official [Node.js website](https://nodejs.org/).

Once you have Node.js and npm installed, you can clone this repository and install the dependencies by running the following command in your terminal:
```bash
npm install
or
yarn install
```

## Usage

To start the application, you can run the following command in your terminal:

```bash
npm run start
or
yarn start

```


This will start the application and log its output to the console. The data about the products will be saved in a file named `results.json` in the `data` directory.

There are already tests defined using the Jest framework on the scraper module. To run the tests for the application, you can use the following command:

```bash
npm run test
or
yarn test

```

This will run the tests and output the results to the console.

## Dependencies

This application uses the following dependencies:

- [Express](https://www.npmjs.com/package/express): A web application framework for Node.js.
- [TypeScript](https://www.npmjs.com/package/typescript): A typed superset of JavaScript that compiles to plain JavaScript.
- [Axios](https://www.npmjs.com/package/axios): A Promise-based HTTP client for Node.js.
- [Cheerio](https://www.npmjs.com/package/cheerio): A fast, flexible, and lean implementation of core jQuery for the server.
- [fs](https://nodejs.org/api/fs.html): A Node.js module for interacting with the file system.


## Contributing

If you find any issues or have any suggestions for improving this application, feel free to open an issue or submit a pull request. We welcome contributions from everyone.

## License

This application is licensed under the [MIT License](LICENSE).


