export interface InterimApplicationResponse {
    interimId?: number;
    gradeId: number;
    positionId: number;
    placementId: number;
    newPlacementId: number;
    referenceNumber: string;
    startDate: string;
    endDate: string;
    reason: string;
    isReadOnly?: boolean;
}