import {
  parenthesisToSkip,
  punctuationsToIgnore,
  alphabetWithPhoneticJongseong
} from './josa.config.json'

import { A, S } from './utils'

import { autofix } from './autofixer'

declare global {
  interface String {
    /* eslint-disable multiline-comment-style */
    /**
     * @example
     * [[[gocog
     * require("./gen.cjs")(
     *   (josa) => josa.map(
     *     ({getterName, example}) =>
     *       `${example ? `/**
     * * ${example.description}
     * * @example
     * * ${example.code.replace('\n', '\n* ')}
     * *\/
     * ` : ''}readonly ${getterName}: string`
     *   )
     * )
     * gocog]]] */
    /***/
    /* eslint-enable multiline-comment-style */
    /**
     * 단어에 보조사 은/는 중 맞는 것을 붙여줍니다.
     * @example
     * '산'.은는 === '산은'
     * '바다'.은는 === '바다는'
     */
    readonly 은는: string
    /**
     * 단어에 대격조사 을/를 중 맞는 것을 붙여줍니다.
     * @example
     * '산'.을를 === '산을'
     * '바다'.을를 === '바다를'
     */
    readonly 을를: string
    readonly 이가: string
    readonly 와과: string
    readonly 으로: string
    readonly 야아: string
    readonly 이여: string
    readonly 이나: string
    readonly 이다: string
    readonly 이였다: string
    readonly 이든: string
    readonly 이라: string
    readonly 이란: string
    readonly 이랑: string
    readonly 이야: string
    readonly 이며: string
    /* [[[end]]] */
  }
}

const compatibilityJamoEntries = Object.fromEntries(
  A.range('ㄱ'.charCodeAt(0), 'ㅎ'.charCodeAt(0))
    .map((code) => String.fromCharCode(code))
    .map((a) => [a, a])
)

const jongseongMap: Record<string, string> = {
  ...alphabetWithPhoneticJongseong,
  ...compatibilityJamoEntries
}

const endWith = {
  parenthesis: new RegExp(
    `${parenthesisToSkip
      .map(([opening, closing]) => {
        return `\\${opening}.*\\${closing}$`
      })
      .join('|')}`
  ),
  punctuation: new RegExp(`[${punctuationsToIgnore}\\s]*$`)
}

const hasJohabChar = (word: string): boolean => S.hasNFDComposable(word)
const lastLetterOf = (word: string): string =>
  word
    .normalize('NFC')
    .replace(endWith.punctuation, '')
    .replace(endWith.parenthesis, '')
    .slice(-1)

const getJongseongOf = (letter: string): string | undefined =>
  jongseongMap[letter.toUpperCase()] ?? letter.normalize('NFD')[2]

const hasJongseong = (letter: string): boolean =>
  getJongseongOf(letter) !== undefined

export interface JosaCompleter {
  /**
   * Takes a string and appends an appropriate suffix from {@link getSuffix}
   * @param word input word
   * @returns concatenated string
   */
  appender: (word: string, strict?: boolean) => string
  /**
   * Returns an appropriate suffix for a word
   * @param word input word
   * @returns suffix string
   */
  getSuffix: (word: string, strict?: boolean) => string
}

/**
 * Creates a {@link JosaCompleter} instance
 * @param whenTrue string to append when predicate returned true
 * @param whenFalse string to append when predicate returned false
 * @param customBranching takes the last letter of a word you're appending to
 * and returns a boolean
 * @returns {} {@link JosaCompleter}
 */
export const createJosaFunction = (
  whenTrue: string,
  whenFalse: string,
  customBranching: (letter: string) => boolean = hasJongseong
): JosaCompleter => {
  const getSuffix = (word: string): string => {
    const last = lastLetterOf(word)
    const suffix = customBranching(last) ? whenTrue : whenFalse
    return hasJohabChar(word) ? suffix.normalize('NFD') : suffix
  }

  return {
    appender: (word: string): string => word + getSuffix(word),
    getSuffix
  }
}

export const DEFAULT_JOSA_COMPLETERS: Record<string, JosaCompleter> = {}
// TODO(qb20nh): Generate JSDoc comment for each case with usage example
/* eslint-disable multiline-comment-style */
/**
 * @example
 * [[[gocog
 * require("./gen.cjs")(
 *   (josa) => josa.filter(
 *     opt => !opt.usesCustomBranching
 *   ).map(({getterName, whenTrue, whenFalse}) =>
 *     `const { appender: append${getterName}, getSuffix: get${getterName} }`
 * + ` = DEFAULT_JOSA_COMPLETERS['${getterName}']`
 * + ` = createJosaFunction('${whenTrue}', '${whenFalse}')`
 *   )
 * )
 * gocog]]] */
/***/
/* eslint-enable multiline-comment-style */
const { appender: append은는, getSuffix: get은는 } = DEFAULT_JOSA_COMPLETERS['은는'] = createJosaFunction('은', '는')
const { appender: append을를, getSuffix: get을를 } = DEFAULT_JOSA_COMPLETERS['을를'] = createJosaFunction('을', '를')
const { appender: append이가, getSuffix: get이가 } = DEFAULT_JOSA_COMPLETERS['이가'] = createJosaFunction('이', '가')
const { appender: append와과, getSuffix: get와과 } = DEFAULT_JOSA_COMPLETERS['와과'] = createJosaFunction('과', '와')
const { appender: append야아, getSuffix: get야아 } = DEFAULT_JOSA_COMPLETERS['야아'] = createJosaFunction('아', '야')
const { appender: append이여, getSuffix: get이여 } = DEFAULT_JOSA_COMPLETERS['이여'] = createJosaFunction('이여', '여')
const { appender: append이나, getSuffix: get이나 } = DEFAULT_JOSA_COMPLETERS['이나'] = createJosaFunction('이나', '나')
const { appender: append이다, getSuffix: get이다 } = DEFAULT_JOSA_COMPLETERS['이다'] = createJosaFunction('이다', '다')
const { appender: append이였다, getSuffix: get이였다 } = DEFAULT_JOSA_COMPLETERS['이였다'] = createJosaFunction('이었다', '였다')
const { appender: append이든, getSuffix: get이든 } = DEFAULT_JOSA_COMPLETERS['이든'] = createJosaFunction('이든', '든')
const { appender: append이라, getSuffix: get이라 } = DEFAULT_JOSA_COMPLETERS['이라'] = createJosaFunction('이라', '라')
const { appender: append이란, getSuffix: get이란 } = DEFAULT_JOSA_COMPLETERS['이란'] = createJosaFunction('이란', '란')
const { appender: append이랑, getSuffix: get이랑 } = DEFAULT_JOSA_COMPLETERS['이랑'] = createJosaFunction('이랑', '랑')
const { appender: append이야, getSuffix: get이야 } = DEFAULT_JOSA_COMPLETERS['이야'] = createJosaFunction('이야', '야')
const { appender: append이며, getSuffix: get이며 } = DEFAULT_JOSA_COMPLETERS['이며'] = createJosaFunction('이며', '며')
/* [[[end]]] */
const { appender: append으로, getSuffix: get으로 } = DEFAULT_JOSA_COMPLETERS['으로'] =
  createJosaFunction('으로', '로', (last) =>
    ![undefined, 'ㄹ', 'ᆯ'].includes(getJongseongOf(last))
  )
Object.freeze(DEFAULT_JOSA_COMPLETERS)

const addStringMethod = (key: string, getter: (value: string) => string): unknown =>
  // eslint-disable-next-line no-extend-native
  Object.defineProperty(String.prototype, key, {
    get () {
      return getter(this)
    }
  })
/* eslint-disable multiline-comment-style */
/**
 * @example
 * [[[gocog
 * require("./gen.cjs")(
 *   (josa) => josa.map(
 *     ({getterName}) =>
 *       `addStringMethod('${getterName}', append${getterName})`
 *   )
 * )
 * gocog]]] */
/***/
/* eslint-enable multiline-comment-style */
addStringMethod('은는', append은는)
addStringMethod('을를', append을를)
addStringMethod('이가', append이가)
addStringMethod('와과', append와과)
addStringMethod('으로', append으로)
addStringMethod('야아', append야아)
addStringMethod('이여', append이여)
addStringMethod('이나', append이나)
addStringMethod('이다', append이다)
addStringMethod('이였다', append이였다)
addStringMethod('이든', append이든)
addStringMethod('이라', append이라)
addStringMethod('이란', append이란)
addStringMethod('이랑', append이랑)
addStringMethod('이야', append이야)
addStringMethod('이며', append이며)
/* [[[end]]] */

export {
  /* eslint-disable multiline-comment-style */
  /**
   * @example
   * [[[gocog
   * require("./gen.cjs")(
   *   (josa) => josa.map(
   *     ({getterName}) =>
   *       `get${getterName},`
   *   )
   * )
   * gocog]]] */
  /***/
  /* eslint-enable multiline-comment-style */
  get은는,
  get을를,
  get이가,
  get와과,
  get으로,
  get야아,
  get이여,
  get이나,
  get이다,
  get이였다,
  get이든,
  get이라,
  get이란,
  get이랑,
  get이야,
  get이며
  /* [[[end]]] */
}
export { autofix }
