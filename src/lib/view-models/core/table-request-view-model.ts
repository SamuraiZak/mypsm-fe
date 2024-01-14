// ===============================================================
// Common View Model For All Response
// ===============================================================

// To parse this data:
//
//   import { Convert, TableRequestViewModel } from "./file";
//
//   const tableRequestViewModel = Convert.toTableRequestViewModel(json);

export interface TableRequestViewModel {
    pageNum:   number;
    pageSize:  number;
    orderBy:   string;
    orderType: string;
    filter:    Filter;
}

export interface Filter {
    dataType:     string;
    identityCard: null;
    staffNo:      null;
    staffName:    null;
    dateRequest:  null;
    dateHire:     null;
    status:       null;
}

// Converts JSON strings to/from your types
export class TableRequestViewModelConvert {
    public static fromJson(json: string): TableRequestViewModel {
        return JSON.parse(json);
    }

    public static toJson(value: TableRequestViewModel): string {
        return JSON.stringify(value);
    }
}