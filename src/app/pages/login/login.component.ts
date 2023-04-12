import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MongoDBService } from 'src/app/services/mongo-db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup
  loggedUserId!: string
  passwordVisible: boolean = false

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toaster: ToastrService,
    private mongoService: MongoDBService
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

  onSubmit() {
    this.mongoService.loginUser('http://localhost:4000/login', this.form.value).subscribe({
      next: (res: any) => { this.loggedUserId = res._id, this.toaster.success("login successFully") },
      error: (err: HttpErrorResponse) => this.toaster.error(err.error),
      complete: () => { localStorage.setItem('id', this.loggedUserId), this.router.navigate(['/dashboard']) }
    })

  }

  onTogglePasswordShow() {
    this.passwordVisible = !this.passwordVisible
  }

}
