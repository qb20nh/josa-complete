import { autofix } from '@/autofixer'

describe('autofixer tests', () => {
  test('normal texts', () => {
    expect(autofix('Minecraft은(는) 현재 계정에서 사용할 수 없습니다.')).toBe('Minecraft는 현재 계정에서 사용할 수 없습니다.')
  })

  test('should throw when pattern same', () => {
    expect(() => {
      autofix('blah blah', [{
        getterName: 'getter',
        whenTrue: 'asdf',
        whenFalse: 'asdf'
      }])
    }).toThrowError()
  })

  test('empty string', () => {
    expect(autofix('')).toBe('')
  })
})
