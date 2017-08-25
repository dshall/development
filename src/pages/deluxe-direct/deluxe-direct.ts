import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignPackagePage } from '../sign-package/sign-package';
import { NotesPage } from '../notes/notes';
import { ReturnPackagePage } from '../return-package/return-package';
import { UpdatePackagePage } from '../update-package/update-package';

@Component({
  selector: 'page-deluxe-direct',
  templateUrl: 'deluxe-direct.html'
})
export class DeluxeDirectPage {

  constructor(public navCtrl: NavController) {
  }
  goToSignPackage(params){
    if (!params) params = {};
    this.navCtrl.push(SignPackagePage);
  }goToNotes(params){
    if (!params) params = {};
    this.navCtrl.push(NotesPage);
  }goToReturnPackage(params){
    if (!params) params = {};
    this.navCtrl.push(ReturnPackagePage);
  }goToUpdatePackage(params){
    if (!params) params = {};
    this.navCtrl.push(UpdatePackagePage);
  }
}
