exports.yargs = {
    command: 's3 <command>',
    describe: 'Simple Storage Service (S3)',

    builder: (yargs) => {
        yargs.command(require('./sub/ls').yargs)
        yargs.command(require('./sub/cp').yargs)
        yargs.command(require('./sub/rm').yargs)
    }
}
