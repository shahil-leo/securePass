import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MongoDBService } from 'src/app/services/mongo-db.service';


@Component({
  selector: 'app-register-password',
  templateUrl: './register-password.component.html',
  styleUrls: ['./register-password.component.scss']
})
export class RegisterPasswordComponent implements OnInit {

  siteId!: string
  siteType!: string
  Form!: FormGroup

  siteObject!: any

  constructor(
    private route: ActivatedRoute,
    private mongoService: MongoDBService,
    private fb: FormBuilder
  ) {
    // Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")
    // Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    this.Form = fb.group({
      email: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(2)]],
      passwordHint: ['', Validators.required],
      password: ['', [Validators.required]],
    })
  }

  submit() {



    console.log(this.Form.value)

  }

  get fc() {
    return this.Form.controls
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.siteId = params['id']
      this.siteType = params['data']
    })
    this.siteObject = this.mongoService.getObject(this.siteId).subscribe({
      next: (res) => { this.siteObject = res },
      error: (err) => { console.log(err) },
      complete: () => { console.log('got the site man'), console.log(this.siteObject) }
    })
  }

}
