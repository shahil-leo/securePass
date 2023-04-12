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
  StaticTemplate: string = "Add New "
  PasswordSee: boolean = false


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
    } else if (this.formState === 'Edit') {

      const passwordHash = crypto.AES.encrypt(this.Form.value.password, 'haneena').toString()

      console.log(this.Form.value)
      const FormEncryptedData = {
        email: this.Form.value.email,
        username: this.Form.value.username,
        passwordHint: this.Form.value.passwordHint,
        password: passwordHash
      }
      console.log(FormEncryptedData)

      this.mongoService.updatePasswordList(this.passwordOneId, FormEncryptedData, this.siteId).subscribe({
        next: (res) => { console.log(res) },
        error: (e) => { this.toaster.error(e[0].message) },
        complete: () => {
          this.toaster.success("Updated the Password")
          location.reload()
          this.Form.reset()
        }
      })
    }
    else if (this.StaticTemplate) {

    }
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
    if (!(this.formState === 'Edit')) {
      alert(`Password is Securely Decrypted ${this.Decrypted}`)
    }
    return this.Decrypted
  }

  // this is the function we are calling when the user clicks the edit button
  updateForm(singlePassword: any) {
    this.formState = 'Edit'
    this.StaticTemplate = "Edit"
    const decryptedPass = this.decrypt(singlePassword.password)
    this.passwordOneId = singlePassword._id
    this.ngEmail = singlePassword.email
    this.ngUserName = singlePassword.username
    this.ngPasswordHint = singlePassword.passwordHint
    this.ngPassword = decryptedPass
  }
  // this is the function that will work when the user clicks the delete button and the parameter is the id which comes from the object
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
  // when the user clicks the buttont
  togglePasswordShow() {
    this.PasswordSee = !this.PasswordSee
    console.log(this.PasswordSee)
  }

  // testing which form control is not working using this
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

  // getting all the data controllers
  get fc() {
    return this.Form.controls
  }





}
