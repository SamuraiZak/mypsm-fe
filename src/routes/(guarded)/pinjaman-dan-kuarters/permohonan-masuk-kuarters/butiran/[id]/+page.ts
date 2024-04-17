import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant"
import { UserRoleConstant } from "$lib/constants/core/user-role.constant"
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto"
import type { RadioDTO } from "$lib/dto/core/radio/radio.dto"
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto"
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto"
import { LookupServices } from "$lib/services/implementation/core/lookup/lookup.service"
import type { commonIdRequestDTO } from "$lib/dto/core/common/id-request.dto"
import type { QuartersPersonalDetail } from "$lib/dto/mypsm/pinjaman/kuarters/application-personal-detail.dto"
import { QuartersServices } from "$lib/services/implementation/mypsm/pinjaman-kuarters/quarters.service"
import type { QuartersServiceDetail } from "$lib/dto/mypsm/pinjaman/kuarters/application-service-detail.dto"
import type { QuartersPartnerDetail } from "$lib/dto/mypsm/pinjaman/kuarters/application-partner-detail.dto"
import { superValidate } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"
import { _addConfirmationSchema, _addQuarterDetails, _quarterCommonApproval } from "$lib/schemas/mypsm/quarters/quarters-schema"
import type { QuartersAddConfirmation } from "$lib/dto/mypsm/pinjaman/kuarters/application-confirmation.dto"
import type { DocumentBase64RequestDTO } from "$lib/dto/core/common/base-64-document-request.dto"
import type { QuartersGetDocument } from "$lib/dto/mypsm/pinjaman/kuarters/application-get-document.dto"
import type { QuarterCommonApproval } from "$lib/dto/mypsm/pinjaman/kuarters/quarter-common-approval.dto.js"
import type { QuarterDetails } from "$lib/dto/mypsm/pinjaman/kuarters/quarter-details.dto.js"

export const load = async ({ params }) => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    const lookup = await getLookup();
    let currentId: commonIdRequestDTO = {
        id: Number(params.id)
    }
    let personalDetail = {} as QuartersPersonalDetail;
    let serviceDetail = {} as QuartersServiceDetail;
    let partnerDetail = {} as QuartersPartnerDetail;
    let confirmationStatus = {} as QuartersAddConfirmation;
    let quarterDocuments = {} as QuartersGetDocument;
    let secretaryApproval = {} as QuarterCommonApproval;
    let quarterDetails = {} as QuarterDetails;
    let directorApproval = {} as QuarterCommonApproval;

    const personalDetailResponse: CommonResponseDTO =
        await QuartersServices.getApplicationPersonalDetail(currentId);
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
        await QuartersServices.getApplicationConfirmationDetail(currentId);
    confirmationStatus =
        confirmationStatusResponse.data?.details as QuartersAddConfirmation;
    const quarterDocumentsResponse: CommonResponseDTO =
        await QuartersServices.getApplicationDocuments(currentId);
    quarterDocuments =
        quarterDocumentsResponse.data?.details as QuartersGetDocument;
    const secretaryApprovalResponse: CommonResponseDTO =
        await QuartersServices.getApplicationSecretaryApproval(currentId);
    secretaryApproval =
        secretaryApprovalResponse.data?.details as QuarterCommonApproval;
    const quarterDetailsResponse: CommonResponseDTO =
        await QuartersServices.getApplicationQuarterDetails(currentId);
    quarterDetails =
        quarterDetailsResponse.data?.details as QuarterDetails;
    const directorApprovalResponse: CommonResponseDTO =
        await QuartersServices.getApplicationDirectorApproval(currentId);
    directorApproval =
        directorApprovalResponse.data?.details as QuarterCommonApproval;

    const confirmationForm = await superValidate(confirmationStatus, zod(_addConfirmationSchema));
    const secretaryApprovalForm = await superValidate(secretaryApproval, zod(_quarterCommonApproval));
    const quarterDetailForm = await superValidate(quarterDetails, zod(_addQuarterDetails));
    const directorApprovalForm = await superValidate(directorApproval, zod(_quarterCommonApproval));


    return {
        currentRoleCode,
        lookup,
        currentId,
        personalDetail,
        serviceDetail,
        partnerDetail,
        confirmationForm,
        quarterDocuments,
        secretaryApprovalForm,
        secretaryApproval,
        quarterDetailForm,
        quarterDetails,
        directorApprovalForm,
        directorApproval,
    }
}

export const _submitConfirmationForm = async (formData: QuartersAddConfirmation) => {
    const form = await superValidate(formData, zod(_addConfirmationSchema));

    if (form.valid) {
        const response: CommonResponseDTO =
            await QuartersServices.addApplicationConfirmation(form.data as QuartersAddConfirmation)

        return { response }
    }
}

export const _submitQuartersDocument = async (formData: string) => {
    const response: CommonResponseDTO =
        await QuartersServices.addUploadDocument(formData)

    return { response }
}

export const _submitSecretaryApprovalForm = async (formData: QuarterCommonApproval) => {
    const form = await superValidate(formData, zod(_quarterCommonApproval));

    if (form.valid) {
        const response: CommonResponseDTO =
            await QuartersServices.addApplicationSecretaryApproval(form.data as QuarterCommonApproval)

        return { response }
    }
}
export const _submitQuarterDetailsForm = async (formData: QuarterDetails) => {
    const form = await superValidate(formData, zod(_addQuarterDetails));

    if (form.valid) {
        const { email, renRate, deposit, billDeposit, ...tempObj } = form.data
        const response: CommonResponseDTO =
            await QuartersServices.addApplicationQuarterDetails(tempObj as QuarterDetails)

        return { response }
    }
}
export const _submitDirectorApprovalForm = async (formData: QuarterCommonApproval) => {
    const form = await superValidate(formData, zod(_quarterCommonApproval));

    if (form.valid) {
        const response: CommonResponseDTO =
            await QuartersServices.addApplicationDirectorApproval(form.data as QuarterCommonApproval)

        return { response }
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