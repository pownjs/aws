exports.yargs = {
    command: 'email <from> <to> <subject>',
    describe: 'email',

    builder: (yargs) => {
        yargs.options('text', {
            type: 'string',
            describe: 'Text contents',
            default: ''
        })

        yargs.options('html', {
            type: 'string',
            describe: 'HTML contents',
            default: ''
        })
    },

    handler: async(argv) => {
        const { from, to, subject, text, html } = argv

        const awsSdk = require('aws-sdk')

        const ses = new awsSdk.SES()

        await ses.sendEmail({
            Source: from,

            Destination: {
                ToAddresses: [
                    to
                ]
            },

            Subject: {
                Charset: 'UTF-8',
                Data: subject
            },

            Message: {
                Body: {
                    Text: {
                        Charset: 'UTF-8',
                        Data: text
                    },

                    Html: {
                        Charset: 'UTF-8',
                        Data: html
                    }
                }
            }
        }).promise()
    }
}
