import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUrl: String = "http://localhost:8086/data-items"
  constructor(private http:HttpClient) { }
  getDataByTopic(id:any){
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
