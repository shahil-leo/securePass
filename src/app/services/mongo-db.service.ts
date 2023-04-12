import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
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

  // adding one site
  addSites(data: any): Observable<any> {
    console.log(data);
    const id = localStorage.getItem('id')
    console.log(id)
    return this.http.put(`http://localhost:4000/add/${id}`, { sites: data })
  }

  // getting all the sites inside the dashboard component
  getSites() {
    const id = localStorage.getItem('id')
    console.log(`This is the id that the userId logged in ${id}`);
    return this.http.get(`http://localhost:4000/siteList/${id}`)
  }
  // getting only one siteObject using the id
  getObject(id: string) {
    const userId = localStorage.getItem('id')
    return this.http.get(`http://localhost:4000/siteObject/${id}/${userId}`)
  }

  CreatePasswordList(id: string, data: object) {
    const userId = localStorage.getItem('id')
    console.log({ id, userId })
    return this.http.put(`http://localhost:4000/sitePasswordCreate/${id}/${userId}`, data)
  }

  updatePasswordList(id: string, data: object, SitesId: string) {
    const userId = localStorage.getItem('id')
    console.log({ id, userId, SitesId })
    return this.http.put(`http://localhost:4000/siteUpdatePassword/${id}/${userId}/${SitesId}`, data)
  }


  deletePasswordList(id: string) {
    const userId = localStorage.getItem('id')
    console.log({ id, userId });
    return this.http.delete(`http://localhost:4000/siteDeletePassword/${id}/${userId}`)

  }

}
