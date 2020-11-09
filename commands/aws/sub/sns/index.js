exports.yargs = {
    command: 'sns <command>',
    describe: 'Simple Notification Service (SNS)',

    builder: (yargs) => {
        yargs.command(require('./sub/publish').yargs)
    }
}
