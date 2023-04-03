import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    private http: HttpClient
  ) {
    this.Form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    })
    // console.log(this.fc['firstName']);

  }

  get fc() {
    return this.Form?.controls
  }


  async onSubmit() {
    console.log('shahil')
    console.log(this.Form.value);
    this.data = await this.http.post('http://localhost:4000/register', this.Form.value)
    this.data.subscribe(console.log)
    this.Form.reset()
  }

}

