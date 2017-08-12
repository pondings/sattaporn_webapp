import { CustomValidation } from './../services/custom-validation.service';
import { Directive, ElementRef, Renderer, HostListener, DoCheck, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * Third-Party
 */
import { TranslateService } from '@ngx-translate/core';

@Directive({
  selector: 'input[appValidation]'
})
export class ValidationDirective {

  @Input() showErrorMessage = true;
  @Input() isDisabled = false;
  private smallElement: any;
  private parentElement: ElementRef;
  private message: any;
  private parentNode: any;

  constructor(private el: ElementRef, private renderer: Renderer, private control: NgControl, private translate: TranslateService) {
    this.smallElement = this.renderer.createElement(this.el.nativeElement.parentNode, 'small');
    renderer.setElementStyle(this.smallElement, 'color', 'red');
    renderer.setElementStyle(this.smallElement, 'display', 'none');
    this.message = this.renderer.createText(this.smallElement, '');

  }

  ngDoCheck() {
    (this.hasErrors && this.isTouched) ? this.showsmallElement() : this.hidesmallElement();
  }

  private getsmallElement(): string {
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        let msg: string;
        // return CustomValidation.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
        this.translate.get('Validation.' + propertyName, { value: this.control.errors[propertyName] })
          .subscribe((rs: string) => msg = rs);
        return msg;
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
  }

  private hidesmallElement() {
    this.renderer.setElementStyle(this.smallElement, 'display', 'none');
  }

}
