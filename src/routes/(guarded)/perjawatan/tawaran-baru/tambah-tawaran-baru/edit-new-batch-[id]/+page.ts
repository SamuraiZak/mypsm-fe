import { goto } from '$app/navigation';
import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant.js';
import { RoleConstant } from '$lib/constants/core/role.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { commonIdRequestDTO } from '$lib/dto/core/common/id-request.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { NewOfferMeetingRequestDTO } from '$lib/dto/mypsm/employment/new-offer/new-offer-request-response.dto';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import { _createMeetingBatchSchema } from '$lib/schemas/mypsm/employment/new-offer/schema';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { NewOfferServices } from '$lib/services/implementation/mypsm/employment/new-offer/new-offer.service';
import { EmployeeServices } from '$lib/services/implementation/mypsm/shared/employee.service';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async ({ params }) => {
    const idRequestBody: commonIdRequestDTO = {
        id: Number(params.id),
    };

    const currentRoleCode = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );

    const isStaffRole = currentRoleCode === RoleConstant.kakitangan.code;

    const isEmploymentSecretaryRole =
        currentRoleCode === RoleConstant.urusSetiaPerjawatan.code;

    const isAuditDirectorRole =
        currentRoleCode === RoleConstant.pengarahAudit.code;

    const isIntegrityDirectorRole =
        currentRoleCode === RoleConstant.pengarahIntegriti.code;

    const isStateDirectorRole =
        currentRoleCode === RoleConstant.pengarahNegeri.code;

    const isUnitDirectorRole =
        currentRoleCode === RoleConstant.pengarahBahagian.code;

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {
            program: 'SEMUA',
            employeeNumber: null, //string | null | undefined;
            name: null, //string | null | undefined;
            identityDocumentNumber: null, //string | null | undefined;
            scheme: null, //string | null | undefined;
            grade: null, //string | null | undefined;
            position: null, //string | null | undefined;
        },
    };

    const newOfferMeetingDetailResponse: CommonResponseDTO =
        await NewOfferServices.getNewOfferFullDetail(idRequestBody);

    // List
    const employeesListResponse = await EmployeeServices.getEmployeeList(param);

    const selectedEmployees: number[] =
        newOfferMeetingDetailResponse.data?.details.includedEmployee.employees
            .filter((selectedStaff: { employeeNumber: string }) => {
                return employeesListResponse.data?.dataList?.some((staff) => {
                    return (
                        staff.employeeNumber === selectedStaff.employeeNumber
                    );
                });
            })
            .map(
                (selectedStaff: { employeeNumber: string }) =>
                    selectedStaff.employeeNumber,
            );

    console.log(
        newOfferMeetingDetailResponse.data?.details.includedEmployee.employees,
        selectedEmployees,
    );

    // Superform
    const newOfferMeetingDetailForm = await superValidate(
        zod(_createMeetingBatchSchema),
        { errors: false },
    );
    // ==========================================================================
    // Get Lookup Functions
    // ==========================================================================
    const gradeLookupResponse: CommonResponseDTO =
        await LookupServices.getServiceGradeEnums();

    const gradeLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsBothAreCode(gradeLookupResponse);

    // ===========================================================================

    return {
        param,
        currentRoleCode,
        responses: {
            employeesListResponse,
            newOfferMeetingDetailResponse,
        },
        selectionOptions: {
            selectedEmployees,
            gradeLookup,
        },
        form: { newOfferMeetingDetailForm },
        roles: {
            isStaffRole,
            isStateDirectorRole,
            isUnitDirectorRole,
            isEmploymentSecretaryRole,
            isAuditDirectorRole,
            isIntegrityDirectorRole,
        },
    };
};

export const _createNewOfferMeetingForm = async (formData: object) => {
    const form = await superValidate(formData, zod(_createMeetingBatchSchema));

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await NewOfferServices.createNewOfferMeetingBatchResult(
            form.data as NewOfferMeetingRequestDTO,
        );

    if (response.status === 'success')
        setTimeout(() => {
            goto(`../tawaran-baru`);
        }, 1000);

    return { response };
};