import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { register, login } from '../../../src/app/models/mongo-data'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MongoDBService {

  constructor(
    private http: HttpClient,
    private route: Router,
    private toastr: ToastrService
  ) { }

  DataAllPass: any
  DataAllPassId!: string

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

  DetailsAboutUser() {
    const id = this.localStorage()
    return this.http.get(`http://localhost:4000/user/details/${id}`)
  }

  //***************************************************sites **************************** */
  // ? getting all the sites inside the dashboard component
  getSites() {
    const id = localStorage.getItem('id')
    return this.http.get(`http://localhost:4000/site/details/${id}`)
  }

  //? adding one site
  addSites(data: any): Observable<any> {
    const id = this.localStorage()
    return this.http.put(`http://localhost:4000/site/add/${id}`, { sites: data })
  }

  updateSites(sitesId: String, data: any) {
    const id = this.localStorage()
    return this.http.put(`http://localhost:4000/site/update/${sitesId}/${id}`, data)
  }
  // ?delete sites

  deleteSite(id: String) {
    const userId = this.localStorage()
    return this.http.delete(`http://localhost:4000/site/delete/${id}/${userId}`)
  }

  // ? getting only one siteObject using the id
  getObject(id: string) {
    const userId = this.localStorage()
    return this.http.get(`http://localhost:4000/site/object/${id}/${userId}`)
  }

  // *********************************passwordList **************************************/
  // ?creating password list inside the passwordList array and each password is a object
  CreatePasswordList(id: string, data: object) {
    const userId = this.localStorage()
    return this.http.put(`http://localhost:4000/password/create/${id}/${userId}`, data)
  }

  //? updating each of the password
  updatePasswordList(id: string, data: object, SitesId: string) {
    const userId = this.localStorage()
    return this.http.put(`http://localhost:4000/password/update/${id}/${userId}/${SitesId}`, data)
  }

  //? deleting each of the password list stored inside the passwordList
  deletePasswordList(id: string, SitesId: string) {
    const userId = this.localStorage()
    return this.http.delete(`http://localhost:4000/password/delete/${id}/${userId}/${SitesId}`)
  }

  // ************************************** all pas ************************************/
  getAllPass() {
    const userId = this.localStorage()
    return this.http.get(`http://localhost:4000/every/pass/${userId}`)
  }

  // ***************************************notes ****************************************/

  addNotes(data: any) {
    const userId = this.localStorage()
    return this.http.put(`http://localhost:4000/note/add/${userId}`, data)
  }

  getNotes() {
    const userId = this.localStorage()
    return this.http.get(`http://localhost:4000/note/get/${userId}`)
  }

  updateNotes(id: string, updatedData: any) {
    const userId = this.localStorage()
    return this.http.put(`http://localhost:4000/note/update/${userId}/${id}`, updatedData)
  }
  DeleteNotes(id: string) {
    const userId = this.localStorage()
    return this.http.delete(`http://localhost:4000/note/delete/${userId}/${id}`)
  }

  checkJwt() {
    const token = localStorage.getItem('token')
    if (token) {
      return this.http.get(`http://localhost:4000/user/jwt/${token}`)
    }
    else {
      this.route.navigate(['/login']);
      this.toastr.warning("You don't have permission to access the page ");
      return this.http.get(`http://localhost:4000/user/jwt/${token}`)
    }

  }


}
