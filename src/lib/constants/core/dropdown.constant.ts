import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';

export const monthLookup: DropdownDTO[] = [
    { value: '01', name: 'Januari' },
    { value: '02', name: 'Februari' },
    { value: '03', name: 'Mac' },
    { value: '04', name: 'April' },
    { value: '05', name: 'Mei' },
    { value: '06', name: 'Jun' },
    { value: '07', name: 'Julai' },
    { value: '08', name: 'Ogos' },
    { value: '09', name: 'September' },
    { value: '10', name: 'Oktober' },
    { value: '11', name: 'November' },
    { value: '12', name: 'Disember' },
];
export const monthNumberLookup: DropdownDTO[] = [
    { value: 1, name: 'Januari' },
    { value: 2, name: 'Februari' },
    { value: 3, name: 'Mac' },
    { value: 4, name: 'April' },
    { value: 5, name: 'Mei' },
    { value: 6, name: 'Jun' },
    { value: 7, name: 'Julai' },
    { value: 8, name: 'Ogos' },
    { value: 9, name: 'September' },
    { value: 10, name: 'Oktober' },
    { value: 11, name: 'November' },
    { value: 12, name: 'Disember' },
];

export const kgtMonthStringLookup: DropdownDTO[] = [
    { value: '01', name: 'Januari' },
    { value: '04', name: 'April' },
    { value: '07', name: 'Julai' },
    { value: '10', name: 'Oktober' },
];

export const kgtMonthLookup: DropdownDTO[] = [
    { value: 1, name: 'Januari' },
    { value: 4, name: 'April' },
    { value: 7, name: 'Julai' },
    { value: 10, name: 'Oktober' },
];

export const mesyuaratNameLookup: DropdownDTO[] = [
    { value: "1/12", name: 'Mesyuarat 1/12' },
    { value: "1/102", name: 'Mesyuarat 1/102' },
    { value: "2/101", name: 'Mesyuarat 2/101' },
]

export const kgtSpecialRaiseType: DropdownDTO [] = [
    { value: 'fixed', name: 'Ditetapkan Sekali Sepanjang Tahun Pergerakan Gaji' },
    { value: 'specialByGrossPay', name: 'Peratusan Daripada Jumlah Gaji Pokok' },
    { value: 'KGT', name: 'Peratusan Daripada KGT' },
]