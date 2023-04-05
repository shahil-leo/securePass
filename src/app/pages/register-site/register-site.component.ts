import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-site',
  templateUrl: './register-site.component.html',
  styleUrls: ['./register-site.component.scss']
})
export class RegisterSiteComponent {

  Form!: FormGroup

  constructor(private fb: FormBuilder) {
    this.Form = fb.group({
      siteName: ['', [Validators.required, Validators.minLength(2)]],
      siteUrl: ['', [Validators.required, Validators.minLength(4)]],
      siteImgUrl: ['', [Validators.required, Validators.minLength(4)]],
      Category: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  get fc() {
    return this.Form?.controls
  }
  submit() {
    console.log('shahil');
    console.log(this.Form.value);
  }

}
