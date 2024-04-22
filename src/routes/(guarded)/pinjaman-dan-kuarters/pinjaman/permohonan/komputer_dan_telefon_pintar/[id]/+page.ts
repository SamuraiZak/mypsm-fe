import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant.js';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant.js';
import type { DocumentBase64RequestDTO } from '$lib/dto/core/common/base-64-document-request.dto';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { addLoan } from '$lib/dto/mypsm/pinjaman/add-loan.dto';
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
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { LoanServices } from '$lib/services/implementation/mypsm/pinjaman/loan.service';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({ params }) {

    let agreementLetter = getAgreementLetter()
    let loan = "komputer_dan_telefon_pintar";

    // set default application id
    let currentApplicationId: number = 0;

    if (params.id !== "Baru") {
        // reset application id to actual application id if not new
        currentApplicationId = parseInt(params.id);
    }
    // ==========================================================
    // =================== Lookup ================================
    // -------------------------------------------------------
    const positionLookupResponse: CommonResponseDTO =
        await LookupServices.getPositionEnums();

    const positionLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        positionLookupResponse,
    );
    // -------------------------------------------------------
    const serviceGroupLookupResponse: CommonResponseDTO =
        await LookupServices.getServiceGroupEnums();

    const serviceGroupLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        serviceGroupLookupResponse,
    );
    // -------------------------------------------------------
     
      const gradeLookupResponse: CommonResponseDTO =
      await LookupServices.getServiceGradeEnums();

  const gradeLookup: DropdownDTO[] =
      LookupServices.setSelectOptions(gradeLookupResponse);

// -------------------------------------------------------
    const schemeLookupResponse: CommonResponseDTO =
    await LookupServices.getSchemeEnums();

const schemeLookup: DropdownDTO[] =
    LookupServices.setSelectOptions(schemeLookupResponse);


    // -------------------------------------------------------
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

    const supporterApproverLookup: DropdownDTO[] = LookupServices.setSelectOptionSupporterAndApprover(
        supporterApproverResponse,
    );

    //==================== Document ========================

    // ===============
    // loan Document
    // ===============

    let loanDocumentDetail: LoanDownload = {
        document: []
    };

    let loanDocumentDetailRequestBody: loanIdRequestDTO = {
        id: currentApplicationId
    }

    const loanDocumentDetailResponse: CommonResponseDTO =
        await LoanServices.getDocument
            (loanDocumentDetailRequestBody);

    if (loanDocumentDetailResponse.status == 'success') {

        let tempLoanDocumentDetail: LoanDownload = loanDocumentDetailResponse.data?.details as LoanDownload;

        if (tempLoanDocumentDetail.document !== null) {
            loanDocumentDetail.document = tempLoanDocumentDetail.document;
        }
    }

    // ===============
    // Agreement Letter
    // ===============

    let agreementLetterDetail: LoanDownload = {
        document: []
    };

    let agreementLetterDetailRequestBody: loanIdRequestDTO = {
        id: currentApplicationId
    }

    const agreementLetterDetailResponse: CommonResponseDTO =
        await LoanServices.getAgreementLetter
            (agreementLetterDetailRequestBody);

    if (agreementLetterDetailResponse.status == 'success') {

        let tempLoanDocumentDetail: LoanDownload = agreementLetterDetailResponse.data?.details as LoanDownload;
        if (tempLoanDocumentDetail.document !== null) {
            agreementLetterDetail.document = tempLoanDocumentDetail.document;
        }
    }

    // ===============
    // Loan Payment
    // ===============

    let loanPaymentDocumentDetail: LoanDownload = {
        document: []
    };

    let loanPaymentDocumentDetailRequestBody: loanIdRequestDTO = {
        id: currentApplicationId
    }

    const loanPaymentDocumentDetailResponse: CommonResponseDTO =
        await LoanServices.getPaymentDocument
            (loanPaymentDocumentDetailRequestBody);

    if (loanPaymentDocumentDetailResponse.status == 'success') {
        let tempLoanDocumentDetail: LoanDownload = loanPaymentDocumentDetailResponse.data?.details as LoanDownload;
        if (tempLoanDocumentDetail.document !== null) {
            loanPaymentDocumentDetail.document = tempLoanDocumentDetail.document;
        }
    }


    // =========================================
    // =========== Form ========================
    const personalDetailForm = await superValidate(zod(
        _personalDetail))
        ;

    const loanDetailsForm = await superValidate(zod(
        _loanDetail))
        ;

    const vehicleDetailsForm = await superValidate(zod(
        _vehicleDetail))
        ;


    const offerLoanForm = await superValidate(zod(
        _offerLoan))
        ;
        offerLoanForm.data.loanType = loan;

    const vehicleFirstScheduleDetailsForm = await superValidate(zod(
        _vehicleFirstSchedule))
        ;

    const firstScheduleDetailsForm = await superValidate(zod(
        _firstSchedule))
        ;

    const secondScheduleDetailsForm = await superValidate(zod(
        _secondSchedule))
        ;

    const eligibilityDetailsForm = await superValidate(zod(
        _eligibility))
        ;

    const documentCheckDetailsForm = await superValidate(zod(
        _documentCheck))
        ;

    const approverDetailsForm = await superValidate(zod(
        _approver))
        ;
    const supporterApprovalDetailsForm = await superValidate(zod(
        _supportApproval))
        ;

    const approverApprovalDetailsForm = await superValidate(zod(
        _approverApproval))
        ;


    const supplierDetailsForm = await superValidate(zod(
        _supplier))
        ;


    // ===============
    // personal Detail
    // ===============
    let personalDetail: PersonalDetail | null = null;


    if (currentApplicationId !== 0) {
        // if application exist
        let personalDetailRequestBody: loanIdRequestDTO = {
            id: currentApplicationId
        }

        const personalDetailResponse: CommonResponseDTO =
            await LoanServices.getProfilePersonalDetails(personalDetailRequestBody);

        if (personalDetailResponse.status == 'success') {
            personalDetail = personalDetailResponse.data?.details as PersonalDetail;

            personalDetailForm.data = personalDetail;
        }
    }else{
        // if application is new
        let personalDetailRequestBody: loanIdRequestDTO = {
            id: currentApplicationId
        }

        const personalDetailResponse: CommonResponseDTO =
            await LoanServices.getOwnProfilePersonalDetails();

        if (personalDetailResponse.status == 'success') {
            personalDetail = personalDetailResponse.data?.details as PersonalDetail;

            personalDetailForm.data = personalDetail;
        }
    }

    // ===============
    // Loan Detail
    // ===============

    let loanDetail: loanDetail | null = null;

    if (currentApplicationId !== 0) {
        let loanDetailRequestBody: loanIdRequestDTO = {
            id: currentApplicationId
        }

        const loanDetailResponse: CommonResponseDTO =
            await LoanServices.getLoanDetails
                (loanDetailRequestBody);

        if (loanDetailResponse.status == 'success') {
            loanDetail = loanDetailResponse.data?.details as loanDetail;

            loanDetailsForm.data = loanDetail;
        }
    }

    // ===============
    // Vehicle Detail
    // ===============

    let vehicleDetail: vechicalDetail | null = null;

    if (currentApplicationId !== 0) {
        let vehicleDetailRequestBody: loanIdRequestDTO = {
            id: currentApplicationId
        }

        const vehicleDetailResponse: CommonResponseDTO =
            await LoanServices.getVehicleDetails
                (vehicleDetailRequestBody);

        if (vehicleDetailResponse.status == 'success') {
            vehicleDetail = vehicleDetailResponse.data?.details as vechicalDetail;

            vehicleDetailsForm.data = vehicleDetail;
        }
    }

    // ===============
    // Offer Loan
    // ===============

    let offerLoanDetail: OfferedLoan | null = null;

    if (currentApplicationId !== 0) {
        let offerLoanDetailRequestBody: loanIdRequestDTO = {
            id: currentApplicationId
        }

        const offerLoanDetailResponse: CommonResponseDTO =
            await LoanServices.getOfferLoanDetails
                (offerLoanDetailRequestBody);

        if (offerLoanDetailResponse.status == 'success') {
            offerLoanDetail = offerLoanDetailResponse.data?.details as OfferedLoan;

            offerLoanForm.data = offerLoanDetail;

            let tempString: string;
            tempString = (offerLoanForm.data.loanType).split("_").map((word) => word.charAt(0).toUpperCase()+word.slice(1)).join(' ')
            offerLoanForm.data.loanType = tempString;
        }
    }

    // ===============
    // Vehicle First Schedule
    // ===============

    let vehicleFirstScheduleDetail: VehicleFirstSchedule | null = null;

    if (currentApplicationId !== 0) {
        let vehicleFirstScheduleDetailRequestBody: loanIdRequestDTO = {
            id: currentApplicationId
        }

        const vehicleFirstScheduleDetailResponse: CommonResponseDTO =
            await LoanServices.getVehicleFirstScheduleDetails
                (vehicleFirstScheduleDetailRequestBody);

        if (vehicleFirstScheduleDetailResponse.status == 'success') {
            vehicleFirstScheduleDetail = vehicleFirstScheduleDetailResponse.data?.details as VehicleFirstSchedule;

            vehicleFirstScheduleDetailsForm.data = vehicleFirstScheduleDetail;
        }
    }
    // ===============
    //  First Schedule
    // ===============

    let firstScheduleDetail: FirstSchedule | null = null;

    if (currentApplicationId !== 0) {
        let firstScheduleDetailRequestBody: loanIdRequestDTO = {
            id: currentApplicationId
        }

        const firstScheduleDetailResponse: CommonResponseDTO =
            await LoanServices.getFirstScheduleDetails
                (firstScheduleDetailRequestBody);

        if (firstScheduleDetailResponse.status == 'success') {
            firstScheduleDetail = firstScheduleDetailResponse.data?.details as FirstSchedule;

            firstScheduleDetailsForm.data = firstScheduleDetail;
        }
    }

    // ===============
    //  Second Schedule
    // ===============

    let secondScheduleDetail: SecondSchedule | null = null;

    if (currentApplicationId !== 0) {
        let secondScheduleDetailRequestBody: loanIdRequestDTO = {
            id: currentApplicationId
        }

        const secondScheduleDetailResponse: CommonResponseDTO =
            await LoanServices.getSecondScheduleDetails
                (secondScheduleDetailRequestBody);

        if (secondScheduleDetailResponse.status == 'success') {
            secondScheduleDetail = secondScheduleDetailResponse.data?.details as SecondSchedule;

            secondScheduleDetailsForm.data = secondScheduleDetail;
        }
    }

    // ===============
    // Eligibility
    // ===============

    let eligibilityDetail: Eligibility | null = null;

    if (currentApplicationId !== 0) {
        let eligibilityDetailRequestBody: loanIdRequestDTO = {
            id: currentApplicationId
        }

        const eligibilityDetailResponse: CommonResponseDTO =
            await LoanServices.getEligibilityDetails
                (eligibilityDetailRequestBody);

        if (eligibilityDetailResponse.status == 'success') {
            eligibilityDetail = eligibilityDetailResponse.data?.details as Eligibility;

            eligibilityDetailsForm.data = eligibilityDetail;
        }
    }

    // ===============
    // Document Check
    // ===============

    let documentCheckDetail: DocumentCheck | null = null;

    if (currentApplicationId !== 0) {
        let documentCheckDetailRequestBody: loanIdRequestDTO = {
            id: currentApplicationId
        }

        const documentCheckDetailResponse: CommonResponseDTO =
            await LoanServices.getDocumentCheckDetails
                (documentCheckDetailRequestBody);

        if (documentCheckDetailResponse.status == 'success') {
            documentCheckDetail = documentCheckDetailResponse.data?.details as DocumentCheck;

            documentCheckDetailsForm.data = documentCheckDetail;
        }
    }

    // ===============
    // Approver
    // ===============

    let approverDetail: Approver | null = null;

    if (currentApplicationId !== 0) {
        let approverDetailRequestBody: loanIdRequestDTO = {
            id: currentApplicationId
        }

        const approverDetailResponse: CommonResponseDTO =
            await LoanServices.getApproverDetails
                (approverDetailRequestBody);

        if (approverDetailResponse.status == 'success') {
            approverDetail = approverDetailResponse.data?.details as Approver;

            approverDetailsForm.data = approverDetail;
        }
    }

    // ===============
    // Support Approval
    // ===============

    let supportApprovalDetail: SupportApprover | null = null;

    if (currentApplicationId !== 0) {
        let supportApprovalDetailRequestBody: loanIdRequestDTO = {
            id: currentApplicationId
        }

        const supportApprovalDetailResponse: CommonResponseDTO =
            await LoanServices.getSupporterApprovalDetails
                (supportApprovalDetailRequestBody);

        if (supportApprovalDetailResponse.status == 'success') {
            supportApprovalDetail = supportApprovalDetailResponse.data?.details as SupportApprover;

            supporterApprovalDetailsForm.data = supportApprovalDetail;
        }
    }

    // ===============
    // Support Approval
    // ===============

    let approverApprovalDetail: ApproverApproval | null = null;

    if (currentApplicationId !== 0) {
        let approverApprovalDetailRequestBody: loanIdRequestDTO = {
            id: currentApplicationId
        }

        const approverApprovalDetailResponse: CommonResponseDTO =
            await LoanServices.getApproverApprovalDetails
                (approverApprovalDetailRequestBody);

        if (approverApprovalDetailResponse.status == 'success') {
            approverApprovalDetail = approverApprovalDetailResponse.data?.details as ApproverApproval;

            approverApprovalDetailsForm.data = approverApprovalDetail;
        }
    }

    // ===============
    // Supplier
    // ===============

    let supplierDetail: Supplier | null = null;

    if (currentApplicationId !== 0) {
        let supllierDetailRequestBody: loanIdRequestDTO = {
            id: currentApplicationId
        }

        const supllierDetailResponse: CommonResponseDTO =
            await LoanServices.getSupplierDetails
                (supllierDetailRequestBody);

        if (supllierDetailResponse.status == 'success') {
            supplierDetail = supllierDetailResponse.data?.details as Supplier;

            supplierDetailsForm.data = supplierDetail

        }
    }

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
        case UserRoleConstant.urusSetiaPentadbiran.code:
            userMode = "urusetia";
            break;

        default:
            break;
    }

    return {
        props: {
            currentApplicationId,
            userMode,

            supplierDetail,
            loanDetail,
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
            supplierDetailsForm,

        },
        supporterApproverLookup,
        positionLookup,
        serviceGroupLookup,
        gradeLookup,
        schemeLookup,
        
    }
}

// ========================================================================================
// =========================== add ========================================================
// ========================================================================================

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

export const _supplierSubmit = async (formData: object) => {
    const supplierForm = await superValidate(formData, (zod)(_supplier));

    if (supplierForm.valid) {
        const response: CommonResponseDTO =
            await LoanServices.supplierDetail(supplierForm.data as Supplier);
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
    const url = "http://localhost:3333/loan/agreement_letter/computer_form"
    
    return url
}

export const _applyLoan = async () => {
    
    let selectedType: addLoan = {
        loanType: 'komputer-dan-telefon-pintar',
    }
   
    const response: CommonResponseDTO =
        await LoanServices.addLoan(selectedType);
 
    if (response.status == "success") {

        return { response }
    } else {
        new Error('Failed to create new application.')
    }
}