export interface GetContractSupporterApproverResultDTO {
    id:     number;
    name?:   string;
    remark: string;
    status: boolean;
    isReadonly?: boolean;
}