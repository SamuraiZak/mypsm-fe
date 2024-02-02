// ===============================================================
// Common Response DTO
// ===============================================================

export interface CommonResponseDTO {
    status?: string;
    message?: string;
    data?: Data | null;
}

export interface Data {
    meta?: Meta;
    details?: any;
    dataList?: any[];
    medicalHistory?: any[];
}

export interface Meta {
    pageSize: number;
    pageNum: number;
    totalData: number;
    totalPage: number;
}

// Converts JSON strings to/from your types
export class CommonResponseConvert {

    // to model from response
    public static fromResponse(response: Response): CommonResponseDTO {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): CommonResponseDTO {
        return JSON.parse(json);
    }

    // to json string from model
    public static toJson(value: CommonResponseDTO): string {
        return JSON.stringify(value);
    }
}
