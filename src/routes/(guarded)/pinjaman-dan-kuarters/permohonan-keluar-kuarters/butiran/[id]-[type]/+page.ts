import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant"
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto"
import type { RadioDTO } from "$lib/dto/core/radio/radio.dto"
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto"
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto"
import { LookupServices } from "$lib/services/implementation/core/lookup/lookup.service"
import type { commonIdRequestDTO } from "$lib/dto/core/common/id-request.dto"
import { QuartersServices } from "$lib/services/implementation/mypsm/pinjaman-kuarters/quarters.service"
import type { QuartersPersonalDetail } from "$lib/dto/mypsm/pinjaman/kuarters/application-personal-detail.dto"
import type { OutsiderServiceDetail, QuartersServiceDetail } from "$lib/dto/mypsm/pinjaman/kuarters/application-service-detail.dto"
import type { OutsiderFamily, QuartersPartnerDetail } from "$lib/dto/mypsm/pinjaman/kuarters/application-partner-detail.dto"
import type { QuarterDetails, QuarterPayment } from "$lib/dto/mypsm/pinjaman/kuarters/quarter-details.dto"
import { superValidate } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"
import { _addConfirmationSchema, _moveOutQuarter, _quarterCommonApproval, _quarterSecretaryApproval, _setDirector } from "$lib/schemas/mypsm/quarters/quarters-schema"
import type { MoveOutQuarters } from "$lib/dto/mypsm/pinjaman/kuarters/moving-out.dto"
import type { DocumentBase64RequestDTO } from "$lib/dto/core/common/base-64-document-request.dto"
import type { QuarterDocument, QuartersGetDocument } from "$lib/dto/mypsm/pinjaman/kuarters/application-get-document.dto"
import type { QuarterCommonApproval, QuarterSecretaryApproval } from "$lib/dto/mypsm/pinjaman/kuarters/quarter-common-approval.dto"
import type { QuartersAddConfirmation } from "$lib/dto/mypsm/pinjaman/kuarters/application-confirmation.dto"
import type { MovingOutSetDirector } from "$lib/dto/mypsm/pinjaman/kuarters/moving-out-set-director.dto"

export const load = async ({ params }) => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    const lookup = await getLookup();
    let currentId: commonIdRequestDTO = {
        id: Number(params.id)
    }
    let applicationType: string = params.type;
    let personalDetail = {} as QuartersPersonalDetail;
    let serviceDetail = {} as QuartersServiceDetail;
    let partnerDetail = {} as QuartersPartnerDetail;
    let confirmationStatus = {} as QuartersAddConfirmation;
    let quarterDocuments: QuartersGetDocument = {
        id: 0,
        document: [],
    };
    let outstandingDocument: QuartersGetDocument = {
        id: 0,
        document: [],
    }
    let secretaryApproval = {} as QuarterSecretaryApproval;
    let quarterDetails = {} as QuarterDetails;
    let movingOutDate = {} as MoveOutQuarters;
    let outsiderFamily = {} as OutsiderFamily;
    let outsiderService = {} as OutsiderServiceDetail;
    let paymentDetail = {} as QuarterPayment;
    let quartersDeclarationLetter: QuarterDocument = {
        name: "",
        document: "",
    };
    let quartersMovingOutCheckingLetter: QuarterDocument = {
        name: "",
        document: "",
    };;

    const setDirectorForm = await superValidate(zod(_setDirector));
    const directorApprovalForm = await superValidate(zod(_quarterCommonApproval), { errors: false });

    //moving out document
    const declarationLetter: CommonResponseDTO =
        await QuartersServices.getCertificateDocument(currentId);
    if (declarationLetter.status == 'success') {
        quartersDeclarationLetter =
            declarationLetter.data?.details as QuarterDocument;
    }
    const checkingDocument: CommonResponseDTO =
        await QuartersServices.getCheckingDocument();
    quartersMovingOutCheckingLetter =
        checkingDocument.data?.details as QuarterDocument;


    if (applicationType == "kakitangan") {
        const personalDetailResponse: CommonResponseDTO =
            await QuartersServices.getOutPersonalDetail(currentId);
        personalDetail =
            personalDetailResponse.data?.details as QuartersPersonalDetail;
        const serviceDetailResponse: CommonResponseDTO =
            await QuartersServices.getApplicationServiceDetail(currentId);
        serviceDetail =
            serviceDetailResponse.data?.details as QuartersServiceDetail;
        const partnerDetailResponse: CommonResponseDTO =
            await QuartersServices.getApplicationPartnerDetail(currentId);
        partnerDetail =
            partnerDetailResponse.data?.details as QuartersPartnerDetail;
        const confirmationStatusResponse: CommonResponseDTO =
            await QuartersServices.getMovingOutConfirmationDetail(currentId);
        confirmationStatus =
            confirmationStatusResponse.data?.details as QuartersAddConfirmation;
        const secretaryApprovalResponse: CommonResponseDTO =
            await QuartersServices.getMovingOutSecretaryApproval(currentId);
        secretaryApproval =
            secretaryApprovalResponse.data?.details as QuarterSecretaryApproval;
    } else if (applicationType == "luar") {
        const personalDetailResponse: CommonResponseDTO =
            await QuartersServices.getOutsiderPersonalDetail(currentId);
        personalDetail =
            personalDetailResponse.data?.details as QuartersPersonalDetail;
        const outsiderPartnerResponse: CommonResponseDTO =
            await QuartersServices.getOutsiderPartnerDetail(currentId);
        outsiderFamily = outsiderPartnerResponse.data?.details as OutsiderFamily
        const outsiderServiceResponse: CommonResponseDTO =
            await QuartersServices.getOutsiderServiceDetail(currentId);
        outsiderService = outsiderServiceResponse.data?.details as OutsiderServiceDetail;
        const secretaryApprovalResponse: CommonResponseDTO =
            await QuartersServices.getMovingOutSecretaryApproval(currentId);
        secretaryApproval =
            secretaryApprovalResponse.data?.details as QuarterSecretaryApproval;
        const outstandingDocumentResponse: CommonResponseDTO =
            await QuartersServices.getOutstandingDocuments(currentId);
        if (outstandingDocumentResponse.data?.details.document !== null) {
            outstandingDocument =
                outstandingDocumentResponse.data?.details as QuartersGetDocument;
        }
    }
    const movingOutDateResponse: CommonResponseDTO =
        await QuartersServices.getEmployeeMoveOut(currentId);
    movingOutDate =
        movingOutDateResponse.data?.details as MoveOutQuarters;
    const quarterDetailsResponse: CommonResponseDTO =
        await QuartersServices.getApplicationQuarterDetails(currentId);
    quarterDetails =
        quarterDetailsResponse.data?.details as QuarterDetails;
    const quarterDocumentsResponse: CommonResponseDTO =
        await QuartersServices.getMovingOutDocuments(currentId);
    if (quarterDocumentsResponse.data?.details.document !== null) {
        quarterDocuments =
            quarterDocumentsResponse.data?.details as QuartersGetDocument;
    }
    const getDirector: CommonResponseDTO =
        await QuartersServices.getMovingOutDirector(currentId);
    if (getDirector.status == "success") {
        setDirectorForm.data = getDirector.data?.details as MovingOutSetDirector
    }
    const paymentDetailResponse: CommonResponseDTO =
        await QuartersServices.getQuarterPayment(currentId);
    paymentDetail =
        paymentDetailResponse.data?.details as QuarterPayment;
    const directorApprovalResponse: CommonResponseDTO =
        await QuartersServices.getMovingOutDirectorApproval(currentId);
    if (directorApprovalResponse.status == "success") {
        directorApprovalForm.data = directorApprovalResponse.data?.details as QuarterCommonApproval;
    }

    const moveOutForm = await superValidate(movingOutDate, zod(_moveOutQuarter), { errors: false })
    const moveOutSecretaryForm = await superValidate(movingOutDate, zod(_moveOutQuarter), { errors: false })
    const confirmationForm = await superValidate(confirmationStatus, zod(_addConfirmationSchema), { errors: false });
    const secretaryApprovalForm = await superValidate(secretaryApproval, zod(_quarterSecretaryApproval), { errors: false });

    return {
        currentRoleCode,
        applicationType,
        currentId,
        lookup,
        movingOutDate,
        personalDetail,
        serviceDetail,
        partnerDetail,
        quarterDetails,
        moveOutForm,
        quartersDeclarationLetter,
        quartersMovingOutCheckingLetter,
        quarterDocuments,
        confirmationForm,
        secretaryApprovalForm,
        secretaryApproval,
        outsiderFamily,
        outsiderService,
        moveOutSecretaryForm,
        setDirectorForm,
        directorApprovalForm,
        paymentDetail,
        outstandingDocument,
        declarationLetter,
        checkingDocument,
    }
}

export const _submitMoveOutForm = async (formData: MoveOutQuarters) => {
    const form = await superValidate(formData, zod(_moveOutQuarter));
    if (form.valid) {
        const { quarterDetails, ...tempObj } = form.data;
        const response: CommonResponseDTO =
            await QuartersServices.addEmployeeMoveOut(tempObj as MoveOutQuarters)

        return { response }
    }
}

export const _submitOutstandingDocument = async (formData: string) => {
    const response: CommonResponseDTO =
        await QuartersServices.addOutstandingDocument(formData)

    return { response }
}

export const _submitMovingOutDocument = async (formData: string) => {
    const response: CommonResponseDTO =
        await QuartersServices.addMovingOutDocument(formData)

    return { response }
}

export const _submitConfirmationForm = async (formData: QuartersAddConfirmation) => {
    const form = await superValidate(formData, zod(_addConfirmationSchema));

    if (form.valid) {
        const response: CommonResponseDTO =
            await QuartersServices.addMovingOutConfirmation(form.data as QuartersAddConfirmation)

        return { response }
    }
}

export const _submitSecretaryApprovalForm = async (formData: QuarterSecretaryApproval) => {
    const form = await superValidate(formData, zod(_quarterSecretaryApproval));

    if (form.valid) {
        const response: CommonResponseDTO =
            await QuartersServices.addMovingOutSecretaryApproval(form.data as QuarterSecretaryApproval)

        return { response }
    }
}

export const _submitSetDirectorForm = async (formData: MovingOutSetDirector) => {
    const form = await superValidate(formData, zod(_setDirector));

    if (form.valid) {
        const response: CommonResponseDTO =
            await QuartersServices.addMovingOutDirector(form.data as MovingOutSetDirector)

        return { response }
    }
}

export const _submitDirectorApprovalForm = async (formData: QuarterCommonApproval) => {
    const form = await superValidate(formData, zod(_quarterCommonApproval));

    if (form.valid) {
        const response: CommonResponseDTO =
            await QuartersServices.addMovingOutDirectorApproval(form.data as QuarterCommonApproval)

        return { response }
    }
}


const getLookup = async () => {
    // -------------------------------------------------------
    const maritalLookupResponse: CommonResponseDTO =
        await LookupServices.getMaritalEnums();

    const maritalLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(maritalLookupResponse)
    // -------------------------------------------------------
    const applicantType: RadioDTO[] = [
        { name: "Kakitangan LKIM", value: 1 },
        { name: "Agensi/Jabatan Luar", value: 2 },
    ]
    // -------------------------------------------------------
    const servicesType: RadioDTO[] = [
        { name: "Persekutuan", value: 1 },
        { name: "Negeri", value: 2 },
    ]
    // -------------------------------------------------------
    const gradeLookupResponse: CommonResponseDTO =
        await LookupServices.getServiceGradeEnums();

    const gradeLookup: DropdownDTO[] = LookupServices.setSelectOptionsNameIsCode(
        gradeLookupResponse,
    );
    // -------------------------------------------------------
    const placementLookupResponse: CommonResponseDTO =
        await LookupServices.getPlacementEnums();

    const placementLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        placementLookupResponse,
    );
    // -------------------------------------------------------
    const positionLookupResponse: CommonResponseDTO =
        await LookupServices.getPositionEnums();

    const positionLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        positionLookupResponse,
    );
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

    return {
        applicantType,
        maritalLookup,
        servicesType,
        gradeLookup,
        placementLookup,
        positionLookup,
        supporterApproverLookup,
    }
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