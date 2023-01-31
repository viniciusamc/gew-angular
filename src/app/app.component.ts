import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CepServiceService } from './cep-service.service';

export interface DadosCep {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'gew';
  email = new FormControl('');
  hide = true;

  getErrorMessage() {
    return this.email.hasError('required')
      ? 'You must enter a value'
      : this.email.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  constructor(private cepService: CepServiceService) {}

  consultaCep(valor: string, form: any) {
    this.cepService
      .buscar(valor)
      .subscribe((dados: DadosCep) => this.populaForm(dados, form));
  }

  populaForm(dados: DadosCep, f: any) {
    f.setValue({
      cep: dados.cep,
      logradouro: dados.logradouro,
      cidade: dados.localidade,
      estado: dados.uf,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    return filterValue;
  }
}
