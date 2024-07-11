import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { RoleConstant } from '$lib/constants/core/role.constant';
import type { DocumentBase64RequestDTO } from '$lib/dto/core/common/base-64-document-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { commonIdRequestDTO } from '$lib/dto/core/common/id-request.dto.js';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { CourseFundApplicationUploadDocumentsBase64RequestDTO } from '$lib/dto/mypsm/course/fund-application/course-fund-application-document.dto';
import type { CourseFundReimbursementApprovalDTO } from '$lib/dto/mypsm/course/fund-reimbursement/course-fund-reimbursement-approval.dto';
import type { CourseFundReimbursementDocumentsResponseDTO } from '$lib/dto/mypsm/course/fund-reimbursement/course-fund-reimbursement-document.dto';
import type { CourseFundReimbursementPersonalDetailResponseDTO } from '$lib/dto/mypsm/course/fund-reimbursement/course-fund-reimbursement-personal-info.dto';
import type { CourseFundReimbursementServiceDetailResponseDTO } from '$lib/dto/mypsm/course/fund-reimbursement/course-fund-reimbursement-service-info.dto';
import type {
    CourseAddFundReimbursementRequestDTO,
    CourseFundReimbursementDetailResponseDTO,
} from '$lib/dto/mypsm/course/fund-reimbursement/course-fund-reimbursement.dto';
import { _fileToBase64String } from '$lib/helpers/core/fileToBase64String.helper';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import {
    _createFundReimbursementRequestSchema,
    _fundReimbursementApprovalSchema,
    _fundReimbursementDetailResponseSchema,
    _fundReimbursementDocumentSchema,
    _fundReimbursementPersonalInfoResponseSchema,
    _fundReimbursementServiceInfoResponseSchema,
    _fundReimbursementUploadDocSchema,
} from '$lib/schemas/mypsm/course/fund-reimbursement-schema';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { CourseFundReimbursementServices } from '$lib/services/implementation/mypsm/latihan/fundReimbursement.service.js';
import { error } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/client';

//==================================================
//=============== Load Function ====================
//==================================================
export async function load({ params }) {
    const fundReimbursementId = Number(params.reimbursementId);
    const currentRoleCode = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );

    const isStaffRole: boolean =
        currentRoleCode === RoleConstant.kakitangan.code;

    const idRequestBody: commonIdRequestDTO = {
        id: Number(params.reimbursementId),
    };

    const isCourseSecretaryRole: boolean =
        currentRoleCode === RoleConstant.urusSetiaLatihan.code;

    let fundReimbursementDetailResponse: CommonResponseDTO = {};
    let fundReimbursementPersonalDetailResponse: CommonResponseDTO = {};
    let fundReimbursementServiceDetailResponse: CommonResponseDTO = {};
    let fundReimbursementSecretaryApprovalResponse: CommonResponseDTO = {};
    let fundReimbursementResultResponse: CommonResponseDTO = {};

    fundReimbursementDetailResponse =
        await CourseFundReimbursementServices.getCourseFundReimbursementDetail(
            idRequestBody,
        );

    fundReimbursementPersonalDetailResponse =
        await CourseFundReimbursementServices.getCourseFundReimbursementPersonalDetail(
            idRequestBody,
        );

    fundReimbursementServiceDetailResponse =
        await CourseFundReimbursementServices.getCourseFundReimbursementServiceDetail(
            idRequestBody,
        );

    fundReimbursementSecretaryApprovalResponse =
        await CourseFundReimbursementServices.getCourseFundReimbursementSecreataryApproval(
            idRequestBody,
        );

    fundReimbursementResultResponse = {};
    // await CourseFundReimbursementServices.setCourseExamResult(
    //     idRequestBody,
    // );
    const fundReimbursementDocumentInfoResponse: CommonResponseDTO =
        await CourseFundReimbursementServices.getCurrentCandidateDocuments(
            idRequestBody,
        );

    // ============================================================
    // Supervalidated form initialization
    // ============================================================
    const fundReimbursementInfoForm = await superValidate(
        fundReimbursementDetailResponse.data
            ?.details as CourseFundReimbursementDetailResponseDTO,
        zod(_fundReimbursementDetailResponseSchema),
        { errors: false },
    );

    const fundReimbursementPersonalInfoForm = await superValidate(
        fundReimbursementPersonalDetailResponse.data
            ?.details as CourseFundReimbursementPersonalDetailResponseDTO,
        zod(_fundReimbursementPersonalInfoResponseSchema),
        { errors: false },
    );

    const fundReimbursementServiceInfoForm = await superValidate(
        fundReimbursementServiceDetailResponse.data
            ?.details as CourseFundReimbursementServiceDetailResponseDTO,
        zod(_fundReimbursementServiceInfoResponseSchema),
        { errors: false },
    );

    const fundReimbursementSecretaryApprovalForm = await superValidate(
        fundReimbursementSecretaryApprovalResponse.data
            ?.details as CourseFundReimbursementApprovalDTO,
        zod(_fundReimbursementApprovalSchema),
        { errors: false },
    );

    const fundReimbursementResultForm = await superValidate(
        fundReimbursementResultResponse.data
            ?.details as CourseFundReimbursementApprovalDTO,
        zod(_fundReimbursementApprovalSchema),
        { errors: false },
    );

    const fundReimbursementDocumentForm = await superValidate(
        fundReimbursementDocumentInfoResponse.data
            ?.details as CourseFundReimbursementDocumentsResponseDTO,
        zod(_fundReimbursementDocumentSchema),
        { errors: false },
    );
    const fundReimbursementUploadDocumentForm = await superValidate(
        zod(_fundReimbursementUploadDocSchema),
        { errors: false },
    );

    // ===========================================================================

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

    const schemeLookupResponse: CommonResponseDTO =
        await LookupServices.getSchemeEnums();

    const schemeLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsInString(schemeLookupResponse);

    // ===========================================================================

    const groupLookupResponse: CommonResponseDTO =
        await LookupServices.getServiceGroupEnums();

    const groupLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(groupLookupResponse);

    // ===========================================================================

    // ===========================================================================

    const programLookupResponse: CommonResponseDTO =
        await LookupServices.getProgrammeEnums();

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

    const fundReimbursementTypeLookupResponse: CommonResponseDTO =
        await LookupServices.getExamTypeEnums();

    const fundReimbursementTypeLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(fundReimbursementTypeLookupResponse);

    // ===========================================================================

    return {
        fundReimbursementId,
        responses: {
            fundReimbursementDetailResponse,
            fundReimbursementPersonalDetailResponse,
            fundReimbursementServiceDetailResponse,
            fundReimbursementSecretaryApprovalResponse,
            fundReimbursementResultResponse,
            fundReimbursementDocumentInfoResponse,
        },
        forms: {
            fundReimbursementInfoForm,
            fundReimbursementPersonalInfoForm,
            fundReimbursementServiceInfoForm,
            fundReimbursementSecretaryApprovalForm,
            fundReimbursementResultForm,
            fundReimbursementDocumentForm,
            fundReimbursementUploadDocumentForm,
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
            generalLookup,
            gradeLookup,
            placementLookup,
            serviceTypeLookup,
            retirementBenefitLookup,
            schemeLookup,
            groupLookup,
            fundReimbursementTypeLookup,
            programLookup,
        },
        role: {
            isStaffRole,
            isCourseSecretaryRole,
        },
    };
}

//==================================================
//=============== Submit Functions =================
//==================================================
export const _createFundReimbursementForm = async (formData: object) => {
    const form = await superValidate(
        formData,
        zod(_createFundReimbursementRequestSchema),
    );

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await CourseFundReimbursementServices.createCourseFundReimbursement(
            form.data as CourseAddFundReimbursementRequestDTO,
        );

    return { response };
};

export const _submitDocumentForm = async (id: number,isDraft: boolean, files: File[]) => {
    const documentData = new FormData();

    // check file size validation
    files.forEach((file) => {
        documentData.append('documents', file, file.name);
    });

    const form = await superValidate(
        documentData,
        zod(_fundReimbursementUploadDocSchema),
    );

    if (!form.valid || id === undefined) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    // turns file into base 64 format
    const requestBody: CourseFundApplicationUploadDocumentsBase64RequestDTO = {
        documents: [],
        id: id,
        isDraft: isDraft,
    };

    console.log('requestBody', requestBody);

    for (let i = 0; i < files.length; i++) {
        const base64String = await _fileToBase64String(files[i]);
        const documentObject: DocumentBase64RequestDTO = {
            base64: base64String,
            name: files[i].name,
        };
        requestBody.documents?.push(documentObject);
    }

    const response: CommonResponseDTO =
        await CourseFundReimbursementServices.uploadFundReimbursementEmployeeDocument(
            requestBody,
        );

    return { response };
};

//==================================================
//=============== Submit Functions =================
//==================================================
export const _addSecretaryApprovalForm = async (formData: object) => {
    const form = await superValidate(
        formData,
        zod(_fundReimbursementApprovalSchema),
    );

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'Validation Not Passed!' });
    }

    const response: CommonResponseDTO =
        await CourseFundReimbursementServices.setCourseFundReimbursementSecretaryApproval(
            form.data as CourseFundReimbursementApprovalDTO,
        );

    return { response };
};
