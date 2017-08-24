import {NgModule, ErrorHandler} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import {FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";

import { MyApp } from './app.component';
import { JobsPage } from '../pages/jobs/jobs';
import { PodPage } from '../pages/pod/pod';
import { ExitPage } from '../pages/exit/exit';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { LoginPage } from '../pages/login/login';
import { DeluxeDirectPage } from '../pages/deluxe-direct/deluxe-direct';
import { SignPackagePage } from '../pages/sign-package/sign-package';
import { NotesPage } from '../pages/notes/notes';
import { UpdatePackagePage } from '../pages/update-package/update-package';
import { ReturnPackagePage } from '../pages/return-package/return-package';
import { SettingsPage } from '../pages/settings/settings';
import {HomePage} from "../pages/home/home";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {JobDetailsPage} from "../pages/jobs/job-details/job-details";
import {CourierService} from "../pages/shared/services/courier.service";
import {ApiService} from "../pages/shared/services/api.service";
import {JwtService} from "../pages/shared/services/jwt.service";
// import {JwtService, CourierService, ApiService} from "../pages/shared/index";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    JobsPage,
    PodPage,
    ExitPage,
    TabsControllerPage,
    LoginPage,
    DeluxeDirectPage,
    SignPackagePage,
    NotesPage,
    UpdatePackagePage,
    ReturnPackagePage,
    SettingsPage,
    JobDetailsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    JobsPage,
    PodPage,
    ExitPage,
    TabsControllerPage,
    LoginPage,
    DeluxeDirectPage,
    SignPackagePage,
    NotesPage,
    UpdatePackagePage,
    ReturnPackagePage,
    SettingsPage,
    JobDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CourierService,
    ApiService,
    JwtService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
