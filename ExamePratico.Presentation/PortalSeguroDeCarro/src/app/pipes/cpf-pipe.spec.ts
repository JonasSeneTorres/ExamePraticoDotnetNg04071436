import { CpfPipe } from './cpf-pipe';

describe('CpfPipe', () => {
  let pipe: CpfPipe;

  beforeEach(() => {
    pipe = new CpfPipe();
  });

  it('deve criar a instância do pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('deve formatar corretamente um CPF válido como string', () => {
    const cpf = '12345678901';
    const resultado = pipe.transform(cpf);
    expect(resultado).toBe('123.456.789-01');
  });

  it('deve formatar corretamente um CPF válido como número', () => {
    const cpf = 12345678901;
    const resultado = pipe.transform(cpf);
    expect(resultado).toBe('123.456.789-01');
  });

  it('deve retornar o valor original se não tiver 11 dígitos', () => {
    const cpfCurto = '12345';
    const cpfLongo = '1234567890123';
    expect(pipe.transform(cpfCurto)).toBe('12345');
    expect(pipe.transform(cpfLongo)).toBe('1234567890123');
  });

  it('deve retornar string vazia para null ou undefined', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
  });

  it('deve remover caracteres não numéricos antes de formatar', () => {
    const cpf = '123.456.789-01';
    const resultado = pipe.transform(cpf);
    expect(resultado).toBe('123.456.789-01');
  });
});
