import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant.js';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant.js';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto.js';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { RetirementEndorserDetail, RetirementOriginalDetailDTO, RetirementOthersApplicationDetail, RetirementVoluntaryApplicationDetail, RetirementVoluntaryApplicationDetailRequestDTO } from '$lib/dto/mypsm/employment/retirement/retirement.dto';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import { RetirementEndorsementSchema, RetirementEndorserDetailSchema, RetirementVoluntaryDetailSchema, type RetirementEndorsement, type RetirementVoluntaryDetail } from '$lib/schemas/mypsm/employment/retirement/retirement.schema';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { RetirementApplicationServices } from '$lib/services/implementation/mypsm/employment/retirement/retirement.service.js';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({params}) {
 
    // get current role code
    const currentRoleCode: string = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode) ?? UserRoleConstant.kakitangan.code;

    // set default id
    let currentApplicationId: number = 0;

    if (params.id !== "Baru") {
        currentApplicationId = parseInt(params.id);
    }

    // ============================================
    // CREATE ALL FORMS
    // ============================================

    // TODO: create all forms for each stepper
    // STEP 1: Add application
    const applicationDetailForm = await superValidate(zod(RetirementVoluntaryDetailSchema));

    // STEP 2: Integrity unit feedback
    const updateLForm = await superValidate(zod(RetirementEndorsementSchema));

    // STEP 3: Secretary verification
    const confirmationForm = await superValidate(zod(RetirementEndorsementSchema));

    // STEP 4: Endorser details
    const supportApproverForm = await superValidate(zod(RetirementEndorserDetailSchema));

    // STEP 5: Supporter Feedback 1
    const firstSupporterForm = await superValidate(zod(RetirementEndorsementSchema));

    // STEP 6: Supporter Feedback 2
    const secondSupporterForm = await superValidate(zod(RetirementEndorsementSchema));

    // STEP 7: Approver Feedback
    const approvalForm = await superValidate(zod(RetirementEndorsementSchema));

    // STEP 8: Secretary Confirmation
    const secretaryApprovalForm = await superValidate(zod(RetirementEndorsementSchema));

    // STEP 9: Document verification
    const documentCertificationForm = await superValidate(zod(RetirementEndorsementSchema));

    // STEP 10: Application confirmation
    const letterCertificationForm = await superValidate(zod(RetirementEndorsementSchema));

    // ============================================
    // GET APPLICATION DATA
    // ============================================

    // get original retirement date 
    let originalRetirementDetail: RetirementOriginalDetailDTO = {
        retirementDatee: ""
    };

    const originalRetirementDetailResponse: CommonResponseDTO = await RetirementApplicationServices.getOriginalRetirementDetail();

    if (originalRetirementDetailResponse.status == "success") {
        originalRetirementDetail = originalRetirementDetailResponse.data?.details as RetirementOriginalDetailDTO;
    }

    // set default application detail
    let currentApplicationDetail: RetirementOthersApplicationDetail = {
        RetirementOthersDetailDTO:null,
        RetirementOthersChoosenDetailDTO:  null,
        RetirementOthersUpdateListlDTO: null,
        RetirementOthersDocumentCertificationlDTO: null,
    }

    if (currentApplicationId !== 0) {

        // TODO: add action when application exist

        // create the application detail request body
        const applicationDetailRequest: RetirementVoluntaryApplicationDetailRequestDTO = {
            voluntaryId: currentApplicationId,
        }

        // fetch the application detail
        const applicationDetailResponse: CommonResponseDTO = await RetirementApplicationServices.getRetirementVoluntaryUnspecifyDetail(applicationDetailRequest);

        if (applicationDetailResponse.status == "success") {
            // assign new value to currentApplicationDetail
            currentApplicationDetail = applicationDetailResponse.data?.details as RetirementVoluntaryApplicationDetail;

            // TODO: assign value for each form

            // assign value to applicationDetailForm
            if (currentApplicationDetail.applicationDetail !== null) {
                applicationDetailForm.data = currentApplicationDetail.applicationDetail;
            }

            // assign value to certificationForm
            if (currentApplicationDetail.certification !== null) {
                certificationForm.data = currentApplicationDetail.certification;
            }else{
                certificationForm.data.voluntaryId = currentApplicationId;
            }

            // assign value to confirmationForm
            if (currentApplicationDetail.confirmation !== null) {
                confirmationForm.data = currentApplicationDetail.confirmation;
            }else{
                confirmationForm.data.voluntaryId = currentApplicationId;
            }
            
            // assign value to supportApproverForm
            if (currentApplicationDetail.supportApprover !== null) {
                supportApproverForm.data = currentApplicationDetail.supportApprover;
            }else{
                supportApproverForm.data.voluntaryId = currentApplicationId;
            }
            
        }
        
    } else {
        console.log(originalRetirementDetail.retirementDatee);
        // TODO: add action when application is new
        applicationDetailForm.data.retirementDate = originalRetirementDetail.retirementDatee;
    }

    // ============================================
    // GET ALL ENUMS
    // ============================================

    // endorser list
    const endorserRequest: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 10000,
        orderBy: 'name',
        orderType: 0,
        filter: {
            program: 'TETAP',
            employeeNumber: null,
            name: null,
            identityCard: null,
            scheme: null,
            grade: null,
            position: null,
        },
    };
    const endorserResponse: CommonResponseDTO =
        await LookupServices.getEmployeeList(endorserRequest);

    const endorserDropdown: DropdownDTO[] =
        LookupServices.setSelectOptionSupporterAndApproverKP(endorserResponse);

    let endorsementDropdown: DropdownDTO[] = [
        {
            value: true,
            name: 'Ya',
        },
        {
            value: false,
            name: 'Tidak',
        },
    ];

    return {
        props:{
            currentRoleCode,
            currentApplicationId,
            currentApplicationDetail,
            endorserDropdown,
            endorsementDropdown
        },
        forms:{
            applicationDetailForm,
            certificationForm,
            confirmationForm,
            supportApproverForm,
           
        }
    }
}

// ============================================
// CREATE ALL FORMS SUBMISSION
// ============================================

// submit application Detail
export async function _applicationDetailFormSubmit(formData:RetirementVoluntaryDetail) {
    const form = await superValidate(
        formData,
        zod(RetirementVoluntaryDetailSchema),
    );

    if (form.valid) {
        const response =
            await RetirementApplicationServices.addRetirementVoluntaryDetail(
                formData,
            );

        return { response };
    } else {
        getErrorToast('Sila semak semula maklumat anda.');
        error(400, { message: '' });
    }
}

// choosen list
export async function _choosenListFormSubmit(formData:RetirementEndorsement) {
    const form = await superValidate(
        formData,
        zod(RetirementEndorsementSchema),
    );

    if (form.valid) {
        const response =
            await RetirementApplicationServices.addRetirementVoluntaryCertification(
                formData,
            );

        return { response };
    } else {
        getErrorToast('Sila semak semula maklumat anda.');
        error(400, { message: '' });
    }
}

// confirmation Choosen Update
export async function _ChoosenUpdateFormSubmit(formData:RetirementEndorsement) {
    const form = await superValidate(
        formData,
        zod(RetirementEndorsementSchema),
    );

    if (form.valid) {
        const response =
            await RetirementApplicationServices.addRetirementVoluntaryConfirmation(
                formData,
            );

        return { response };
    } else {
        getErrorToast('Sila semak semula maklumat anda.');
        error(400, { message: '' });
    }
}

//  retirement Document

export async function _retirementDocumentFormSubmit(formData:RetirementEndorserDetail) {
    const form = await superValidate(
        formData,
        zod(RetirementEndorsementSchema),
    );

    if (form.valid) {
        const response =
            await RetirementApplicationServices.addRetirementVoluntarySupportApprover(
                formData,
            );

        return { response };
    } else {
        getErrorToast('Sila semak semula maklumat anda.');
        error(400, { message: '' });
    }
}
