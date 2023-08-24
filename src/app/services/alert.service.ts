import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() {}

  showSweetWarning(title: string, text: string) {
		swal.fire({
			title,
			text,
      buttonsStyling: true,
			confirmButtonColor: 'green',
			icon: 'warning'
		});
	}

  showSweetWarningHTML(title: string, html:string, width = 400, buttonsStyling = false) {
		swal.fire({
			title,
			html,
			icon: 'warning',
			width,
      buttonsStyling: true,
			confirmButtonColor: 'green',
		});
	}
}
