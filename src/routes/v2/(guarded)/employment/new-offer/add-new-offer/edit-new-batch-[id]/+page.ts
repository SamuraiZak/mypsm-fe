import { goto } from '$app/navigation';
import { RoleConstant } from '$lib/constants/core/role.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto';
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

export const load = async ({ params, parent }) => {
    const idRequestBody: commonIdRequestDTO = {
        id: Number(params.id),
    };

    const { layoutData } = await parent();

    const currentRoleCode = layoutData.accountDetails.currentRoleCode;

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

    const selectedEmployees: CommonEmployeeDTO[] =
        newOfferMeetingDetailResponse.data?.details.includedEmployee.employees;

    // Superform
    const newOfferMeetingDetailForm = await superValidate(
        newOfferMeetingDetailResponse.data?.details.meetingResult,
        zod(_createMeetingBatchSchema),
        { errors: false },
    );

    newOfferMeetingDetailForm.data.applicationId = Number(params.id);

    newOfferMeetingDetailForm.data.meetingGroupName =
        newOfferMeetingDetailResponse.data?.details.meetingResult.meetingName;

    newOfferMeetingDetailForm.data.employees = (
        selectedEmployees as CommonEmployeeDTO[]
    ).map((data) => ({
        employeeId: Number(data.id),
    }));
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

    console.log('function', form);
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
            goto(`../../new-offer`);
        }, 1000);

    return { response };
};
