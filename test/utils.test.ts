import { A, S } from '@/utils'

describe('Array utils', () => {
  test('A.ifElse', () => {
    expect(A.ifElse(true, 'yes')).toEqual(['yes'])
    expect(A.ifElse(true, ['yes'])).toEqual(['yes'])
    expect(A.ifElse(true, ['yes', 'plz'])).toEqual(['yes', 'plz'])
    expect(A.ifElse(false, 'yes')).toEqual([])
    expect(A.ifElse(false, ['yes'])).toEqual([])
    expect(A.ifElse(false, ['yes', 'plz'])).toEqual([])
    expect(A.ifElse(true, 'yes', 'no')).toEqual(['yes'])
    expect(A.ifElse(true, ['yes'], 'no')).toEqual(['yes'])
    expect(A.ifElse(true, ['yes', 'plz'], 'no')).toEqual(['yes', 'plz'])
    expect(A.ifElse(true, 'yes', ['no'])).toEqual(['yes'])
    expect(A.ifElse(true, 'yes', ['no', 'never'])).toEqual(['yes'])
    expect(A.ifElse(true, ['yes'], ['no'])).toEqual(['yes'])
    expect(A.ifElse(true, ['yes', 'plz'], ['no', 'never'])).toEqual(['yes', 'plz'])
    expect(A.ifElse(false, 'yes', 'no')).toEqual(['no'])
    expect(A.ifElse(false, ['yes'], 'no')).toEqual(['no'])
    expect(A.ifElse(false, ['yes', 'plz'], 'no')).toEqual(['no'])
    expect(A.ifElse(false, 'yes', ['no'])).toEqual(['no'])
    expect(A.ifElse(false, 'yes', ['no', 'never'])).toEqual(['no', 'never'])
    expect(A.ifElse(false, ['yes'], ['no'])).toEqual(['no'])
    expect(A.ifElse(false, ['yes', 'plz'], ['no', 'never'])).toEqual(['no', 'never'])
  })

  test('A.range', () => {
    expect(A.range(1, 2)).toEqual([1, 2])
  })
})

describe('String utils', () => {
  test('unicode normalization forms', () => {
    const NFC = '가'.normalize('NFC')
    const NFD = '가'.normalize('NFD')
    const BOTH = NFC + NFD

    expect(S.isNFC(NFC)).toBe(true)
    expect(S.isNFC(NFD)).toBe(false)
    expect(S.isNFC(BOTH)).toBe(false)
    expect(S.isNFD(NFC)).toBe(false)
    expect(S.isNFD(NFD)).toBe(true)
    expect(S.isNFD(BOTH)).toBe(false)
    expect(S.hasNFCDecomposable(NFC)).toBe(true)
    expect(S.hasNFCDecomposable(NFD)).toBe(false)
    expect(S.hasNFCDecomposable(BOTH)).toBe(true)
    expect(S.hasNFDComposable(NFC)).toBe(false)
    expect(S.hasNFDComposable(NFD)).toBe(true)
    expect(S.hasNFDComposable(BOTH)).toBe(true)
    expect(S.isMixedNormalizationForm(NFC)).toBe(false)
    expect(S.isMixedNormalizationForm(NFD)).toBe(false)
    expect(S.isMixedNormalizationForm(BOTH)).toBe(true)
  })
})
