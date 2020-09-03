exports.yargs = {
    command: 'ls [bucket]',
    describe: 'List',

    handler: async(argv) => {
        const { bucket } = argv

        const awsSdk = require('aws-sdk')

        const s3 = new awsSdk.S3()

        if (bucket) {
            const { s3URI } = require('../../../../../lib/uri')

            const { Contents: contents } = await s3.listObjects(s3URI(bucket, 'ls')).promise()

            contents.forEach(({ Key: key }) => {
                console.log(key)
            })
        }
        else {
            const { Buckets: buckets } = await s3.listBuckets({}).promise()

            buckets.forEach(({ Name: name }) => {
                console.log(name)
            })
        }
    }
}
