const url = require('url')

const s3URI = (input, op) => {
    if (!/s3:\/\//i.test(input)) {
        input = `s3://${input}`
    }

    const { hostname: Bucket, pathname } = url.parse(input)

    if (op === 'ls') {
        return { Bucket, Prefix: pathname, Delimiter: '/' }
    }
    else
    if (op === 'cp') {
        return { Bucket, Key: pathname.replace(/^\//, '') }
    }
    else
    if (op === 'rm') {
        return { Bucket, Key: pathname.replace(/^\//, '') }
    }
}

module.exports = { s3URI }
