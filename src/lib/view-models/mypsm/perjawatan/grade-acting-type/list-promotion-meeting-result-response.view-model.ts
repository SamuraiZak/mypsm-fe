export interface ListPromotionMeetingResult {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    pageNum:                 number;
    totalData:               number;
    totalPage:               number;
    promotionMeetingResults: PromotionMeetingResult[];
}

export interface PromotionMeetingResult {
    employeeNumber:   string;
    employeeName:     string;
    ICNumber:         string;
    grade:            string;
    position:         string;
    currentPlacement: string;
    meetingResult:    string;
}
