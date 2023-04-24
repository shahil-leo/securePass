import { Sites, fullResAllPass } from './../../models/interface';
import { Component, OnInit } from '@angular/core';
import { MongoDBService } from 'src/app/services/mongo-db.service';
import * as crypto from 'crypto-js';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-pass',
  templateUrl: './all-pass.component.html',
  styleUrls: ['./all-pass.component.scss']
})
export class AllPassComponent implements OnInit {

  allPass!: any
  passwordList!: Sites
  fullPasswordList: Sites[] = []
  DecryptedPassword!: string
  constructor(
    private mongoService: MongoDBService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.mongoService.getAllPass().subscribe(
      {
        next: (res) => {
          this.allPass = res;
        },
        error: (e) => { console.log(e) },
        complete: () => {
          this.allPass.map((val: fullResAllPass) => {
            this.passwordList = val.passwordList,
              this.fullPasswordList.push(this.passwordList)
          })
        }
      }
    )
  }

  viewPassword(password: string) {
    const bytes = crypto.AES.decrypt(password, 'haneena');
    this.DecryptedPassword = bytes.toString(crypto.enc.Utf8);
    alert(this.DecryptedPassword)
  }
  deletePass(sitesId: string, id: string) {
    const condition = confirm('Are you sure want to delete the password item')
    if (condition) {
      const userId = localStorage.getItem('id')
      this.mongoService.deletePasswordList(id, sitesId).subscribe(
        {
          next: (res) => { },
          error: (e) => { console.log(e) },
          complete: () => {
            this.toastr.success("successfully deleted "),
              location.reload()
          }
        }
      )
    } else {
      console.log('Error in deleting password')
    }

  }

  passDataService(item: any, id: string) {

    this.mongoService.DataAllPass = item
    this.mongoService.DataAllPassId = id
  }

}
