import { Component, OnInit } from '@angular/core';
import { MongoDBService } from 'src/app/services/mongo-db.service';
// import { createAvatar } from '@dicebear/avatars';
// import * as avatarsMale from '@dicebear/avatars';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private mongoService: MongoDBService,
    private toaster: ToastrService
  ) { }
  avatarSvg!: any
  siteArray!: any
  isShow: Boolean = false
  fullUser!: any
  generatePasswords!: any

  // ? this is a method in dashboard to delete the site inside that component
  deleteSite(id: String) {
    const result = confirm("Are you sure want to delete remember if you delete the site the password stored in that sites will be deleted")
    if (result) {
      this.mongoService.deleteSite(id).subscribe({
        next: (res) => { console.log(res) },
        error: (e) => { console.log(e) },
        complete: () => { location.reload() }
      })
    } else {
    }

  }

  hideOff() {
    this.isShow = !this.isShow
  }

  ngOnInit(): void {
    this.mongoService.getSites().subscribe({
      next: (res: any) => { console.log(res), this.siteArray = res.sites },
      error: (err) => { console.log(err) },
      complete: () => console.log(this.siteArray)
    })
    this.mongoService.DetailsAboutUser().subscribe((val) => {
      this.fullUser = val
      console.log(this.fullUser)
    })

    //   const seed = Math.random().toString(36).substring(7); // Generate a random seed
    //   const avatar = createAvatar(avatarsMale, {
    //     seed: seed,
    //     background: '#FDB813',
    //     color: ['#FFFFFF', '#F8F9FA', '#CED4DA', '#6C757D', '#343A40'],
    //     radius: 50,
    //     margin: 10
    //   });

    //   this.avatarSvg = avatar;

  }

  generatePassword(length: number = 16): void {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';

    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    this.generatePasswords = password;
    navigator.clipboard.writeText(this.generatePasswords)
    console.log(this.generatePasswords)
    this.toaster.success("Password copied to clipboard")
  }

}
