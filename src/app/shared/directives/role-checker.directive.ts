import { UserInfoService } from './../../core/services/user-info.service';
import { PermissionAccess } from './../../core/services/api/authenication.service';
import { Directive, Input, AfterViewInit, Renderer, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRoleChecker]'
})
export class RoleCheckerDirective implements AfterViewInit {

  @Input('isInvisible') isInvisible = false;

  private _accessRole = 'read';

  get accessRole() {
    return this._accessRole;
  }

  set accessRole(accessRole: string) {
    this._accessRole = accessRole;
    console.log(accessRole);
    this.assignRoleToNode(this.elementRf.nativeElement);
  }

  private canDisableElement: string[] = ['BUTTON', 'INPUT', 'SELECT'];
  private canPrint: string[] = ['read-print', 'print', 'write-print', 'full-access'];
  private canWrite: string[] = ['write', 'full-access', 'write-print'];

  constructor(private renderer: Renderer, private elementRf: ElementRef, private userInfoService: UserInfoService) { }

  ngAfterViewInit() {
    const permissionAccess: PermissionAccess = this.userInfoService.getCurrnetPermission();
    console.log(permissionAccess);
    const permission = permissionAccess.permission;
    const elementNode = this.elementRf.nativeElement;

    if (!permission) {
      this.accessRole = 'read';
    } else {
      this.accessRole = permission;
    }
  }

  /**
   * read = readonly can't do anything
   *
   * write = can edit or create but can't print
   *
   * print = readonly but can print
   *
   * full-access = ;
   *
   */

  private assignRoleToNode(elementNode: any) {
    /**
     * canDisable is check elements are path of form or not
     * if not this function will recursive for find element inside element that can disable ;
     */
    const canDisable: number = this.canDisableElement.indexOf(this.elementRf.nativeElement.tagName);
    /**
     * canWrite is check for permission to edit form
     * if cant find permission it will return -1
     */
    const canWrite: number = this.canWrite.indexOf(this.accessRole);
    /**
     * canPrint is like canWrite but check for print button
     */
    const canPrint: number = this.canPrint.indexOf(this.accessRole);
    /**
     * If target element is not a path of form
     */
    if (canDisable === -1) {
      /**
       * Loop through elements for find element can disable for invisible
       */
      for (let i = 0; i < elementNode.children.length; i++) {
        const childrenNode = elementNode.children[i];
        const elementName = childrenNode.name;

        if (canWrite === -1 && elementName !== 'print') {
          this.hideOrInvisibleElement(childrenNode);
        } else if (elementName === 'print') {
          if (canPrint === -1) {
            this.hideOrInvisibleElement(childrenNode);
          } else {
            this.showElement(childrenNode);
          }
        } else if (canWrite !== -1) {
          this.showElement(childrenNode);
        }

        if (childrenNode.children.length !== 0) {
          this.assignRoleToNode(childrenNode);
        }
      }
      /**
       * If target element is path of form
       */
    } else {
      const elRef = this.elementRf.nativeElement;
      if (canWrite === -1 && elRef.name !== 'print') {
        this.hideOrInvisibleElement(elRef);
      } else if (elRef.name === 'print') {
        if (canPrint === -1) {
          this.hideOrInvisibleElement(elRef);
        } else {
          this.showElement(elRef);
        }
      } else if (canWrite !== -1) {
        this.showElement(elRef);
      }

    }
  }

  private showElement(element: ElementRef) {
    if (this.isInvisible) {
      this.renderer.setElementStyle(element, 'visibility', 'visible');
    } else {
      this.renderer.setElementAttribute(element, 'disabled', null);
    }
  }

  private hideOrInvisibleElement(element: ElementRef) {
    this.isInvisible === true ? this.invisibleElement(element) : this.disableElement(element);
  }

  private disableElement(element: ElementRef) {
    this.renderer.setElementAttribute(element, 'disabled', 'true');
  }

  private invisibleElement(element: ElementRef) {
    this.renderer.setElementStyle(element, 'visibility', 'hidden');
  }

}


