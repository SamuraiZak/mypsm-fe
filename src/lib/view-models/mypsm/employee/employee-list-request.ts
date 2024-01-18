// =================================================================
// Employee List Request View Model
// =================================================================

interface EmployeesListRequestViewModel {
    pageNum: number;
    pageSize: number;
    orderBy: string;
    orderType: string;
    filter: EmployeesListRequestFilter;
}

interface EmployeesListRequestFilter {}

// Converts JSON strings to/from your types
class EmployeesListRequestConvert {

    // to model from response
    public static fromResponse(response: Response): EmployeesListRequestViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): EmployeesListRequestViewModel {
        return JSON.parse(json);
    }

    // to json string from model
    public static toJson(value: EmployeesListRequestViewModel): string {
        return JSON.stringify(value);
    }
}
