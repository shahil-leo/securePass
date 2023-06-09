import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MongoDBService } from 'src/app/services/mongo-db.service';
import * as crypto from 'crypto-js';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PasswordList, Sites, fullResAllPass } from 'src/app/models/interface';


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
  passwordList!: PasswordList[]
  Decrypted!: string
  siteSingleObject: any
  formState: string = 'Add'
  passwordOneId!: string
  StaticTemplate: string = "Add New "
  PasswordSee: boolean = false
  ShowPasswordList: boolean = false
  // ngModel Section for edit
  ngEmail!: string
  ngUserName!: string
  ngPasswordHint!: string
  ngPassword!: string
  // the all pass updating password from other component
  updatePassFromAllPass!: fullResAllPass
  singleData!: PasswordList

  constructor(
    private route: ActivatedRoute,
    private mongoService: MongoDBService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private Router: Router
  ) {

    this.Form = fb.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      passwordHint: ['', Validators.required],
      password: ['', Validators.required],
    })

  }

  submit() {
    if (this.formState === 'Add') {
      if (this.siteType === "edit") {
        const data = {
          _id: this.siteId,
          siteName: this.Form.value.email,
          siteUrl: this.Form.value.username,
          siteImgUrl: this.Form.value.passwordHint,
          Category: this.Form.value.password,
          passwordList: this.passwordList
        }
        this.mongoService.updateSites(this.siteId, data).subscribe({
          next: (res) => { res },
          error: (e) => { console.log(e) },
          complete: () => {
            this.toaster.success("Added the Password")
            this.Router.navigate(['/dashboard'])
          }
        })
      } else {
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
      }

    } else if (this.formState === 'Edit') {

      const passwordHash = crypto.AES.encrypt(this.Form.value.password, 'haneena').toString()

      const FormEncryptedData = {
        email: this.Form.value.email,
        username: this.Form.value.username,
        passwordHint: this.Form.value.passwordHint,
        password: passwordHash
      }

      this.mongoService.updatePasswordList(this.passwordOneId, FormEncryptedData, this.siteId).subscribe({
        next: (res) => { console.log(res) },
        error: (e) => { this.toaster.error(e[0].message) },
        complete: () => {
          this.toaster.success("Updated the Password")
          if (this.siteType === 'all-pass-edit') {
            this.Router.navigate(['/all-pass'])
          } else {
            this.Form.reset()
            location.reload()
          }

        }
      })
    }

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.siteId = params['id']
      this.siteType = params['data']
    })
    //getting the sites that we created earlier to show the user which site you are adding details

    if (this.siteType === "edit") {
      this.ShowPasswordList = true
      this.mongoService.getObject(this.siteId).subscribe({
        next: (res) => { console.log(res), this.siteSingleObject = res },
        error: (e) => { console.log(e) },
        complete: () => {
          this.ngEmail = this.siteSingleObject.siteName,
            this.ngUserName = this.siteSingleObject.siteUrl,
            this.ngPasswordHint = this.siteSingleObject.siteImgUrl,
            this.ngPassword = this.siteSingleObject.Category
        }
      })
    } else if (this.siteType === 'all-pass-edit') {
      this.formState = 'Edit'
      this.StaticTemplate = "Edit"
      const allPassData = this.mongoService.DataAllPass
      const allPassDataId = this.mongoService.DataAllPassId
      const passwordList = allPassData.passwordList
      passwordList.map((val: any) => { if (val._id === allPassDataId) this.singleData = val })
      this.passwordOneId = allPassDataId
      this.siteId = allPassData._id
      this.updateForm(this.singleData)
    }

    this.siteObject = this.mongoService.getObject(this.siteId).subscribe({
      next: (res) => { this.siteObject = res, this.passwordList = this.siteObject.passwordList },
      error: (err) => { console.log(err), console.log(this.siteObject) },
      complete: () => { console.log(this.siteObject) }
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
    const isTrue = confirm("Are you sure you will lose the data")
    if (isTrue) {
      this.mongoService.deletePasswordList(id, this.siteId).subscribe({
        next: (res) => { },
        error: (err) => { this.toaster.error(err[0].message) },
        complete: () => {
          this.toaster.success("Deleted successFully")
          location.reload()
        }
      })
    } else {
      console.log('failed to delete password')
    }

  }
  // when the user clicks the buttont
  togglePasswordShow() {
    this.PasswordSee = !this.PasswordSee
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
