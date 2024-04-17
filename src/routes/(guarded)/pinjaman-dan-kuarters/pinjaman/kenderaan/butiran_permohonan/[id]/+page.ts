import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant.js';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant.js';
import type { DocumentBase64RequestDTO } from '$lib/dto/core/common/base-64-document-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { ApproverApproval } from '$lib/dto/mypsm/pinjaman/approver-approval-detail.dto';
import type { Approver } from '$lib/dto/mypsm/pinjaman/approver-detail.dto';
import type { VehicleFirstSchedule } from '$lib/dto/mypsm/pinjaman/car-first-schedule-detail.dto';
import type { DocumentCheck } from '$lib/dto/mypsm/pinjaman/document-check.dto';
import type { LoanDownload } from '$lib/dto/mypsm/pinjaman/document.dto';
import type { Eligibility } from '$lib/dto/mypsm/pinjaman/eligibility.dto';
import type { FirstSchedule } from '$lib/dto/mypsm/pinjaman/first-schedule.dto';
import type { loanIdRequestDTO } from '$lib/dto/mypsm/pinjaman/loan-ID.dto';
import type { loanDetail } from '$lib/dto/mypsm/pinjaman/loan-detail.dto.js';
import type { OfferedLoan } from '$lib/dto/mypsm/pinjaman/offered-loan-detail.dto';
import type { PersonalDetail } from '$lib/dto/mypsm/pinjaman/personal-detail.dto.js';
import type { SecondSchedule } from '$lib/dto/mypsm/pinjaman/second-schedule.dto';
import type { Supplier } from '$lib/dto/mypsm/pinjaman/supplier-detail.dto';
import type { SupportApprover } from '$lib/dto/mypsm/pinjaman/support-approval-detail.dto';
import type { vechicalDetail } from '$lib/dto/mypsm/pinjaman/vehical-detail.dto';
import { _approver, _approverApproval, _documentCheck, _eligibility, _firstSchedule, _loanDetail, _offerLoan, _personalDetail, _secondSchedule, _supplier, _supportApproval, _vehicleDetail, _vehicleFirstSchedule } from '$lib/schemas/mypsm/loan/loan-application';
import { LoanServices } from '$lib/services/implementation/mypsm/pinjaman/loan.service';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({ params }) {

    let agreementLetter = getAgreementLetter()
    // let loanDocumentDetail: LoanDownload = {
    //     document: [{ document: "", name: "" }]
    // }

    // let loanPaymentDocumentDetail: LoanDownload = {
    //     document: [{ document: "", name: "" }]
    // }

    // let agreementLetterDetail: LoanDownload = {
    //     document: [{ document: "", name: "" }]
    // }

    // set default application id
    let currentApplicationId: number = 0;

    if (params.id !== "Baru") {
        // reset application id to actual application id if not new
        currentApplicationId = parseInt(params.id);
    }
    // ===============
    // personal Detail
    // ===============
    let personalDetail: PersonalDetail | null = null;

    let personalDetailRequestBody: loanIdRequestDTO = {
        id: currentApplicationId
    }

    const personalDetailResponse: CommonResponseDTO =
        await LoanServices.getProfilePersonalDetails(personalDetailRequestBody);

    if (personalDetailResponse.status == 'success') {
        personalDetail = personalDetailResponse.data?.details as PersonalDetail;
    }

    // ===============
    // Loan Detail
    // ===============

    let loanDetail: loanDetail | null = null;

    let loanDetailRequestBody: loanIdRequestDTO = {
        id: currentApplicationId
    }

    const loanDetailResponse: CommonResponseDTO =
        await LoanServices.getLoanDetails
            (loanDetailRequestBody);

    if (loanDetailResponse.status == 'success') {
        loanDetail = loanDetailResponse.data?.details as loanDetail;
    }

    // ===============
    // Vehicle Detail
    // ===============

    let vehicleDetail: vechicalDetail | null = null;

    let vehicleDetailRequestBody: loanIdRequestDTO = {
        id: currentApplicationId
    }

    const vehicleDetailResponse: CommonResponseDTO =
        await LoanServices.getVehicleDetails
            (vehicleDetailRequestBody);

    if (vehicleDetailResponse.status == 'success') {
        vehicleDetail = vehicleDetailResponse.data?.details as vechicalDetail;
    }

    // ===============
    // Offer Loan
    // ===============

    let offerLoanDetail: OfferedLoan | null = null;

    let offerLoanDetailRequestBody: loanIdRequestDTO = {
        id: currentApplicationId
    }

    const offerLoanDetailResponse: CommonResponseDTO =
        await LoanServices.getOfferLoanDetails
            (offerLoanDetailRequestBody);

    if (offerLoanDetailResponse.status == 'success') {
        offerLoanDetail = offerLoanDetailResponse.data?.details as OfferedLoan;
    }

    // ===============
    // Vehicle First Schedule
    // ===============

    let vehicleFirstScheduleDetail: VehicleFirstSchedule | null = null;

    let vehicleFirstScheduleDetailRequestBody: loanIdRequestDTO = {
        id: currentApplicationId
    }

    const vehicleFirstScheduleDetailResponse: CommonResponseDTO =
        await LoanServices.getVehicleFirstScheduleDetails
            (vehicleFirstScheduleDetailRequestBody);

    if (vehicleFirstScheduleDetailResponse.status == 'success') {
        vehicleFirstScheduleDetail = vehicleFirstScheduleDetailResponse.data?.details as VehicleFirstSchedule;
    }
    // ===============
    //  First Schedule
    // ===============

    let firstScheduleDetail: FirstSchedule | null = null;

    let firstScheduleDetailRequestBody: loanIdRequestDTO = {
        id: currentApplicationId
    }

    const firstScheduleDetailResponse: CommonResponseDTO =
        await LoanServices.getFirstScheduleDetails
            (firstScheduleDetailRequestBody);

    if (firstScheduleDetailResponse.status == 'success') {
        firstScheduleDetail = firstScheduleDetailResponse.data?.details as FirstSchedule;
    }

    // ===============
    //  Second Schedule
    // ===============

    let secondScheduleDetail: SecondSchedule | null = null;

    let secondScheduleDetailRequestBody: loanIdRequestDTO = {
        id: currentApplicationId
    }

    const secondScheduleDetailResponse: CommonResponseDTO =
        await LoanServices.getSecondScheduleDetails
            (secondScheduleDetailRequestBody);

    if (secondScheduleDetailResponse.status == 'success') {
        secondScheduleDetail = secondScheduleDetailResponse.data?.details as SecondSchedule;
    }

    // ===============
    // Eligibility
    // ===============

    let eligibilityDetail: Eligibility | null = null;

    let eligibilityDetailRequestBody: loanIdRequestDTO = {
        id: currentApplicationId
    }

    const eligibilityDetailResponse: CommonResponseDTO =
        await LoanServices.getEligibilityDetails
            (eligibilityDetailRequestBody);

    if (eligibilityDetailResponse.status == 'success') {
        eligibilityDetail = eligibilityDetailResponse.data?.details as Eligibility;
    }

    // ===============
    // Document Check
    // ===============

    let documentCheckDetail: DocumentCheck | null = null;

    let documentCheckDetailRequestBody: loanIdRequestDTO = {
        id: currentApplicationId
    }

    const documentCheckDetailResponse: CommonResponseDTO =
        await LoanServices.getDocumentCheckDetails
            (documentCheckDetailRequestBody);

    if (documentCheckDetailResponse.status == 'success') {
        documentCheckDetail = documentCheckDetailResponse.data?.details as DocumentCheck;
    }

    // ===============
    // Approver
    // ===============

    let approverDetail: Approver | null = null;

    let approverDetailRequestBody: loanIdRequestDTO = {
        id: currentApplicationId
    }

    const approverDetailResponse: CommonResponseDTO =
        await LoanServices.getApproverDetails
            (approverDetailRequestBody);

    if (approverDetailResponse.status == 'success') {
        approverDetail = approverDetailResponse.data?.details as Approver;
    }

    // ===============
    // Support Approval
    // ===============

    let supportApprovalDetail: SupportApprover | null = null;

    let supportApprovalDetailRequestBody: loanIdRequestDTO = {
        id: currentApplicationId
    }

    const supportApprovalDetailResponse: CommonResponseDTO =
        await LoanServices.getSupporterApprovalDetails
            (supportApprovalDetailRequestBody);

    if (supportApprovalDetailResponse.status == 'success') {
        supportApprovalDetail = supportApprovalDetailResponse.data?.details as SupportApprover;
    }

    // ===============
    // Support Approval
    // ===============

    let approverApprovalDetail: ApproverApproval | null = null;

    let approverApprovalDetailRequestBody: loanIdRequestDTO = {
        id: currentApplicationId
    }

    const approverApprovalDetailResponse: CommonResponseDTO =
        await LoanServices.getApproverApprovalDetails
            (approverApprovalDetailRequestBody);

    if (approverApprovalDetailResponse.status == 'success') {
        approverApprovalDetail = approverApprovalDetailResponse.data?.details as ApproverApproval;
    }


    //==================== Document ========================

    // ===============
    // loan Document
    // ===============

    let loanDocumentDetail: LoanDownload | null = null;

    let loanDocumentDetailRequestBody: loanIdRequestDTO = {
        id: currentApplicationId
    }

    const loanDocumentDetailResponse: CommonResponseDTO =
        await LoanServices.getDocument
            (loanDocumentDetailRequestBody);

    if (loanDocumentDetailResponse.status == 'success') {
        loanDocumentDetail = loanDocumentDetailResponse.data?.details as LoanDownload;
    }

    // ===============
    // Agreement Letter
    // ===============

    let agreementLetterDetail: LoanDownload | null = null;

    let agreementLetterDetailRequestBody: loanIdRequestDTO = {
        id: currentApplicationId
    }

    const agreementLetterDetailResponse: CommonResponseDTO =
        await LoanServices.getAgreementLetter
            (agreementLetterDetailRequestBody);

    if (agreementLetterDetailResponse.status == 'success') {
        agreementLetterDetail = agreementLetterDetailResponse.data?.details as LoanDownload;
    }

    // ===============
    // Loan Payment
    // ===============

    let loanPaymentDocumentDetail: LoanDownload | null = null;

    let loanPaymentDocumentDetailRequestBody: loanIdRequestDTO = {
        id: currentApplicationId
    }

    const loanPaymentDocumentDetailResponse: CommonResponseDTO =
        await LoanServices.getPaymentDocument
            (loanPaymentDocumentDetailRequestBody);

    if (loanPaymentDocumentDetailResponse.status == 'success') {
        loanPaymentDocumentDetail = loanPaymentDocumentDetailResponse.data?.details as LoanDownload;
    }


    // =========================================
    // =========== Form ========================
    const personalDetailForm = await superValidate(personalDetailResponse.data?.details as PersonalDetail, zod(
        _personalDetail))
        ;

    const loanDetailsForm = await superValidate(loanDetailResponse.data?.details as loanDetail, zod(
        _loanDetail))
        ;

    const vehicleDetailsForm = await superValidate(vehicleDetailResponse.data?.details as vechicalDetail, zod(
        _vehicleDetail))
        ;


    const offerLoanForm = await superValidate(offerLoanDetailResponse.data?.details as OfferedLoan, zod(
        _offerLoan))
        ;

    const vehicleFirstScheduleDetailsForm = await superValidate(vehicleFirstScheduleDetailResponse.data?.details as VehicleFirstSchedule, zod(
        _vehicleFirstSchedule))
        ;

    const firstScheduleDetailsForm = await superValidate(firstScheduleDetailResponse.data?.details as FirstSchedule, zod(
        _firstSchedule))
        ;

    const secondScheduleDetailsForm = await superValidate(secondScheduleDetailResponse.data?.details as SecondSchedule, zod(
        _secondSchedule))
        ;

    const eligibilityDetailsForm = await superValidate(eligibilityDetailResponse.data?.details as Eligibility, zod(
        _eligibility))
        ;

    const documentCheckDetailsForm = await superValidate(documentCheckDetailResponse.data?.details as DocumentCheck, zod(
        _documentCheck))
        ;

    const approverDetailsForm = await superValidate(approverDetailResponse.data?.details as Approver, zod(
        _approver))
        ;
    const supporterApprovalDetailsForm = await superValidate(supportApprovalDetailResponse.data?.details as SupportApprover, zod(
        _supportApproval))
        ;

    const approverApprovalDetailsForm = await superValidate(approverApprovalDetailResponse.data?.details as ApproverApproval, zod(
        _approverApproval))
        ;




    // =============================
    // set mode
    // =============================

    let userMode: string = "kakitangan";

    const currentRoleCode: string = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode) ?? "";

    switch (currentRoleCode) {
        case UserRoleConstant.kakitangan.code:
            userMode = "kakitangan"
            break;

        case UserRoleConstant.pelulus.code:
            userMode = "pelulus";
            break;

        case UserRoleConstant.ketuaSeksyen.code:
            userMode = "ketua Seksyen";
            break;

        default:
            break;
    }

    return {
        props: {
            currentApplicationId,
            userMode,

            personalDetail,
            vehicleDetail,
            offerLoanDetail,
            vehicleFirstScheduleDetail,
            firstScheduleDetail,
            secondScheduleDetail,
            eligibilityDetail,
            documentCheckDetail,
            approverDetail,
            supportApprovalDetail,
            approverApprovalDetail,
            loanDocumentDetail,
            agreementLetterDetail,
            loanPaymentDocumentDetail,
            agreementLetter,
        },
        forms:
        {
            personalDetailForm,
            loanDetailsForm,
            vehicleDetailsForm,
            offerLoanForm,
            secondScheduleDetailsForm,
            eligibilityDetailsForm,
            documentCheckDetailsForm,
            approverDetailsForm,
            supporterApprovalDetailsForm,
            approverApprovalDetailsForm,
            vehicleFirstScheduleDetailsForm,
            firstScheduleDetailsForm,

        }


    }

}

// ========================================================================================
// =========================== add ========================================================
// ========================================================================================

// ================================================================
// ==========  Add Loan  ==========================================
// ================================================================


// export const _loanSubmit = async (formData: object) => {
//     const loanInfoForm = await superValidate(formData, (zod)(_loanDetail));

//     if (loanInfoForm.valid) {
//         const response: CommonResponseDTO =
//         await LoanServices.addLoanDetail(loanInfoForm.data as loanDetail);
//     return { response };
//     }

// };



// ================================================================
// ==========  Add Loan Detail ====================================
// ================================================================
export const _loanDetailSubmit = async (formData: object) => {
    const loanDetailsInfoForm = await superValidate(formData, (zod)(_loanDetail));

    if (loanDetailsInfoForm.valid) {
        const response: CommonResponseDTO =
            await LoanServices.addLoanDetail(loanDetailsInfoForm.data as loanDetail);
        return { response };
    }

};

// ================================================================
// ==========  Add Vehicle Detail ====================================
// ================================================================
export const _vehicleDetailSubmit = async (formData: object) => {
    const vehicleDetailsInfoForm = await superValidate(formData, (zod)(_vehicleDetail));

    if (vehicleDetailsInfoForm.valid) {
        const response: CommonResponseDTO =
            await LoanServices.addVehicleDetail(vehicleDetailsInfoForm.data as vechicalDetail);
        return { response };
    }

};


// ================================================================
// ========== Add offer Loan Detail ==============================
// ================================================================
export const _offerLoanDetailSubmit = async (formData: object) => {
    const offerLoanDetailsInfoForm = await superValidate(formData, (zod)(_offerLoan));
    console.log(offerLoanDetailsInfoForm)
    if (offerLoanDetailsInfoForm.valid) {
        const response: CommonResponseDTO =
            await LoanServices.offerLoanDetail(offerLoanDetailsInfoForm.data as OfferedLoan);
        return { response };
    }

};



//============================================
//===== Add Jadual Pertama (Kenderaan) =======
//============================================
export const _vehicleFirstScheduleDetailSubmit = async (formData: object) => {
    const vehicleFirstScheduleDetailsInfoForm = await superValidate(formData, (zod)(_vehicleFirstSchedule));

    if (vehicleFirstScheduleDetailsInfoForm.valid) {
        const response: CommonResponseDTO =
            await LoanServices.addVehicleFirstScheduleDetail(vehicleFirstScheduleDetailsInfoForm.data as VehicleFirstSchedule);
        return { response };
    }

};

//=====================================================
//================ first Schedule =====================
//=====================================================

export const _firstScheduleDetailSubmit = async (formData: object) => {
    const firstScheduleDetailsInfoForm = await superValidate(formData, (zod)(_firstSchedule));

    if (firstScheduleDetailsInfoForm.valid) {
        const response: CommonResponseDTO =
            await LoanServices.addFirstScheduleDetail(firstScheduleDetailsInfoForm.data as FirstSchedule);
        return { response };
    }

};

//============================================
//========= Add Jadual Kedua ===============
//============================================

export const _secondScheduleDetailSubmit = async (formData: object) => {
    const secondScheduleDetailsInfoForm = await superValidate(formData, (zod)(_secondSchedule));

    if (secondScheduleDetailsInfoForm.valid) {
        const response: CommonResponseDTO =
            await LoanServices.addSecondScheduleDetail(secondScheduleDetailsInfoForm.data as SecondSchedule);
        return { response };
    }

};

//============================================
//========= Add Eligibility =================
//============================================

export const _eligibilityDetailSubmit = async (formData: object) => {
    const eligibilityDetailsInfoForm = await superValidate(formData, (zod)(_eligibility));

    if (eligibilityDetailsInfoForm.valid) {
        const response: CommonResponseDTO =
            await LoanServices.addEligibilityDetail(eligibilityDetailsInfoForm.data as Eligibility);
        return { response };
    }

};

//============================================
//========= Document Check ===================
//============================================

export const _documentCheckDetailSubmit = async (formData: object) => {
    const documentCheckDetailsInfoForm = await superValidate(formData, (zod)(_documentCheck));

    if (documentCheckDetailsInfoForm.valid) {
        const response: CommonResponseDTO =
            await LoanServices.addDocumentCheckDetail(documentCheckDetailsInfoForm.data as DocumentCheck);
        return { response };
    }

};

//============================================
//========= Add Support Approval ===============
//============================================

export const _supportApprovalSubmit = async (formData: object) => {
    const supportApprovalForm = await superValidate(formData, (zod)(_supportApproval));

    if (supportApprovalForm.valid) {
        const response: CommonResponseDTO =
            await LoanServices.addSupportApproval(supportApprovalForm.data as SupportApprover);
        return { response };
    }

};

///=====================================================
//================ Approver ======================
//=====================================================

export const _approverSubmit = async (formData: object) => {
    const approverForm = await superValidate(formData, (zod)(_approver));

    if (approverForm.valid) {
        const response: CommonResponseDTO =
            await LoanServices.addApprover(approverForm.data as Approver);
        return { response };
    }

};

///=====================================================
//================ Approver Approval ===================
//=====================================================

export const _approverApprovalSubmit = async (formData: object) => {
    const approverApprovalForm = await superValidate(formData, (zod)(_approverApproval));

    if (approverApprovalForm.valid) {
        const response: CommonResponseDTO =
            await LoanServices.addApproverApproval(approverApprovalForm.data as ApproverApproval);
        return { response };
    }

};


///=====================================================
//================ Document ===========================
//=====================================================

export const _submitDocument = async (formData: string) => {
    const response: CommonResponseDTO =
        await LoanServices.addDocument(formData)

    return { response }
};

export const _submitAgreementDocument = async (formData: string) => {
    const response: CommonResponseDTO =
        await LoanServices.addAgreementLetter(formData)

    return { response }
};

export const _submitPaymentDocument = async (formData: string) => {
    const response: CommonResponseDTO =
        await LoanServices.addPaymentDocument(formData)

    return { response }
}



// Create a function that returns a promise resolving to an array of DocumentBase64RequestDTO objects
export function _fileToBase64Object(fileList: FileList): Promise<DocumentBase64RequestDTO[]> {
    return new Promise((resolve, reject) => {
        // Convert FileList to array
        const fileArray: File[] = Array.from(fileList);

        // Simulate fetching base64 data for each file asynchronously
        const filesPromiseArray: Promise<DocumentBase64RequestDTO>[] = [];
        fileArray.forEach((file) => {
            const filePromise = fetchBase64Data(file);
            filesPromiseArray.push(filePromise);
        });

        // Resolve the promise when all file promises are resolved
        Promise.all(filesPromiseArray)
            .then((files) => {
                resolve(files);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

// Function to fetch base64 data for a file asynchronously
function fetchBase64Data(file: File): Promise<DocumentBase64RequestDTO> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const base64Data = event.target?.result as string;
            const fileName = file.name;
            const fileObject: DocumentBase64RequestDTO = { name: fileName, base64: base64Data.split(",")[1] };
            resolve(fileObject);
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsDataURL(file);
    });
}

const getAgreementLetter = () => {
    const url = "http://localhost:3333/loan/agreement_letter/vehicle_form"

    return url
}