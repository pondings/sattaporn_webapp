import { CustomValidation } from './../services/custom-validation.service';
import { Directive, ElementRef, Renderer, HostListener, DoCheck, Input, AfterViewInit } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * Third-Party
 */
import { TranslateService } from '@ngx-translate/core';

@Directive({
  selector: 'input[appValidation]'
})
export class ValidationDirective implements DoCheck, AfterViewInit {

  @Input() showErrorMessage = true;
  @Input() isDisabled = false;
  @Input() tooltipPos: string;
  private labelElement: ElementRef;
  private spanElement: ElementRef;
  private message: string;

  constructor(private el: ElementRef, private renderer: Renderer, private control: NgControl, private translate: TranslateService) {
    this.spanElement = renderer.createElement(el.nativeElement.parentNode, 'span');
    this.labelElement = renderer.createElement(el.nativeElement.parentNode, 'label');

    // Render element style class
    renderer.setElementClass(this.spanElement, 'tooltip-content', true);
    renderer.setElementClass(this.labelElement, 'tooltip', true);
    renderer.setElementClass(this.labelElement, 'tooltip-validation', true);
    renderer.setElementStyle(this.labelElement, 'z-index', '999');

    // Put span & input into label
    renderer.projectNodes(this.labelElement, [el.nativeElement, this.spanElement]);
    this.message = this.renderer.createText(this.spanElement, '');
  }

  /**
   * Override
   */
  ngAfterViewInit(): void {
    let toolTipPosition = '';
    switch (this.tooltipPos) {
      case 'top-right':
        toolTipPosition = 'tooltip-top-right';
        break;
      case 'top-left':
        toolTipPosition = 'tooltip-top-left';
        break;
      case 'bottom-right':
        toolTipPosition = 'tooltip-bottom-right';
        break;
      case 'bottom-left':
        toolTipPosition = 'tooltip-bottom-left';
        break;
      case 'right':
        toolTipPosition = 'tooltip-right';
        break;
      case 'left':
        toolTipPosition = 'tooltip-left';
        break;
      default:
        toolTipPosition = 'tooltip-top-right';
        break;
    }
    this.renderer.setElementClass(this.labelElement, toolTipPosition, true);
  }

  /**
   * Override
   */
  ngDoCheck() {
    (this.hasErrors && this.isTouched) ? this.showspanElement() : this.hidespanElement();
  }

  private setSpanElementMessage(): string {
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

  private showspanElement() {
    this.renderer.setElementClass(this.labelElement, 'invalid', true);
    this.renderer.setText(this.message, this.setSpanElementMessage());
  }

  private hidespanElement() {
    this.renderer.setElementClass(this.labelElement, 'invalid', false);
  }

}
