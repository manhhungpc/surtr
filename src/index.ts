import inquirer from "inquirer";
import { getToolsQuestions, getDatabaseQuestions, getTemplateQuestion } from "./questions.js";
import { CliOptions } from "./interfaces/CliOptions";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";

const IGNORE_FILES = ["node_modules", "dist", ".env", "pnpm-lock.yaml", "yarn.lock", "examples"];

async function constructor() {
    detectCancel();
    const options: CliOptions | null = await prompt();
    if (options === null) return;

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
    const template = await inquirer.prompt(templateQuestion);

    const dbQuestion = getDatabaseQuestions(_dirname, template);
    const db = await inquirer.prompt(dbQuestion);

    const toolQuestions = getToolsQuestions(_dirname, template);
    const { tools } = await inquirer.prompt(toolQuestions);

    let toolsDir = template.language === "TypeScript" ? "/tools-ts" : "/tools-js";

    const currDir = process.cwd();
    const options: CliOptions = {
        projectName: template.projectName,
        language: template.language,
        database: db.database,
        tartgetPath: path.join(currDir, template.projectName),
        templatePath: path.join(_dirname, "templates", template.language, db.database),
        tools: tools.map((tool: string) => path.join(_dirname, toolsDir, tool)),
    };

    const { confirm } = await inquirer.prompt({
        name: "confirm",
        message: `Your template configuration:\n
        ${chalk.yellow("Name: ")}${chalk.cyan(options.projectName)}\n
        ${chalk.yellow("Language: ")}${chalk.cyan(options.language)}\n
        ${chalk.yellow("Database: ")}${chalk.cyan(options.database)}\n
        ${chalk.yellow("Addition tools: ")}${chalk.cyan(tools.join(", "))}\n
        Continue? `.replace(/(\n)\s+/g, "$1"),
        type: "confirm",
        default: true,
    });
    if (confirm === false) {
        console.log(chalk.red(`🔴 | Operation cancelled!`));
        process.exit(0);
    }

    const project = createProjectFolder(options.tartgetPath);
    if (!project) return null;

    createFilesContent(options.templatePath, options.tartgetPath);

    options.tools?.map((source) => {
        copyToolFiles(source, options.tartgetPath);
    });

    return options;
}

function createProjectFolder(projectPath: string) {
    if (fs.existsSync(projectPath)) {
        console.log(
            chalk.red(`❌ | Folder ${projectPath} already exists! Delete or use another name.`),
        );
        return false;
    }
    fs.mkdirSync(projectPath);

    return true;
}

function createFilesContent(sourcePath: string, tartgetPath: string) {
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
            if (!fs.existsSync(path.join(tartgetPath, file))) {
                fs.mkdirSync(path.join(tartgetPath, file));
            }
            createFilesContent(sourceFilePath, path.join(tartgetPath, file));
        }
    });
}

function copyToolFiles(source: string, tartgetPath: string) {
    const sourceFiles = fs.readdirSync(source);

    sourceFiles.map((file) => {
        const sourceFilePath = path.join(source, file);
        const fileStats = fs.statSync(sourceFilePath);

        //ignore files that should not copy
        if (IGNORE_FILES.includes(file)) return;

        if (fileStats.isFile()) {
            const targetFile = path.join(tartgetPath, file);

            // add devDep and dependencies from tools/source file to target file
            if (file === "package.json") {
                const packageSource = path.join(source, "package.json");
                const packageSourceData = JSON.parse(fs.readFileSync(packageSource).toString());

                const packageTarget = path.join(tartgetPath, "package.json");
                const packageTargetData = JSON.parse(fs.readFileSync(packageTarget).toString());

                if (packageSourceData.dependencies) {
                    Object.entries(packageSourceData.dependencies).map(([key, value]) => {
                        packageTargetData.dependencies[key] = value;
                    });
                }

                if (packageSourceData.devDependencies) {
                    Object.entries(packageSourceData.devDependencies).map(([key, value]) => {
                        packageTargetData.devDependencies[key] = value;
                    });
                }
                fs.writeFileSync(packageTarget, JSON.stringify(packageTargetData, null, 4));
            } else if (file === ".env.example") {
                const envSourceData = fs.readFileSync(path.join(source, file));

                fs.appendFileSync(path.join(tartgetPath, ".env.example"), envSourceData);
            } else {
                fs.copyFileSync(sourceFilePath, targetFile);
            }
        }

        if (fileStats.isDirectory()) {
            if (!fs.existsSync(path.join(tartgetPath, file))) {
                fs.mkdirSync(path.join(tartgetPath, file));
            }
            createFilesContent(sourceFilePath, path.join(tartgetPath, file));
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
        chalk.blue("npm run dev\n"),
    );
    console.log("Now you can start building your millions dollar app! Happy coding 😄");
}

export default constructor();
