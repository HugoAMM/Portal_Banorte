import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormBaseComponent } from '../form-base/form-base.component';

@Component({
  selector: 'app-form-wsa',
  templateUrl: './form-wsa.component.html',
  styleUrls: ['./form-wsa.component.scss']
})
export class FormWsaComponent extends FormBaseComponent implements OnInit {

  constructor(private _fb: FormBuilder,) {
    super(_fb)
    this.informationFormBuilder = this._fb.group({
      fields: this._fb.array([
        this._fb.group({
          source: ['', Validators.required],
          destination: ['', Validators.required]
        })
      ]),
      file: ['']
    });
  }
}
