exports.yargs = {
    command: 'aws <command>',
    describe: 'Amazon Web Services (AWS)',

    builder: (yargs) => {
        yargs.command(require('./sub/s3').yargs)
        yargs.command(require('./sub/cloudwatch').yargs)
    }
}
