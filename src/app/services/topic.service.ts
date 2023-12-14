import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private apiUrl = 'http://localhost:8086'; // Replace with your actual backend API URL

  constructor(private http: HttpClient) { }

  getTopics(id:any) {
    return this.http.get(`${this.apiUrl}/topics/${id}`);
  }

}
