import { Component, OnInit } from '@angular/core';
import { MongoDBService } from 'src/app/services/mongo-db.service';

@Component({
  selector: 'app-all-pass',
  templateUrl: './all-pass.component.html',
  styleUrls: ['./all-pass.component.scss']
})
export class AllPassComponent implements OnInit {

  allPass!: any
  passwordList: any[] = []
  fullDetail!: any
  array: any[] = []
  constructor(private mongoService: MongoDBService) { }

  ngOnInit(): void {
    this.mongoService.getAllPass().subscribe(
      {
        next: (res) => {
          this.allPass = res, console.log(this.allPass);
        },
        error: (e) => { console.log(e) },
        complete: () => {
          this.allPass.map((val: any) => {
            this.passwordList = val.passwordList,
              this.passwordList.map((val: any) => { this.fullDetail = val, this.array.push(this.fullDetail), console.log(this.fullDetail) })
          })
        }
      }
    )
  }
}
