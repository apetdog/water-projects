import concurrently from 'concurrently';
import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import boxen from 'boxen';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import ora from 'ora';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Clear console
console.clear();

// Display Cool Banner with Slant font
const title = figlet.textSync('SMART WATER', {
    font: 'Slant',
    horizontalLayout: 'fitted',
    verticalLayout: 'default',
    width: 120,
    whitespaceBreak: true
});

console.log(gradient.pastel.multiline(title));
console.log(chalk.cyan.bold('                     🌊 全流域智慧水务监控系统 🌊\n'));

// Check Environment with Spinner
async function checkEnv() {
    const spinner = ora('正在检查运行环境...').start();
    
    try {
        execSync('node -v', { stdio: 'ignore' });
        spinner.text = 'Node.js 环境检查通过';
        spinner.succeed();
    } catch (e) {
        spinner.fail(chalk.red('未检测到 Node.js 环境'));
        console.log(chalk.yellow('请访问 https://nodejs.org/ 下载并安装 Node.js (推荐 v20+)'));
        process.exit(1);
    }

    const pnpmSpinner = ora('正在检查 pnpm...').start();
    try {
        execSync('pnpm -v', { stdio: 'ignore' });
        pnpmSpinner.text = 'pnpm 包管理器检查通过';
        pnpmSpinner.succeed();
    } catch (e) {
        pnpmSpinner.fail(chalk.red('未检测到 pnpm 包管理器'));
        console.log(chalk.yellow('本项目依赖 pnpm，请运行以下命令进行安装：'));
        console.log(chalk.green('\n    npm install -g pnpm\n'));
        process.exit(1);
    }
}

await checkEnv();

const projects = [
    {
        name: '数字孪生',
        dir: '01-digital-twin-park',
        command: 'cd 01-digital-twin-park && npm run dev',
        installCmd: 'npm install',
        prefixColor: 'green',
        desc: '数字孪生园区 (Vue3)',
        port: 9001,
        path: '/'
    },
    {
        name: '可视化大屏',
        dir: '01a-water-twin-screen',
        command: 'cd 01a-water-twin-screen && npm run dev',
        installCmd: 'npm install --legacy-peer-deps',
        prefixColor: 'blue',
        desc: '水利大屏 (React/嵌入模块)',
        port: 9002,
        path: '/water-twin-screen/'
    },
    {
        name: '管理后台',
        dir: '03-water-admin',
        command: 'cd 03-water-admin && pnpm run dev:antd',
        installCmd: 'pnpm install',
        prefixColor: 'magenta',
        desc: '综合水务管理系统 (Vben)',
        port: 9003,
        path: '/'
    },
    {
        name: 'IoT监控',
        dir: '04-iot-admin',
        command: 'cd 04-iot-admin && pnpm run dev:antd',
        installCmd: 'pnpm install',
        prefixColor: 'cyan',
        desc: '物联网设备监控中心 (Vben)',
        port: 9004,
        path: '/'
    }
];

// Check and Install Dependencies with Spinner
console.log(chalk.blue('\n🔍 检查项目依赖...'));

for (const p of projects) {
    const projectPath = path.join(__dirname, p.dir);
    const nodeModulesPath = path.join(projectPath, 'node_modules');
    const spinner = ora(`[${p.name}] 检查依赖...`).start();

    if (!existsSync(nodeModulesPath)) {
        spinner.color = 'yellow';
        spinner.text = `[${p.name}] 正在安装依赖 (可能需要几分钟)...`;
        
        try {
            // Use inherit for stdio so user can see install progress if they want, 
            // but for a cooler look we might want to hide it unless it fails.
            // Let's hide it to keep the "cool" spinner look, unless user wants verbose.
            // Actually, hiding install logs can be scary if it hangs. 
            // Let's compromise: show a note that it's installing.
            execSync(p.installCmd, { 
                cwd: projectPath, 
                stdio: 'ignore' // Hide verbose output to keep terminal clean and cool
            });
            spinner.succeed(`[${p.name}] 依赖安装完成`);
        } catch (e) {
            spinner.fail(`[${p.name}] 依赖安装失败`);
            console.error(e);
            process.exit(1);
        }
    } else {
        spinner.succeed(`[${p.name}] 依赖已就绪`);
    }
}

console.log(''); // Empty line

// System Info for Dashboard
const cpus = os.cpus();
const cpuModel = cpus.length > 0 ? cpus[0].model : 'Unknown CPU';
const memTotal = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
const platform = `${os.type()} ${os.release()} (${os.arch()})`;

const sysInfo = `
${chalk.gray('💻 系统信息:')}
${chalk.dim('├─')} CPU: ${chalk.white(cpuModel)}
${chalk.dim('├─')} MEM: ${chalk.white(memTotal)}
${chalk.dim('└─')} OS : ${chalk.white(platform)}
`;

// Build Dashboard Content
const projectList = projects.map(p => {
    const url = chalk.underline.blue(`http://localhost:${p.port}${p.path}`);
    const arrow = chalk.hex('#FFA500')('➜');
    return `${arrow} ${chalk.bold.white(p.name.padEnd(10))} ${chalk.gray(p.desc)}\n   ${chalk.dim('└─')} ${url}`;
}).join('\n\n');

const dashboardContent = `${projectList}\n\n${chalk.dim('─'.repeat(50))}\n${sysInfo}`;

const welcomeBox = boxen(dashboardContent, {
    padding: 1,
    margin: 1,
    borderStyle: 'round', // More modern rounded corners
    borderColor: 'cyan',
    backgroundColor: '#001e3c',
    title: '🚀 SMART WATER DASHBOARD',
    titleAlignment: 'center',
    float: 'left'
});

console.log(chalk.gray('正在启动所有子系统，请稍候...'));

const { result } = concurrently(
    projects.map(p => ({
        command: p.command,
        name: p.name,
        prefixColor: p.prefixColor
    })),
    {
        prefix: 'name',
        killOthers: ['failure', 'success'],
        restartTries: 3,
        cwd: __dirname,
    }
);

// Show dashboard after services start (delayed to ensure it appears after startup logs)
setTimeout(() => {
    console.log('\n'); // Add some spacing
    console.log(welcomeBox);
}, 12000); // 12 seconds delay

result.then(
    () => console.log(chalk.green('所有服务已停止。')),
    (err) => console.log(chalk.red('发生错误:'), err)
);
