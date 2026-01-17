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
    console.log(tasks);
    // Add support for multiple tasks to be created at once
}

let removeTask = (index) => {
    const removedElement = tasks.splice(index - 1, 1);
    console.log(`Successfully removed ${removedElement[0].text}`);
    // Call main loop
}

let updateTask = (index) => {
    if (index < 1 || index > tasks.length) {
        console.log("Invalid task number.");
        return;
    }
    tasks[index - 1].completed = !tasks[index - 1].completed;
    console.log(`Updated completion status of task ${index}`);
};

let saveToJSON = () => {
    const filePath = path.join(__dirname, jsonPath);
    const jsonData = JSON.stringify(tasks, null, 2);

    fs.writeFile(filePath, jsonData, 'utf-8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log("File written successfully.");
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
}

let mainLoop = () => {
    const outputArray = ["\nWould you like to:",
        "(a) View To Do List",
        "(b) Add items to list",
        "(c) Check off an item",
        "(d) Remove an item",
        "(e) Quit",
        "Enter a, b, c or d to continue:\n"]

    for (let i = 0; i < outputArray.length; i++) {
        console.log(`${outputArray[i]}`);
    }
}

// createTask("test");
// createTask("better test");
tasks = readAndStore();
updateTask(2);
displayTasks();
// mainLoop();
// saveToJSON();