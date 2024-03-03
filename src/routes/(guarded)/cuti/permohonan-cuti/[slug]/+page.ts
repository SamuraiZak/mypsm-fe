import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto.js';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto.js';
import { LookupHelper } from '$lib/helpers/core/lookup.helper.js';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service.js';
import { EmployeeServices } from '$lib/services/implementation/mypsm/shared/employee.service';

export async function load({ params }) {
    // get current role code
    let currentRoleCode: string =
        localStorage.getItem(LocalStorageKeyConstant.currentRoleCode) ??
        'unknown';

    // get leave types
    let leaveTypeDropdown: DropdownDTO[] = [];

    let leaveTypeListResponse: CommonResponseDTO =
        await LookupServices.getLeaveTypeEnums();

    if (leaveTypeListResponse.status == 'success') {
        let leaveTypeLookup: LookupDTO[] = leaveTypeListResponse.data
            ?.dataList as LookupDTO[];

        leaveTypeDropdown = LookupHelper.toDropdownProper(leaveTypeLookup).sort(
            (a, b) => (a.name < b.name ? -1 : 1),
        );
    }

    if (params.slug == 'baru') {
        // prepare empty employee detail
        let employeeDetail: CommonEmployeeDTO;

        // fetch employee details
        const employeeDetailResponse: CommonResponseDTO =
            await EmployeeServices.getCurrentEmployeeDetails();

        if (employeeDetailResponse.status == 'success') {
            employeeDetail = employeeDetailResponse.data
                ?.details as CommonEmployeeDTO;
        } else {
            employeeDetail = {
                employeeId: 0,
                employeeNumber: 'unknown',
                name: 'unknown',
                identityCard: 'unknown',
                program: 'unknown',
                scheme: 'unknown',
                grade: 'unknown',
                position: 'unknown',
                placement: 'unknown',
            };
        }
    } else {
    }

    return {
        props: {
            leaveTypeDropdown,
        },
    };
}
