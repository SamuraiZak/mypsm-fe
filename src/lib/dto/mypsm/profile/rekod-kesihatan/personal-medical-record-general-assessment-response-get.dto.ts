export interface GetPersonalMedicalGeneralAssessmentResponse {
        year:               number;
        height:             number;
        weight:             number;
        BMI:                number;
        BPM:                number;
        BP:                 string;
        paleSkin:           boolean;
        cycnosis:           boolean;
        edema:              boolean;
        jaundice:           boolean;
        lymphGlands:        boolean;
        skinDisease:        boolean;
        unaidedVisionLeft:  string;
        unaidedVisionRight: string;
        aidedVisionLeft:    string;
        aidedVisionRight:   string;
        colourVision:       string;
        fundoscopic:        string;
        ear:                string;
        dental:             string;
        neck:               string;
        cardiovascular:     string;
        breathingExam:      string;
        xray:               string;
        xrayTaken:          Date;
        xrayLocation:       string;
        xrayReference:      string;
        abdomenHernia:      string;
        mentalState:        string;
        musculoskeletal:    string;
        sugar:              boolean;
        albumin:            boolean;
        microscopic:        string;
    }

    // Converts JSON strings to/from your types
    export class Convert {
        public static toGetPersonalMedicalHistory(json: string): GetPersonalMedicalGeneralAssessmentResponse {
            return JSON.parse(json);
        }

        public static getPersonalMedicalHistoryToJson(value: GetPersonalMedicalGeneralAssessmentResponse): string {
            return JSON.stringify(value);
        }
    }
