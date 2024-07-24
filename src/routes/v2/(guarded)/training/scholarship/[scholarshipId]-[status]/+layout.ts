import { RoleConstant } from '$lib/constants/core/role.constant';
import type { DocumentBase64RequestDTO } from '$lib/dto/core/common/base-64-document-request.dto';
import type { CommonFilterDTO } from '$lib/dto/core/common/common-filter.dto';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto';
import type { commonIdRequestDTO } from '$lib/dto/core/common/id-request.dto.js';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { TableDTO } from '$lib/dto/core/table/table.dto';
import type {
    CourseFundApplicationApprovalDTO,
    CourseFundApplicationSetApproverDTO,
} from '$lib/dto/mypsm/course/fund-application/course-fund-application-approval.dto';
import type { CourseFundApplicationDocumentsResponseDTO } from '$lib/dto/mypsm/course/fund-application/course-fund-application-document.dto';
import type { CourseFundApplicationPersonalDetailResponseDTO } from '$lib/dto/mypsm/course/fund-application/course-fund-application-personal-info.dto';
import type { CourseFundApplicationServiceDetailResponseDTO } from '$lib/dto/mypsm/course/fund-application/course-fund-application-service-info.dto';
import type {
    CourseAddFundApplicationRequestDTO,
    CourseFundApplicationDetailResponseDTO,
} from '$lib/dto/mypsm/course/fund-application/course-fund-application.dto';
import type { CourseFundReimbursementUploadDocumentsBase64RequestDTO } from '$lib/dto/mypsm/course/fund-reimbursement/course-fund-reimbursement-document.dto';
import { _fileToBase64String } from '$lib/helpers/core/fileToBase64String.helper';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import {
    _createFundApplicationRequestSchema,
    _fundApplicationApprovalSchema,
    _fundApplicationDetailResponseSchema,
    _fundApplicationDocumentSchema,
    _fundApplicationPersonalInfoResponseSchema,
    _fundApplicationServiceInfoResponseSchema,
    _fundApplicationUploadDocSchema,
    _setApproversSchema,
} from '$lib/schemas/mypsm/course/fund-application-schema';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { CourseFundApplicationServices } from '$lib/services/implementation/mypsm/latihan/fundApplication.service.js';
import { LNPTServices } from '$lib/services/implementation/mypsm/lnpt/lnpt.service';
import { EmployeeServices } from '$lib/services/implementation/mypsm/shared/employee.service';
import { error } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/client';

//==================================================
//=============== Load Function ====================
//==================================================
export async function load({ params, parent }) {
    const { layoutData } = await parent();

    const currentRoleCode = layoutData.accountDetails.currentRoleCode;

    const idRequestBody: commonIdRequestDTO = {
        id: Number(params.scholarshipId),
    };

    const isStaffRole: boolean =
        currentRoleCode === RoleConstant.kakitangan.code;
    const isCourseSecretaryRole: boolean =
        currentRoleCode === RoleConstant.urusSetiaLatihan.code;
    const isIntegritySecretaryRole: boolean =
        currentRoleCode === RoleConstant.urusSetiaIntegriti.code;
    const isStateDirectorRole: boolean =
        currentRoleCode === RoleConstant.pengarahBahagian.code;
    const isUnitDirectorRole: boolean =
        currentRoleCode === RoleConstant.pengarahBahagian.code;

            // prepare mocks for lnpt average filters
    const lnptAverageFilters: object = {
        employeeIds: [],
        years: 2021,
        duration: 3,
    };

    // prepare mocks for lnpt average params
    const lnptAverageParams: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: lnptAverageFilters,
    };

    // lnpt average table
    const tableLNPT: TableDTO = {
        param: lnptAverageParams,
        meta: {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: [],
        hiddenData: ['employeeId'],
    };

    let fundApplicationDetailResponse: CommonResponseDTO = {};
    let fundApplicationPersonalDetailResponse: CommonResponseDTO = {};
    let fundApplicationServiceDetailResponse: CommonResponseDTO = {};
    let fundApplicationCourseSecretarySetApproverResponse: CommonResponseDTO =
        {};
    let fundApplicationCourseSecretaryApprovalResponse: CommonResponseDTO = {};
    let fundApplicationIntegritySecretaryApprovalResponse: CommonResponseDTO =
        {};
    let fundApplicationStateUnitDirectorApprovalResponse: CommonResponseDTO =
        {};

    fundApplicationDetailResponse =
        await CourseFundApplicationServices.getCourseFundApplicationDetail(
            idRequestBody,
        );

    fundApplicationPersonalDetailResponse =
        await CourseFundApplicationServices.getCourseFundApplicationPersonalDetail(
            idRequestBody,
        );

    fundApplicationServiceDetailResponse =
        await CourseFundApplicationServices.getCourseFundApplicationServiceDetail(
            idRequestBody,
        );

    fundApplicationCourseSecretarySetApproverResponse =
        await CourseFundApplicationServices.getFundApplicationApprover(
            idRequestBody,
        );

    fundApplicationCourseSecretaryApprovalResponse =
        await CourseFundApplicationServices.getCourseFundApplicationCourseSecretaryApproval(
            idRequestBody,
        );

    fundApplicationIntegritySecretaryApprovalResponse =
        await CourseFundApplicationServices.getCourseFundApplicationIntegritySecretaryApproval(
            idRequestBody,
        );

    fundApplicationStateUnitDirectorApprovalResponse =
        await CourseFundApplicationServices.getCourseFundApplicationStateUnitDirectorApproval(
            idRequestBody,
        );

    const fundApplicationDocumentInfoResponse: CommonResponseDTO =
        await CourseFundApplicationServices.getCurrentCandidateDocuments(
            idRequestBody,
        );

    // ============================================================
    // Supervalidated form initialization
    // ============================================================
    const fundApplicationInfoForm = await superValidate(
        fundApplicationDetailResponse.data
            ?.details as CourseFundApplicationDetailResponseDTO,
        zod(_fundApplicationDetailResponseSchema),
        { errors: false },
    );

    const fundApplicationPersonalInfoForm = await superValidate(
        fundApplicationPersonalDetailResponse.data
            ?.details as CourseFundApplicationPersonalDetailResponseDTO,
        zod(_fundApplicationPersonalInfoResponseSchema),
        { errors: false },
    );

    const fundApplicationServiceInfoForm = await superValidate(
        fundApplicationServiceDetailResponse.data
            ?.details as CourseFundApplicationServiceDetailResponseDTO,
        zod(_fundApplicationServiceInfoResponseSchema),
        { errors: false },
    );

    const secretarySetApproverForm = await superValidate(
        fundApplicationCourseSecretarySetApproverResponse.data
            ?.details as CourseFundApplicationSetApproverDTO,
        zod(_setApproversSchema),
        { errors: false },
    );

    const fundApplicationCourseSecretaryApprovalForm = await superValidate(
        fundApplicationCourseSecretaryApprovalResponse.data
            ?.details as CourseFundApplicationApprovalDTO,
        zod(_fundApplicationApprovalSchema),
        { errors: false },
    );

    const fundApplicationIntegritySecretaryApprovalForm = await superValidate(
        fundApplicationIntegritySecretaryApprovalResponse.data
            ?.details as CourseFundApplicationApprovalDTO,
        zod(_fundApplicationApprovalSchema),
        { errors: false },
    );

    const fundApplicationStateUnitDirectorApprovalForm = await superValidate(
        fundApplicationStateUnitDirectorApprovalResponse.data
            ?.details as CourseFundApplicationApprovalDTO,
        zod(_fundApplicationApprovalSchema),
        { errors: false },
    );

    const fundApplicationDocumentForm = await superValidate(
        fundApplicationDocumentInfoResponse.data
            ?.details as CourseFundApplicationDocumentsResponseDTO,
        zod(_fundApplicationDocumentSchema),
        { errors: false },
    );

    const fundApplicationUploadDocumentForm = await superValidate(
        zod(_fundApplicationUploadDocSchema),
        { errors: false },
    );

    // ==========================================================================
    // Get Lookup Functions
    // ==========================================================================
    const identityCardColorLookupResponse: CommonResponseDTO =
        await LookupServices.getICTypeEnums();

    const identityCardColorLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsInString(
            identityCardColorLookupResponse,
        );

    // ===========================================================================

    const stateLookupResponse: CommonResponseDTO =
        await LookupServices.getStateEnums();

    const stateLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(stateLookupResponse);

    // ===========================================================================

    const nationalityLookupResponse: CommonResponseDTO =
        await LookupServices.getNationalityEnums();

    const nationalityLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(
            nationalityLookupResponse,
        );

    // ===========================================================================

    const raceLookupResponse: CommonResponseDTO =
        await LookupServices.getRaceEnums();

    const raceLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(raceLookupResponse);

    // ===========================================================================

    const religionLookupResponse: CommonResponseDTO =
        await LookupServices.getReligionEnums();

    const religionLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(
            religionLookupResponse,
        );

    // ===========================================================================

    const genderLookupResponse: CommonResponseDTO =
        await LookupServices.getGenderEnums();

    const genderLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(genderLookupResponse);

    // ===========================================================================

    const maritalLookupResponse: CommonResponseDTO =
        await LookupServices.getMaritalEnums();

    const maritalLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(
            maritalLookupResponse,
        );

    // ===========================================================================

    const positionLookupResponse: CommonResponseDTO =
        await LookupServices.getPositionEnums();

    const positionLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(
            positionLookupResponse,
        );

    // ===========================================================================

    const titleLookupResponse: CommonResponseDTO =
        await LookupServices.getTitleEnums();

    const titleLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(titleLookupResponse);

    // ===========================================================================

    const gradeLookupResponse: CommonResponseDTO =
        await LookupServices.getServiceGradeEnums();

    const gradeLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsBothAreCode(gradeLookupResponse);

    // ===========================================================================

    const placementLookupResponse: CommonResponseDTO =
        await LookupServices.getPlacementEnums();

    const placementLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(
            placementLookupResponse,
        );

    // ===========================================================================

    const serviceTypeLookupResponse: CommonResponseDTO =
        await LookupServices.getServiceTypeEnums();

    const serviceTypeLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(
            serviceTypeLookupResponse,
        );

    // ===========================================================================

    const retirementBenefitLookupResponse: CommonResponseDTO =
        await LookupServices.getRetirementTypeEnums();

    const retirementBenefitLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(
            retirementBenefitLookupResponse,
        );

    // ===========================================================================

    const groupLookupResponse: CommonResponseDTO =
        await LookupServices.getServiceGroupEnums();

    const groupLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(groupLookupResponse);

    // ===========================================================================

    const programLookupResponse: CommonResponseDTO =
        await LookupServices.getUnitEnums();

    const programLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(
            programLookupResponse,
        );

    // ===========================================================================

    const generalLookup: DropdownDTO[] = [
        {
            value: true,
            name: 'Ya',
        },
        {
            value: false,
            name: 'Tidak',
        },
    ];

    // ===========================================================================

    const fundApplicationTypeLookupResponse: CommonResponseDTO =
        await LookupServices.getExamTypeEnums();

    const fundApplicationTypeLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(fundApplicationTypeLookupResponse);

    // ===========================================================================
    // filter
    const filter: CommonFilterDTO = {
        program: 'SEMUA',
        identityDocumentNumber: null,
        employeeNumber: null,
        name: null,
        position: null,
        status: null,
        grade: null,
        scheme: null,
    };

    // request body
    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 10000,
        orderBy: 'name',
        orderType: 0,
        filter: filter,
    };

    // fetch apc history
    const response: CommonResponseDTO =
        await EmployeeServices.getEmployeeList(param);

    //convert to id number
    const employeeLookup: DropdownDTO[] = (
        response.data?.dataList as CommonEmployeeDTO[]
    ).map((data) => ({
        value: Number(data.employeeId),
        name: String(data.name),
    }));

    return {
        params,
        idRequestBody,
        tableLNPT,
        responses: {
            fundApplicationDetailResponse,
            fundApplicationPersonalDetailResponse,
            fundApplicationServiceDetailResponse,
            fundApplicationCourseSecretarySetApproverResponse,
            fundApplicationCourseSecretaryApprovalResponse,
            fundApplicationIntegritySecretaryApprovalResponse,
            fundApplicationStateUnitDirectorApprovalResponse,
            fundApplicationDocumentInfoResponse,
        },
        forms: {
            fundApplicationInfoForm,
            fundApplicationPersonalInfoForm,
            fundApplicationServiceInfoForm,
            secretarySetApproverForm,
            fundApplicationCourseSecretaryApprovalForm,
            fundApplicationIntegritySecretaryApprovalForm,
            fundApplicationStateUnitDirectorApprovalForm,
            fundApplicationDocumentForm,
            fundApplicationUploadDocumentForm,
        },
        selectionOptions: {
            identityCardColorLookup,
            stateLookup,
            nationalityLookup,
            raceLookup,
            religionLookup,
            genderLookup,
            maritalLookup,
            positionLookup,
            titleLookup,
            employeeLookup,
            generalLookup,
            gradeLookup,
            placementLookup,
            serviceTypeLookup,
            retirementBenefitLookup,
            groupLookup,
            fundApplicationTypeLookup,
            programLookup,
        },
        role: {
            layoutData,
            isStaffRole,
            isCourseSecretaryRole,
            isIntegritySecretaryRole,
            isStateDirectorRole,
            isUnitDirectorRole,
        },
    };
}

//==================================================
//=============== Submit Functions =================
//==================================================
export const _createFundApplicationForm = async (formData: object) => {
    const form = await superValidate(
        formData,
        zod(_createFundApplicationRequestSchema),
    );

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await CourseFundApplicationServices.createCourseFundApplication(
            form.data as CourseAddFundApplicationRequestDTO,
        );

    return { response };
};

export const _submitDocumentForm = async (
    id: number,
    isDraft: boolean,
    files: File[],
    uploadedfiles: CourseFundApplicationDocumentsResponseDTO,
) => {
    if (files.length < 1 && uploadedfiles.document.length < 1) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const documentData = new FormData();

    // check file size validation
    files.forEach((file) => {
        documentData.append('documents', file, file.name);
    });

    // validation only on the newly uploaded files
    if (files.length > 0) {
        const form = await superValidate(
            documentData,
            zod(_fundApplicationUploadDocSchema),
        );

        if (!form.valid || id === undefined) {
            getErrorToast();
            error(400, { message: 'Validation Not Passed!' });
        }
    }

    // turns file into base 64 format
    const requestBody: CourseFundReimbursementUploadDocumentsBase64RequestDTO =
        {
            documents: [],
            id: id,
            isDraft: isDraft,
        };

    // Adding existing files to the request body
    for (let i = 0; i < uploadedfiles.document.length; i++) {
        const content = uploadedfiles.document[i].document.split('base64,')[1];
        const documentObject: DocumentBase64RequestDTO = {
            base64: content,
            name: uploadedfiles.document[i].name,
        };
        requestBody.documents?.push(documentObject);
    }

    // Adding new files
    for (let i = 0; i < files.length; i++) {
        const base64String = await _fileToBase64String(files[i]);
        const documentObject: DocumentBase64RequestDTO = {
            base64: base64String,
            name: files[i].name,
        };
        requestBody.documents?.push(documentObject);
    }

    const response: CommonResponseDTO =
        await CourseFundApplicationServices.uploadFundApplicationEmployeeDocument(
            requestBody,
        );

    return { response };
};

export const _submitSecretarySetApproverForm = async (
    id: number,
    formData: object,
) => {
    const form = await superValidate(formData, zod(_setApproversSchema));
    form.data.id = id;

    console.log(form);
    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await CourseFundApplicationServices.createFundApplicationApprover(
            form.data as CourseFundApplicationSetApproverDTO,
        );

    return { response };
};

export const _addCourseSecretaryApprovalForm = async (formData: object) => {
    const form = await superValidate(
        formData,
        zod(_fundApplicationApprovalSchema),
    );

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await CourseFundApplicationServices.setCourseFundApplicationCourseSecretaryApproval(
            form.data as CourseFundApplicationApprovalDTO,
        );

    return { response };
};

export const _addIntegritySecretaryApprovalForm = async (formData: object) => {
    const form = await superValidate(
        formData,
        zod(_fundApplicationApprovalSchema),
    );

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await CourseFundApplicationServices.setCourseFundApplicationIntegritySecretaryApproval(
            form.data as CourseFundApplicationApprovalDTO,
        );

    return { response };
};

export const _addStateUnitSecretaryApprovalForm = async (formData: object) => {
    const form = await superValidate(
        formData,
        zod(_fundApplicationApprovalSchema),
    );

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await CourseFundApplicationServices.setCourseFundApplicationStateUnitDirectorApproval(
            form.data as CourseFundApplicationApprovalDTO,
        );

    return { response };
};


export async function _updateTable(param: CommonListRequestDTO) {
    const response: CommonResponseDTO =
        await EmployeeServices.getEmployeeList(param);

    return {
        props: {
            param,
            response,
        },
    };
}

export async function _getAverage(lnptAverageParams: CommonListRequestDTO) {
    const lnptAverageResponse: CommonResponseDTO =
        await LNPTServices.getAveragePermanent(lnptAverageParams);

    return {
        props: {
            lnptAverageParams,
            lnptAverageResponse,
        },
    };
}
