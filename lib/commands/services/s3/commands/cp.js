exports.yargs = {
    command: 'cp <source> <destination>',
    describe: 'Copy',

    handler: async(argv) => {
        const { source, destination } = argv

        const awsSdk = require('aws-sdk')

        const s3 = new awsSdk.S3()

        const { s3URI } = require('../../../../uri')

        let promise

        let sourceStream

        if (/^s3:\/\//i.test(source)) {
            sourceStream = s3.getObject(s3URI(source, 'cp')).createReadStream()
        }
        else {
            sourceStream = require('fs').createReadStream(source)
        }

        let destinationStream

        if (/^s3:\/\//i.test(destination)) {
            const { PassThrough } = require('stream')

            destinationStream = new PassThrough()

            promise = s3.upload({ ...s3URI(destination, 'cp'), Body: destinationStream }).promise()
        }
        else {
            destinationStream = require('fs').createWriteStream(destination)
        }

        sourceStream.pipe(destinationStream)

        await promise
    }
}
