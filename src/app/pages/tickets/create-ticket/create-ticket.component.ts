import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileAttachmentInfo } from 'src/app/model/form/fileAttachmentInfo';
import { AlertService } from 'src/app/services/alert.service';
import { CatalogService } from 'src/app/services/catalog.service';
import { CreateTicketService } from 'src/app/services/create-ticket.service';
import { GuiService } from 'src/app/services/gui.service';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss'],
})
export class CreateTicketComponent implements OnInit {
  FILTRADO_WEB_WSA: string = "Filtrado web WSA";
  FIREWALL: string = 'Firewall Cisco/Palo Alto';
  TITLE_SWEET_MESSAGE: string = "Atención";
  HTML_MESSAGE_ALERT: string = '<span>Para crear un ticket de esta categoría, '
    + 'necesitas tener aprobados los siguientes documentos:'
  // TODO: Poner los archivos permitidos para cargar.
  requiredFileType: string = '';

  ticketFormBuilder: FormGroup;
  fileAttachmentInfo: FileAttachmentInfo = {
    fileName: '',
    description: '',
    numberTicket: '',
    internalId: ''
  };

  file: any;
  dynamicDataFile: any;
  userName: string = '';
  selectedTicketType: string = '';
  selectedCategory: string = '';

  ticketsType: string[] = [];
  // status: string[] = [];
  priorities: string[] = [];
  categories: string[] = [];
  subcategories: string[] = [];
  // types: string[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _catalogService: CatalogService,
    private _guiService: GuiService,
    private _createTicketService: CreateTicketService,
    private _alertService: AlertService
  ) {
    this.ticketFormBuilder = this._formBuilder.group({
      applicant: ['', [Validators.required]],
      ticketType: ['', [Validators.required]],
      status: [{ value: 'Nuevo', disabled: true }, [Validators.required]],
      priority: ['', [Validators.required]],
      category: ['', [Validators.required]],
      subcategory: ['', [Validators.required]],
      // type: ['', [Validators.required]],
      sourceIPAddres: [''],
      destinationIPAddres: [''],
      port: ['', [Validators.min(0)]],
      summary: ['', [Validators.required]],
      description: ['', [Validators.required]],
      dynamicData: ['', [Validators.required]],
      file: ['']
    });

    this.dynamicDataFile = {
      fileAttachmentInfo: null,
      file: null
    };
  }

  ngOnInit() {
    this.getTicketsType();
    // this.getStatus();
    this.getPriorities();
    this.getUserName();
  }

  getUserName() {
    this._guiService.userData$.subscribe((user: any) => {
      const fullName = user.firstName + ' ' + user.lastName;
      const userName = user.userName;
      this.userName = user.firstName && user.lastName ? fullName : userName;
    })

    this.ticketFormBuilder.controls['applicant'].setValue(this.userName)
    this.ticketFormBuilder.controls['applicant'].disable()
  }

  getTicketsType() {
    this.ticketsType = this._catalogService.getTicketsType();
  }

  // getStatus() {
  //   this.status = this._catalogService.getStatus();
  // }

  getPriorities() {
    this.priorities = this._catalogService.getPriorities();
  }

  getCategories() {
    // Clears category and subcategory component when ticket type component changes
    this.ticketFormBuilder.controls["category"].setValue("");
    this.ticketFormBuilder.controls["subcategory"].setValue("");
    this.subcategories = [];

    this._catalogService.getCategories(this.selectedTicketType).forEach((item) => {
      this.categories = [...item.categories]
    });

    this.categories = this.filterDuplicateRecords(this.categories)

  }

  getSubcategories() {
    // Clears the subcategory component when the category component changes
    this.ticketFormBuilder.controls["subcategory"].setValue("");

    this._catalogService.getSubcategories(this.selectedCategory, this.selectedTicketType).forEach((item) => {
      this.subcategories = [...item.subcategories]
    });
    this.subcategories = this.filterDuplicateRecords(this.subcategories)
  }

  // getTypes() {
  //   // Clears the type component when the ticket type component changes
  //   this.ticketFormBuilder.controls["type"].setValue("");

  //   this._catalogService.getTypes(this.selectedTicketType).forEach((item) => {
  //     this.types = [...item.types]
  //   });

  //   this.types = this.filterDuplicateRecords(this.types)
  // }

  filterDuplicateRecords(list: string[]) {
    return list.filter((item, index) =>
      list.indexOf(item) === index
    )
  }

  selectFile(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      this.fileAttachmentInfo.fileName = this.file.name
    }
  }

  uploadFile(fileAttachmentInfo: FileAttachmentInfo, file: any) {
    this._createTicketService.uploadFile(fileAttachmentInfo, file).subscribe({
      next: (response) => {
        console.log("RESPONSE CORRECT:", response);
      },
      error: (error) => {
        console.log("ERROR:", error)
      },
      complete: () => {
        console.log("REQUEST COMPLETED");
      }
    })
  }


  removeFile() {
    this.fileAttachmentInfo.fileName = '';
    this.ticketFormBuilder.controls['file'].reset();
  }

  createTicket() {
    //TODO: Implemetar función para enviar información del formulario.
    console.log("VALORES FORMULARIO:", this.ticketFormBuilder.getRawValue())
    this.uploadFile(this.fileAttachmentInfo, this.file);
    if (this.dynamicDataFile.file) {
      this.uploadFile(this.dynamicDataFile.fileAttachmentInfo, this.dynamicDataFile.file);
    }
  }

  validateDynamicData(event: any) {
    if (event.isValidFields) {
      this.ticketFormBuilder.controls['dynamicData'].setValue(event.message);
      const { fileAttachmentInfo, file } = event;
      this.dynamicDataFile.fileAttachmentInfo = fileAttachmentInfo;
      this.dynamicDataFile.file = file;
    } else {
      this.ticketFormBuilder.controls['dynamicData'].setValue('');
      this.dynamicDataFile.fileAttachmentInfo = null;
      this.dynamicDataFile.file = null;
    }
  }

  categorySelectionChange(event: any) {
    if (event.value == this.FILTRADO_WEB_WSA) {
      this._alertService.showSweetWarningHTML(
        this.TITLE_SWEET_MESSAGE,
        this.HTML_MESSAGE_ALERT + '<br>•Formulario A<br>•Formulario B<br>•Formulario C </span>',
        500
      );
    } else if (event.value == this.FIREWALL) {
      this._alertService.showSweetWarningHTML(
        this.TITLE_SWEET_MESSAGE,
        this.HTML_MESSAGE_ALERT + '<br>•Formulario 1<br>•Formulario 2<br></span>',
        500
      );
    }
  }

}
