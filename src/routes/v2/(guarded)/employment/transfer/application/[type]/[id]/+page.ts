import { invalidateAll } from '$app/navigation';
import { CommonResponseConstant } from '$lib/constants/core/common-response.constant.js';
import { RoleConstant } from '$lib/constants/core/role.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { EmployeeLookupItemDTO } from '$lib/dto/core/employee/employee.dto';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto.js';
import type { UserRoleDTO } from '$lib/dto/core/user-role/user-role.dto.js';
import type {
    TransferApplicationDetailsDTO,
    TransferApplicationDetailsRequestDTO,
    TransferApplicationPersonalDetailDTO,
    TransferApplicationServiceDetailDTO,
} from '$lib/dto/mypsm/employment/transfer/transfer.dto';
import { LookupHelper } from '$lib/helpers/core/lookup.helper';
import {
    TransferApplicationAcceptanceLetterDetailSchema,
    TransferApplicationAssignDirectorSchema,
    TransferApplicationAssignPostponeApproverSchema,
    TransferApplicationConfirmationSchema,
    TransferApplicationDirectorSupportSchema,
    TransferApplicationEmployeeDetailSchema,
    TransferApplicationEndorsementSchema,
    TransferApplicationEndorserDetailSchema,
    TransferApplicationMeetingResultSchema,
    TransferApplicationPostponeDetailSchema,
    TransferApplicationPostponeLetterDetailSchema,
    TransferApplicationServiceDetailSchema,
    TransferApplicationTransferDetailSchema,
    TransferApplicationTransferDocumentSchema,
    type TransferApplicationAcceptanceLetterDetailType,
    type TransferApplicationAssignDirectorType,
    type TransferApplicationAssignPostponeApproverType,
    type TransferApplicationConfirmationType,
    type TransferApplicationEmployeeDetailType,
    type TransferApplicationMeetingResultType,
    type TransferApplicationPostponeDetailType,
    type TransferApplicationServiceDetailType,
    type TransferApplicationTransferDetailType,
} from '$lib/schemas/mypsm/employment/transfer/transfer.schema';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { TransferServices } from '$lib/services/implementation/mypsm/employment/transfer/transfer.service.js';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({ params, parent }) {
    const { layoutData } = await parent();

    console.log('loading');

    // get application id from pass parameters
    const currentApplicationId: number = parseInt(params.id);

    // get application type from pass parameter
    const currentApplicationType: string = params.type;

    // ==========================================================
    // FORMS
    // ==========================================================

    // create employee detail form
    const employeeDetailForm = await superValidate(
        zod(TransferApplicationEmployeeDetailSchema),
    );

    // create service detail form
    const serviceDetailForm = await superValidate(
        zod(TransferApplicationServiceDetailSchema),
    );

    // create transfer detail form
    const transferDetailForm = await superValidate(
        zod(TransferApplicationTransferDetailSchema),
    );

    // create confirmation form
    const applicationConfirmationForm = await superValidate(
        zod(TransferApplicationConfirmationSchema),
    );

    // this is where i fetch the data starts
    let currentApplicationDetails = {} as TransferApplicationDetailsDTO;

    // create a request body to fetch the data
    const tempApplicationDetailRequest: TransferApplicationDetailsRequestDTO = {
        applicationId: currentApplicationId,
    };

    // send a request to fetch the data
    const tempApplicationDetailsResponse: CommonResponseDTO =
        await TransferServices.getApplicationDetails(
            tempApplicationDetailRequest,
        );

    // checks if the response is successful by checking the "status" value in the response body
    if (tempApplicationDetailsResponse.status == 'success') {
        // set the applicationDetails value
        currentApplicationDetails = tempApplicationDetailsResponse.data
            ?.details as TransferApplicationDetailsDTO;

        // assign value employeedetailForm
        employeeDetailForm.data =
            currentApplicationDetails.employeeDetails as TransferApplicationEmployeeDetailType;

        // assign value serviceDetailsForm
        serviceDetailForm.data =
            currentApplicationDetails.serviceDetails as TransferApplicationServiceDetailType;

        // assign value transferDetailForm
        transferDetailForm.data =
            currentApplicationDetails.transferDetails as TransferApplicationTransferDetailType;

        // assign value applicationConfirmationForm
        if (currentApplicationDetails.confirmation) {
            // assign the updated data for "confirmation" form
            applicationConfirmationForm.data =
                currentApplicationDetails.confirmation;
        } else {
            applicationConfirmationForm.data.applicationId =
                currentApplicationId;
        }
    }

    // ==========================================================
    // Lookup
    // ==========================================================
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

    const roleDropdown: DropdownDTO[] = await _getRoleDropdown();

    const placementDropdown: DropdownDTO[] = await _getPlacementDropdown();

    const postponeApproverDropdown: DropdownDTO[] = [];
    const supporterDropdown: DropdownDTO[] = [];
    const approverDropdown: DropdownDTO[] = [];

    console.log('before return ');
    console.log(applicationConfirmationForm.data);

    return {
        props: {
            currentApplicationId,
            layoutData,
            currentApplicationDetails,
        },
        forms: {
            employeeDetailForm,
            serviceDetailForm,
            transferDetailForm,
            applicationConfirmationForm,
        },
        lookup: {
            transferCategoryOption,
            transferReasonOption,
            directorFeedbackOption,
            directorDrodpwon,
            roleDropdown,
            postponeApproverDropdown,
            supporterDropdown,
            approverDropdown,
            placementDropdown,
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

export async function _getRoleDropdown() {
    let roleOption: DropdownDTO[] = [];

    const roleListResponse: CommonResponseDTO =
        await LookupServices.getRoleEnums();

    const roleList: UserRoleDTO[] = roleListResponse.data
        ?.dataList as UserRoleDTO[];

    roleOption = LookupHelper.roleToDropdown(roleList);

    return roleOption;
}

export async function _getPlacementDropdown() {
    let roleOption: DropdownDTO[] = [];

    const roleListResponse: CommonResponseDTO =
        await LookupServices.getPlacementEnums();

    const roleList: LookupDTO[] = roleListResponse.data
        ?.dataList as LookupDTO[];

    roleOption = LookupHelper.toDropdownDescription(roleList);

    return roleOption;
}

// =====================================================================
// Application flows
// =====================================================================
// 1. get current employee detail
export async function _getCurrentEmployeeDetails() {
    let result: TransferApplicationPersonalDetailDTO = {
        name: 'Tiada Maklumat',
        identityDocumentNumber: 'Tiada Maklumat',
        employeeNumber: 'Tiada Makluamt',
        phone: 'Tiada Maklumat',
        maritalStatus: 'Tiada Maklumat',
        childCount: 1,
        childInSchoolCount: 1,
    };

    const response: CommonResponseDTO =
        await TransferServices.getCurrentEmployeeDetail();

    if (response.status == 'success') {
        result = response.data?.details as TransferApplicationPersonalDetailDTO;
    }

    return result;
}

// 2. get current employee service detail
export async function _getCurrentEmployeeServiceDetails() {
    let result: TransferApplicationServiceDetailDTO = {
        position: 'Tiada Maklumat',
        grade: 'Tiada Maklumat',
        hiringDate: 'Tiada Maklumat',
        officeName: 'Tiada Maklumat',
        officeAddress: 'Tiada Maklumat',
        department: 'Tiada Maklumat',
        servicePeriod: 0,
    };

    const response: CommonResponseDTO =
        await TransferServices.getCurrentEmployeeServiceDetail();

    if (response.status == 'success') {
        result = response.data?.details as TransferApplicationServiceDetailDTO;
    }

    return result;
}

// 3. create application
export async function _applicationDetailSubmit(
    params: TransferApplicationTransferDetailType,
) {
    const form = await superValidate(
        params,
        zod(TransferApplicationTransferDetailSchema),
    );

    if (form.valid) {
        const response = await TransferServices.addTransferDetail(form.data);

        return response;
    } else {
        return CommonResponseConstant.httpError;
    }
}

// add confirmation
export const _applicationConfirmationSubmit = async (
    params: TransferApplicationConfirmationType,
) => {
    const form = await superValidate(
        params,
        zod(TransferApplicationConfirmationSchema),
    );

    if (form.valid) {
        const response: CommonResponseDTO =
            await TransferServices.addApplicationConfirmation(form.data);
        console.log('submitted');
        return response;
    } else {
        return CommonResponseConstant.httpError;
    }
};
