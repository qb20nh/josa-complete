export const F = {
  cached<A extends readonly unknown[], R>(fn: (..._: A) => R) {
    const cache = new Map<string, R>()

    return (...args: A): R => {
      const key = JSON.stringify(args)
      if (cache.has(key)) {
        return cache.get(key) as R
      } else {
        const result = fn(...args)
        cache.set(key, result)
        return result
      }
    }
  }
} as const

export const A = {
  ifElse<T>(condition: boolean, value: T | T[], otherwise: T | T[] = []): T[] {
    if (!condition) {
      return Array.isArray(otherwise) ? otherwise : [otherwise]
    }
    return Array.isArray(value) ? value : [value]
  },
  range (from: number, to: number, step: number = 1): number[] {
    return [...Array((to - from + 1) / step)].map((_, i) => from + i * step)
  }
} as const

export const S = {
  trimEnd (containing: string, trailing: string) {
    return containing.replace(new RegExp(`${trailing}$`), '')
  },
  trimStart (containing: string, leading: string) {
    return containing.replace(new RegExp(`^${leading}`), '')
  },

  isNFC (s: string): boolean {
    return s.normalize('NFC') === s
  },
  hasNFCDecomposable (s: string): boolean {
    return s.normalize('NFD') !== s
  },
  isNFD (s: string): boolean {
    return s.normalize('NFD') === s
  },
  hasNFDComposable (s: string): boolean {
    return s.normalize('NFC') !== s
  },
  isMixedNormalizationForm (s: string): boolean {
    return S.hasNFCDecomposable(s) && S.hasNFDComposable(s)
  }
} as const

export const R = {
  escape (s: string): string {
    return s.replace(/[.\\[^\]()*+?{}|$]/g, '\\$&')
  }
} as const

export default { F, A, S, R, Function: F, Array: A, String: S, RegExp: R }
