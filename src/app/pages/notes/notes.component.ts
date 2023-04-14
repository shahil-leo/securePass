import { Component, OnInit } from '@angular/core';
import { MongoDBService } from 'src/app/services/mongo-db.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  isBool: boolean = false
  // ngModel
  headingModel!: any
  sideHeadingModel!: any
  paragraphModel!: any
  // array of notes
  notesArray: any
  notesObject: any

  constructor(
    private mongoServie: MongoDBService,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.mongoServie.getNotes().subscribe({
      next: (res) => {
        this.notesArray = res,
          this.notesObject = this.notesArray.note
        console.log(this.notesObject)
      },
      error: (e) => { console.log(e) },
      complete: () => { console.log('suii') },
    })
  }

  hideUnhide() {
    this.isBool = !this.isBool
  }

  FormSubmit(FormData: any) {
    console.log(FormData.value)
    this.mongoServie.addNotes(FormData.value).subscribe({
      next: (res) => { },
      error: (e) => { this.toaster.error(e.message) },
      complete: () => {
        FormData.reset()
        this.toaster.success("Note added successfully")
        this.isBool = false
        location.reload()
      }
    })
  }


}
