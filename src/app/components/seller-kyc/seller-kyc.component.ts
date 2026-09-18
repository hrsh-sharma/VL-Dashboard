import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TableClickedAction, TableConfig } from '../../shared/interface/table.interface';
import { Params } from '../../shared/interface/core.interface';
import { SellerKycState } from '../../shared/state/seller-kyc.state';
import { SellerKycModel, SellerKycRecord } from '../../shared/interface/seller-kyc.interface';
import { GetKycRecords } from '../../shared/action/seller-kyc.action';

@Component({
  selector: 'app-seller-kyc',
  templateUrl: './seller-kyc.component.html',
  styleUrls: ['./seller-kyc.component.scss']
})
export class SellerKycComponent {
  
  @Select(SellerKycState.kycRecords) kyc$: Observable<SellerKycModel>;

  public tableConfig: TableConfig = {
    columns: [
      { title: "Store", dataField: "store_name" },
      { title: "Vendor", dataField: "vendor_name" },
      { title: "Email", dataField: "vendor_email" },
      { title: "Phone", dataField: "vendor_phone" },
      { title: "Documents", dataField: "documents_text" },
      { title: "KYC Status", dataField: "kyc_status", type: "badge" },
      { title: "Submitted On", dataField: "created_at", type: "date", sortable: true, sort_direction: 'desc' },
    ],
    rowActions: [
      { label: "View KYC", actionToPerform: "view", icon: "ri-eye-line" }
    ],
    data: [] as any[], 
    total: 0
  };

  constructor(private store: Store, public router: Router) { }

  ngOnInit() {
    this.kyc$.subscribe(kyc => { 
      let kycRecords = kyc?.data?.map((item: any) => {
        let element = { ...item };
        // Map fields for table
        element.store_name = element.store?.store_name;
        element.vendor_name = element.store?.vendor?.name;
        element.vendor_email = element.store?.vendor?.email;
        element.vendor_phone = element.store?.vendor?.phone;
        
        let docsCount = 0;
        const totalDocs = 5;
        if (element.pan_file) docsCount++;
        if (element.gst_file) docsCount++;
        if (element.business_file) docsCount++;
        if (element.address_file) docsCount++;
        if (element.owner_file) docsCount++;
        
        element.documents_text = `${docsCount} / ${totalDocs} Documents`;

        if (element.status == 0) {
            element.kyc_status = `<div class="status-pending"><span>Pending</span></div>`;
        } else if (element.status == 1) {
            element.kyc_status = `<div class="status-approved"><span>Approved</span></div>`;
        } else if (element.status == 2) {
            element.kyc_status = `<div class="status-rejected"><span>Declined</span></div>`;
        } else {
            element.kyc_status = `<div class="status-pending"><span>Unknown</span></div>`;
        }

        return element;
      });
      this.tableConfig.data  = kycRecords ? kycRecords : [];
      this.tableConfig.total = kyc ? kyc?.total : 0;
    });
  }

  onTableChange(data?: Params) {
    this.store.dispatch(new GetKycRecords(data));
  }

  onActionClicked(action: TableClickedAction) {
    if(action.actionToPerform == 'view')
      this.view(action.data)
  }

  view(data: SellerKycRecord) {
    this.router.navigateByUrl(`/seller-kyc/details/${data.id}`);
  }
}
