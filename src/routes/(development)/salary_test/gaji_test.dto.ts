export interface PerkiraanGajiTest {
    total: number;
    period: Period[];
}

export interface Period {
    month: string;
    total: number;
    payment: Payment[];
}

export interface Payment {
    type: string;
    paid: number;
    total: number;
    misc: Misc[];
}

export interface Misc {
    item: string;
    amount: number;
}
