import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransferPageComponent } from './components/transfer-page/transfer-page.component';

const routes: Routes = [
  { path: '', component: TransferPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
