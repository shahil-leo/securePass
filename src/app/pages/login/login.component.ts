import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toaster: ToastrService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
    })
  }

  get fc() {
    return this.form.controls

  }

  async onSubmit() {
    this.http.post('http://localhost:4000/login', this.form.value).subscribe({
      next: () => this.toaster.success("login successFully"),
      error: (err) => this.handleError(err),
      complete: () => { this.router.navigate(['/dashboard']) }
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
