exports.yargs = {
    command: 'publish <topic> <message>',
    describe: 'publish',

    handler: async(argv) => {
        const { topic, message } = argv

        const awsSdk = require('aws-sdk')

        const sns = new awsSdk.SNS()

        await sns.publish({
            TopicArn: topic,
            Message: message
        }).promise()
    }
}
