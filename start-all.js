import concurrently from 'concurrently';
import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import boxen from 'boxen';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Clear console
console.clear();

// Check Environment
function checkEnv() {
    try {
        execSync('node -v', { stdio: 'ignore' });
    } catch (e) {
        console.log(boxen(chalk.red.bold('❌ 未检测到 Node.js 环境'), {
            padding: 1,
            margin: 1,
            borderStyle: 'double',
            borderColor: 'red'
        }));
        console.log(chalk.yellow('请访问 https://nodejs.org/ 下载并安装 Node.js (推荐 v20+)'));
        process.exit(1);
    }

    try {
        execSync('pnpm -v', { stdio: 'ignore' });
    } catch (e) {
        console.log(boxen(chalk.red.bold('❌ 未检测到 pnpm 包管理器'), {
            padding: 1,
            margin: 1,
            borderStyle: 'double',
            borderColor: 'red'
        }));
        console.log(chalk.yellow('本项目依赖 pnpm，请运行以下命令进行安装：'));
        console.log(chalk.green('\n    npm install -g pnpm\n'));
        process.exit(1);
    }
}

checkEnv();

// Display Cool Banner
const title = figlet.textSync('SMART  WATER', {
    font: 'Standard',
    horizontalLayout: 'fitted',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true
});

console.log(gradient.cristal.multiline(title));
console.log(chalk.cyan.bold('                     🌊 全流域智慧水务监控系统 🌊\n'));

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

// Check and Install Dependencies
console.log(chalk.blue('🔍 检查依赖包安装情况...'));
projects.forEach(p => {
    const projectPath = path.join(__dirname, p.dir);
    const nodeModulesPath = path.join(projectPath, 'node_modules');

    if (!existsSync(nodeModulesPath)) {
        console.log(chalk.yellow(`📦 [${p.name}] 未发现依赖包，正在自动安装...`));
        console.log(chalk.gray(`   执行命令: ${p.installCmd}`));
        
        try {
            execSync(p.installCmd, { 
                cwd: projectPath, 
                stdio: 'inherit' 
            });
            console.log(chalk.green(`✅ [${p.name}] 依赖安装完成`));
        } catch (e) {
            console.log(chalk.red(`❌ [${p.name}] 依赖安装失败`));
            console.error(e);
            process.exit(1);
        }
    } else {
        console.log(chalk.green(`✅ [${p.name}] 依赖已安装`));
    }
});
console.log(''); // Empty line

// Build Dashboard Content
const dashboard = projects.map(p => {
    const status = chalk.green('● 运行中');
    const url = chalk.underline.blue(`http://localhost:${p.port}${p.path}`);
    const arrow = chalk.hex('#FFA500')('➜');
    return `${arrow} ${chalk.bold.white(p.name.padEnd(10))} ${chalk.gray(p.desc)}\n   ${chalk.dim('└─')} ${url}`;
}).join('\n\n');

const welcomeBox = boxen(dashboard, {
    padding: 1,
    margin: 1,
    borderStyle: 'double',
    borderColor: 'cyan',
    backgroundColor: '#001e3c',
    title: '🚀 系统仪表盘',
    titleAlignment: 'center'
});

console.log(chalk.gray('正在启动所有子系统，请稍候...\n'));

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
}, 10000); // 10 seconds delay

result.then(
    () => console.log(chalk.green('所有服务已停止。')),
    (err) => console.log(chalk.red('发生错误:'), err)
);
