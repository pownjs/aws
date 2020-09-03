exports.yargs = {
    command: 'dump <group> <stream>',
    describe: 'Dump',

    handler: async(argv) => {
        const { group, stream } = argv

        const awsSdk = require('aws-sdk')

        const cloudwatchlogs = new awsSdk.CloudWatchLogs()

        let token

        do {
            const params = {
                logGroupName: group,
                logStreamNames: [stream],
                filterPattern: '',
                nextToken: token
            }

            const { nextToken, events } = await cloudwatchlogs.filterLogEvents(params).promise()

            events.forEach(({ message }) => {
                console.log(message)
            })

            token = nextToken

            if (!token) {
                break
            }
        } while (true)
    }
}
