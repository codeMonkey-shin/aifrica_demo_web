
async function dataUrlToFile(base64) {
    let bstr = Buffer.from(base64, 'base64').toString('binary')
    return bstr
}

module.exports = { dataUrlToFile };

