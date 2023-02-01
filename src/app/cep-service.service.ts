import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DadosCep } from './app.component';

@Injectable({
  providedIn: 'root',
})
export class CepServiceService {
  constructor(private httpClient: HttpClient) {}

  buscar(cep: String) {
    return this.httpClient.get<DadosCep>(
      `https://viacep.com.br/ws/${cep}/json/`
    );
  }
}
