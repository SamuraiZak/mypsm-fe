export interface ForgotPasswordRequestDTO {
    idType: string;
    idValue: string;
}

// Converts JSON strings to/from your types
export class ForgotPasswordRequestConvert {
    public static fromJson(json: string): ForgotPasswordRequestDTO {
        return JSON.parse(json);
    }

    public static toJson(value: ForgotPasswordRequestDTO): string {
        return JSON.stringify(value);
    }
}
