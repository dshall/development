import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { JobsPage } from '../jobs/jobs';
import { PodPage } from '../pod/pod';

@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {

  tab1Root: any = JobsPage;
  tab2Root: any = PodPage;
  constructor(public navCtrl: NavController) {
  }
  
}
