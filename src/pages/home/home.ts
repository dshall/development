import {Component, OnInit, ViewChild} from '@angular/core';
import { NgClass } from '@angular/common';
import { AlertController, MenuController,  ModalController , NavController, ViewController, NavParams, ItemSliding,  Platform  } from 'ionic-angular';
import { List } from 'ionic-angular';

import { SignPackagePage} from '../sign-package/sign-package';
import {CourierService} from "../shared/services/courier.service";
import {JobDetailsPage} from "../jobs/job-details/job-details";
import {NotesPage} from "../notes/notes";
import { PodPage } from '../pod/pod';
import { PodService } from '../pod/pod.service';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  // styleUrls: ['home.scss'],
})
export class HomePage implements OnInit{
  @ViewChild(List) list: List;

  items: string[];
  courierJobs: any;
  labels:any;
  courierId:any;
  isSelected = true;
  selectedJobs = [];
  selectedHighlight:any;
  checked: boolean;
  itemschecked = [];
  state;
  onDemand:string = 'Pickup on Demand';
  onRush: string = 'Pickup on Rush';
  isAndroid: boolean = false;

  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public modalCtrl: ModalController, 
    public viewCtrl: ViewController, public menuCtrl: MenuController, private courierService: CourierService, private podService: PodService
    , private navParams: NavParams, platform: Platform) {
      this.isAndroid = platform.is('android');
     this.courierId = this.navParams.data;
     console.log('Courier Job Selected By  ID:' + this.courierId);
  }


  scanbarcode(){

    console.log("Barcode Scan");
  }

  signature(){
    this.navCtrl.push(SignPackagePage);
    console.log("Take Signature");
  }

  listCourierJobs(){
      this.courierService.listCourierJobs('6412') //this.courierId
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
  selectJob() {

      this.isSelected = false;
      console.log("you clicked select \n" + "state: \n" + this.isSelected + " \n action: show");

  }
  getItemsChecked(item) {
    this.itemschecked = item;

    console.log("Array of checked items:" + JSON.stringify(this.itemschecked));
    return this.itemschecked;
  }
  selectedItems(outstndJob) {

        this.itemschecked.splice(0, this.itemschecked.length)
        this.itemschecked.push( outstndJob.TicketNo);
        console.log("Array of checked items:" + JSON.stringify(this.itemschecked) );
       //  console.log("item selected state:" + this.checked);
      console.log("item selected state:" + this.checked + "\n outstndJob:" + outstndJob);

    }
  cancelSelect() {
    this.isSelected = true;
    this.itemschecked = [];
    console.log("ARRAY IS NOW EMPTY" + this.itemschecked)
  console.log("you canceled selection!" + "state:" + this.isSelected + " \n action: hide");
  }
showItemDetailOnHold(outstndJob) {
    //   outstndJob.subscribe(
    //   (data) => { this.selectedJobs = data.CourierId;
    //   console.log("DATA:"  + JSON.stringify(this.selectedJobs))}
    // )
    let prompt = this.alertCtrl.create({
      title: 'JOD DETAILS',
      message: '<h2>' + outstndJob.Daddress + '</h2>',
      buttons: ['OK']
    });
    prompt.present();
}
  signToSendPOD($event) {

    let modal = this.modalCtrl.create($event, PodPage);
    modal.present();
    console.log("sending pod... selected" + JSON.stringify(this.itemschecked));
  }
  setListItemClass() {

        () => this.isSelected ? this.selectedHighlight = 'gray' : '';

  }

  transferJob(outstndJob) {
    console.log("Transfer this job");
  }
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
