import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

export class CustomValidation {

  constructor() { }

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config = {
      'required': 'กรุณาระบุ',
      'invalidCreditCard': 'Is invalid credit card number',
      'invalidEmailAddress': 'Invalid email address',
      'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
      'minlength': `Minimum length ${validatorValue.requiredLength}`,
      'invalidNumber': 'กรุณากรอกเฉพาะ ตัวเลขจำนวนเต็ม',
      'requireDecimal': 'กรุณาใส่ทศนิยม',
      'invalidDecimal': 'กรุณากรอกเฉพาะ เลขทศนิยม',
      'invalidDate': `กรุณาระบุวันที่แบบ วัน/เดือน/ปี`,
      'invalidEmail': `Email ไม่ถูกต้อง`
    };
    return config[validatorName];
  }

  static numberValidator(control) {
    const n = Number(control.value);

    if (n === +n && n === (n | 0)) {
      return null;
    } else {
      return { 'invalidNumber': true };
    }
  }

  static decimalValidator(control) {
    const n = Number(control.value);
    if (control.value === '') {
      return null;
    } else if (n === +n && n === (n | 0)) {
      return { 'requireDecimal': true };
    } else if (isNaN(n)) {
      return { 'invalidDecimal': true };
    } else {
      return null;
    }
  }

  static dateValidator(control: FormControl) {
    if (control.value != null) {
      return null;
    } else {
      return { 'invalidDate': true };
    }
    // let strDate = control.value.jsdate ;
    // let momentDate = moment(strDate).format('DD-MM-YYYY');
    // let regex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    // let isValidDate = regex.test(momentDate);
    // if (control.value != null) {
    //   return null;
    // } else {
    //   return { 'invalidDate': true };
    // }
  }

  static emailValidator(control) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const controlValue = control.value;
    const isValid = regex.test(controlValue);
    if (isValid) {
      return null;
    } else {
      return { 'invalidEmail': true };
    }
  }

}
