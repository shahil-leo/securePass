import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MongoDBService } from 'src/app/services/mongo-db.service';
import * as crypto from 'crypto-js';
import { ToastrService } from 'ngx-toastr';


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
  passwordList!: any
  Decrypted!: any
  formState: string = 'Add'
  passwordOneId!: string

  // ngModel Section for edit
  ngEmail!: string
  ngUserName!: string
  ngPasswordHint!: string
  ngPassword!: string

  constructor(
    private route: ActivatedRoute,
    private mongoService: MongoDBService,
    private fb: FormBuilder,
    private toaster: ToastrService
  ) {

    this.Form = fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]],
      username: ['', [Validators.required, Validators.minLength(2)]],
      passwordHint: ['', Validators.required],
      password: ['', [Validators.required]],
    })

  }

  submit() {
    if (this.formState === 'Add') {
      console.log(this.siteObject)
      this.mongoService.CreatePasswordList(this.siteId, this.Form.value).subscribe(
        {
          next: (res) => console.log(res),
          error: (err) => { this.toaster.error(err[0].message) },
          complete: () => {
            this.toaster.success("Added the Password")
            location.reload()
            this.Form.reset()
          }
        })
      console.log(this.Form.value)
    } else if (this.formState === 'Edit') {
      this.mongoService.updatePasswordList(this.passwordOneId, this.Form.value, this.siteId).subscribe({
        next: (res) => { console.log(res) },
        error: (e) => { this.toaster.error(e[0].message) },
        complete: () => {
          this.toaster.success("Updated the Password")
          location.reload()
          this.Form.reset()
        }
      })
    }

  }

  get fc() {
    return this.Form.controls
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.siteId = params['id']
      this.siteType = params['data']
    })
    //getting the sites that we created earlier to show the user which site you are adding details
    console.log(this.siteId)
    this.siteObject = this.mongoService.getObject(this.siteId).subscribe({
      next: (res) => { this.siteObject = res, this.passwordList = this.siteObject.passwordList },
      error: (err) => { console.log(err), console.log(this.siteObject) },
      complete: () => { console.log(this.passwordList) }
    })
  }

  decrypt(password: string) {
    const bytes = crypto.AES.decrypt(password, 'haneena');
    this.Decrypted = bytes.toString(crypto.enc.Utf8);
    // alert(`Password is Securely Decrypted ${this.Decrypted}`)
    return this.Decrypted
  }

  updateForm(list: any) {
    const decryptedPass = this.decrypt(list.password)
    this.passwordOneId = list._id
    this.formState = 'Edit'
    this.ngEmail = list.email
    this.ngUserName = list.username
    this.ngPasswordHint = list.passwordHint
    this.ngPassword = decryptedPass
  }

  deletePassword(id: string) {
    this.mongoService.deletePasswordList(id, this.siteId).subscribe({
      next: (res) => { console.log(res) },
      error: (err) => { this.toaster.error(err[0].message) },
      complete: () => {
        this.toaster.success("Deleted successFully")
        location.reload()
      }
    })
  }


  findInvalidControls() {
    const invalid = [];
    const controls = this.Form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }


}
