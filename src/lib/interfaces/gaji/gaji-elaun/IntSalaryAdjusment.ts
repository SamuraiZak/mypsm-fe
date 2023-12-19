/* eslint-disable @typescript-eslint/no-unused-vars */
interface IntSalaryAdjustment {
    id: number;
    employeeNumber: string;
    claimName: string;
    startDate: string;
    endDate: string;
    toBePaidAmount: number;
    paidAmount: number;
    toBeCutOrRemainingAmount: number;
    remarks: string;
}
