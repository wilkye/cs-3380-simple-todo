import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPath = "todos.json";
let tasks = [];

function Task(text) {
    this.text = text;
    this.completed = false;
}

function createTask(text) {
    const task = new Task(text);
    tasks.push(task);
    console.log("Task Created.");
}

let removeTask = () => {
    if (tasks.length === 0) {
        console.log("No tasks to remove.");
        mainLoop();
        return;
    }

    displayTasks();

    inquirer.prompt([
        {
            type: "input",
            name: "number",
            message: "Enter the number of the task to remove:"
        }
    ]).then(answer => {
        removeTask(Number(answer.number));
        saveToJSON();
        mainLoop();
    });
};

let updateTask = () => {
    if (tasks.length === 0) {
        console.log("No tasks to check off.");
        mainLoop();
        return;
    }

    displayTasks();

    inquirer.prompt([
        {
            type: "input",
            name: "number",
            message: "Enter the number of the task you completed:"
        }
    ]).then(answer => {
        updateTask(Number(answer.number));
        saveToJSON();
        mainLoop();
    });
};

let saveToJSON = () => {
    const filePath = path.join(__dirname, jsonPath);
    const jsonData = JSON.stringify(tasks, null, 2);

    fs.writeFile(filePath, jsonData, 'utf-8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
    })
};

let readAndStore = () => {
    const filePath = path.join(__dirname, jsonPath);

    try {
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.log('No save found, starting with an empty list.');
        return [];
    }
};

let displayTasks = () => {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].completed === true) {
            console.log(`${i + 1}. [X] ${tasks[i].text}`);
        } else {
            console.log(`${i + 1}. [ ] ${tasks[i].text}`);
        }
    }
};

let addTaskPrompt = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "task",
            message: 'Enter a task (type "done" to finish):'
        }
    ]).then(answer => {
        if (answer.task.toLowerCase() === "done") {
            saveToJSON();
            mainLoop();
            return;
        }

        createTask(answer.task);
        addTaskPrompt();
    });
};

let mainLoop = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "Would you like to:",
            choices: [
                "View To Do List",
                "Add items to list",
                "Check off an item",
                "Remove an item",
                "Quit"
            ]
        }
    ]).then(answer => {
        switch (answer.choice) {
            case "View To Do List":
                displayTasks();
                mainLoop();
                break;

            case "Add items to list":
                addTaskPrompt();
                break;

            case "Check off an item":
                updateTask();
                break;

            case "Remove an item":
                removeTask();
                break;

            case "Quit":
                console.log("Thanks for playing! Data saved.");
                saveToJSON();
                break;
        }
    });
};

// createTask("test");
// createTask("better test");
tasks = readAndStore();
mainLoop();
// saveToJSON();