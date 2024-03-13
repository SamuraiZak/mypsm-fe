export interface ResetPasswordDTO {
    email: string;
}

// Converts JSON strings to/from your types
export class ResetPasswordConvert {
    public static fromJson(json: string): ResetPasswordDTO {
        return JSON.parse(json);
    }

    public static toJson(value: ResetPasswordDTO): string {
        return JSON.stringify(value);
    }
}
