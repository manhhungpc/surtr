#!/usr/bin/env node
import inquirer from "inquirer";
import { getDatabaseQuestions, getTemplateQuestion } from "./questions";
import { CliOptions } from "./interfaces/CliOptions";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";

// export class App{
// }
type Answers = {
    [key: string]: string;
};

function constructor() {
    prompt();
}

async function prompt() {
    const _dirname = path.dirname(fileURLToPath(import.meta.url));

    let answers: Answers = {};
    const templateQuestion = getTemplateQuestion(_dirname);
    const templateAnswer = await inquirer.prompt(templateQuestion);
    answers.projectName = templateAnswer.projectName;
    answers.template = templateAnswer.template;

    const dbQuestion = getDatabaseQuestions(_dirname, templateAnswer);
    const dbAnswer = await inquirer.prompt(dbQuestion);
    answers.db = dbAnswer.database;

    console.log(answers);
    const currDir = process.cwd();
    const options: CliOptions = {
        projectName: answers.projectName,
        tartgetPath: path.join(currDir, answers.projectName),
        templateName: answers.template,
        templatePath: path.join(_dirname, "templates", answers.db),
    };

    console.log(options);
    const project = createProject(options.tartgetPath);
    if (!project) return;
}

function createProject(projectPath: string) {
    if (fs.existsSync(projectPath)) {
        console.log(
            chalk.red(
                `Folder ${projectPath} already exists! Delete or use another name.`
            )
        );
        return false;
    }
    fs.mkdirSync(projectPath);

    return true;
}

constructor();
