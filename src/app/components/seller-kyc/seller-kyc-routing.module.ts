import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerKycComponent } from './seller-kyc.component';
import { KycDetailsComponent } from './kyc-details/kyc-details.component';
import { PermissionGuard } from '../../core/guard/permission.guard';

const routes: Routes = [
  {
    path: '',
    component: SellerKycComponent,
    canActivate: [PermissionGuard],
    data: { 
      permission: 'store.index' 
    }
  },
  {
    path: 'details/:id',
    component: KycDetailsComponent,
    canActivate: [PermissionGuard],
    data: { 
      permission: 'store.index' 
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerKycRoutingModule { }
