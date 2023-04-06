import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { register, login } from '../../../src/app/models/mongo-data'

@Injectable({
  providedIn: 'root'
})
export class MongoDBService {


  constructor(
    private http: HttpClient
  ) { }


  addUser(api: string, data: register): Observable<any> {
    return this.http.post(api, data)
  }
  loginUser(api: string, data: login) {
    return this.http.post(api, data)
  }


  addSites(data: any): Observable<any> {
    console.log(data);
    const id = localStorage.getItem('id')
    return this.http.put(`http://localhost:4000/add/${id}`, { sites: data })
  }

  getSites() {
    const id = localStorage.getItem('id')
    console.log(id);
    return this.http.get(`http://localhost:4000/siteList/${id}`)
  }

}
