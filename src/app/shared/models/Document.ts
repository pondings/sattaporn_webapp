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

    public getFindDocumentObject(searchKeyword: string, findMethod: string): this {
        this.searchKeyword = searchKeyword;
        this.findMethod = findMethod;
        return this;
    }

    public getFindByDocumentnameAndCustomerCode(docName: string, custCode: string): this {
        this.name = docName.trim() == null ? '' : docName ;
        this.customer = new Customer();
        this.customer.code = custCode;
        this.findMethod = 'docNameAndCustCode';
        return this;
    }

}
