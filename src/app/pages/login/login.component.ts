import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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



    const result = await this.http.post('http://localhost:4000/login', this.form.value)
    result.subscribe((value) => {
      if (value) {
        this.toaster.success("Logged In successFully")
        this.router.navigate(['/dashboard'])
      }
    })
    this.form.reset()
  }

}
