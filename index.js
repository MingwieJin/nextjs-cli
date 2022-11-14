#!/usr/bin/env node

/** 用户交互 **/
const inquirer = require('inquirer')
const handleCreate = (params, options) => {
    inquirer
        // 用户交互
        .prompt([
            {
                type: 'input',
                name: 'author',
                message: 'author name?'
            },
            {
                type: 'list',
                name: 'template',
                message: 'choose a template',
                choices: ['tpl-1', 'tpl-2']
            }
        ])
        .then((answers) => {
            //根据回答以及选项，参数来生成项目文件
            genFiles({ ...answers, ...params, ...options });
        })
        .catch((error) => {
            console.error(error);
        });
};


/** 主程序 **/
const { program } = require('commander');

program
    // .command()用于配置命令及参数，其中<>表示参数是必须的，[]表示参数是可选的;
    .command('create <name> [destination]')
    // .description()添加命令描述
    .description('create a project')
    // .action()用于添加操作函数，入参就是配置命令时候的参数
    .action((name, destination) => {
        handleCreate({ name, destination }, program.opts());
    });

program.option('-ig,--initgit', 'init git');

program.parse(process.argv);



/** 按需生成项目文件 **/
// 获得命令运行时所在的路径
const getCwd = () => process.cwd();
// 这里用到Metalsmith,可以很方便地复制文件到指定目录
const Metalsmith = require('metalsmith');
const path = require('path');
const ejs = require('ejs');

const genFiles = async (options) => {
    // 模版的目录 options.template就是上面用户交互的时候选择的模板文件夹
    let templateSrc = '';
    if (options.template !== 'tpl-2') {
        templateSrc = path.resolve(__dirname, `./template/${options.template}`)
    } else {
        templateSrc = await clone('git@github.com:xxxx', options.name)
    }
    // 项目指定生成目录，如果命令中没有有配置目录，则在当前命令运行的目录下生成以项目名称为名字的新目录
    const destination = options.destination
        ? path.resolve(options.destination)
        : path.resolve(getCwd(), options.name);

// 需要动态生成的文件, 是个数据，可以填多个
    const renderPathList = ['package.json']

    /** 修改模板文件 **/

    Metalsmith(__dirname)
        .source(templateSrc)
        .destination(destination)
        .use((files) => {
            Object.keys(files).forEach((key) => {
                // 指定的文件动态生成
                if (renderPathList.includes(key)) {
                    const file = files[key];
                    // 原内容
                    const str = file.contents.toString();
                    // 新内容
                    const newContents = ejs.render(str, options);
                    // 将新内容写到文件中
                    file.contents = Buffer.from(newContents);
                }
            });
        })
        .build((err) => {
            if (err) {
                console.error(err);
            }
        });
};
// .source()和.destination()分别配置复制源目录和目标目录，最好使用绝对路径


/** 拷贝线上模板 **/
const { promisify } = require('util')
const clone = async function (repo, desc) {
    const download = promisify(require('download-git-repo')) // download-git-repo: Download and extract a git repository (GitHub, GitLab, Bitbucket)
    const ora = require('ora')
    const process = ora(`下载......${repo}`)
    process.start() // 进度条开始
    await download(repo, desc, { clone: true }, (err) => {console.log(err ? "Error" : "Success", err)})
    //  download-git-repo导出的download方法，第一个参数repo是仓库地址，格式有三种：
    // GitHub - github:owner/name or simply owner/name
    // GitLab - gitlab:owner/name
    // Bitbucket - bitbucket:owner/name
    process.succeed()
}

// /** 执行脚本 **/
// const spawn = async (...args) => {
//     const { spawn } = require('child_process')
//     return new Promise(resolve => {
//         const proc = spawn(...args) // 在node.js中执行shell一般用spawn，实现从主进程的输出流连通到子进程的输出流
//         proc.stdout.pipe(process.stdout) // 子进程正常流搭到主进程的正常流
//         proc.stderr.pipe(process.stderr) // 子进程错误流插到主进程的错误流
//         proc.on('close', () => {
//             resolve()
//         })
//     })
// }
//
// const initNpm = async () => {
//     await spawn('npm', ['install'], { cwd: `./` }) // cwd 执行命令的目录
// }
//
// initNpm()