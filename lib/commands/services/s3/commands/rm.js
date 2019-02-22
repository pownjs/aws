exports.yargs = {
    command: 'rm <path>',
    describe: 'Remove',

    handler: async(argv) => {
        const { path } = argv

        const awsSdk = require('aws-sdk')

        const s3 = new awsSdk.S3()

        const { s3URI } = require('../../../../uri')

        await s3.deleteObject(s3URI(path, 'rm')).promise()
    }
}
