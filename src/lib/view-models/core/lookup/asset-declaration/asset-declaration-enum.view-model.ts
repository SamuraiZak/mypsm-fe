// ===============================================================
// Asset Declaration Status Enum View Model
// ===============================================================

export interface EnumAssetDeclarationStatusResponse {
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
    public static fromResponse(response: Response): EnumAssetDeclarationStatusResponse {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): EnumAssetDeclarationStatusResponse {
        return JSON.parse(json);
    }

    // to json string from model
    public static toJson(value: EnumAssetDeclarationStatusResponse): string {
        return JSON.stringify(value);
    }
}