const url = require('url')

const s3URI = (input, op) => {
    if (!/s3:\/\//i.test(input)) {
        input = `s3://${input}`
    }

    const { hostname: Bucket, pathname = '/' } = url.parse(input)

    const Key = (pathname || '').replace(/\/+/g, '/').replace(/^\/+/, '').replace(/\/+$/, '')

    if (op === 'ls') {
        return { Bucket, Prefix: Key, Delimiter: '/' }
    }
    else
    if (op === 'cp') {
        return { Bucket, Key }
    }
    else
    if (op === 'rm') {
        return { Bucket, Key }
    }
    else
    if (op === 'sign') {
        return { Bucket, Key }
    }
}

module.exports = { s3URI }
