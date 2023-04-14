import { Component, OnInit } from '@angular/core';
import { MongoDBService } from 'src/app/services/mongo-db.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private mongoService: MongoDBService
  ) { }

  siteArray!: any
  isShow!: any
  fullUser!: any

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
      location.reload()
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
  }

}
