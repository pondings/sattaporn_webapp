import { CustomerService } from './../../shared/services/customer.service';
import { Customer } from './../../shared/models/Customer';
import { Component, OnInit, ViewChild, EventEmitter, Output, Input, ElementRef, Renderer } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { saveAs } from 'file-saver';
import 'rxjs/Rx';

/**
 * Third-Party
 */
import { Modal } from 'clarity-angular';

@Component({
  selector: 'app-customer-form-modal',
  templateUrl: './customer-form-modal.component.html',
  styleUrls: ['./customer-form-modal.component.scss']
})
export class CustomerFormModalComponent implements OnInit {

  @ViewChild('fileUploader') fileUploader: ElementRef;
  @ViewChild('customerFormModal') customerformModal: Modal;
  @ViewChild('submitBtn') submitBtn: ElementRef;
  @ViewChild('cancelBtn') cancelBtn: ElementRef;
  @ViewChild('downloadBtn') downloadBtn: ElementRef;
  @ViewChild('uploadBtn') uploadBtn: ElementRef;
  @Output() customerModel: EventEmitter<Customer> = new EventEmitter();
  @Output() updatedCustomer: EventEmitter<Customer> = new EventEmitter();
  private viewMode: Boolean;
  private form: FormGroup;
  private opened: boolean;
  private customerFormModalHeader: string;
  private customer: Customer;
  private uploadStatus: string;
  private uploadAble: Boolean = true;

  constructor(private fb: FormBuilder, private customerService: CustomerService, private elementRef: ElementRef,
      private renderer: Renderer) {
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm() {
    this.form = this.fb.group({
      id: undefined,
      code: '',
      sirName: [{ value: '', disabled: this.viewMode }],
      name: [{ value: '', disabled: this.viewMode }],
      lname: [{ value: '', disabled: this.viewMode }],
      phone: [{ value: '', disabled: this.viewMode }, [Validators.maxLength(10)]],
      address: [{ value: '', disabled: this.viewMode }],
      workAddress: [{ value: '', disabled: this.viewMode }]
    });
  }

  public onSubmit(form: Customer) {
    if (form.id !== undefined && form.id !== 0 && form.id !== null) {
      this.customer.sirName = form.sirName;
      this.customer.name = form.name;
      this.customer.lname = form.lname;
      this.customer.phone = form.phone;
      this.customer.address = form.address;
      this.customer.workAddress = form.workAddress;
      this.customerService.updateCustomer(this.customer).subscribe(
        rs => this.updatedCustomerEmit(rs, this.customer.index),
        error => console.log(error)
      );
    } else {
      this.customerService.createCustomer(form).subscribe(rs => this.customerEmit(rs), error => console.log(error));
    }
  }

  public fileChange(event) {
    const fileList: FileList = event.target.files;
    this.disableAllButton();
    this.customerService.uploadDocument(this.customer, fileList).subscribe(
      (rs) => {
        this.customer.document1 = rs.document1;
        this.enableAllButton();
      },
      (error) => {
        this.enableAllButton();
        alert('Can not upload file pls contract Pawarut Klaiarmon');
      }
    );
  }

  public downloadDocument() {
    this.customerService.downloadDocument(this.customer).subscribe(
      (res) => {
        saveAs(res, this.customer.fullName + '-email.doc');
      }
    );
  }

  public customerEmit(customer: any) {
    this.customerModel.emit(customer);
    this.customer = customer;
    this.enterViewMode();
  }

  public updatedCustomerEmit(customer: any, index: number) {
    const updatedCustomer: Customer = customer;
    updatedCustomer.index = this.customer.index;
    this.updatedCustomer.emit(updatedCustomer);
    this.enterViewMode();
  }

  private editButtonClicked() {
    this.enterEditMode();
  }

  public openModal() {
    this.opened = true;
    this.customerFormModalHeader = 'test';
  }

  public createCustomer() {
    this.opened = true;
    this.customerFormModalHeader = 'Create Customer';
    this.enterCreateMode();
  }

  public viewCustomerInfo(customer: Customer) {
    this.opened = true;
    this.customerFormModalHeader = 'View Customer Info';
    this.setCustomer(customer);
    this.enterViewMode();
  }

  private openFileUploader() {
    this.fileUploader.nativeElement.value = '';
    this.fileUploader.nativeElement.click();
  }

  private setCustomer(customer: Customer) {
    this.customer = { ...customer };
    this.customer.index = customer.index;
    this.form.patchValue({
      id: customer.id,
      sirName: customer.sirName,
      name: customer.name,
      lname: customer.lname,
      phone: customer.phone,
      address: customer.address,
      workAddress: customer.workAddress,
      index: customer.index
    });
  }

  private enterViewMode() {
    this.viewMode = true;
    this.form.disable();
  }

  private enterEditMode() {
    this.viewMode = false;
    this.form.enable();
  }

  private enterCreateMode() {
    this.customer = null;
    this.viewMode = false;
    this.form.enable();
  }

  private disableAllButton() {
    if (this.downloadBtn) {
      this.downloadBtn.nativeElement.disabled = true;
    }
    this.uploadBtn.nativeElement.disabled = true;
    this.submitBtn.nativeElement.disabled = true;
    this.cancelBtn.nativeElement.disabled = true;
  }

  private enableAllButton() {
    if (this.downloadBtn) {
      this.downloadBtn.nativeElement.disabled = false;
    }
    this.uploadBtn.nativeElement.disabled = false;
    this.submitBtn.nativeElement.disabled = false;
    this.cancelBtn.nativeElement.disabled = false;
  }

  public closeModal() {
    this.form.reset();
    this.viewMode = true;
    this.opened = false;
  }

}
