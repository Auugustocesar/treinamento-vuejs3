import { validateEmptyAndLength3, validateEmptyAndEmail } from './validators'

describe('Validators utils', () => {
  it('should give an error with empty payload', () => {
    expect(validateEmptyAndLength3()).toBe('*Este campo é obrigatório')
  })

  it('should give an error with less then 3 character payload', () => {
    expect(validateEmptyAndLength3('12')).toBe('*Este campo deve ter no mínimo 3 caracteres')
  })

  it('should returns true when input pass a correct param', () => {
    expect(validateEmptyAndLength3('123')).toBe(true)
  })

  it('should give an error with empty payload Email', () => {
    expect(validateEmptyAndEmail()).toBe('*Este campo é obrigatório')
  })

  it('should give an error with invalid email', () => {
    expect(validateEmptyAndEmail('myemail@')).toBe('*Este campo deve ser um e-mail válido')
  })

  it('should returns true when input pass a correct param', () => {
    expect(validateEmptyAndEmail('myemail@email.com')).toBe(true)
  })
})
