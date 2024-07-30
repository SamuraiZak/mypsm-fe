import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import { UserRoleConstant } from "$lib/constants/core/user-role.constant";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { CommonEmployeeDTO } from "$lib/dto/core/common/employee/employee.dto";
import type { commonIdRequestDTO } from "$lib/dto/core/common/id-request.dto";
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto";
import type { PTBIDRequestBodyDTO, PensionId } from "$lib/dto/mypsm/employment/ptb-dan-kwap/id-request.dto";
import type { ApproveDetailDTO, AssignRolesRelatedDTO, PensionDetailDTO, PersonalDetailDTO, RolesRelatedDTO, ServiceDetailDTO, SupportDetailDTO } from "$lib/dto/mypsm/employment/ptb-dan-kwap/ptb-kwap-dto";
import { _PTBPensionInfoSchema, _approveInfoSchema, _assignRolesRelatedSchema, _personalInfoSchema, _rolesRelatedEditSchema, _salaryInfoSchema, _serviceInfoSchema, _supporterInfoSchema } from "$lib/schemas/mypsm/employment/PTB-KWAP/schema";
import { LookupServices } from "$lib/services/implementation/core/lookup/lookup.service";
import { PTBKWAPServices } from "$lib/services/implementation/mypsm/PTB-KWAP/PTB.service";
import { EmploymentActingServices } from "$lib/services/implementation/mypsm/perjawatan/employment-acting.service";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";



export const load = async ({parent,params}) => {
    const { layoutData } = await parent();

    const currentRoleCode: string = layoutData.accountDetails.currentRoleCode

    let assignedRoles: boolean = false;

    if(params.roles !== 'kakitangan'){
        assignedRoles = true;
    }

    // ==========================================================
    // =================== Lookup ================================
    // -------------------------------------------------------

    // -------------------------------------------------------
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
    let isNewApplication: boolean = true;




    // ---------------------------------------------------------------

    // table
    const param = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {},
    };

    const actingEmployeeListResponse: CommonResponseDTO =
        await EmploymentActingServices.getActingEmployeeList(param);

    let actingEmployeeList: CommonEmployeeDTO[] = [];

    if (actingEmployeeListResponse.status == "success") {
        actingEmployeeList = actingEmployeeListResponse.data?.dataList as CommonEmployeeDTO[];
    }

    const pensionIDBody = {
        id: Number(params.pensionid)
    }




    // get current role code
  
    // set default id
    let currentApplicationId: number = Number(params.id);
    if (params.pensionid !== "baru") {
        isNewApplication = false;
    }
    // ============================================
    // CREATE ALL FORMS
    // ============================================

    //=====================================================
    //================== Personal Schema =================
    //=====================================================
    const personalDetailForm = await superValidate(zod(_personalInfoSchema));


    //=====================================================
    //================== Service Schema ===================

    const serviceDetailForm = await superValidate(zod(_serviceInfoSchema));


    //======================================================
    //================== Salary ===================

    const salaryDetailForm = await superValidate(zod(_salaryInfoSchema));


    //======================================================
    //================== PTB KWAP Schema ===================

    const pensionDetailForm = await superValidate(zod(_PTBPensionInfoSchema));

    //======================================================
    //========= assign Peranan -Peranan Berkaitan ============

    const assignrolesRelatedlForm = await superValidate(zod(_assignRolesRelatedSchema));

    //======================================================
    //========= edit Peranan -Peranan Berkaitan ============


    const rolesRelatedlForm = await superValidate(zod(_rolesRelatedEditSchema));

    //======================================================
    //============= keputusan Penyokong ====================

    const supporterDetailForm = await superValidate(zod(_supporterInfoSchema));

    //======================================================
    //=========  pelulus ==================================


    const approverDetailForm = await superValidate(zod(_approveInfoSchema));

    // ============================================
    // GET APPLICATION DATA
    // ============================================

    // ===============
    // personal Detail
    // ===============
    let personalDetail: PersonalDetailDTO | null = null;
    let personalDetailRequestBody: PTBIDRequestBodyDTO = {
        id: currentApplicationId
    }
    let pensionId: commonIdRequestDTO = {
        id: Number(params.pensionid)
    }
    const personalDetailResponse: CommonResponseDTO =
        await PTBKWAPServices.getPTBKWAPPersonalDetails(personalDetailRequestBody);

    if (personalDetailResponse.status == 'success') {
        personalDetail = personalDetailResponse.data?.details as PersonalDetailDTO;
        personalDetailForm.data = personalDetail;
    }



    // if application exist



    // ===============
    // SERVICE Detail
    // ===============

    let serviceDetail: ServiceDetailDTO | null = null;
    let serviceDetailRequestBody: PTBIDRequestBodyDTO = {
        id: currentApplicationId
    }

    const serviceDetailResponse: CommonResponseDTO =
        await PTBKWAPServices.getPTBKWAPServiceDetails(serviceDetailRequestBody);

    if (serviceDetailResponse.status == 'success') {
        serviceDetail = serviceDetailResponse.data?.details as ServiceDetailDTO;

        serviceDetailForm.data = serviceDetail;
    }


    if (currentApplicationId !== 0) {
        // if application exist


        const serviceDetailResponse: CommonResponseDTO =
            await PTBKWAPServices.getPTBKWAPServiceDetails(serviceDetailRequestBody);

        if (serviceDetailResponse.status == 'success') {
            serviceDetail = serviceDetailResponse.data?.details as ServiceDetailDTO;

            serviceDetailForm.data = serviceDetail;
        }
    } else {

    }

    // ===============
    // Pension Detail
    // ===============
    let pensionDetail: PensionDetailDTO | null = null;
    let  pensionDetailResponse: CommonResponseDTO = {}
    if (currentApplicationId !== 0) {
        let pensionDetailRequestBody: PTBIDRequestBodyDTO = {
            id: currentApplicationId
        }

        pensionDetailResponse =
            await PTBKWAPServices.getPTBKWAPpensionDetails
                (pensionIDBody);

        if (pensionDetailResponse.status == 'success') {
            pensionDetail = pensionDetailResponse.data?.details as PensionDetailDTO;

            pensionDetailForm.data = pensionDetail;
        }
    }

    // ===============
    // ASSIGN Roles Related
    // ===============

    // need service for get
    let assignrolesRelatedDetail: AssignRolesRelatedDTO | null = null;
    let rolesRelatedResponse: CommonResponseDTO = {};
    if (params.id !== "baru") {
        let rolesRelatedRequestBody: PTBIDRequestBodyDTO = {
            id: currentApplicationId
        }

        rolesRelatedResponse =
            await PTBKWAPServices.getPTBKWAPRolesRelatedNames
                (pensionIDBody);

        if (rolesRelatedResponse.status == 'success') {
            assignrolesRelatedDetail = rolesRelatedResponse.data?.details as AssignRolesRelatedDTO;

            assignrolesRelatedlForm.data = assignrolesRelatedDetail;
        }

    }

    // ===============
    // Roles Related
    // ===============
    let rolesRelatedDetail: RolesRelatedDTO | null = null;

    if (params.id !== "baru") {
        let rolesRelatedRequestBody: PTBIDRequestBodyDTO = {
            id: currentApplicationId
        }

        const rolesRelatedResponse: CommonResponseDTO =
            await PTBKWAPServices.getPTBKWAPRolesRelated
                (pensionIDBody);

        if (rolesRelatedResponse.status == 'success') {
            rolesRelatedDetail = rolesRelatedResponse.data?.details as RolesRelatedDTO;

            rolesRelatedlForm.data = rolesRelatedDetail;
        }
    }

    // ===============
    // Support Detail
    // ===============
    let supportDetail: SupportDetailDTO | null = null;

    if (currentApplicationId !== 0) {
        let supportRequestBody: PTBIDRequestBodyDTO = {
            id: currentApplicationId
        }

        const supportResponse: CommonResponseDTO =
            await PTBKWAPServices.getPTBKWAPSupport
                (pensionIDBody);

        if (supportResponse.status == 'success') {
            supportDetail = supportResponse.data?.details as SupportDetailDTO;

            supporterDetailForm.data = supportDetail;
        }
    }

    // ===============
    // Approve Detail
    // ===============
    let approveDetail: ApproveDetailDTO | null = null;

    if (currentApplicationId !== 0) {
        let approveRequestBody: PTBIDRequestBodyDTO = {
            id: currentApplicationId
        }

        const approveResponse: CommonResponseDTO =
            await PTBKWAPServices.getPTBKWAPApprove
                (pensionIDBody);

        if (approveResponse.status == 'success') {
            approveDetail = approveResponse.data?.details as ApproveDetailDTO;

            approverDetailForm.data = approveDetail;
        }

    }

    return {
        personalDetailForm,
        currentApplicationId,
        serviceDetailForm,
        salaryDetailForm,
        pensionDetailForm,
        assignrolesRelatedlForm,
        rolesRelatedResponse,
        rolesRelatedlForm,
        supporterDetailForm,
        approverDetailForm,
        personalDetail,
        pensionDetail,
        rolesRelatedDetail,
        assignrolesRelatedDetail,
        supportDetail,
        approveDetail,
        actingEmployeeList,
        actingEmployeeListResponse,
        param,
        supporterApproverLookup,
        isNewApplication,
        pensionId,
        pensionDetailResponse,
        currentRoleCode,
        assignedRoles,
        
    }

}

//==================================================
//=============== Submit Functions =================
//==================================================



// ========================================================================================
// =========================== add ========================================================
// ========================================================================================

// ================================================================
// ==========  Add Pension Detail ====================================
// ================================================================
export const _pensionDetailSubmit = async (formData: object) => {
    const pensionDetailsInfoForm = await superValidate(formData, (zod)(_PTBPensionInfoSchema));
    console.log(pensionDetailsInfoForm)
    if (pensionDetailsInfoForm.valid) {
        const response: CommonResponseDTO =
            await PTBKWAPServices.addPensionDetail(pensionDetailsInfoForm.data as PensionDetailDTO);
        return { response };
    }

};


// ========================================================================================
// =========================== Edit ========================================================
// ========================================================================================

// ================================================================
// ==========  Edit Pension Detail ====================================
// ================================================================
export const _editpensionDetailSubmit = async (formData: object) => {
    const editPensionDetailsInfoForm = await superValidate(formData, (zod)(_PTBPensionInfoSchema));

    if (editPensionDetailsInfoForm.valid) {
        const response: CommonResponseDTO =
            await PTBKWAPServices.editPTBKWAPpensionDetails(editPensionDetailsInfoForm.data as PensionDetailDTO);
        return { response };
    }

};

// ================================================================
// ==========  Edit Roles Related =================================
// ================================================================
export const _editrolesRelatedDetailSubmit = async (formData: object) => {
    const editrolesRelatedDetailsInfoForm = await superValidate(formData, (zod)(_assignRolesRelatedSchema));

    console.log(editrolesRelatedDetailsInfoForm)
    if (editrolesRelatedDetailsInfoForm.valid) {
        const response: CommonResponseDTO =
            await PTBKWAPServices.editRolesRelatedDetails(editrolesRelatedDetailsInfoForm.data as AssignRolesRelatedDTO);
        return { response };
    }

};
// ================================================================
// ==========  Edit Pelulus =======================================
// ================================================================
export const _editSupporterDetailSubmit = async (formData: object) => {
    const editSupporterDetailsInfoForm = await superValidate(formData, (zod)(_supporterInfoSchema));

    if (editSupporterDetailsInfoForm.valid) {
        const response: CommonResponseDTO =
            await PTBKWAPServices.editSupporterDetails(editSupporterDetailsInfoForm.data as SupportDetailDTO);
        return { response };
    }

};
// ================================================================
// ==========  Edit Penyokong ====================================
// ================================================================
export const _editApproverDetailSubmit = async (formData: object) => {
    const editApproverDetailsInfoForm = await superValidate(formData, (zod)(_approveInfoSchema));

    if (editApproverDetailsInfoForm.valid) {
        const response: CommonResponseDTO =
            await PTBKWAPServices.editDApproverDetails(editApproverDetailsInfoForm.data as ApproveDetailDTO);
        return { response };
    }

};

export const _tableInformation = async (id: number) => {
    let currentId: commonIdRequestDTO = {
        id: id,
    }
    const response: CommonResponseDTO =
        await PTBKWAPServices.getPTBKWAPPersonalDetails(currentId);

    return { response }
}