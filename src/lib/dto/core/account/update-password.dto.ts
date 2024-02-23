export interface UpdatePasswordRequestDTO {
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
}

// Converts JSON strings to/from your types
export class UpdatePasswordRequestConvert {
    public static fromJson(json: string): UpdatePasswordRequestDTO {
        return JSON.parse(json);
    }

    public static toJson(value: UpdatePasswordRequestDTO): string {
        return JSON.stringify(value);
    }
}
