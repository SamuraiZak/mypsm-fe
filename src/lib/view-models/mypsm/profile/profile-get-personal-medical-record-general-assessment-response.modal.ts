export interface GetPersonalMedicalRecordGeneralAssessmentResponse {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
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
