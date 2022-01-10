import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TitlebarComponent } from './components/titlebar/titlebar.component';
import { TransferPageComponent } from './components/transfer-page/transfer-page.component';
import { FileComponent } from './components/transfer-page/file/file.component';

@NgModule({
  declarations: [
    AppComponent,
    TitlebarComponent,
    TransferPageComponent,
    FileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
