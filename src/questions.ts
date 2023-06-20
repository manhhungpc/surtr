import { readdirSync } from "fs";
import * as path from "path";
import { Questions } from "./interfaces/Questions";

// const _dirname = path.dirname(fileURLToPath(import.meta.url));

export const getTemplateQuestion = (_dirname: string) => {
    const langDir = readdirSync(path.join(_dirname, "templates"));
    const questions: Array<Questions> = [
        {
            name: "projectName",
            type: "input",
            message: "What your project name?",
        },
        {
            name: "language",
            type: "list",
            message: "What backend language would you like to use?",
            choices: langDir,
        },
    ];
    return questions;
};

export const getDatabaseQuestions = (_dirname: string, template: any) => {
    const dbChoice = readdirSync(path.join(_dirname + `/templates/${template.language}`));
    const questions: Array<Questions> = [
        {
            name: "database",
            type: "list",
            message: "What database would you like to use?",
            choices: dbChoice,
        },
    ];
    return questions;
};

export const getToolsQuestions = (_dirname: string, template: any) => {
    let toolChoices: string[] = [];
    if (template.language === "TypeScript") {
        toolChoices = readdirSync(path.join(_dirname + "/tools-ts"));
    } else {
        toolChoices = readdirSync(path.join(_dirname + "/tools-js"));
    }

    const questions: Array<Questions> = [
        {
            name: "tools",
            type: "checkbox",
            message: "Which tools/services do you want to includes?",
            choices: toolChoices,
        },
    ];
    return questions;
};
