import { RoleConstant } from '$lib/constants/core/role.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { EmployeeLookupItemDTO } from '$lib/dto/core/employee/employee.dto';
import { LookupHelper } from '$lib/helpers/core/lookup.helper';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';

export async function load() {
    const transferCategoryOption: DropdownDTO[] = [
        {
            name: 'Pertukaran Dalam Ibu Pejabat/Negeri/Wilayah',
            value: 'Pertukaran Dalam Ibu Pejabat/Negeri/Wilayah',
        },
        {
            name: 'Pertukaran Luar Ibu Pejabat/Negeri/Wilayah',
            value: 'Pertukaran Luar Ibu Pejabat/Negeri/Wilayah',
        },
    ];

    const transferReasonOption: DropdownDTO[] = [
        {
            name: 'Mengikut Pasangan',
            value: 'Mengikut Pasangan',
        },
        {
            name: 'Menjaga Ibu/ Bapa yang uzur/sakit',
            value: 'Menjaga Ibu/ Bapa yang uzur/sakit',
        },
        {
            name: 'Kes Kesihatan Kronik Pemohon',
            value: 'Kes Kesihatan Kronik Pemohon',
        },
        {
            name: 'Lain-lain (sila nyatakan)',
            value: 'Lain-lain (sila nyatakan)',
        },
    ];

    const directorFeedbackOption: DropdownDTO[] = [
        {
            name: 'Disokong tanpa pengganti',
            value: 'Disokong tanpa pengganti',
        },
        {
            name: 'Disokong dengan pengganti dihantar serentak',
            value: 'Disokong dengan pengganti dihantar serentak',
        },
        {
            name: 'Disokong dengan pengganti dihantar kemudian',
            value: 'Disokong dengan pengganti dihantar kemudian',
        },
        {
            name: 'Tidak disokong (sila beri ulasan)',
            value: 'Tidak disokong (sila beri ulasan)',
        },
        {
            name: 'Ada tindakan tatatertib (sila berikan senarai laporan)',
            value: 'Ada tindakan tatatertib (sila berikan senarai laporan)',
        },
    ];

    // 3. director dropdown
    const directorDrodpwon: DropdownDTO[] = await _getDirectorDropdown();

    return {
        lookup: {
            transferCategoryOption,
            transferReasonOption,
            directorFeedbackOption,
            directorDrodpwon,
        },
    };
}

export async function _getDirectorDropdown() {
    let directorOption: DropdownDTO[] = [];

    const filter = {
        program: 'SEMUA',
        employeeNumber: null,
        name: null,
        identityCard: null,
        grade: null,
        role: RoleConstant.pengarahNegeri.code,
    };

    const request: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'name',
        orderType: 1,
        filter: filter,
    };

    const directorListResponse: CommonResponseDTO =
        await LookupServices.getEndorserDropdown(request);

    const directorList: EmployeeLookupItemDTO[] = directorListResponse.data
        ?.dataList as EmployeeLookupItemDTO[];

    directorOption = LookupHelper.employeeToDropdown(directorList);

    return directorOption;
}
