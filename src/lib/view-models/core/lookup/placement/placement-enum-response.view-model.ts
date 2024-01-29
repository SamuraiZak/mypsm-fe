export interface EnumPlacementResponseViewModel {
    status:  number;
    message: string;
    data:    EnumPlacementResponseData;
}

export interface EnumPlacementResponseData {
    placements: EnumPlacement[];
}

export interface EnumPlacement {
    id:   number;
    name: string;
}