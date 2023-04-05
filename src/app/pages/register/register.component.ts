import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MongoDBService } from 'src/app/services/mongo-db.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  data!: Observable<any>
  Form!: FormGroup

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toaster: ToastrService,
    private router: Router,
    private mongoService: MongoDBService
  ) {
    this.Form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    })

  }

  get fc() {
    return this.Form?.controls
  }


  onSubmit() {
    this.mongoService.addUser('http://localhost:4000/register', this.Form.value).subscribe(
      {
        next: () => this.toaster.success("Registration Successfully"),
        error: (err: HttpErrorResponse) => { this.toaster.error(err.error), console.log(err.error) },
        complete: () => this.router.navigate(['/dashboard'])
      }
    )
  }

}




