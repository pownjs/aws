exports.yargs = {
    command: 's3 <command>',
    describe: 'Simple Storage Service (S3)',

    builder: (yargs) => {
        yargs.command(require('./commands/ls').yargs)
        yargs.command(require('./commands/cp').yargs)
        yargs.command(require('./commands/rm').yargs)
    }
}
