# Fresh Notes

## TypeScript/React/Node/MongoDb

This project was primarily to practice Typescript and to further my experience with MondoDb and Node.
This is maybe the only project almost entirely based on a tutorial: this one by Florian Walthers. His form and standards look more solid to me than most, and I feel there's benefit to practice running through a project how it might be represented in the real-world.

Additionally, I was able to get some experience with:

- React-Bootstrap - For quick prototypes or simple jobs
- React-Hook-Form - as I was looking for alternates to Formik
- Express-Session-Cookies - This was my first project not using JWT Tokens

![Mobile view of Fresh Notes App](https://res.cloudinary.com/duysbh0j0/image/upload/v1716402219/kdp5ntbmfbrckrybg2yx.jpg)

## To-Do List plus

I actually wanted my own to-do list; but an upgrade, with:

- Color sensitivity to the urgency of the task

- Multi-user support on the DB for friends/family

- Light and Dark Mode though this may be re-implemented if I find a simpler path

- Legitimate auth and Typescript for longevity

- More specific dating may be included on an update if use necessitates

## To run on your own machine:

Prerequisites:

Node.js and npm (or yarn): Ensure you have Node.js and either npm (Node Package Manager) or yarn installed on your system. You can download them from the official websites:
Node.js: https://nodejs.org/en
npm (included with Node.js installation)
yarn: https://yarnpkg.com/
Git version control (optional): While not strictly necessary, having Git installed allows you to clone the project from GitHub and manage your local copy. You can download it from: https://git-scm.com/downloads
Steps:

Clone the Repository:

Open a terminal window.

Navigate to the directory where you want to clone the project.

Use the git clone command followed by the URL of your GitHub repository. For example:

Bash
git clone https://github.com/your-username/your-repo-name.git
Use code with caution.
content_copy
Replace your-username with your GitHub username and your-repo-name with the actual name of your repository.

Install Dependencies:

Navigate to the cloned project directory using cd your-repo-name.

Install the project's dependencies using either npm install or yarn install:

Bash

`npm install # or yarn install`

This command will download all the necessary packages listed in your project's package.json file.

Start the Development Server (Optional):

If your project has a development server script defined in package.json (usually named start), you can run it to launch the application locally:

Bash

`npm start  # or yarn start`

This will typically start a development server that allows you to see the application running in your browser (usually at http://localhost:3000 or a similar address).

Additional Notes:

Environment Variables: This project uses environment variables, you might need to set your own before running it.

Fork the Repository: Instead of cloning, you can fork the repository on GitHub to create your own copy. This allows you to make changes and contribute back to the original project.
Pull Updates: Periodically pull updates from the original repository to keep your local copy in sync with the latest changes.

## License

MIT License

Copyright 2024 John Fabiszewski

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
