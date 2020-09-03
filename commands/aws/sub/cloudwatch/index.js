exports.yargs = {
    command: 'cloudwatch <command>',
    describe: 'AWS Log Managment Service',

    builder: (yargs) => {
        yargs.command(require('./sub/ls').yargs)
        yargs.command(require('./sub/dump').yargs)
        yargs.command(require('./sub/stream').yargs)
    }
}
