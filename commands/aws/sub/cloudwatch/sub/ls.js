exports.yargs = {
    command: 'ls [group] [stream]',
    describe: 'list',

    builder: (yargs) => {
        yargs.options('recursive', {
            alias: 'r',
            type: 'boolean',
            describe: 'Do recursive list',
            default: false
        })
    },

    handler: async(argv) => {
        const { group, stream, recursive } = argv

        const awsSdk = require('aws-sdk')

        const cloudwatchlogs = new awsSdk.CloudWatchLogs()

        if (group) {
            if (stream) {
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

                    if (!recursive) {
                        break
                    }
                } while (true)
            }
            else {
                let token

                do {
                    const params = {
                        logGroupName: group,
                        descending: true,
                        orderBy: 'LastEventTime',
                        nextToken: token
                    }

                    const { nextToken, logStreams } = await cloudwatchlogs.describeLogStreams(params).promise()

                    logStreams.forEach(({ logStreamName }) => {
                        console.log(logStreamName)
                    })

                    token = nextToken

                    if (!token) {
                        break
                    }

                    if (!recursive) {
                        break
                    }
                } while (true)
            }
        }
        else {
            let token

            do {
                const params = {
                    nextToken: token
                }

                const { nextToken, logGroups } = await cloudwatchlogs.describeLogGroups(params).promise()

                logGroups.forEach(({ logGroupName }) => {
                    console.log(logGroupName)
                })

                token = nextToken

                if (!token) {
                    break
                }

                if (!recursive) {
                    break
                }
            } while (true)
        }
    }
}
