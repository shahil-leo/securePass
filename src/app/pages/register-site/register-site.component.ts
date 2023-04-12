import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MongoDBService } from 'src/app/services/mongo-db.service';
@Component({
  selector: 'app-register-site',
  templateUrl: './register-site.component.html',
  styleUrls: ['./register-site.component.scss']
})
export class RegisterSiteComponent {

  Form!: FormGroup

  constructor(
    private fb: FormBuilder,
    private mongoService: MongoDBService,
    private toaster: ToastrService,
    private router: Router,
  ) {
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
    this.mongoService.addSites(this.Form.value).subscribe(
      {
        next: (res) => { this.toaster.success("Site successfully added"), console.log(res) },
        error: (e) => this.toaster.error(e.error),
        complete: () => { this.router.navigate(['/dashboard']) }
      },
    )
  }

}
