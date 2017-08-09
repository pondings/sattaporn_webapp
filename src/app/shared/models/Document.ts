import { Customer } from './Customer';
export class Document {

    public id: number;
    public code: string;
    public name: string;
    public createDate: string;
    public createBy: string;
    public updateDate: string;
    public updateBy: string;
    public type: string;
    public customer: Customer;

    /**
     * DTO
     */
    public findMethod: string;
    public searchKeyword: string;
    public index: number;

}