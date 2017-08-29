import {Component, OnInit, ViewChild} from '@angular/core';
import { NgClass } from '@angular/common';
import { MenuController,  ModalController , NavController, ViewController, NavParams } from 'ionic-angular';
import { List } from 'ionic-angular';

import { SignPackagePage} from '../sign-package/sign-package';
import {CourierService} from "../shared/services/courier.service";
import {JobDetailsPage} from "../jobs/job-details/job-details";
import {NotesPage} from "../notes/notes";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  @ViewChild(List) list: List;

  items: string[];
  courierJobs: any;
  labels:any;
  courierId:any;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public viewCtrl: ViewController, public menuCtrl: MenuController, private courierService: CourierService
    , private navParams: NavParams) {
     this.courierId = this.navParams.data;
     console.log('Courier Job Selected By  ID:' + this.courierId);
  }

    // labels = [
    //   {id:1, jobs: 'Courier Jobs'},
    //   {id:2, jobdetails: 'Job Details'},
    //   {id:3, settings: 'Settings'},
    //   {id:4, returns: 'Returns'},
    // ];

  scanbarcode(){

    console.log("Barcode Scan");
  }

  signature(){
    this.navCtrl.push(SignPackagePage);
    console.log("Take Signature");
  }

  listCourierJobs(){
      this.courierService.listCourierJobs(this.courierId)
        .subscribe(
          jobs => {this.courierJobs = jobs;
           console.log("list All Courier Jobs By ID:" + this.courierJobs.TicketNo); },
          (error) => {console.log(error)});
     }

  initializeItems() {
    this.items = [
      'Amsterdam',
      'Bogota',
    ];
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
 notifications() {
    console.log("List of notifications");
 }
 ionViewLoaded() {

 }
ionViewDidLoad() {
  this.listCourierJobs();
  console.log("IonViewDidLoad Fired");
}
  ionViewDidEnter() {
    //to disable menu, or
    // this.listCourierJobs();
    this.menuCtrl.getMenus();
    console.log("Display view after the user entered the view");
  }

  ionViewWillEnter() {
    // this.listCourierJobs();
    this.viewCtrl.showBackButton(false);
    this.menuCtrl.enable(true);
    console.log("Display view when the user is about to enter the view");

  }

  // stopSliding() {
  //   this.list.sliding(false);
  // }


  jobDetails($event, courierJob){
    this.navCtrl.push(JobDetailsPage, courierJob);
  }
  showNoteModal() {
    let modal = this.modalCtrl.create(NotesPage);
    modal.present();
    console.log("Show Modal called~");
  }
  ngOnInit() {

    // this.listCourierJobs();
    console.log("Execute When the application first load");
  }

}
