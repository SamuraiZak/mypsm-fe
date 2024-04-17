import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { RoleConstant } from '$lib/constants/core/role.constant';
import type { DocumentBase64RequestDTO } from '$lib/dto/core/common/base-64-document-request.dto';
import type { CandidateIDRequestBody } from '$lib/dto/core/common/candidate-id-request.view-dto';
import type { CommonFilterDTO } from '$lib/dto/core/common/common-filter.dto';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto.js'
import type { ApproverApproval } from '$lib/dto/mypsm/pinjaman/approver-approval-detail.dto';
import type { Approver } from '$lib/dto/mypsm/pinjaman/approver-detail.dto';
import type { VehicleFirstSchedule } from '$lib/dto/mypsm/pinjaman/car-first-schedule-detail.dto';
import type { DocumentCheck } from '$lib/dto/mypsm/pinjaman/document-check.dto';
import type { LoanAgreementLetter, LoanDownload } from '$lib/dto/mypsm/pinjaman/document.dto.js';
import type { Eligibility } from '$lib/dto/mypsm/pinjaman/eligibility.dto';
import type { FirstSchedule } from '$lib/dto/mypsm/pinjaman/first-schedule.dto';
import type { loanIdRequestDTO } from '$lib/dto/mypsm/pinjaman/loan-ID.dto';
import type { loanDetail } from '$lib/dto/mypsm/pinjaman/loan-detail.dto';
import type { OfferedLoan } from '$lib/dto/mypsm/pinjaman/offered-loan-detail.dto';
import type { PersonalDetail } from '$lib/dto/mypsm/pinjaman/personal-detail.dto';
import type { SecondSchedule } from '$lib/dto/mypsm/pinjaman/second-schedule.dto';
import type { Supplier } from '$lib/dto/mypsm/pinjaman/supplier-detail.dto';
import type { SupportApprover } from '$lib/dto/mypsm/pinjaman/support-approval-detail.dto';
import type { vechicalDetail } from '$lib/dto/mypsm/pinjaman/vehical-detail.dto';
import type { CandidatePersonalResponseDTO } from '$lib/dto/mypsm/profile/personal-detail.dto';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import { _approver, _approverApproval, _documentCheck, _eligibility, _firstSchedule, _loanDetail, _offerLoan, _personalDetail, _secondSchedule, _supplier, _supportApproval, _vehicleDetail, _vehicleFirstSchedule } from '$lib/schemas/mypsm/loan/loan-application';
import { LoanServices } from '$lib/services/implementation/mypsm/pinjaman/loan.service';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';


export async function load({ params }) {

    let currentID: loanIdRequestDTO = {
        id: Number(params.id)
    }
    let loanDocument: LoanDownload = {
        document: [{ document: "", name: "" }]
    }

    let loanPaymentDocument: LoanDownload = {
        document: [{ document: "", name: "" }]
    }

    let agreementDocument: LoanDownload = {
        document: [{ document: "", name: "" }]
    }

    //   loanDocumentDetail,
    // agreementLetterDetail,
    // loanPaymentDocumentDetail,

    let agreementLetter = getAgreementLetter()


    //==================================================
    //=============== Load Function ====================
    //================================================== 
    const personalDetailResponse: CommonResponseDTO =
        await LoanServices.getProfilePersonalDetails(currentID);


    const loanDetailResponse: CommonResponseDTO =
        await LoanServices.getLoanDetails(currentID);

    const vehicleDetailResponse: CommonResponseDTO =
        await LoanServices.getVehicleDetails(currentID);

    const offerLoanResponse: CommonResponseDTO =
        await LoanServices.getOfferLoanDetails(currentID);


    const vehicleFirstVehicleDetailResponse: CommonResponseDTO =
        await LoanServices.getVehicleFirstScheduleDetails(currentID);

    const firstDetailResponse: CommonResponseDTO =
        await LoanServices.getFirstScheduleDetails(currentID);

    const supplierDetailResponse: CommonResponseDTO =
        await LoanServices.getSupplierDetails(currentID);

    const secondScheduleDetailResponse: CommonResponseDTO =
        await LoanServices.getSecondScheduleDetails(currentID);

    const eligibilityDetailResponse: CommonResponseDTO =
        await LoanServices.getEligibilityDetails(currentID);

    const documentCheckDetailResponse: CommonResponseDTO =
        await LoanServices.getDocumentCheckDetails(currentID);

    const approverDetailResponse: CommonResponseDTO =
        await LoanServices.getApproverDetails(currentID);

    const supporterApprovalDetailResponse: CommonResponseDTO =
        await LoanServices.getSupporterApprovalDetails(currentID);

    const approverApprovalDetailResponse: CommonResponseDTO =
        await LoanServices.getApproverApprovalDetails(currentID);

    //==================== Document========================

    const loanDocumentResponse: CommonResponseDTO =
        await LoanServices.getDocument(currentID);

    loanDocument =
        loanDocumentResponse.data?.details as LoanDownload;

    const agreementDocumentResponse: CommonResponseDTO =
        await LoanServices.getAgreementLetter(currentID);
    agreementDocument =
        agreementDocumentResponse.data?.details as LoanDownload;

    const loanPaymentDocumentResponse: CommonResponseDTO =
        await LoanServices.getPaymentDocument(currentID);
    if (loanPaymentDocumentResponse.data?.details.documents !== null) {
        loanPaymentDocument =
            loanPaymentDocumentResponse.data?.details as LoanDownload;
    }
    console.log(loanPaymentDocument)


    const personalDetail = await superValidate(personalDetailResponse.data?.details as PersonalDetail, zod(
        _personalDetail))
        ;

    const loanDetails = await superValidate(loanDetailResponse.data?.details as loanDetail, zod(
        _loanDetail))
        ;

    const vehicleDetails = await superValidate(vehicleDetailResponse.data?.details as vechicalDetail, zod(
        _vehicleDetail))
        ;


    const offerLoan = await superValidate(offerLoanResponse.data?.details as OfferedLoan, zod(
        _offerLoan))
        ;

    const vehicleFirstScheduleDetails = await superValidate(vehicleFirstVehicleDetailResponse.data?.details as VehicleFirstSchedule, zod(
        _vehicleFirstSchedule))
        ;

    const firstScheduleDetails = await superValidate(firstDetailResponse.data?.details as FirstSchedule, zod(
        _firstSchedule))
        ;
    

    const supplierDetails = await superValidate(supplierDetailResponse.data?.details as Supplier, zod(
        _supplier))
        ;
    const secondScheduleDetails = await superValidate(secondScheduleDetailResponse.data?.details as SecondSchedule, zod(
        _secondSchedule))
        ;

    const eligibilityDetails = await superValidate(eligibilityDetailResponse.data?.details as Eligibility, zod(
        _eligibility))
        ;

    const documentCheckDetails = await superValidate(documentCheckDetailResponse.data?.details as DocumentCheck, zod(
        _documentCheck))
        ;

    const approverDetails = await superValidate(approverDetailResponse.data?.details as Approver, zod(
        _approver))
        ;
    const supporterApprovalDetails = await superValidate(supporterApprovalDetailResponse.data?.details as SupportApprover, zod(
        _supportApproval))
        ;

        const approverApprovalDetails = await superValidate(approverApprovalDetailResponse.data?.details as ApproverApproval, zod(
            _approverApproval))
            ;

    return {
        currentID,
        personalDetailResponse,
        loanDetailResponse,
        offerLoanResponse,
        vehicleFirstVehicleDetailResponse,
        firstDetailResponse,
        supplierDetailResponse,
        secondScheduleDetailResponse,
        eligibilityDetailResponse,
        documentCheckDetailResponse,
        approverDetailResponse,
        supporterApprovalDetailResponse,
        approverApprovalDetailResponse,
        vehicleDetailResponse,

        vehicleFirstScheduleDetails,
        personalDetail,
        loanDetails,
        offerLoan,
        firstScheduleDetails,
        supplierDetails,
        secondScheduleDetails,
        eligibilityDetails,
        documentCheckDetails,
        approverDetails,
        supporterApprovalDetails,
        approverApprovalDetails,
        vehicleDetails,
        loanDocument,
        loanPaymentDocument,
        agreementLetter,
        agreementDocument,
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

// ================================================================
// ========== Add Supplier Detail =================================
// ================================================================
export const _supplierDetailSubmit = async (formData: object) => {
    const supplierDetailsInfoForm = await superValidate(formData, (zod)(_supplier));

    if (supplierDetailsInfoForm.valid) {
        const response: CommonResponseDTO =
            await LoanServices.supplierDetail(supplierDetailsInfoForm.data as Supplier);
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