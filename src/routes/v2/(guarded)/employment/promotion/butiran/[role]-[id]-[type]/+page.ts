import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { DocumentBase64RequestDTO } from '$lib/dto/core/common/base-64-document-request.dto';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { CourseFundApplicationDocumentsResponseDTO } from '$lib/dto/mypsm/course/fund-application/course-fund-application-document.dto';
import type { CourseFundReimbursementUploadDocumentsBase64RequestDTO } from '$lib/dto/mypsm/course/fund-reimbursement/course-fund-reimbursement-document.dto';
import type { AddNewPromotion } from '$lib/dto/mypsm/employment/promotion/add-promotion.dto';
import type { PromotionCertificationEmployee, PromotionCommonEmployee, PromotionDetail, PromotionPlacement, PromotionPlacementDetail, PromotionSalaryAdjustment, StaffDocumentDTO, StaffUploadDocumentDTO } from '$lib/dto/mypsm/employment/promotion/promotion-common-employee.dto';
import type { PromotionCertificationGet, PromotionGroupID } from '$lib/dto/mypsm/employment/promotion/promotion-common-groupid.dto';
import type { PromotionCertification, PromotionCommonApproval, PromotionEmployeeEdit, PromotionIntegrityApproval, PromotionPlacementEdit } from '$lib/dto/mypsm/employment/promotion/promotion-form.dto';
import { _fileToBase64String } from '$lib/helpers/core/fileToBase64String.helper';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import { _addNewPromotion, _documentsSchema, _editEmployeePromotion, _editPromotionCertification, _editPromotionPlacement, _promotionCommonApproval, _promotionIntegrityApproval, _uploadDocumentsSchema } from '$lib/schemas/mypsm/employment/promotion/promotion-schemas';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { EmploymentPromotionServices } from '$lib/services/implementation/mypsm/perjawatan/employment-promotion.service';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async ({ params, parent }) => {
    const { layoutData } = await parent();

    const currentRoleCode: string = layoutData.accountDetails.currentRoleCode
    let promotionType: string = params.type;
    let currentId: PromotionGroupID = {
        groupId: 0,
        promotionType: promotionType,
    }
    let isNewPromotion: boolean = true;
    if (params.id !== "baru") {
        currentId.groupId = Number(params.id);
        isNewPromotion = false;
    }
    let employeeIdRequest: PromotionCertificationGet = {
        id: Number(params.id),
        promotionType: params.type,
    }
    let lookup = await getLookup();
    let assignedRole: boolean = false;

    if(params.role == "1"){
        assignedRole = true;
    }

    let employeeListResponse: CommonResponseDTO = {};
    let employeeList: PromotionCommonEmployee[] = [];
    let certificationListResponse: CommonResponseDTO = {};
    let certificationList: PromotionCertificationEmployee[] = [];
    let promotionMeetingListResponse: CommonResponseDTO = {};
    let promotionMeetingList: PromotionCertificationEmployee[] = [];
    let placementListResponse: CommonResponseDTO = {};
    let placementList: PromotionPlacement[] = [];
    let promotionDetailResponse: CommonResponseDTO = {};
    let promotionDetail: PromotionDetail[] = [];
    let finalResultResponse: CommonResponseDTO = {};
    let finalResult: PromotionDetail[] = [];

    let employeePromotionInfo = {} as PromotionPlacementDetail;
    let employeeDocumentInfo = {} as StaffDocumentDTO;

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {
            program: "TETAP",
            employeeNumber: "",
            name: "",
            identityCard: "",
            scheme: "",
            grade: null,
            position: null,
        },
    };

    const commonParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: currentId,
    };

    const promotionStaffUploadDocumentForm = await superValidate(
        zod(_uploadDocumentsSchema),
        { errors: false },
    );
    const addnewPromotionForm = await superValidate(zod(_addNewPromotion));
    const directorForm = await superValidate(zod(_promotionCommonApproval))
    const integrityForm = await superValidate(zod(_promotionIntegrityApproval))
    const certificationForm = await superValidate(zod(_editPromotionCertification), { errors: false });
    const placementForm = await superValidate(zod(_editPromotionPlacement), { errors: false });
    const employeePromotion = await superValidate(zod(_editEmployeePromotion), { errors: false });
    const supporterApproval = await superValidate(zod(_promotionCommonApproval));
    const approverApproval = await superValidate(zod(_promotionCommonApproval));

    if (assignedRole && params.id !== 'baru') {
        certificationListResponse =
            await EmploymentPromotionServices.getCertificationList(commonParam);
        certificationList =
            certificationListResponse.data?.dataList as PromotionCertificationEmployee[];
        promotionMeetingListResponse =
            await EmploymentPromotionServices.getPromotionMeetingList(commonParam);
        promotionMeetingList =
            promotionMeetingListResponse.data?.dataList as PromotionCertificationEmployee[];
        placementListResponse =
            await EmploymentPromotionServices.getPlacementList(commonParam);
        placementList =
            placementListResponse.data?.dataList as PromotionPlacement[];
        promotionDetailResponse =
            await EmploymentPromotionServices.getPromotionEmployeeList(commonParam)
        promotionDetail =
            promotionDetailResponse.data?.dataList as PromotionDetail[];
        finalResultResponse =
            await EmploymentPromotionServices.getPromotionFinalResultList(commonParam);
        finalResult =
            finalResultResponse.data?.dataList as PromotionDetail[]

    }
    else if (!assignedRole) {
        const employeePromotionInfoResponse: CommonResponseDTO =
            await EmploymentPromotionServices.getPlacementDetail(employeeIdRequest);
        employeePromotionInfo =
            employeePromotionInfoResponse.data?.details as PromotionPlacementDetail;

        const employeeDocumentInfoResponse: CommonResponseDTO =
            await EmploymentPromotionServices.getDocumentDetail(employeeIdRequest);
        employeeDocumentInfo =
        employeeDocumentInfoResponse.data?.details as StaffDocumentDTO;
        // employeeSalaryAdjustmentRes =
        //     await EmploymentPromotionServices.getSalaryAdjustmentTable(req);
        // employeeSalaryAdjustment =
    } else if (params.id == 'baru') {
        employeeListResponse =
            await EmploymentPromotionServices.getEmployeeList(param);
        employeeList =
            employeeListResponse.data?.dataList as PromotionCommonEmployee[];
    }

    const staffDocumentForm = await superValidate(
        employeeDocumentInfo,
        zod(_documentsSchema),
        { errors: false },
    );

    return {
        param,
        employeeIdRequest,
        promotionType,
        isNewPromotion,
        currentId,
        currentRoleCode,
        employeeListResponse,
        employeeList,
        addnewPromotionForm,
        promotionStaffUploadDocumentForm,
        employeeDocumentInfo,
        staffDocumentForm,
        commonParam,
        certificationListResponse,
        certificationList,
        promotionMeetingListResponse,
        promotionMeetingList,
        lookup,
        certificationForm,
        placementListResponse,
        placementList,
        placementForm,
        promotionDetailResponse,
        promotionDetail,
        finalResultResponse,
        finalResult,
        employeePromotion,
        directorForm,
        integrityForm,
        supporterApproval,
        approverApproval,
        assignedRole,
        employeePOV: {
            employeePromotionInfo,
        }
    };

};

export const _submitDocumentForm = async (
    idData: PromotionCertificationGet,
    isDraft: boolean,
    files: File[],
    uploadedfiles: {
        name: string;
        document: string;
    }[],
) => {
    if (files.length < 1 && uploadedfiles.length < 1) {
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
            zod(_uploadDocumentsSchema),
        );

        if (!form.valid || idData.id === undefined) {
            getErrorToast();
            error(400, { message: 'Validation Not Passed!' });
        }
    }

    // turns file into base 64 format
    const requestBody: StaffUploadDocumentDTO =
        {
            id: idData.id,
            promotionType: idData.promotionType, 
            document: [],
            isDraft: isDraft,
        };

    // Adding existing files to the request body
    for (let i = 0; i < uploadedfiles.length; i++) {
        const content = uploadedfiles[i].document.split('base64,')[1];
        const documentObject: DocumentBase64RequestDTO = {
            base64: content,
            name: uploadedfiles[i].name,
        };
        requestBody.document?.push(documentObject);
    }

    // Adding new files
    for (let i = 0; i < files.length; i++) {
        const base64String = await _fileToBase64String(files[i]);
        const documentObject: DocumentBase64RequestDTO = {
            base64: base64String,
            name: files[i].name,
        };
        requestBody.document?.push(documentObject);
    }

    const response: CommonResponseDTO =
        await EmploymentPromotionServices.addDocumentPromotion(
            requestBody,
        );

    return { response };
};

export const _submitAddNewPromotion = async (formData: AddNewPromotion) => {
    const form = await superValidate(formData, zod(_addNewPromotion));
    if (form.valid) {
        const response: CommonResponseDTO =
            await EmploymentPromotionServices.addNewPromotion(form.data as AddNewPromotion)

        return { response }
    }
}

export const _submitDirectorForm = async (formData: PromotionCommonApproval) => {
    const form = await superValidate(formData, zod(_promotionCommonApproval));
    if (form.valid) {
        const response: CommonResponseDTO =
            await EmploymentPromotionServices.addDirectorApproval(form.data as PromotionCommonApproval)

        return { response }
    }
}

export const _submitIntegrityForm = async (formData: PromotionIntegrityApproval) => {
    const form = await superValidate(formData, zod(_promotionIntegrityApproval));
    if (form.valid) {
        const response: CommonResponseDTO =
            await EmploymentPromotionServices.addIntegrityApproval(form.data as PromotionIntegrityApproval)

        return { response }
    }
}

export const _submitCertification = async (formData: PromotionCertification) => {
    const form = await superValidate(formData, zod(_editPromotionCertification));
    if (form.valid) {
        const response: CommonResponseDTO =
            await EmploymentPromotionServices.editCertification(form.data as PromotionCertification)

        return { response }
    }
}

export const _submitPlacement = async (formData: PromotionPlacementEdit) => {
    const form = await superValidate(formData, zod(_editPromotionPlacement));

    if (form.valid) {
        const response: CommonResponseDTO =
            await EmploymentPromotionServices.editPlacement(form.data as PromotionPlacementEdit)

        return { response }
    }
}

export const _submitEmployeePromotion = async (formData: PromotionEmployeeEdit) => {
    const form = await superValidate(formData, zod(_editEmployeePromotion));
    console.log(form)
    if (form.valid) {
        const response: CommonResponseDTO =
            await EmploymentPromotionServices.editEmployeePromotion(form.data as PromotionEmployeeEdit)

        return { response }
    }
}

export const _submitSupporterApproval = async (formData: PromotionCommonApproval) => {
    const form = await superValidate(formData, zod(_promotionCommonApproval));

    if (form.valid) {
        const response: CommonResponseDTO =
            await EmploymentPromotionServices.addSupporterApproval(form.data as PromotionCommonApproval)

        return { response }
    }
}

export const _submitApproverApproval = async (formData: PromotionCommonApproval) => {
    const form = await superValidate(formData, zod(_promotionCommonApproval));

    if (form.valid) {
        const response: CommonResponseDTO =
            await EmploymentPromotionServices.addAppproverApproval(form.data as PromotionCommonApproval)

        return { response }
    }
}

//get table detail
export const _getPlacementDetail = async (id: PromotionCertificationGet, req: CommonListRequestDTO) => {

    const response: CommonResponseDTO =
        await EmploymentPromotionServices.getPlacementDetail(id)
    const tableResponse: CommonResponseDTO =
        await EmploymentPromotionServices.getSalaryAdjustmentTable(req);
    const salaryDetail: CommonResponseDTO =
        await EmploymentPromotionServices.getSalaryAdjustmentDetail(id)
    const directorResponse: CommonResponseDTO =
        await EmploymentPromotionServices.getDirectorApproval(id)
    const integrityResponse: CommonResponseDTO =
        await EmploymentPromotionServices.getIntegrityApproval(id)

    return {
        response, tableResponse, salaryDetail, directorResponse,
        integrityResponse,
    }
}

export const _getPromotionDetail = async (id: PromotionCertificationGet) => {
    const response: CommonResponseDTO =
        await EmploymentPromotionServices.getPromotionEmployeeDetail(id);

    const suppResponse: CommonResponseDTO =
        await EmploymentPromotionServices.getSupporterApproval(id);

    const appResponse: CommonResponseDTO =
        await EmploymentPromotionServices.getApproverApproval(id);

    return { response, suppResponse, appResponse }
}
export const _getCertifications = async (id: PromotionCertificationGet) => {
    const response: CommonResponseDTO =
        await EmploymentPromotionServices.getCertificationDetail(id);

    return { response }
}


const getLookup = async () => {
    // =======================================================
    // Dropdown Lookup =======================================
    // =======================================================
    // const gradeLookupResponse: CommonResponseDTO =
    //     await LookupServices.getServiceGradeEnums();

    // const gradeLookup: DropdownDTO[] =
    //     LookupServices.setSelectOptionsBothAreCode(gradeLookupResponse);

    // const nullGrade: DropdownDTO = {
    //     value: null,
    //     name: "Semua"
    // }

    // gradeLookup.push(nullGrade);

    const gradeLookupResponse: CommonResponseDTO =
        await LookupServices.getServiceGradeEnums();

    const gradeLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsActingGrade(gradeLookupResponse);
    // -------------------------------------------------------
    const stateLookupResponse: CommonResponseDTO =
        await LookupServices.getStateEnums();

    const stateLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(stateLookupResponse)
    // -------------------------------------------------------
    const placementLookupResponse: CommonResponseDTO =
        await LookupServices.getPlacementEnums();

    const placementLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(placementLookupResponse)
    // -------------------------------------------------------
    const positionLookupResponse: CommonResponseDTO =
        await LookupServices.getPositionEnums();

    const positionLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsActingGrade(positionLookupResponse)
    // -------------------------------------------------------

    const meetingLookupResponse: CommonResponseDTO =
        await LookupServices.getMeetingTypeEnums();

    const meetingLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(meetingLookupResponse)
    // -------------------------------------------------------
    const meetingNameLookup: DropdownDTO[] = [
        { value: 'Mesyuarat 1/12', name: 'Mesyuarat 1/12' },
        { value: 'Mesyuarat 1/102', name: 'Mesyuarat 1/102' },
        { value: 'Mesyuarat 2/101', name: 'Mesyuarat 2/101' },
    ]
    let nullGrade: DropdownDTO = {
        value: null,
        name: "Semua"
    }

    gradeLookup.push(nullGrade)

    const suppAppResponse: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 10000,
        orderBy: 'name',
        orderType: 0,
        filter: {
            program: "TETAP",
            employeeNumber: null,
            name: null,
            identityCard: null,
            scheme: null,
            grade: null,
            position: null,
        },
    }
    const supporterApproverResponse: CommonResponseDTO =
        await LookupServices.getEmployeeList(suppAppResponse);

    const supporterApproverLookup: DropdownDTO[] = LookupServices.setSelectOptionSupporterAndApproverBothAreName(
        supporterApproverResponse,
    );

    return {
        gradeLookup,
        stateLookup,
        meetingNameLookup,
        placementLookup,
        positionLookup,
        supporterApproverLookup,
        meetingLookupResponse,
        meetingLookup,

    }
}
