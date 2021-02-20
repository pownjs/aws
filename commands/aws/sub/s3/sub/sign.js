exports.yargs = {
    command: 'sign <source>',
    describe: 'Sign',

    handler: async(argv) => {
        const { source } = argv

        const util = require('util')
        const awsSdk = require('aws-sdk')

        const s3 = new awsSdk.S3()

        const getSignedUrlAsync = util.promisify(s3.getSignedUrl.bind(s3))

        const { s3URI } = require('../../../../../lib/uri')

        const url = await getSignedUrlAsync('getObject', s3URI(source, 'sign'))

        console.log(url)

        return url
    }
}
