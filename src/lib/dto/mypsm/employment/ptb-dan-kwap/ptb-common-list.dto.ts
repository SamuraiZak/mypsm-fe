export interface EmployeePTBOffer {
    id:number;
    employeeId: number;
    employeeNo: number;
    employeeName: string;
    identityCardNo: number;
    category: string;
    applicationDate: string;
    status: string;
    remark: string;
    assignedRole: string;
}

export class EmployeePTBOfferConvert {
    public static fromJson(json: string): EmployeePTBOffer[] {
        return JSON.parse(json);
    }

    public static toJson(value: EmployeePTBOffer[]): string {
        return JSON.stringify(value);
    }
}