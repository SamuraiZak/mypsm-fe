// ===============================================================
// Program Constants
// ===============================================================

import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';

export class ProgramDropdownConstant {
    public static permanent: DropdownDTO = {
        value: 'TETAP',
        name: 'Tetap',
    };
    public static probation: DropdownDTO = {
        value: 'PERCUBAAN',
        name: 'Percubaan',
    };
    public static temporary: DropdownDTO = {
        value: 'SEMENTARA',
        name: 'Sementara',
    };
    public static contract: DropdownDTO = {
        value: 'KONTRAK',
        name: 'Kontrak',
    };
    public static project: DropdownDTO = {
        value: 'PROJEK',
        name: 'Projek',
    };
    public static partTime: DropdownDTO = {
        value: 'SAMBILAN',
        name: 'Sambilan',
    };
    public static borrowed: DropdownDTO = {
        value: 'PINJAMAN',
        name: 'Pinjaman',
    };
    public static others: DropdownDTO = {
        value: 'LAIN-LAIN',
        name: 'Lain-lain',
    };
    public static all: DropdownDTO = {
        value: 'SEMUA',
        name: 'Semua',
    };

    public static list: DropdownDTO[] = [
        this.permanent,
        this.probation,
        this.temporary,
        this.contract,
        this.project,
        this.partTime,
        this.borrowed,
        this.others,
        this.all,
    ];
}
