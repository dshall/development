import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the JobDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-job-details',
  templateUrl: 'job-details.html',
})
export class JobDetailsPage {
  courierJob: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
          this.courierJob = this.navParams.data;
             console.log('Courier Job Details:' + JSON.stringify(this.courierJob) );
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad JobDetailsPage');
  }

}
