import { Directive, ElementRef, Renderer, HostListener, DoCheck, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[appValidation]'
})
export class ValidationDirective {

  @Input() showErrorMessage = true;
  @Input() isDisabled = false;
  private smallElement: any;
  private message: any;
  private parentNode: any;

  constructor(private el: ElementRef, private renderer: Renderer, private control: NgControl) { }

  ngDoCheck() {

  }

  private getsmallElement(): string {
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        // const msg: string;
        // return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
        // this.translate.get('Validation.' + propertyName, { value: this.control.errors[propertyName] })
        //   .subscribe((rs: string) => msg = rs);
        // return msg;
      }
    }
    return null;
  }

  private get isTouched(): boolean {
    return this.control.touched;
  }

  private get hasErrors() {
    return this.control.errors != null;
  }

  private showsmallElement() {
    const displayMessage: string = this.showErrorMessage ? 'block' : 'none';
    this.renderer.setText(this.message, this.getsmallElement());
    this.renderer.setElementStyle(this.smallElement, 'display', displayMessage);
    this.renderer.setElementClass(this.parentNode, 'has-danger', true);
  }

  private hidesmallElement() {
    this.renderer.setElementStyle(this.smallElement, 'display', 'none');
    this.renderer.setElementClass(this.parentNode, 'has-danger', false);
  }

}
