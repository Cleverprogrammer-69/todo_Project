import inquirer from "inquirer";

interface Todo {
  title: string;
  isCompleted: boolean;
  category: string;
  priority: string;
}

async function main() {
  const todos: Todo[] = [];
  let continueAdding = true;

  while (continueAdding) {
    const todo: Todo = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "Enter Todo here:",
      },
      {
        type: "confirm",
        name: "isCompleted",
        message: "Is todo completed?",
        default: false,
      },
      {
        type: "input",
        name: "category",
        message: "Enter todo category:",
      },
      {
        type: "list",
        name: "priority",
        choices: ["low", "medium", "high", "very-high"],
        message: "Select priority of todo:",
      },
    ]);

    todos.push(todo);

    const { exitOrContinue } = await inquirer.prompt([
      {
        type: "confirm",
        name: "exitOrContinue",
        message: "Do you want to add another todo?",
        default: true,
      },
    ]);

    if (!exitOrContinue) {
      continueAdding = false;
    }
  }

  console.log("Your Todos:");
  console.table(todos);

  let continueEditing = true;

  while (continueEditing) {
    const { editChoice } = await inquirer.prompt([
      {
        type: "list",
        name: "editChoice",
        message: "Do you want to edit the completion status of any todo?",
        choices: ["Yes", "No"],
      },
    ]);

    if (editChoice === "Yes") {
      const { todoToEdit } = await inquirer.prompt([
        {
          type: "list",
          name: "todoToEdit",
          message: "Which todo do you want to edit?",
          choices: todos.map((todo, index) => ({
            name: `${todo.title} (Completed: ${todo.isCompleted})`,
            value: index,
          })),
        },
      ]);

      const { newStatus } = await inquirer.prompt([
        {
          type: "confirm",
          name: "newStatus",
          message: "Is this todo completed now?",
          default: false,
        },
      ]);

      todos[todoToEdit].isCompleted = newStatus;

      console.log("Updated Todos:");
      console.table(todos);
    } else {
      continueEditing = false;
    }
  }

  console.log("Final Todos:");
  console.table(todos);
}

main();
