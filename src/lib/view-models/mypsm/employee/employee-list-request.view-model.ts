// =================================================================
// Employee List Request View Model
// =================================================================

export interface EmployeesListRequestViewModel {
    pageNum: number;
    pageSize: number;
    orderBy: string;
    orderType: string;
    filter: EmployeesListRequestFilter;
}

export interface EmployeesListRequestFilter {}

// Converts JSON strings to/from your types
export class EmployeesListRequestConvert {
    public static fromJson(json: string): EmployeesListRequestViewModel {
        return JSON.parse(json);
    }

    public static toJson(value: EmployeesListRequestViewModel): string {
        return JSON.stringify(value);
    }
}
