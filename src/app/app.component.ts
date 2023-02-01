import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { CepServiceService } from './cep-service.service';
import { ApiService } from './api.service';
import { UserModel } from './user-model';

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
  name = '';
  email = new FormControl('');
  cep = new FormControl('');
  hide = true;
  api: any;

  getErrorMessage() {
    return this.email.hasError('required')
      ? 'Coloque um endereço de e-mail válido!'
      : this.email.hasError('email')
      ? 'Coloque um endereço de e-mail válido'
      : '';
  }

  constructor(
    private cepService: CepServiceService,
    private apiService: ApiService
  ) {}

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

  onSubmit(form: any) {
    const user: UserModel = {
      name: form.value.name,
      email: form.value.email,
      birth: form.value.birth,
      cep: form.value.cep,
      address: form.value.logradouro,
      city: form.value.cidade,
      state: form.value.estado,
      password: form.value.password,
      confirmPassword: form.value.confirmPassword,
    };

    this.apiService.save(user).subscribe((result) => {});
  }
}
