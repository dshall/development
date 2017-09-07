import {Component, OnInit, ViewChild} from '@angular/core';
import { NgClass } from '@angular/common';
import { LoadingController, AlertController, MenuController,  ModalController , NavController, ViewController, NavParams, ItemSliding,  Platform  } from 'ionic-angular';
import { List } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import * as _ from 'lodash';
import 'rxjs/add/operator/debounceTime';

import { SignPackagePage} from '../sign-package/sign-package';
import {CourierService} from "../shared/services/courier.service";
import {JobDetailsPage} from "../jobs/job-details/job-details";
import {NotesPage} from "../notes/notes";
import { PodPage } from '../pod/pod';
import { PodService } from '../pod/pod.service';
import { MapPage } from '../map/map';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  // styleUrls: ['home.scss'],
})
export class HomePage implements OnInit{
  @ViewChild(List) list: List;
  queryText: string = '';
  courierJobs: any[] = [];
  items: any;
  queryItems: any;
  labels:any;
  courierId:any;
  isSelected = true;
  selectedJobs = [];
  selectedHighlight:any;
  toggleCheck: boolean;
  itemschecked = [];
  state;
  onDemand:string = 'Pickup on Demand';
  onRush: string = 'Pickup on Rush';
  isAndroid: boolean = false;
  searchControl: FormControl;
  searching: any = false;
  jobId: string = '6412';
  
  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public modalCtrl: ModalController, 
    public viewCtrl: ViewController, public menuCtrl: MenuController, private courierService: CourierService, private podService: PodService
    , private navParams: NavParams, platform: Platform, private loadingController: LoadingController) {
      this.isAndroid = platform.is('android');
     this.courierId = this.navParams.data;
     this.searchControl = new FormControl();
     this.toggleCheck = false;

  //    this.items = [
  //     {title: 'one'},
  //     {title: 'two'},
  //     {title: 'three'},
  //     {title: 'four'},
  //     {title: 'five'},
  //     {title: 'six'}
  // ]

  }

  filterItems(){
        // let textToLowerCase = searchTerm.toLowerCase();
        if(this.courierJobs != null) {
          
          return this.courierJobs.filter((item) => {

           return  item.TicketNo.toLowerCase().indexOf(this.queryText.toLowerCase())  > -1 ;
           }); 
          // _.filter(this.courierJobs, item => {
          //  return item.TicketNo.toLowerCase().includes(this.queryText.toLowerCase())
          // }
          // )
        }

    }

   onSearchInput(){
          this.searching = true;
      }  
         
  setFilteredItems() {
    if(this.queryText == '' || this.queryText.length >= -1){
       this.listCourierJobs();
    }
     this.courierJobs= this.filterItems();
    }

  scanbarcode() {

    console.log("Barcode Scan");
  }

  signature() {
    this.navCtrl.push(SignPackagePage);
    console.log("Take Signature");
  }

  listCourierJobs(){
      this.courierService.listCourierJobs('6412') //this.courierId
        .subscribe(
          jobs => {this.courierJobs = jobs;
           console.log("list All Courier Jobs By ID:" + jobs); },
          (error) => {console.log(error)});
     }


  notifications() {
    console.log("List of notifications");
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
        this.itemschecked.push(outstndJob.TicketNo);
        console.log("Array of checked items:" + this.itemschecked);
       //  console.log("item selected state:" + this.checked);
      console.log("item selected state:" + this.toggleCheck+ "\n outstndJob:" + outstndJob);

    }

  cancelSelect() {
    this.isSelected = true;
    this.itemschecked = [];
    console.log("ARRAY IS NOW EMPTY" + this.itemschecked)
  console.log("you canceled selection!" + "state:" + this.isSelected);
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

  refreshAll(refresher) {
    this.courierService.refreshAllJob()
    .subscribe(() => {
      refresher.complete();
      this.ionViewLoaded();
    })
  }

  transferJob(outstndJob) {
    console.log("Transfer this job");
  }

  jobDetails($event, courierJob){
    let loader = this.loadingController.create({
      content: 'One Sec...',
      dismissOnPageChange: true
    });
    loader.present();
    this.courierService.listCourierJobs(courierJob.TicketNo)
    .subscribe(data =>   this.navCtrl.push(JobDetailsPage, courierJob));
    }
  
  loadMap($event) {
     this.navCtrl.push(MapPage, $event);
    }

  showNoteModal() {
    let modal = this.modalCtrl.create(NotesPage);
    modal.present();
  }

  ionViewLoaded() {
    this.listCourierJobs();
     }

  ionViewDidLoad() {

    this.setFilteredItems();

    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.setFilteredItems();
      
      });
    
    }

  ionViewDidEnter() {
        this.menuCtrl.getMenus();
        
           }
    
  ionViewWillEnter() {
  
        this.viewCtrl.showBackButton(false);
        this.menuCtrl.enable(true);
   
      }
  ngOnInit() {
  this.listCourierJobs();    
  }

}
