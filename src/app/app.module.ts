import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ThreeContainerComponent } from './three-container/three-container.component';

import { WindowRef } from './service/window-ref.service';
import {AnimationService} from './service/animation.service';

@NgModule({
  declarations: [
    AppComponent,
    ThreeContainerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    WindowRef,
    AnimationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
