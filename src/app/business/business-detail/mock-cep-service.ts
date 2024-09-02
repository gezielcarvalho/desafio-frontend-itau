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
        nomeDaRua: 'Rua 1',
        bairro: 'Bairro 1',
        estado: 'Estado 1',
        cidade: 'Cidade 1',
      },
      '12345-002': {
        nomeDaRua: 'Rua 2',
        bairro: 'Bairro 2',
        estado: 'Estado 2',
        cidade: 'Cidade 2',
      },
      '12345-003': {
        nomeDaRua: 'Rua 3',
        bairro: 'Bairro 3',
        estado: 'Estado 3',
        cidade: 'Cidade 3',
      },
      '12345-004': {
        nomeDaRua: 'Rua 4',
        bairro: 'Bairro 4',
        estado: 'Estado 4',
        cidade: 'Cidade 4',
      },
      '12345-005': {
        nomeDaRua: 'Rua 5',
        bairro: 'Bairro 5',
        estado: 'Estado 5',
        cidade: 'Cidade 5',
      },
    };

    return of(address[cep] || {}).pipe(delay(1000)); // Simulate network delay
  }
}
