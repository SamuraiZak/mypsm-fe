
// unspecified retirement list item
export interface RetirementUnspecifiedListItem{
    retirementId: number;
    name:         string;
    headCount:    number;
    date:         string;
    status:       string;
}

// unspecified retirement list filter
export interface RetirementUnspecifiedListFilter{

}

// unspecified retirement chosen list item
export interface RetirementUnspecifiedChosenListItem {
    groupId:            number;
    employeeId:         number;
    employeeNumber:     string;
    employeeName:       string;
    identityCardNumber: string;
    retirementDate:     string;
    status:             string;
}