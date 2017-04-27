#!/usr/bin/env node

"use strict";

const shell = require('shelljs'),
    path = require('path'),
    got = require('got'),
    chalk = require('chalk');



var trigger = (argv) => {
    var branch = (argv.b || argv.branch) ? argv.b || argv.branch : 'master',
        owner = (argv.o || argv.owner) ? argv.o || argv.owner : false,
        repo = (argv.r || argv.repo) ? argv.r || argv.repo : false,
        accounttype = (argv.pro) ? 'com' : 'org',
        token = process.env.TRAVIS_API_TOKEN || argv.t || argv.token,
        config = argv.config,
        debug = argv.debug,
        warn = chalk.bold.yellow,
        error = chalk.bold.red,
        debug_message = chalk.blue;

    if (!repo || !owner || !token) {
        console.warn(warn("Wrong number of arguments:"));
        console.warn(warn("node trigger-travis [--pro] [-branch GITHUB_BRANCH_NAME] -owner GITHUBID -repo GITHUBPROJECT -token TRAVIS_ACCESS_TOKEN"));
        if (!token) {
            console.warn(error("Your missing a token"));
        }

    } else {
        console.log(`Fetching Git commit hash...`);

        const gitCommitRet = shell.exec('git rev-parse HEAD', {
            cwd: path.join(__dirname, '..')
        });

        if (0 !== gitCommitRet.code) {
            console.error('Error getting git commit hash');

            process.exit(-1);
        }

        const gitCommitHash = gitCommitRet.stdout.trim();

        console.log(`Git commit: ${gitCommitHash}`);

        console.log('Calling Travis...');

        if (debug) {
            console.log(debug_message('argv =>', JSON.stringify(argv)));
            console.log(debug_message(`endpoint: https://api.travis-ci.${accounttype}/repo/${owner}%2F${repo}/requests`));
            console.log(debug_message(`token: ${token}`));
        } else {
            got.post(`https://api.travis-ci.${accounttype}/repo/${owner}%2F${repo}/requests`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Travis-API-Version": "3",
                        "Authorization": `token ${token}`,
                    },
                    body: JSON.stringify({
                        request: {
                            message: "Triggered by upstream build of " + process.env.TRAVIS_REPO_SLUG,
                            branch: branch,
                            config: config
                        },
                    }),
                })
                .then(() => {
                    console.log(`Triggered build of ${owner}/${repo}`);
                    console.log(`With this configuration ${JSON.stringify(config)}`);
                })
                .catch((err) => {
                    console.error(err);

                    process.exit(-1);
                });
        }
    }
};

exports.pull = trigger;