import inquirer from "inquirer";
import { getDatabaseQuestions, getTemplateQuestion } from "./questions.js";
import { CliOptions } from "./interfaces/CliOptions";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";

async function constructor() {
    detectCancel();
    const options: CliOptions | null = await prompt();
    if (options === null) return;

    createProjectContent(options.templatePath, options.tartgetPath);
    renameProject(options.projectName, options.tartgetPath);
    postProcess();
}

function detectCancel() {
    process.stdin.on("keypress", (_, key) => {
        if (key.name === "escape" || (key.ctrl && key.name === "c")) {
            console.log("...\n", chalk.red(`🔴 | Operation cancelled by user!`));
            process.exit(0);
        }
    });
}

async function prompt() {
    const _dirname = path.dirname(fileURLToPath(import.meta.url));

    const templateQuestion = getTemplateQuestion(_dirname);
    const templateAnswer = await inquirer.prompt(templateQuestion);

    const dbQuestion = getDatabaseQuestions(_dirname, templateAnswer);
    const dbAnswer = await inquirer.prompt(dbQuestion);

    const currDir = process.cwd();
    const options: CliOptions = {
        projectName: templateAnswer.projectName,
        language: templateAnswer.language,
        database: dbAnswer.database,
        tartgetPath: path.join(currDir, templateAnswer.projectName),
        templatePath: path.join(_dirname, "templates", templateAnswer.language, dbAnswer.database),
    };

    const project = createProjectFolder(options.tartgetPath);
    if (!project) return null;
    return options;
}

function createProjectFolder(projectPath: string) {
    if (fs.existsSync(projectPath)) {
        console.log(
            chalk.red(`❌ | Folder ${projectPath} already exists! Delete or use another name.`)
        );
        return false;
    }
    fs.mkdirSync(projectPath);

    return true;
}

function createProjectContent(sourcePath: string, tartgetPath: string) {
    const IGNORE_FILES = ["node_modules", ".env", "pnpm-lock.yaml"];
    const sourceFiles = fs.readdirSync(sourcePath);

    sourceFiles.map((file) => {
        const sourceFilePath = path.join(sourcePath, file);
        const fileStats = fs.statSync(sourceFilePath);

        //ignore files that should not copy
        if (IGNORE_FILES.includes(file)) return;

        if (fileStats.isFile()) {
            let fileData = fs.readFileSync(sourceFilePath, "utf-8");
            const targetFile = path.join(tartgetPath, file);
            // fs.writeFileSync(targetFile, fileData, "utf-8");
            fs.copyFileSync(sourceFilePath, targetFile);
        }

        if (fileStats.isDirectory()) {
            fs.mkdirSync(path.join(tartgetPath, file));
            createProjectContent(sourceFilePath, path.join(tartgetPath, file));
        }
    });
}

function renameProject(name: string, projectPath: string) {
    if (name === "." || name === "") return;

    const packageJson = path.join(projectPath, "package.json");

    const packageData = JSON.parse(fs.readFileSync(packageJson).toString());
    packageData.name = name;

    fs.writeFileSync(packageJson, JSON.stringify(packageData, null, 4));
}

function postProcess() {
    console.log(chalk.green(`🟢 | Created successfully!`));
    console.log(
        "To complete setup:\n",
        "  1: ",
        chalk.blue("npm install (or pnpm i, yarn i)\n"),
        "  2: ",
        chalk.blue(`config ${chalk.bold.cyanBright(".env")} file (see details in README.md)\n`),
        "  3: ",
        chalk.blue("npm run dev\n")
    );
    console.log("Now you can build your millions dollar app! Happy coding 😄");
}

export default constructor();
