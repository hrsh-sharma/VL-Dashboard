import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '../../shared/shared.module';

import { SellerAccountRoutingModule } from './seller-account-routing.module';
import { SellerAccountComponent } from './seller-account.component';
import { SellerAccountState } from '../../shared/state/seller-account.state';

@NgModule({
  declarations: [
    SellerAccountComponent
  ],
  imports: [
    CommonModule,
    SellerAccountRoutingModule,
    SharedModule,
    NgxsModule.forFeature([
      SellerAccountState
    ])
  ]
})
export class SellerAccountModule { }
