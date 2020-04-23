exports.yargs = {
    command: 'stream <group> <stream>',
    describe: 'Stream',

    builder: (yargs) => {
        yargs.options('interval', {
            alias: 'i',
            type: 'number',
            describe: 'Pull interval',
            default: 1000
        })
    },

    handler: async(argv) => {
        const { interval, group, stream } = argv

        const awsSdk = require('aws-sdk')
        const { sleep } = require('@pown/async/lib/timers')

        const cloudwatchlogs = new awsSdk.CloudWatchLogs()

        let token

        do {
            const params = {
                logGroupName: group,
                logStreamName: stream,
                startFromHead: false,
                nextToken: token
            }

            const { nextForwardToken, events } = await cloudwatchlogs.getLogEvents(params).promise()

            events.forEach(({ message }) => {
                console.log(message)
            })

            token = nextForwardToken

            if (!token) {
                break
            }

            await sleep(interval)
        } while (true)
    }
}
