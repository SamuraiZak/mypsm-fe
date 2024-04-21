import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto";
import type { RetirementForcedApplicationDetail, RetirementForcedApplicationDetailRequestDTO } from "$lib/dto/mypsm/employment/retirement/retirement-force.dto";
import { getErrorToast } from "$lib/helpers/core/toast.helper";
import { RetirementForcedEndorsementSchema, type RetirementForcedEndorsement } from "$lib/schemas/mypsm/employment/retirement/retirement.schema";
import { LookupServices } from "$lib/services/implementation/core/lookup/lookup.service";
import { RetirementApplicationServices } from "$lib/services/implementation/mypsm/employment/retirement/retirement.service";
import { error } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";



export async function load({ params }) {


    let currentApplicationId: number = 0;

    if (params.id !== "Baru") {
        currentApplicationId = parseInt(params.id);
    }

    // ============================================
    // CREATE ALL FORMS
    // ============================================

    // STEP 1: Integrity unit feedback
    const certificationDetailForm = await superValidate(zod(RetirementForcedEndorsementSchema));

    // STEP 2: Secretary verification
    const confirmationDetailForm = await superValidate(zod(RetirementForcedEndorsementSchema));

    // STEP 3: Document verification
    const documentForm = await superValidate(zod(RetirementForcedEndorsementSchema));

    // STEP 4: Document verification
    const letterCertificationDetailForm = await superValidate(zod(RetirementForcedEndorsementSchema));



    let currentApplicationDetail: RetirementForcedApplicationDetail = {
        certificationDetail: null,
        confirmationDetail: null,
        document: null,
        letterCertificationDetail: null,
    }

    // create the application detail request body
    const applicationDetailRequest: RetirementForcedApplicationDetailRequestDTO = {
        forceId: currentApplicationId,
    }

    // fetch the application detail
    const applicationDetailResponse: CommonResponseDTO = await RetirementApplicationServices.getRetirementForcedApplicationDetail(applicationDetailRequest);

    if (applicationDetailResponse.status == "success") {
        // assign new value to currentApplicationDetail
        currentApplicationDetail = applicationDetailResponse.data?.details as RetirementForcedApplicationDetail;



        // assign value to certificationForm
        if (currentApplicationDetail.certificationDetail !== null) {
            certificationDetailForm.data = currentApplicationDetail.certificationDetail;
        } else {
            certificationDetailForm.data.forceId = currentApplicationId;
        }

        // assign value to confirmationForm
        if (currentApplicationDetail.confirmationDetail !== null) {
            confirmationDetailForm.data = currentApplicationDetail.confirmationDetail;
        } else {
            confirmationDetailForm.data.forceId = currentApplicationId;
        }

        // assign value to documentCertificationForm
        if (currentApplicationDetail.document !== null) {
            documentForm.data = currentApplicationDetail.document;
        } else {
            documentForm.data.forceId = currentApplicationId;
        }

        // assign value to letterCertificationForm
        if (currentApplicationDetail.letterCertificationDetail !== null) {
            letterCertificationDetailForm.data = currentApplicationDetail.letterCertificationDetail;
        } else {
            letterCertificationDetailForm.data.forceId = currentApplicationId;
        }

    }

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
                // currentRoleCode,
                currentApplicationId,
                currentApplicationDetail,
                endorsementDropdown
            },
            forms:{
                certificationDetailForm,
                confirmationDetailForm,
                documentForm,
                letterCertificationDetailForm,
            }
        }

}

// certification applicationDetail
export async function _certificationFormSubmit(formData:RetirementForcedEndorsement) {
    const form = await superValidate(
        formData,
        zod(RetirementForcedEndorsementSchema),
    );

    if (form.valid) {
        const response =
            await RetirementApplicationServices.addRetirementforcedCertification(
                formData,
            );

        return { response };
    } else {
        getErrorToast('Sila semak semula maklumat anda.');
        error(400, { message: '' });
    }
}

// confirmation applicationDetail
export async function _confirmationFormSubmit(formData:RetirementForcedEndorsement) {
    const form = await superValidate(
        formData,
        zod(RetirementForcedEndorsementSchema),
    );

    if (form.valid) {
        const response =
            await RetirementApplicationServices.addRetirementforcedConfirmation(
                formData,
            );

        return { response };
    } else {
        getErrorToast('Sila semak semula maklumat anda.');
        error(400, { message: '' });
    }
}

// document applicationDetail
export async function _documentFormSubmit(formData:RetirementForcedEndorsement) {
    const form = await superValidate(
        formData,
        zod(RetirementForcedEndorsementSchema),
    );

    if (form.valid) {
        const response =
            await RetirementApplicationServices.addRetirementforcedDocument(
                formData,
            );

        return { response };
    } else {
        getErrorToast('Sila semak semula maklumat anda.');
        error(400, { message: '' });
    }
}

// letterCertification applicationDetail
export async function _letterCertificationFormSubmit(formData:RetirementForcedEndorsement) {
    const form = await superValidate(
        formData,
        zod(RetirementForcedEndorsementSchema),
    );

    if (form.valid) {
        const response =
            await RetirementApplicationServices.addRetirementforcedDocument(
                formData,
            );

        return { response };
    } else {
        getErrorToast('Sila semak semula maklumat anda.');
        error(400, { message: '' });
    }
}