import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
    private router: Router
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
    // this.http.post('http://localhost:4000/register', this.Form.value).pipe(catchError((err) => this.handleError(err))).subscribe(() => {
    //   this.toaster.success('User created successFully')
    // })

    this.http.post('http://localhost:4000/register', this.Form.value).subscribe({
      next: (value) => console.log(value),
      error: (err) => this.handleError(err),
      complete: () => {
        this.router.navigate(['/dashboard'])
      }

    })
  }

  // handle error function
  handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      // Unauthorized access error
      console.error('Unauthorized shahil error:', error.error);
      this.toaster.error(error.error)
      return throwError(() => new Error('test'));
    } else {
      console.error('An error occurred:', error.error);
      this.toaster.error(error.error)

      return throwError(() => new Error('test'));
    }
  };

}




