// ===============================================================
// Common View Model For All Response
// ===============================================================

// To parse this data:
//
//   import { Convert, CommonViewModel } from "./file";
//
//   const commonViewModel = CommonViewModelConvert.toCommonViewModel(json);

export interface CommonViewModel {
    message: string;
    status:  number;
    data?: unknown;
}

// Converts JSON strings to/from your types
export class CommonViewModelConvert {
    public static fromJson(json: string): CommonViewModel {
        return JSON.parse(json);
    }

    public static toJson(value: CommonViewModel): string {
        return JSON.stringify(value);
    }
}