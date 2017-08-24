import {Component, OnInit, ViewChild} from '@angular/core';
import {MenuController, NavController, ViewController} from 'ionic-angular';
import { List } from 'ionic-angular';

import { SignPackagePage} from '../sign-package/sign-package';
import {CourierService} from "../shared/services/courier.service";
import {JobDetailsPage} from "../jobs/job-details/job-details";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  @ViewChild(List) list: List;

  items: string[];
  courierJobs: any;


  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public menuCtrl: MenuController, private courierService: CourierService) {

  }



  scanbarcode(){

    console.log("Barcode Scan");
  }

  signature(){
    this.navCtrl.push(SignPackagePage);
    console.log("Take Signature");
  }

  listCourierJobs(){
      this.courierService.listCourierJobs('3608')
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
  jobDetails(jobId){
    this.navCtrl.push(JobDetailsPage, jobId);
  }

  ngOnInit() {
    // this.listCourierJobs();
    console.log("Execute When the application first load");
  }

}
