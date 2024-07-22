import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import { IntegrityServices } from '$lib/services/implementation/mypsm/integriti/integrity.service';

export const load = async ({parent}) => {
    const { layoutData } = await parent();

    const currentRoleCode: string = layoutData.accountDetails.currentRoleCode

    // urusetia
    let urusetia = UserRoleConstant.urusSetiaIntegriti.code;

    // kakitangan
    let kakitangan = UserRoleConstant.kakitangan.code;

    // pengarah Integriti
    let pengarah = UserRoleConstant.pengarahIntegriti.code;


    // ==========================================
    // ============= new Table ==================
    // ==========================================

    // ============== pengarah ==================

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'id',
        orderType: 1,
        filter: {
            employeeNumber: null,
            name: null,
            identityDocumentNumber: null,
            applicationDate: null,
        },
    };

    // =============== urusetia ====================

    const paramUrusSetia: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'id',
        orderType: 1,
        filter: {
            dataType: 1,
            name: '',
            employeeNumber: '',
            identityDocumentNumber: '',
            applicationDate: null,
            grade: '',
            position: '',
            status: '', // status code from lookup | null | undefined;
        },
    };

    // ================== employee ===================

    const paramEmployee: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'id',
        orderType: 1,
        filter: {
            dataType: 1,
            name: '',
            employeeNumber: '',
            identityDocumentNumber: '',
            applicationDate: null,
            grade: '',
            position: '',
            status: '', // status code from lookup | null | undefined;
        },
    };

    let directorSurcajViewResponse: CommonResponseDTO = {};
    let directorSurcajViewTable = [];

    let surcajViewResponse: CommonResponseDTO = {};
    let surcajViewTable = [];

    let employeeSurcajViewResponse: CommonResponseDTO = {};
    let employeeSurcajViewTable = [];

    if (currentRoleCode === pengarah) {
        directorSurcajViewResponse =
            await IntegrityServices.getSurcajListDetails(param);
        directorSurcajViewTable =
            directorSurcajViewResponse.data?.dataList ?? [];
    } else if (currentRoleCode === urusetia) {
        surcajViewResponse =
            await IntegrityServices.getSurcajListDetails(paramUrusSetia);
        surcajViewTable = surcajViewResponse.data?.dataList ?? [];
    } else if (currentRoleCode === kakitangan) {
        employeeSurcajViewResponse =
            await IntegrityServices.getEmployeeSurcajListDetails(paramEmployee);
        employeeSurcajViewTable =
            employeeSurcajViewResponse.data?.dataList ?? [];
    }

    return {
        param,
        paramUrusSetia,
        surcajViewResponse,
        surcajViewTable,
        directorSurcajViewResponse,
        directorSurcajViewTable,
        employeeSurcajViewResponse,
        employeeSurcajViewTable,
        paramEmployee,
        currentRoleCode,
    };
};

export async function _updateTable(param: CommonListRequestDTO) {
    const response: CommonResponseDTO =
        await IntegrityServices.getSurcajListDetails(param);
    return {
        props: {
            param,
            response,
        },
    };
}
export async function _updateDirectorTable(param: CommonListRequestDTO) {
    const response: CommonResponseDTO =
        await IntegrityServices.getSurcajListDetails(param);
    return {
        props: {
            param,
            response,
        },
    };
}
export async function _updateEmployeeTable(param: CommonListRequestDTO) {
    const response: CommonResponseDTO =
        await IntegrityServices.getEmployeeSurcajListDetails(param);
    return {
        props: {
            param,
            response,
        },
    };
}
