import inquirer from "inquirer";
import { getDatabaseQuestions, getTemplateQuestion } from "./questions.js";
import { CliOptions } from "./interfaces/CliOptions";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import { createInterface } from "readline";

async function constructor() {
    // detectCancel();
    const options: CliOptions | null = await prompt();
    if (options === null) return;

    createProjectContent(options.templatePath, options.tartgetPath);
    renameProject(options.projectName, options.tartgetPath);
    postProcess();
}

function detectCancel() {
    if (process.platform === "win32") {
        let rl = createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.on("SIGINT", () => {
            process.emit("SIGINT");
        });
    }

    // https://stackoverflow.com/questions/39255593/how-to-mock-readline-onsigint
    process.on("SIGINT", () => {
        //graceful shutdown
        console.log("...\n", chalk.red(`🔴 | Operation cancelled by user!`));
        process.exit(0);
    });
}

async function prompt() {
    const _dirname = path.dirname(fileURLToPath(import.meta.url));
    // const _dirname = __dirname;

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
        templatePath: path.join(
            _dirname,
            "templates",
            templateAnswer.language,
            dbAnswer.database
        ),
    };

    const project = createProjectFolder(options.tartgetPath);
    if (!project) return null;
    return options;
}

function createProjectFolder(projectPath: string) {
    if (fs.existsSync(projectPath)) {
        console.log(
            chalk.red(
                `❌ | Folder ${projectPath} already exists! Delete or use another name.`
            )
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
    console.log(
        chalk.green(
            `🟢 | Template created successfully! Read README.md to complete the setup`
        )
    );
}

export default constructor();
