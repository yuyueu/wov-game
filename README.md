# World of Volvo Game

This repository contains the source code for a small game developed for the World of Volvo exhibition.

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Built With](#built-with)
- [Contributing](#contributing)
- [Authors](#authors)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Project Description

This game is a fun and interactive way to engage visitors at the World of Volvo exhibition. It's built using JavaScript.

## Features

* Interactive gameplay
* Engaging graphics
* Intuitive controls

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

Additional instructions for making the game ready for production (i.e at the exhibition) are also given below.

### Prerequisites

What things you need to install the software and how to install them:

It is highly recommended to use ``npm`` to install the following software. This will be explained in the Installation chapter.

* Latest version of [phaser.io](https://phaser.io/download)
* [Node.js and npm](https://nodejs.org/en/download/) (npm is included with Node.js)
* [Webpack](https://webpack.js.org/guides/installation/) - We use Webpack to bundle our JavaScript files.
* [Babel](https://babeljs.io/docs/en/babel-cli#install) - We use Babel to transpile our JavaScript code.


### Building the Project

This is a tutorial meant for developers who will develop the game. For installation purposes for the exhibition, see the Installation chapter.

1. **Clone the repository**: Use Git to clone the repository to your local machine:

    ```bash
    git clone https://github.com/RashadHashemi/wov-game.git
    ```

2. **Navigate into the cloned repository**: Use the `cd` command to navigate into the directory of the cloned repository:

    ```bash
    cd wov-game
    ```

3. **Install Node.js and npm**: If you haven't already, install Node.js and npm. Node.js is a JavaScript runtime that allows you to run JavaScript on your server or your computer. npm (Node Package Manager) is a tool that comes with Node.js and it allows you to install and manage Node.js packages. You can download them from [here](https://nodejs.org/en/download/).

4. **Install the dependencies**: Use npm to install the project dependencies. These are listed in the `package.json` file and they include the libraries and tools that the project needs to run and build:

    ```bash
    npm install
    ```

5. **Build the project**: Use the `npm run dev` command to build the project. This command runs the `dev` script defined in the `package.json` file, which uses Webpack to bundle the project files for development:

    ```bash
    npm run dev
    ```

6. **Start the game with a Webpack server**: To see the game in action, you need to serve the game files with a server. This project uses Webpack's development server, which can be started with the `npm start` command:

    ```bash
    npm start
    ```

    This command runs the `start` script defined in the `package.json` file, which starts the Webpack development server. Once the server is running, it will automatically open your default web browser and navigate to `http://localhost:8080` (or another port if 8080 is already in use), where you can see the game.

### Installation

1. **Download and Install Node.js and npm**: Node.js is a tool that lets you run JavaScript on your computer. npm (Node Package Manager) is a tool that comes with Node.js and it allows you to install and manage other tools that your project needs. You can download Node.js and npm from [here](https://nodejs.org/en/download/). Just choose the version that matches your operating system, download it, and follow the instructions to install it.

2. **Download the Project**: You need to download the project files. The project is hosted on GitHub [here](https://github.com/RashadHashemi/wov-game), there should be a green "Code" button. Click it, then click "Download ZIP". Once the download is complete, find the ZIP file in your downloads folder and extract it.

3. **Open a Terminal or Command Prompt**: You need to open a terminal (on Mac or Linux) or powershell prompt (on Windows). This is where you'll type the commands to install the project's tools and build the project. You can find the terminal or command prompt by searching for it in your computer's search bar.

4. **Navigate to the Project Directory**: In the terminal or command prompt, you need to navigate to the directory where you extracted the project files. You can do this by typing `cd ` (note the space), then dragging the folder from your file explorer into the terminal or command prompt window, and then pressing Enter.

It should look something like this: `cd C:\User\John\wov-game`

5. **Install the Project's Tools**: In the terminal or command prompt, type the following command and press Enter:

    ```bash
    npm install
    ```

    This command installs all the tools that the project needs to run and build. It might take a few minutes to complete.

6. **Build the Project for Production**: After the tools are installed, type the following command and press Enter:

    ```bash
    npm run build
    ```

    This command builds the project for production. It might take a few minutes to complete.

After running the `npm run build` command, the project is built and the output is placed in a folder named `dist` in the project directory. This `dist` folder contains the production-ready version of the project.

If you're setting up a server to serve the project, this `dist` folder is what you should link to. The server should be configured to serve the `index.html` file in the `dist` folder as the main entry point, and it should be able to serve any other files in the `dist` folder that `index.html` links to.

In other words, the `dist` folder contains the built project, and that's what you should use in a production environment.

## Built With

* JavaScript - The programming language used
* Phaser - The game framework used
* Webpack - Used to bundle the JavaScript files
* Babel - Used to transpile the JavaScript code

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. **Fork the Project**: Click the 'Fork' button at the top right of this page. This creates a copy of the project in your GitHub account that you can modify.

2. **Clone the Project**: Clone this repository to your local machine. This means that you download a copy of the code to your computer. You can do this by opening a terminal and running the command `git clone https://github.com/<your_username>/wov-game.git`, replacing `<your_username>` with your GitHub username.

3. **Create a New Branch**: In your terminal, navigate to the project directory and create a new branch for your feature or bug fix with the command `git checkout -b feature/YourFeatureName` or `git checkout -b bugfix/YourBugFixName`.

4. **Make Your Changes**: Make the changes to the code that you want to contribute. Try to make your changes clear and easy to understand.

5. **Commit Your Changes**: Save your changes by committing them. In your terminal, run the command `git commit -m 'Add some YourFeatureName'` or `git commit -m 'Fix some YourBugFixName'`.

6. **Push to the Branch**: Upload your changes to GitHub with the command `git push origin feature/YourFeatureName` or `git push origin bugfix/YourBugFixName`.


## Authors

* **Wilfred Maloney** - Initial work - [RashadHashemi](https://github.com/RashadHashemi)

## License

License to be added. Final release will be open source except for assets containing Volvo logos.

## Acknowledgments

* This is my first time programming in JavaScript and creating a game. Any feedback or contributions are greatly appreciated.