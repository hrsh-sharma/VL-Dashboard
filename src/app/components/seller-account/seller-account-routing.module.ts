import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerAccountComponent } from './seller-account.component';

const routes: Routes = [
  {
    path: '',
    component: SellerAccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerAccountRoutingModule { }
