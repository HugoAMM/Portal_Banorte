import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FileAttachmentInfo } from "src/app/model/form/fileAttachmentInfo";

@Component({
  selector: 'app-form-base',
  templateUrl: './form-base.component.html',
  styleUrls: ['./form-base.component.scss']
})
export class FormBaseComponent implements OnInit {

  @Output()
  dataEmmiter: EventEmitter<any>;

  informationFormBuilder: FormGroup;
  requiredFileType: string = '';
  fileAttachmentInfo: FileAttachmentInfo = {
    fileName: '',
    description: '',
    numberTicket: '',
    internalId: '',
  };
  file: any;
  dataEmmit: any

  constructor(private _formBuilder: FormBuilder) {
    this.informationFormBuilder = this._formBuilder.group({});
    this.dataEmmiter = new EventEmitter<string>();
    this.dataEmmit = {
      isValidFields: false,
      message: '',
      file: this.file,
      fileAttachmentInfo: this.fileAttachmentInfo
    }

    this.dataEmmiter = new EventEmitter<any>();
  }

  ngOnInit(): void {
  }

  get fields() {
    return this.informationFormBuilder.controls["fields"] as FormArray;
  }

  emmitData() {
    this.setFormValidators();
    this.setEmmitData();
    if (this.file) {
      this.clearFormValidators();
      this.dataEmmit.isValidFields = true;
      this.dataEmmiter.emit(this.dataEmmit);
    } else {
      const isValidData = this.fields.valid;
      this.dataEmmit.isValidFields = isValidData;
      this.dataEmmiter.emit(this.dataEmmit);
    }
  }

  clearFormValidators() {
    this.fields.controls.forEach((control) => {
      const form = this.getFormGroup(control);
      form.controls['source'].clearValidators();
      form.controls['destination'].clearValidators();
      form.controls['source'].setErrors(null);
      form.controls['destination'].setErrors(null);
      form.updateValueAndValidity();
    })
    this.informationFormBuilder.updateValueAndValidity();
  }

  setFormValidators() {
    this.fields.controls.forEach((control) => {
      const form = this.getFormGroup(control);
      form.controls['source'].setValidators([Validators.required]);
      form.controls['destination'].setValidators([Validators.required]);
      form.controls['source'].updateValueAndValidity();
      form.controls['destination'].updateValueAndValidity();
      form.updateValueAndValidity();
    })
    this.fields.updateValueAndValidity();
    this.informationFormBuilder.updateValueAndValidity();
  }
  setEmmitData() {
    this.dataEmmit.message = '';
    this.fields.controls.forEach((control) => {
      const form = this.getFormGroup(control);
      this.dataEmmit.message = this.dataEmmit.message.concat(
        'Origen: ', form.controls['source'].value,
        ', Destino: ', form.controls['destination'].value,
        '\n'
      );
    })
  }

  getFormGroup(control: AbstractControl) {
    return control as FormGroup;
  }

  addFields() {
    const wsaForm = this._formBuilder.group({
      source: ['', Validators.required],
      destination: ['', Validators.required]
    });

    this.fields.push(wsaForm);
    this.emmitData();
  }

  deleteFields(index: number) {
    this.fields.removeAt(index);
    this.emmitData();
  }

  selectFile(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      this.fileAttachmentInfo.fileName = this.file.name
      this.dataEmmit.fileAttachmentInfo = this.fileAttachmentInfo;
      this.dataEmmit.file = this.file;
    }

    this.emmitData();
  }

  removeFile() {
    this.fileAttachmentInfo.fileName = '';
    this.informationFormBuilder.controls['file'].reset();
    this.file = null;
    this.dataEmmit.fileAttachmentInfo = null;
    this.dataEmmit.file = null;
    this.fields

    this.emmitData();
  }

}
