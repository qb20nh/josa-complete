
import { DEFAULT_JOSA_COMPLETERS } from '.'
import { josa } from './josa.config.json'
import { F, A, S, R } from './utils'

const getWordsAndSpaces = (text: string): string[] =>
  text.match(/\p{White_Space}+|\P{White_Space}+/gu) ?? []

const getPatterns = F.cached((
  whenTrue: string,
  whenFalse: string,
  unsafe: boolean = false
): string[] => {
  if (whenTrue === whenFalse) {
    throw new RangeError('whenTrue and whenFalse value must not be equal')
  }

  return [
    // '으로' / '로' -> (으)로
    ...A.ifElse(
      whenTrue.endsWith(whenFalse),
      `(${S.trimEnd(whenTrue, whenFalse)})${whenFalse}`
    ),
    ...A.ifElse(
      whenFalse.endsWith(whenTrue),
      `(${S.trimEnd(whenFalse, whenTrue)})${whenTrue}`
    ),
    // '어쩌구' / '어쩌' -> 어쩌(구)
    ...A.ifElse(
      whenTrue.startsWith(whenFalse),
      `${whenFalse}(${S.trimStart(whenTrue, whenFalse)})`
    ),
    ...A.ifElse(
      whenFalse.startsWith(whenTrue),
      `${whenTrue}(${S.trimStart(whenFalse, whenTrue)})`
    ),
    `${whenTrue}(${whenFalse})`,
    `(${whenTrue})${whenFalse}`,
    `${whenTrue}/${whenFalse}`,
    `${whenFalse}(${whenTrue})`,
    `(${whenFalse})${whenTrue}`,
    `${whenFalse}/${whenTrue}`,
    ...A.ifElse(
      unsafe,
      [
        `${whenTrue}${whenFalse}`,
        `${whenFalse}${whenTrue}`,
        whenTrue,
        whenFalse
      ]
    )
  ]
})

export const autofix = (text: string): string => {
  const wordsAndSpaces = getWordsAndSpaces(text)
  const indexToInclude =
    ((wordsAndSpaces[0]?.match(/\P{White_Space}/u)) != null)
      ? 0 // first is word, filter out index % 2 != 0
      : 1 // first is space, filter out index % 2 != 1
  return wordsAndSpaces.map((wordOrSpace, index) => {
    if (index % 2 !== indexToInclude) { // currently looking at whitespace chunk
      return wordOrSpace
    }

    const normalized = wordOrSpace.normalize('NFC') // '게임를'
    const foundIndex = josa.findIndex(({ whenTrue, whenFalse }) => {
      const patterns = getPatterns(whenTrue, whenFalse)
      return normalized.match(
        new RegExp(`(${patterns.map(R.escape).join('|')})$`)
      )
    })
    if (foundIndex > -1) {
      const found = josa[foundIndex]
      const patterns = getPatterns(found.whenTrue, found.whenFalse)
      const realWord = S.trimEnd(
        normalized,
        `(${patterns.map(R.escape).join('|')})`
      )
      return DEFAULT_JOSA_COMPLETERS[found.getterName].appender(realWord)
    }

    return wordOrSpace // not found, probably end of sentence or some noun
  }).join('')
}
