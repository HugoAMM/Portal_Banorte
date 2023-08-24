import { Component, OnInit } from '@angular/core';
import { FormBaseComponent } from '../form-base/form-base.component';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-fws',
  templateUrl: './form-fws.component.html',
  styleUrls: ['./form-fws.component.scss']
})
export class FormFwsComponent extends FormBaseComponent implements OnInit {

  constructor(private _fb: FormBuilder) {
    super(_fb)
    this.informationFormBuilder = this._fb.group({
      fields: this._fb.array([
        this._fb.group({
          source: ['', Validators.required],
          destination: ['', Validators.required],
          port: ['', [Validators.required, Validators.min(0)]]
        })
      ]),
      file: ['']
    });
  }

  override clearFormValidators() {
    this.fields.controls.forEach((control) => {
      const form = this.getFormGroup(control);
      form.controls['source'].clearValidators();
      form.controls['destination'].clearValidators();
      form.controls['port'].clearValidators();
      form.controls['source'].setErrors(null);
      form.controls['destination'].setErrors(null);
      form.controls['port'].setErrors(null);
      form.updateValueAndValidity();
    })
    this.informationFormBuilder.updateValueAndValidity();
  }

  override setFormValidators() {
    this.fields.controls.forEach((control) => {
      const form = this.getFormGroup(control);
      form.controls['source'].setValidators([Validators.required]);
      form.controls['destination'].setValidators([Validators.required]);
      form.controls['port'].setValidators([Validators.required, Validators.min(0)]);
      form.controls['source'].updateValueAndValidity();
      form.controls['destination'].updateValueAndValidity();
      form.controls['port'].updateValueAndValidity();
      form.updateValueAndValidity();
    })
    this.fields.updateValueAndValidity();
    this.informationFormBuilder.updateValueAndValidity();
  }

  override setEmmitData() {
    this.dataEmmit.message = '';
    this.fields.controls.forEach((control) => {
      const form = this.getFormGroup(control);
      this.dataEmmit.message = this.dataEmmit.message.concat(
        'Origen: ', form.controls['source'].value,
        ', Destino: ', form.controls['destination'].value,
        ', Puerto: ', form.controls['port'].value,
        '\n'
      );
    })
  }

  override addFields() {
    const fwsForm = this._fb.group({
      source: ['', Validators.required],
      destination: ['', Validators.required],
      port: ['', [Validators.required, Validators.min(0)]]
    });

    this.fields.push(fwsForm);
    this.emmitData();
  }
}
