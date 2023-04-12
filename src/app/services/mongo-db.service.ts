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

  //? this is the method which we get the local storage id then we get which user is logged in
  localStorage() {
    return localStorage.getItem('id')
  }

  // ******************************************user login register**************************/
  addUser(api: string, data: register): Observable<any> {
    return this.http.post(api, data)
  }
  loginUser(api: string, data: login) {
    return this.http.post(api, data)
  }
  //***************************************************sites **************************** */
  // ? getting all the sites inside the dashboard component
  getSites() {
    const id = localStorage.getItem('id')
    return this.http.get(`http://localhost:4000/siteList/${id}`)
  }

  //? adding one site
  addSites(data: any): Observable<any> {
    const id = this.localStorage()
    return this.http.put(`http://localhost:4000/add/${id}`, { sites: data })
  }

  updateSites(sitesId: String, data: any) {
    const id = this.localStorage()
    return this.http.put(`http://localhost:4000/updateSites/${sitesId}/${id}`, data)
  }
  // ?delete sites

  deleteSite(id: String) {
    const userId = this.localStorage()
    return this.http.delete(`http://localhost:4000/siteDelete/${id}/${userId}`)
  }

  // ? getting only one siteObject using the id
  getObject(id: string) {
    const userId = this.localStorage()
    return this.http.get(`http://localhost:4000/siteObject/${id}/${userId}`)
  }

  // *********************************passwordList **************************************/
  // ?creating password list inside the passwordList array and each password is a object
  CreatePasswordList(id: string, data: object) {
    const userId = this.localStorage()
    return this.http.put(`http://localhost:4000/sitePasswordCreate/${id}/${userId}`, data)
  }

  //? updating each of the password
  updatePasswordList(id: string, data: object, SitesId: string) {
    const userId = this.localStorage()
    return this.http.put(`http://localhost:4000/siteUpdatePassword/${id}/${userId}/${SitesId}`, data)
  }

  //? deleting each of the password list stored inside the passwordList
  deletePasswordList(id: string, SitesId: string) {
    const userId = this.localStorage()
    return this.http.delete(`http://localhost:4000/siteDeletePassword/${id}/${userId}/${SitesId}`)
  }

}
