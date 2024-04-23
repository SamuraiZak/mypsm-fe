import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';

export class GCRWithdrawalTypeConstant {
    public static death: DropdownDTO = {
        value: 1,
        name: 'Meninggal Dunia',
        url: 'meninggal_dunia',
    };
    public static pension: DropdownDTO = {
        value: 2,
        name: 'Pencen',
        url: 'pencen',
    };
    public static early: DropdownDTO = {
        value: 3,
        name: 'Pengeluaran Awal',
        url: 'pengeluaran_awal',
    };

    public static list: DropdownDTO[] = [this.death, this.pension, this.early];
    public static listDropdown: DropdownDTO[] = [this.death, this.pension];
}
