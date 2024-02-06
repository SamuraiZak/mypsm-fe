export interface GetPersonalMedicalRecordHistoryResponse  {
        id:         string;
        diseases:   string;
        isPersonal: boolean;
        isFamily:   boolean;
        remark:     Remark;
    }


    export enum Remark {
        Empty = "",
        SakitJiwa = "Sakit Jiwa",
    }

    // Converts JSON strings to/from your types
    export class Convert {
        public static toGetPersonalMedicalHistory(json: string): GetPersonalMedicalRecordHistoryResponse {
            return JSON.parse(json);
        }

        public static getPersonalMedicalHistoryToJson(value: GetPersonalMedicalRecordHistoryResponse): string {
            return JSON.stringify(value);
        }
    }
