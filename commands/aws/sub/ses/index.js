exports.yargs = {
    command: 'ses <command>',
    describe: 'Simple Email Service (SES)',

    builder: (yargs) => {
        yargs.command(require('./sub/email').yargs)
    }
}
