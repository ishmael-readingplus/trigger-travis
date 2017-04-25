#!/usr/bin/env node

const pkginfo = require('pkginfo')(module),
    trigger = require('../lib/trigger'),
    ArgumentParser = require('argparse').ArgumentParser,
    parser = new ArgumentParser({
        version: this.version,
        addHelp: true,
        description: this.description
    });

//args


parser.addArgument(['-r', '--repo'], {
    help: 'The name of the repo e.g. ishmael-readingplus/[trigger-travis]',
    required: true
});
parser.addArgument(['-o', '--owner'], {
    help: 'The owner of the github repo e.g [ishmael-readingplus]/trigger-travis',
    required: true
});
parser.addArgument(['-t', '--token'], {
    help: 'Travis api token',
    required: true
});
parser.addArgument(['-b', '--branch'], {
    help: 'The name of the branch to trigger by default it uses the upstream master branch',
    defaultValue: 'master'
});
parser.addArgument(['--pro'], {
    help: 'Set if the repo is on github.com the default is github.org',
    defaultValue: false,
    action: 'storeTrue',
    type: Boolean
});
parser.addArgument(['--debug'], {
    help: 'Prints message to the console, but takes no action',
    defaultValue: false,
    action: 'storeTrue',
    type: Boolean
});

var argv = parser.parseArgs();
console.log(argv)
trigger.pull(argv)