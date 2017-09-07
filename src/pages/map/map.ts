import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../shared/services/api.service';
import { CourierService } from '../shared/services/courier.service';

/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  styleUrls: ['/src/pages/map/map.scss']
})
export class MapPage {
  title: string = 'DDS Mapping';
  lat: number = 51.678418;
  lng: number = 7.809007;
  zoom: number = 12;
  map:any;
  loginUserCollection: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private courierService: CourierService) {
  }

  ionViewDidLoad() {
    let job = this.navParams.data;
    //  this.courierService.attemptAuth(job.jobId,job.jobId).subscribe((data) =>this.loginUserCollection = data); //pass the login i and password, shortcut to get current user table
    this.map =  {
      lat: 51.678418, 
      lng: 7.809007,
      zoom: 12,
      markerlabel: job.Description
    }
   console.log('ionViewDidLoad MapPage');
  }

}
