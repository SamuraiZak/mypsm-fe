// ===============================================================
// Asset Declaration Status Enum View Model
// ===============================================================

export interface EnumAssetDeclarationStatusResponseViewModel {
    status:  number;
    message: string;
    data:    EnumAssetDeclarationStatusData;
}

export interface EnumAssetDeclarationStatusData {
    assetDeclarationStatus: EnumAssetDeclarationStatus[];
}

export interface EnumAssetDeclarationStatus {
    id:          string;
    code:        string;
    description: string;
}

// Converts JSON strings to/from your types
export class EnumAssetDeclarationStatusResponseConvert {

    // to model from response
    public static fromResponse(response: Response): EnumAssetDeclarationStatusResponseViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): EnumAssetDeclarationStatusResponseViewModel {
        return JSON.parse(json);
    }

    // to json string from model
    public static toJson(value: EnumAssetDeclarationStatusResponseViewModel): string {
        return JSON.stringify(value);
    }
}