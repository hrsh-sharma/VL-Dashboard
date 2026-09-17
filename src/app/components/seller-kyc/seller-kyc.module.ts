import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from "../../shared/shared.module";
import { SellerKycRoutingModule } from './seller-kyc-routing.module';

import { SellerKycComponent } from './seller-kyc.component';
import { KycDetailsComponent } from './kyc-details/kyc-details.component';
import { SellerKycState } from '../../shared/state/seller-kyc.state';

@NgModule({
  declarations: [
    SellerKycComponent,
    KycDetailsComponent
  ],
  imports: [
    CommonModule,
    SellerKycRoutingModule,
    SharedModule,
    NgxsModule.forFeature([
      SellerKycState
    ])
  ]
})
export class SellerKycModule { }
