import type { CommonFilterDTO } from "$lib/dto/core/common/common-filter.dto";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import { superValidate } from "sveltekit-superforms/client";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import { LookupServices } from "$lib/services/implementation/core/lookup/lookup.service";
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto";
import {
    _actingApprovalSchema,
    _mainSupporterAndApproverSchema,
    _mainUpdateActingEmployeeDetailSchema, _mainUpdatePromotionMeetingResultDetailSchema,
    _mainUpdatePromotionMeetingResultSchema, _placementAmendmentApplication,
    _updateActingResultSchema, _updateChosenCandidate, _updateEmployeePlacementMeetingResultSchema,
    _updateMeetingDetailSchema, _updateMeetingResult,
    _updatePlacementAmendmentApplicationResultSchema, _updatePlacementMeeting, _updatePromotionDetail, _updatePromotionMeetingResultSchema
} from "$lib/schemas/mypsm/employment/acting/acting-schemas";
import { zod } from "sveltekit-superforms/adapters";
import type { ActingCommonBatchId, ActingCommonId } from "$lib/dto/mypsm/employment/acting/acting-batchid.dto";
import type { ActingChosenEmployee } from "$lib/dto/mypsm/employment/acting/acting-chosen-employee.dto";
import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import { EmploymentActingServices } from "$lib/services/implementation/mypsm/perjawatan/employment-acting.service";
import type { UpdateChosenEmployee } from "$lib/dto/mypsm/employment/acting/add-chosen-acting-employee.dto";
import type { UpdateActingInterview } from "$lib/dto/mypsm/employment/acting/update-interview-detail.dto";
import type { UpdateInterviewResult } from "$lib/dto/mypsm/employment/acting/update-interview-result.dto";
import type { PlacementMeetingDetail, PlacementResult, PromotionMeetingResult, UpdatePromotionMeeting } from "$lib/dto/mypsm/employment/acting/update-promotion-meeting.dto";
import type { commonIdRequestDTO } from "$lib/dto/core/common/id-request.dto";
import type { ActingDetails } from "$lib/dto/mypsm/employment/acting/acting-result.dto";
import type { QuarterCommonApproval } from "$lib/dto/mypsm/pinjaman/kuarters/quarter-common-approval.dto";
import type { UpdateMainPromotionMeeting } from "$lib/dto/mypsm/employment/acting/main-update-promotion-meeting.dto";

export const load = async ({ params }) => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    let actingType: string = params.type;
    let batchId: ActingCommonBatchId = {
        batchId: Number(params.id)
    }
    let lookup = await getLookup();
    let chosenEmployee: ActingChosenEmployee[] = [];
    let chosenEmployeeResponse: CommonResponseDTO = {}
    let interviewInfoResponse: CommonResponseDTO = {};
    let interviewInfo: ActingChosenEmployee[] = [];
    let interviewResultResponse: CommonResponseDTO = {};
    let interviewResult: ActingChosenEmployee[] = [];
    let actingId: ActingCommonId = {
        actingIds: [],
    };
    let promotionMeetingResponse: CommonResponseDTO = {};
    let promotionMeetingResult: ActingChosenEmployee[] = [];
    let placementDetail: ActingChosenEmployee[] = [];
    let placementDetailResponse: CommonResponseDTO = {};
    let postponeList: ActingChosenEmployee[] = [];
    let postponeListResponse: CommonResponseDTO = {};
    let postponeResult: ActingChosenEmployee[] = [];
    let postponeResultResponse: CommonResponseDTO = {};
    let actingConfirmation: ActingChosenEmployee[] = [];
    let actingConfirmationResponse: CommonResponseDTO = {};


    // gred utama
    let mainActingCertification: ActingChosenEmployee[] = [];
    let mainActingCertificationResponse: CommonResponseDTO = {};
    let mainActingPromotionList: ActingChosenEmployee[] = [];
    let mainActingPromotionListResponse: CommonResponseDTO = {};

    const chosenEmployeeParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: batchId,
    }

    chosenEmployeeResponse =
        await EmploymentActingServices.getChosenEmployees(chosenEmployeeParam);
    chosenEmployee =
        chosenEmployeeResponse.data?.dataList as ActingChosenEmployee[];
    interviewInfoResponse =
        await EmploymentActingServices.getInterviewInfo(chosenEmployeeParam);
    interviewInfo =
        interviewInfoResponse.data?.dataList as ActingChosenEmployee[];

    //4th stepper
    if (interviewInfoResponse.status == "success") {
        interviewInfo.forEach((val) => actingId.actingIds.push(val.actingId))
    }
    const interviewResultParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: actingId,
    }
    interviewResultResponse =
        await EmploymentActingServices.getInterviewResult(interviewResultParam);
    interviewResult =
        interviewResultResponse.data?.dataList as ActingChosenEmployee[];

    //fifth stepper and so on
    promotionMeetingResponse =
        await EmploymentActingServices.getPromotionMeetingResult(chosenEmployeeParam);
    promotionMeetingResult =
        promotionMeetingResponse.data?.dataList as ActingChosenEmployee[];
    placementDetailResponse =
        await EmploymentActingServices.getPlacementList(chosenEmployeeParam);
    placementDetail =
        placementDetailResponse.data?.dataList as ActingChosenEmployee[];
    postponeListResponse =
        await EmploymentActingServices.getPostponeList(chosenEmployeeParam);
    postponeList =
        postponeListResponse.data?.dataList as ActingChosenEmployee[];
    postponeResultResponse =
        await EmploymentActingServices.getPostponeResult(chosenEmployeeParam);
    postponeResult =
        postponeResultResponse.data?.dataList as ActingChosenEmployee[];
    actingConfirmationResponse =
        await EmploymentActingServices.getActingConfirmation(chosenEmployeeParam);
    actingConfirmation =
        actingConfirmationResponse.data?.dataList as ActingChosenEmployee[];


    // gred utamaa
    if (actingType == "Gred Utama") {
        mainActingCertificationResponse =
            await EmploymentActingServices.getMainCertification(chosenEmployeeParam)
        mainActingCertification =
            mainActingCertificationResponse.data?.dataList as ActingChosenEmployee[];
        mainActingPromotionListResponse =
            await EmploymentActingServices.getMainPromotionTable(chosenEmployeeParam);
        mainActingPromotionList =
            mainActingPromotionListResponse.data?.dataList as ActingChosenEmployee[];
    }

    //form validation
    const updateChosenCandidateForm = await superValidate(zod(_updateChosenCandidate))
    const directorResultForm = await superValidate(zod(_actingApprovalSchema))
    const updateMeetingDetailForm = await superValidate(zod(_updateMeetingDetailSchema))
    const updateMeetingResultForm = await superValidate(zod(_updateMeetingResult))
    const updatePromotionMeetingForm = await superValidate(zod(_updatePromotionDetail))
    const updatePlacementMeeting = await superValidate(zod(_updatePlacementMeeting))
    const updatePromotionMeetingResultForm = await superValidate(zod(_updatePromotionMeetingResultSchema))
    const updateEmployeePlacementMeetingResultForm = await superValidate(zod(_updateEmployeePlacementMeetingResultSchema))
    const updateActingResultForm = await superValidate(zod(_updateActingResultSchema))
    const supporterResultForm = await superValidate(zod(_actingApprovalSchema))
    const approverResultForm = await superValidate(zod(_actingApprovalSchema))



    const updatePlacementAmendmentApplicationResultForm = await superValidate(zod(_updatePlacementAmendmentApplicationResultSchema))
    const updateMainPromotionMeetingResultForm = await superValidate(zod(_mainUpdatePromotionMeetingResultSchema))
    const updateMainPromotionMeetingResultDetailForm = await superValidate(zod(_mainUpdatePromotionMeetingResultDetailSchema))
    const updateMainActingEmployeeDetailForm = await superValidate(zod(_mainUpdateActingEmployeeDetailSchema))
    const mainSupporterAndApproverForm = await superValidate(zod(_mainSupporterAndApproverSchema))
    const employeeNeedPlacementAmendmentForm = await superValidate(zod(_placementAmendmentApplication))




    return {
        lookup,
        currentRoleCode,
        batchId,
        chosenEmployee,
        chosenEmployeeResponse,
        chosenEmployeeParam,
        updateChosenCandidateForm,
        interviewInfoResponse,
        interviewInfo,
        updateMeetingDetailForm,
        interviewResultResponse,
        interviewResult,
        interviewResultParam,
        promotionMeetingResponse,
        promotionMeetingResult,
        updatePromotionMeetingForm,
        placementDetailResponse,
        placementDetail,
        updatePlacementMeeting,
        postponeListResponse,
        postponeList,
        postponeResultResponse,
        postponeResult,
        updateActingResultForm,
        actingConfirmationResponse,
        actingConfirmation,
        supporterResultForm,
        mainActingPromotionListResponse,
        mainActingPromotionList,
        updateMainPromotionMeetingResultForm,


        // main
        mainActingCertification,
        mainActingCertificationResponse,

        updatePlacementAmendmentApplicationResultForm,
        updateMeetingResultForm,
        actingType,
        updatePromotionMeetingResultForm, updateEmployeePlacementMeetingResultForm,
        updateMainPromotionMeetingResultDetailForm,
        updateMainActingEmployeeDetailForm, mainSupporterAndApproverForm,
        approverResultForm, directorResultForm, employeeNeedPlacementAmendmentForm,
    };

};

// =================== gred 1 - 54 and flexi 41 submit form
export const _submitUpdateChosenCandidateForm = async (formData: UpdateChosenEmployee) => {
    const form = await superValidate(formData, zod(_updateChosenCandidate));

    if (form.valid) {
        const response: CommonResponseDTO =
            await EmploymentActingServices.updateChosenEmployee(form.data as UpdateChosenEmployee)

        return { response }
    }
};
export const _submitDirectorResultForm = async (formData: QuarterCommonApproval) => {
    const form = await superValidate(
        formData,
        zod(_actingApprovalSchema),
    );
    if (form.valid) {
        const response: CommonResponseDTO = 
            await EmploymentActingServices.updateDirectorApproval(form.data as QuarterCommonApproval)

        return { response}
    }
};
export const _submitUpdateMeetingDetailForm = async (formData: UpdateActingInterview) => {
    const form = await superValidate(
        formData,
        zod(_updateMeetingDetailSchema),
    );
    if (form.valid) {
        const response: CommonResponseDTO =
            await EmploymentActingServices.updateInterviewDetail(form.data as UpdateActingInterview)

        return { response }
    }
}
export const _submitUpdateMeetingResultForm = async (formData: UpdateInterviewResult) => {
    const form = await superValidate(
        formData,
        zod(_updateMeetingResult),
    );
    if (form.valid) {
        const response: CommonResponseDTO =
            await EmploymentActingServices.updateInterviewResult(form.data as UpdateInterviewResult)

        return { response }
    }
}
export const _submitUpdatePromotionMeetingForm = async (formData: UpdatePromotionMeeting) => {
    const form = await superValidate(
        formData,
        zod(_updatePromotionDetail),
    );
    if (form.valid) {
        const response: CommonResponseDTO =
            await EmploymentActingServices.updatePromotionMeeting(form.data as UpdatePromotionMeeting)

        return { response }
    }
}
export const _submitUpdatePromotionMeetingResultForm = async (formData: PromotionMeetingResult) => {
    const form = await superValidate(
        formData,
        zod(_updatePromotionMeetingResultSchema),
    );
    if (form.valid) {
        const response: CommonResponseDTO =
            await EmploymentActingServices.editPromotionResult(form.data as PromotionMeetingResult)
    }
}
export const _submitUpdatePlacementMeeting = async (formData: PlacementMeetingDetail) => {
    const form = await superValidate(
        formData,
        zod(_updatePlacementMeeting),
    );
    console.log(form)
    if (form.valid) {
        const response: CommonResponseDTO =
            await EmploymentActingServices.addPlacementMeeting(form.data as PlacementMeetingDetail)

        return { response }
    }
}
export const _submitUpdateEmployeePlacementMeetingResultForm = async (formData: PlacementResult) => {
    const form = await superValidate(
        formData,
        zod(_updateEmployeePlacementMeetingResultSchema),
    );
    if (form.valid) {
        const response: CommonResponseDTO =
            await EmploymentActingServices.editPlacementResult(form.data as PlacementResult)

        return { response }
    }
}
export const _submitUpdateActingResultForm = async (formData: ActingDetails) => {
    const form = await superValidate(
        formData,
        zod(_updateActingResultSchema),
    );
    if (form.valid) {
        const { actingId, ...tempObj } = form.data
        const response: CommonResponseDTO =
            await EmploymentActingServices.addActingResult(tempObj as ActingDetails)

        return { response }
    }
}
export const _submitSupporterResultForm = async (formData: QuarterCommonApproval) => {
    const form = await superValidate(
        formData,
        zod(_actingApprovalSchema),
    );
    console.log(form)
    if (form.valid) {

    }
}
export const _submitApproverResultForm = async (formData: QuarterCommonApproval) => {
    const form = await superValidate(
        formData,
        zod(_actingApprovalSchema),
    );
    if (form.valid) {

    }
}


// ================================================
// get table information
// ================================================
export const _tableInformation = async (id: number) => {
    let currentId: commonIdRequestDTO = {
        id: id,
    }
    const promotionResponse: CommonResponseDTO =
        await EmploymentActingServices.getPromotionTableDetail(currentId)

    return { promotionResponse }
}
export const _postponeDetail = async (id: number) => {
    let currentId: commonIdRequestDTO = {
        id: id,
    }
    const response: CommonResponseDTO =
        await EmploymentActingServices.getPostponeDetail(currentId)

    return { response }
}
export const _actingResult = async (id: number) => {
    let currentId: commonIdRequestDTO = {
        id: id,
    }
    const response: CommonResponseDTO =
        await EmploymentActingServices.getActingResult(currentId)

    return { response }
}
export const _actingConfirmation = async (id: number) => {
    let currentId: commonIdRequestDTO = {
        id: id,
    }
    const response: CommonResponseDTO =
        await EmploymentActingServices.getActingConfirmationDetail(currentId)

    return { response }
}
export const _directorApproval = async (id: number) => {
    let currentId: commonIdRequestDTO = {
        id: id,
    }
    const response: CommonResponseDTO =
        await EmploymentActingServices.getDirectorApproval(currentId)

    return { response }
}
export const _supportApproval = async (id: number) => {
    let currentId: commonIdRequestDTO = {
        id: id,
    }
    const response: CommonResponseDTO =
        await EmploymentActingServices.getSupporterApproval(currentId)

    return { response }
}
export const _approverApproval = async (id: number) => {
    let currentId: commonIdRequestDTO = {
        id: id,
    }
    const response: CommonResponseDTO =
        await EmploymentActingServices.getApproverApproval(currentId)

    return { response }
}
export const _mainPromotion = async (id: number) => {
    let currentId: commonIdRequestDTO = {
        id: id,
    }
    const response: CommonResponseDTO =
        await EmploymentActingServices.getMainPromotionMeeting(currentId)

    return { response }
}







export const _submitUpdatePlacementAmendmentApplicationResultForm = async (formData: object) => {
    const updatePlacementAmendmentApplicationResultForm = await superValidate(
        formData,
        zod(_updatePlacementAmendmentApplicationResultSchema),
    );
    console.log(updatePlacementAmendmentApplicationResultForm)
    if (updatePlacementAmendmentApplicationResultForm.valid) {
        const response = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(updatePlacementAmendmentApplicationResultForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (updatePlacementAmendmentApplicationResultForm.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
}



// =================== gred utama submit form
export const _submitUpdateMainPromotionMeetingResultForm = async (formData: UpdateMainPromotionMeeting) => {
    const form = await superValidate(
        formData,
        zod(_mainUpdatePromotionMeetingResultSchema),
    );
    if (form.valid) {
        const response: CommonResponseDTO =
            await EmploymentActingServices.addMainPromotionMeeting(form.data as UpdateMainPromotionMeeting)

        return { response }
    }
}
export const _submitUpdateMainPromotionMeetingResultDetailForm = async (formData: object) => {
    const updatePromotionMeetingResultDetailForm = await superValidate(
        formData,
        zod(_mainUpdatePromotionMeetingResultDetailSchema),
    );
    if (updatePromotionMeetingResultDetailForm.valid) {
        const response = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(updatePromotionMeetingResultDetailForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (updatePromotionMeetingResultDetailForm.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
}
export const _submitUpdateMainActingEmployeeDetailForm = async (formData: object) => {
    const updateMainActingEmployeeDetailForm = await superValidate(
        formData,
        zod(_mainUpdateActingEmployeeDetailSchema),
    );
    if (updateMainActingEmployeeDetailForm.valid) {
        const response = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(updateMainActingEmployeeDetailForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (updateMainActingEmployeeDetailForm.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
}
export const _submitMainSupporterAndApproverForm = async (formData: object) => {
    const mainSupporterAndApproverForm = await superValidate(
        formData,
        zod(_mainSupporterAndApproverSchema),
    );
    console.log(mainSupporterAndApproverForm)
    if (mainSupporterAndApproverForm.valid) {
        const response = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(mainSupporterAndApproverForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (mainSupporterAndApproverForm.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
}

// ================ kakitangan submit form

export const _submitEmployeeNeedPlacementAmendmentForm = async (formData: object) => {
    const employeeNeedPlacementAmendmentForm = await superValidate(
        formData,
        zod(_placementAmendmentApplication)

    );
    console.log(employeeNeedPlacementAmendmentForm)
    if (employeeNeedPlacementAmendmentForm.valid) {
        const response = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(employeeNeedPlacementAmendmentForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (employeeNeedPlacementAmendmentForm.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
}

const getLookup = async () => {
    // =======================================================
    // Dropdown Lookup =======================================
    // =======================================================
    const gradeLookupResponse: CommonResponseDTO =
        await LookupServices.getServiceGradeEnums();

    const gradeLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsBothAreCode(gradeLookupResponse);
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
        LookupServices.setSelectOptionsValueIsDescription(positionLookupResponse)
    // -------------------------------------------------------
    const departmentLookupResponse: CommonResponseDTO =
        await LookupServices.getDepartmentEnums();

    const departmentLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(departmentLookupResponse)
    // -------------------------------------------------------
    const meetingNameLookup: DropdownDTO[] = [
        { value: 'Mesyuarat 1/12', name: 'Mesyuarat 1/12' },
        { value: 'Mesyuarat 1/102', name: 'Mesyuarat 1/102' },
        { value: 'Mesyuarat 2/101', name: 'Mesyuarat 2/101' },
    ]
    const suppAppResponse: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 350,
        orderBy: null,
        orderType: null,
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
        departmentLookup,
        supporterApproverLookup,
    }
}



