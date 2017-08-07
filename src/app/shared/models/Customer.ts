import { FormGroup } from '@angular/forms';
export class Customer {

    public id: number;
    public code: string;
    public name: string;
    public lname: string;
    public sirName: string;
    public fullName: string;
    public address: string;
    public workAddress: string;
    public phone: string;
    public createDate: string;
    public createBy: string;
    public updateDate: string;
    public updateBy: string;
    public document1: string;

    /**
     * DTO
     */
    public findMethod: string;
    public searchKeyword: string;
    public index: number;

}