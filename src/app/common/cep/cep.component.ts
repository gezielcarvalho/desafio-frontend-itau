// Angular core modules
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

// Angular Material modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// Mask modules
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

// Application-specific components and services
import { MockCepService } from '../../business/business-detail/mock-cep-service';

@Component({
  selector: 'app-cep',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    NgxMaskDirective,
    ReactiveFormsModule,
  ],
  providers: [provideNgxMask()],
  template: `
    <div [formGroup]="formGroup">
      <mat-form-field appearance="outline">
        <mat-label>CEP</mat-label>
        <input
          matInput
          type="text"
          mask="00000-000"
          [dropSpecialCharacters]="false"
          [formControlName]="controlName"
          required />
        @if(formGroup.get(controlName)?.invalid &&
        (formGroup.get(controlName)?.dirty ||
        formGroup.get(controlName)?.touched)) {
        <mat-error>CEP is required.</mat-error>
        }
      </mat-form-field>
    </div>
  `,
})
export class CepComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;

  constructor(private mockCepService: MockCepService) {}

  /* Lifecycle Hooks */
  ngOnInit() {
    this.formGroup.get(this.controlName)?.valueChanges.subscribe((cep) => {
      this.mockCepService.getAddressByCep(cep).subscribe((address) => {
        if (address) {
          this.formGroup.patchValue({
            nomeDaRua: address.nomeDaRua,
            bairro: address.bairro,
            estado: address.estado,
            cidade: address.cidade,
          });
        }
      });
    });
  }
}
