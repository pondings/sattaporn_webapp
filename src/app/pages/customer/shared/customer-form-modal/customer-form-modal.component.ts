import { CustomerService } from './../customer.service';
import { CustomValidation } from './../../../../shared/directives/custom-validation';
import { Customer } from './../../../../shared/models/';
import { Component, OnInit, ViewChild, EventEmitter, Output, Input, ElementRef, Renderer } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { saveAs } from 'file-saver';

/**
 * Third-Party
 */
import { Modal } from 'clarity-angular';
import { TranslateService } from '@ngx-translate/core';

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
  @ViewChild('openDocumemtListBtn') openDocumemtListBtn: ElementRef;
  @Output() customerModel: EventEmitter<Customer> = new EventEmitter();
  @Output() updatedCustomer: EventEmitter<Customer> = new EventEmitter();
  public viewMode: Boolean;
  public form: FormGroup;
  public opened: boolean;
  public customerFormModalHeader: string;
  private customer: Customer;
  private transactionStatus: string;
  private customerBackup: Customer;

  constructor(private fb: FormBuilder, private customerService: CustomerService, private elementRef: ElementRef,
    private renderer: Renderer, private translate: TranslateService) {
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm() {
    this.form = this.fb.group({
      id: undefined,
      code: '',
      title: ['', Validators.required],
      name: ['', Validators.required],
      lname: ['', Validators.required],
      phone: ['', [Validators.required]],
      address: ['', Validators.required],
      workAddress: '',
      email: ['', [Validators.required, CustomValidation.emailValidator]]
    });
  }

  public onSubmit(form: Customer) {
    this.disableAllButton();
    if (form.id !== undefined && form.id !== 0 && form.id !== null) {
      this.customer.title = form.title;
      this.customer.name = form.name;
      this.customer.lname = form.lname;
      this.customer.phone = form.phone;
      this.customer.address = form.address;
      this.customer.workAddress = form.workAddress;
      this.customer.email = form.email;
      this.customerService.updateCustomer(this.customer).then(
        (res) => this.updatedCustomerEmit(res, this.customer.index)
      );
    } else {
      this.customerService.createCustomer(form).then(
        (res) => this.customerEmit(res)
      );
    }
  }

  public customerEmit(customer: any) {
    this.customerModel.emit(customer);
    this.customer = customer;
    this.enterViewMode();
    this.enableAllButton();
    this.closeModal();
  }

  public updatedCustomerEmit(customer: any, index: number) {
    const updatedCustomer: Customer = customer;
    updatedCustomer.index = this.customer.index;
    this.updatedCustomer.emit(updatedCustomer);
    this.enterViewMode();
    this.enableAllButton();
  }

  public editButtonClicked() {
    this.enterEditMode();
  }

  public openModal() {
    this.opened = true;
    this.customerFormModalHeader = 'test';
  }

  public createCustomer() {
    this.opened = true;
    this.customerFormModalHeader = 'CreateCustomer';
    this.enterCreateMode();
  }

  public viewCustomerInfo(customer: Customer) {
    this.opened = true;
    this.customerFormModalHeader = 'ViewCustomerInfo';
    this.setCustomer(customer);
    this.enterViewMode();
  }

  private openFileUploader() {
    this.fileUploader.nativeElement.value = '';
    this.fileUploader.nativeElement.click();
  }

  private setCustomer(customer: Customer) {
    this.customer = { ...customer };
    this.customerBackup = { ...customer };
    this.customer.index = customer.index;
    this.form.patchValue({
      id: customer.id,
      title: customer.title,
      name: customer.name,
      lname: customer.lname,
      phone: customer.phone,
      address: customer.address,
      workAddress: customer.workAddress,
      email: customer.email,
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
    this.customerBackup = null;
    this.customer = null;
    this.viewMode = false;
    this.form.enable();
  }

  private disableAllButton() {
    this.submitBtn.nativeElement.disabled = true;
    this.cancelBtn.nativeElement.disabled = true;
  }

  private enableAllButton() {
    this.submitBtn.nativeElement.disabled = false;
    this.cancelBtn.nativeElement.disabled = false;
  }

  public closeModal() {
    this.form.reset();
    this.viewMode = true;
    this.opened = false;
  }

  public resetForm() {
    const customer = this.customerBackup;
    if (customer === null) {
      this.form.reset();
      return ;
    }
    this.form.patchValue({
      id: customer.id === undefined ? undefined : customer.id,
      title: customer.title,
      name: customer.name,
      lname: customer.lname,
      phone: customer.phone,
      address: customer.address,
      workAddress: customer.workAddress,
      email: customer.email,
      index: customer.index
    });
  }

}
