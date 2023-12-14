import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MainService {

  private apiUrl = 'http://localhost:8086'; // Replace with your actual backend API URL

  constructor(private http: HttpClient) { }

  getSubjects() {
    return this.http.get(`${this.apiUrl}/subjects`);
  }
  saveAll(formData: FormData) {

    return this.http.post(`${this.apiUrl}/data-items/upload`, formData);
  }
  getFileData(dataItemId: any){
   
    return this.http.get(`${this.apiUrl}/data-items/getFileData/${dataItemId}`, { responseType: 'arraybuffer' })

  }
}
