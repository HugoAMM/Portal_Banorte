import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileAttachmentInfo } from '../model/form/fileAttachmentInfo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateTicketService {

  constructor(private _httpClient: HttpClient) { }

  uploadFile(fileAttachmentInfo: FileAttachmentInfo, file: Blob): Observable<any> {
    const formData = new FormData();
    formData.append("file", file)
    formData.append("description", fileAttachmentInfo.description)
    formData.append("numberTicket", fileAttachmentInfo.numberTicket)
    formData.append("internalId", fileAttachmentInfo.internalId)

    return this._httpClient.post('http://localhost:8081/api/v2/tickets/upload-file', formData)
  }
}
