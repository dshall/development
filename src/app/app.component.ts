import {Component, OnInit, ViewChild} from '@angular/core';
import {Platform, Nav, NavController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SignPackagePage } from '../pages/sign-package/sign-package';
import { ReturnPackagePage } from '../pages/pod/return-package/return-package';
import { UpdatePackagePage } from '../pages/update-package/update-package';
import { SettingsPage } from '../pages/settings/settings';


import { JobsPage } from '../pages/jobs/jobs';
import {HomePage} from "../pages/home/home";
import {LoginPage} from "../pages/login/login";



@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.show();
    });
  }
  goToSignPackage(params){
    if (!params) params = {};
    this.navCtrl.setRoot(SignPackagePage);
  }goToReturnPackage(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ReturnPackagePage);
  }goToUpdatePackage(params){
    if (!params) params = {};
    this.navCtrl.setRoot(UpdatePackagePage);
  }goToSettings(params){
    if (!params) params = {};
    this.navCtrl.setRoot(SettingsPage);
  }
  logout() {
     // this.navCtrl.setRoot(LoginPage);
    console.log("logout Called");
  }
  ngOnInit() {

  }
}
