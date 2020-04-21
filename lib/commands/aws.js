exports.yargs = {
    command: 'aws <command>',
    describe: 'Amazon Web Services (AWS)',

    builder: (yargs) => {
        yargs.command(require('./services/s3').yargs)
        yargs.command(require('./services/cloudwatch').yargs)
    }
}
