import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { register, login } from '../../../src/app/models/mongo-data'

@Injectable({
  providedIn: 'root'
})
export class MongoDBService {


  constructor(
    private toaster: ToastrService,
    private http: HttpClient
  ) { }


  addUser(api: string, data: register): Observable<any> {
    return this.http.post(api, data)
  }
  loginUser(api: string, data: login) {
    return this.http.post(api, data)
  }

}
