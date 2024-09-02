import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MockCepService {
  getAddressByCep(cep: string) {
    // Mock data
    const address: {
      [key: string]: {
        nomeDaRua: string;
        bairro: string;
        estado: string;
        cidade: string;
      };
    } = {
      '12345-001': {
        nomeDaRua: 'Rua Exemplo 1',
        bairro: 'Bairro Exemplo 1',
        estado: 'Estado Exemplo 1',
        cidade: 'Cidade Exemplo 1',
      },
      '12345-002': {
        nomeDaRua: 'Rua Exemplo 2',
        bairro: 'Bairro Exemplo 2',
        estado: 'Estado Exemplo 2',
        cidade: 'Cidade Exemplo 2',
      },
      '12345-003': {
        nomeDaRua: 'Rua Exemplo 3',
        bairro: 'Bairro Exemplo 3',
        estado: 'Estado Exemplo 3',
        cidade: 'Cidade Exemplo 3',
      },
      '12345-004': {
        nomeDaRua: 'Rua Exemplo 4',
        bairro: 'Bairro Exemplo 4',
        estado: 'Estado Exemplo 4',
        cidade: 'Cidade Exemplo 4',
      },
      '12345-005': {
        nomeDaRua: 'Rua Exemplo 5',
        bairro: 'Bairro Exemplo 5',
        estado: 'Estado Exemplo 5',
        cidade: 'Cidade Exemplo 5',
      },
    };

    return of(address[cep] || {}).pipe(delay(1000)); // Simulate network delay
  }
}
