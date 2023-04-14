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
  TypeOfNote: string = "Add"
  editNoteId!: string

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
    if (this.TypeOfNote === "Add") {
      console.log(FormData.value)
      this.mongoServie.addNotes(FormData.value).subscribe({
        next: (res) => { },
        error: (e) => { this.toaster.error(e.message) },
        complete: () => {
          FormData.reset()
          this.isBool = false
          location.reload()
          this.toaster.success("Note added successfully")
        }
      })
    } else if (this.TypeOfNote === 'Edit') {
      console.log(FormData.value)
      console.log(this.editNoteId)
      this.mongoServie.updateNotes(this.editNoteId, FormData.value).subscribe({
        next: (res) => { console.log(res) },
        error: (e) => { console.log(e) },
        complete: () => {
          FormData.reset()
          this.isBool = false
          this.toaster.success
        }
      })
    }
  }

  EditNote(input: any) {
    this.TypeOfNote = "Edit"
    this.isBool = true
    this.headingModel = input.heading
    this.sideHeadingModel = input.sideHeading
    this.paragraphModel = input.paragraph
    this.editNoteId = input._id
  }
  DeleteNote(id: string) {
    const deleteId = id
    this.mongoServie.DeleteNotes(id).subscribe({
      next: (res) => { console.log(res) },
      error: (e) => { console.log(e) },
      complete: () => { this.toaster.success('Deleted the note'), location.reload() }
    })
  }


}
