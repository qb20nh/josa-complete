const { josa } = require('./josa.config.json')

module.exports = function (fn) {
  console.log('/***/') // Keep generator blocks from being recognized as JSDoc
  console.log('/* eslint-enable multiline-comment-style */')
  const result = fn(josa)
  console.log(typeof result === 'string' ? result : result.join('\n'))
}
