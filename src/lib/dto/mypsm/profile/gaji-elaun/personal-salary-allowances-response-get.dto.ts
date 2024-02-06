export interface GetPersonalSalaryAllowencesResponse {

        id:         string;
        month:      string;
        baseSalary: number;
        allowance:  number;
    }



    // Converts JSON strings to/from your types
    export class GetPersonalSalaryAllowencesResponseConvert {
        public static fromResponse(json: string): GetPersonalSalaryAllowencesResponse {
            return JSON.parse(json);
        }

        public static toJson(value: GetPersonalSalaryAllowencesResponse): string {
            return JSON.stringify(value);
        }
    }


