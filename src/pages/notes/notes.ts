import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {NavController, ViewController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html'
})
export class NotesPage {
  noteForm:FormGroup;
  // noteText = [];
  tab1: any;
  tab2: any;
  constructor(public navCtrl: NavController, private fb: FormBuilder, private viewCtrl: ViewController) {
    this.noteForm = this.fb.group(
{
         'noteText': ['', Validators.required]
            }
       );

  }

  // snapshotPicture() {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   }
  //
  //   this.camera.getPicture(options).then((imageData) => {
  //     // imageData is either a base64 encoded string or a file URI
  //     // If it's base64:
  //     let base64Image = 'data:image/jpeg;base64,' + imageData;
  //   }, (err) => {
  //     // Handle error
  //   });
  // }

  saveNote() {
    console.log("Note Save")
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
