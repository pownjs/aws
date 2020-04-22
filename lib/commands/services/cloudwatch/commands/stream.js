exports.yargs = {
    command: 'stream <group> <stream>',
    describe: 'Stream',

    handler: async(argv) => {
        const { group, stream } = argv

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

            await sleep(5000)
        } while (true)
    }
}
