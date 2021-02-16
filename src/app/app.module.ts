import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxDraggableDomModule } from "ngx-draggable-dom";
import { ShareScreenComponent } from './share-screen/share-screen.component';
import { DataService } from './shared/services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    ShareScreenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxDraggableDomModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
