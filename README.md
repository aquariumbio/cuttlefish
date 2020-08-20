# Aquarium Project Dashboard

The Aquarium Project Dashboard is a maintainable, easy to use, and extensible tool that enables an Aquarium user (researcher, lab manager) to track the progress of a project in an Aquarium instance, where a project is defined as a set of linked plans (complementary workflows) to be executed on given samples and may be linked to an experimental request. This tool will be integrated with Aquarium as possible. Different types of projects (e.g., protein design, strain construction) will utilize visualizations.

Although Aquarium has no internal representation of the expected project schedule, the dashboard will have such a representation and some ability of comparing expected and actual completion dates.

## Getting Started

### Launch React App

1. From the terminal, clone this repository to your local machine

   ```bash
   git clone https://github.com/klavinslab/project-dashboard.git
   ```

2. Within the local repository folder, install the necessary dependencies

   ```bash
   npm install` or `yarn
   ```

3. Within the same folder, start your local server

   ```bash
   npm run start` or `yarn start
   ```

4. Open your browser and navigate to `localhost:3000`

### Launch Node.js Backend

1. In another terminal instance, navigate to the root of 'backend' folder

   ```bash
   cd backend
   ```

2. Within this directory, start the local node.js server

   ```bash
   npm run start
   ```

### Built with Devias Material Kit Pro

- React
- Material-UI
- Redux
- DraftJS
- ChartJS
- PrismJS
- React Markdown
- React Full Calendar

##### Installing Devias Kit Pro

1. Unzip the zip file that you have downloaded from Material-Ui. Inside the zip file, you will find the the source file (exactly this demo project) (react-material-kit-pro-x.x.x-.zip) and design folder where you will find two more folders for figma and sketch source files.
2. Extract the contents of the zip file (react-material-kit-pro-x.x.x-.zip) into a folder that you will work within. For this documentation, we will refer that as "your work folder".
3. Open your machine console application (Terminal, Command Prompt etc.), navigate into your work folder and run the following command and wait for it to finish:

```bash
npm install
```

4. After the installation is complete write in the terminal

```bash
npm run start
```

5. Open your browser and navigate to `localhost:3000`
