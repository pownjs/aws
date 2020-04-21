exports.yargs = {
    command: 'cloudwatch <command>',
    describe: 'AWS Log Managment Service',

    builder: (yargs) => {
        yargs.command(require('./commands/dump').yargs)
    }
}
