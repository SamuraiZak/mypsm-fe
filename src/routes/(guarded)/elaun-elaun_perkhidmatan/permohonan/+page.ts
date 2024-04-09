import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { RoleConstant } from '$lib/constants/core/role.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type {
    AllowanceApplicationFilterDTO,
    AllowanceApplicationListDTO,
} from '$lib/dto/mypsm/allowance/allowance.dto';
import { AllowanceServices } from '$lib/services/implementation/mypsm/allowance/allowance.service';

export async function load() {
    const currentRoleCode: string =
        localStorage.getItem(LocalStorageKeyConstant.currentRoleCode) ??
        RoleConstant.kakitangan.code;

    let mode: string = 'kakitangan';

    switch (currentRoleCode) {
        case RoleConstant.kakitangan.code:
            mode = 'kakitangan';
            break;
        case RoleConstant.urusSetiaElaunElaunPerkhidmatan.code:
            mode = 'urusetia';
            break;
        case RoleConstant.pengarahBahagian.code:
            mode = 'pengarah';
            break;
        case RoleConstant.pengarahNegeri.code:
            mode = 'pengarah';
            break;
        case RoleConstant.penyokong.code:
            mode = 'penyokong';
            break;
        case RoleConstant.pelulus.code:
            mode = 'pelulus';
            break;
        default:
            mode = 'kakitangan';
            break;
    }
    // set filter
    const filter: AllowanceApplicationFilterDTO = {
        employeeNumber: null,
        name: null,
        allowanceType: null,
        applicationDate: null,
        status: null,
    };

    // set parameter
    const listParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 10,
        orderBy: null,
        orderType: null,
        filter: filter,
    };

    // set default list value
    let allowanceApplicationList: AllowanceApplicationListDTO[] = [];

    // fetch list
    const response: CommonResponseDTO =
        await AllowanceServices.getApplicationList(listParam);

    // set list value
    if (response.status == 'success') {
        allowanceApplicationList = response.data
            ?.dataList as AllowanceApplicationListDTO[];
    }

    return {
        props: {
            allowanceApplicationList,
            listParam,
            response,
            mode,
        },
    };
}
