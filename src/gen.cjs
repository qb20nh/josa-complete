const findPath = (obj, path) =>
  path.match(/[^.]+/g).reduce((acc, val) => acc[val], obj)

module.exports =
  function(fn, { jsonFile, jsonPath } = {
    jsonFile: './josa.config.json',
    jsonPath: 'josa'
  }) {
    const json = require(jsonFile)
    const obj = findPath(json, jsonPath)
    console.log('/***/') // Keep generator blocks from being recognized as JSDoc
    console.log('/* eslint-enable multiline-comment-style */')
    const result = fn(obj)
    console.log(typeof result === 'string' ? result : result.join('\n'))
  }
