export interface PlacementMeetingResult {
    candidate:     PlacementCandidate;
    meetingResult: PlacementMeeting;
}

export interface PlacementCandidate {
    actingId:       number;
    employeeId:     number;
    employeeNumber: string;
    employeeName:   string;
    ICNumber:       string;
}

export interface PlacementMeeting {
    meetingResult: string;
    newPlacement:  string;
    newDirector:   string;
    reportDate:    string;
}