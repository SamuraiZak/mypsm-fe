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
    { value: 'Januari', name: 'Januari' },
    { value: 'April', name: 'April' },
    { value: 'Julai', name: 'Julai' },
    { value: 'Oktober', name: 'Oktober' },
];
export const kgtMonthValueIsStringLookup: DropdownDTO[] = [
    { value: 'Januari', name: 'Januari' },
    { value: 'April', name: 'April' },
    { value: 'Julai', name: 'Julai' },
    { value: 'Oktober', name: 'Oktober' },
];

export const kgtMonthLookup: DropdownDTO[] = [
    { value: 1, name: 'Januari' },
    { value: 4, name: 'April' },
    { value: 7, name: 'Julai' },
    { value: 10, name: 'Oktober' },
];

export const mesyuaratNameLookup: DropdownDTO[] = [
    { value: 'Mesyuarat 1/12', name: 'Mesyuarat 1/12' },
    { value: 'Mesyuarat 1/102', name: 'Mesyuarat 1/102' },
    { value: 'Mesyuarat 2/101', name: 'Mesyuarat 2/101' },
];

export const kgtSpecialRaiseType: DropdownDTO[] = [
    {
        value: 'Ditetapkan Sekali Sepanjang Tahun Pergerakan Gaji',
        name: 'Ditetapkan Sekali Sepanjang Tahun Pergerakan Gaji',
    },
    {
        value: 'Peratusan Daripada Jumlah Gaji Pokok',
        name: 'Peratusan Daripada Jumlah Gaji Pokok',
    },
    { value: 'Peratusan Daripada KGT', name: 'Peratusan Daripada KGT' },
];

export const successOption: DropdownDTO[] = [
    { value: 'Berjaya', name: 'Berjaya' },
    { value: 'Tidak Berjaya', name: 'Tidak Berjaya' },
];

export const successBooleanOption: DropdownDTO[] = [
    { value: true, name: 'Berjaya' },
    { value: false, name: 'Tidak Berjaya' },
];

export const dropdownCommonOption: DropdownDTO[] = [
    { value: true, name: 'Ya' },
    { value: false, name: 'Tidak' },
];

export const vehicleConditionOption: DropdownDTO[] = [
    { value: 'Baru', name: 'Baru' },
    { value: 'Terpakai', name: 'Terpakai' },
];

export const integrityDropdown: DropdownDTO[] = [
    { value: true, name: 'Bebas' },
    { value: false, name: 'Tidak Bebas' },
];

export const statuDropdownOption: DropdownDTO[] = [
    { value: 'Draf', name: 'Draf' },
    { value: 'Sedang Diproses', name: 'Sedang Diproses' },
    { value: 'Selesai', name: 'Selesai' },
    { value: 'Gagal', name: 'Gagal' },
    { value: 'Semua', name: 'Semua' },
];
