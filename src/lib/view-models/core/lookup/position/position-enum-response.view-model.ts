export interface EnumPositionResponseViewModel {
    status:  number;
    message: string;
    data:    PositionData;
}

export interface PositionData {
    positions: EnumPosition[];
}

export interface EnumPosition {
    id:   number;
    name: string;
}
