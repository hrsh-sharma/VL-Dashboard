import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SellerKycState } from '../../../shared/state/seller-kyc.state';
import { SellerKycRecord } from '../../../shared/interface/seller-kyc.interface';
import { GetKycRecord, ApproveDocument, DeclineDocument } from '../../../shared/action/seller-kyc.action';

@Component({
  selector: 'app-kyc-details',
  templateUrl: './kyc-details.component.html',
  styleUrls: ['./kyc-details.component.scss']
})
export class KycDetailsComponent {

  @Select(SellerKycState.selectedKyc) kyc$: Observable<SellerKycRecord>;
  public id: number;
  
  @ViewChild('documentModal') documentModal: TemplateRef<any>;
  @ViewChild('approveModal') approveModal: TemplateRef<any>;
  @ViewChild('declineModal') declineModal: TemplateRef<any>;
  
  public currentDocumentUrl: SafeResourceUrl | null = null;
  public isPdf: boolean = false;
  
  public activeDocType: string = '';
  public declineReason: string = '';

  constructor(
    private route: ActivatedRoute, 
    private store: Store, 
    public router: Router,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer
  ) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        this.store.dispatch(new GetKycRecord(this.id));
      }
    });
  }

  approve(docType: string) {
    this.activeDocType = docType;
    this.modalService.open(this.approveModal, { centered: true });
  }

  confirmApprove() {
    this.store.dispatch(new ApproveDocument(this.id, this.activeDocType));
    this.modalService.dismissAll();
  }

  decline(docType: string) {
    this.activeDocType = docType;
    this.declineReason = '';
    this.modalService.open(this.declineModal, { centered: true });
  }

  confirmDecline() {
    if (this.declineReason && this.declineReason.trim() !== '') {
      this.store.dispatch(new DeclineDocument(this.id, this.activeDocType, this.declineReason));
      this.modalService.dismissAll();
    }
  }

  viewDocument(url: string | undefined) {
    if (url) {
      this.isPdf = url.toLowerCase().endsWith('.pdf');
      this.currentDocumentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      this.modalService.open(this.documentModal, { size: 'lg', centered: true });
    }
  }

}
