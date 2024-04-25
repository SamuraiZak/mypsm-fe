import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant"
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto"
import type { RadioDTO } from "$lib/dto/core/radio/radio.dto"
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto"
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto"
import { LookupServices } from "$lib/services/implementation/core/lookup/lookup.service"
import type { commonIdRequestDTO } from "$lib/dto/core/common/id-request.dto"
import type { QuartersEligibilityDetail, QuartersPersonalDetail } from "$lib/dto/mypsm/pinjaman/kuarters/application-personal-detail.dto"
import { QuartersServices } from "$lib/services/implementation/mypsm/pinjaman-kuarters/quarters.service"
import type { OutsiderServiceDetail, QuartersServiceDetail } from "$lib/dto/mypsm/pinjaman/kuarters/application-service-detail.dto"
import type { OutsiderFamily, QuartersPartnerDetail } from "$lib/dto/mypsm/pinjaman/kuarters/application-partner-detail.dto"
import { superValidate } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"
import { _addConfirmationSchema, _addQuarterDetails, _outsiderApplication, _outsiderFamily, _outsiderService, _quarterCommonApproval, _quarterSecretaryApproval, _quartersPayment } from "$lib/schemas/mypsm/quarters/quarters-schema"
import type { QuartersAddConfirmation } from "$lib/dto/mypsm/pinjaman/kuarters/application-confirmation.dto"
import type { DocumentBase64RequestDTO } from "$lib/dto/core/common/base-64-document-request.dto"
import type { QuartersGetDocument } from "$lib/dto/mypsm/pinjaman/kuarters/application-get-document.dto"
import type { QuarterCommonApproval, QuarterSecretaryApproval } from "$lib/dto/mypsm/pinjaman/kuarters/quarter-common-approval.dto"
import type { QuarterDetails, QuarterPayment } from "$lib/dto/mypsm/pinjaman/kuarters/quarter-details.dto"
import type { OutsiderId } from "$lib/dto/mypsm/pinjaman/kuarters/outsider-id.dto"
import { goto } from "$app/navigation"
import { UserRoleConstant } from "$lib/constants/core/user-role.constant.js"

export const load = async ({ params }) => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    const lookup = await getLookup();
    let currentId: commonIdRequestDTO = {
        id: Number(params.id)
    }
    let applicationType: string = params.type; //luar

    let personalDetail = {} as QuartersPersonalDetail;
    let serviceDetail = {} as QuartersServiceDetail;
    let partnerDetail = {} as QuartersPartnerDetail;
    let confirmationStatus = {} as QuartersAddConfirmation;
    let quarterDocuments: QuartersGetDocument = {
        id: 0,
        document: [],
    };
    let secretaryApproval = {} as QuarterSecretaryApproval;
    let quarterDetails = {} as QuarterDetails;
    let directorApproval = {} as QuarterCommonApproval;
    let paymentDetail = {} as QuarterPayment;
    let eligibilityDetail = {} as QuartersEligibilityDetail;
    let isFirstApplication: boolean = false;
    //employee
    const confirmationForm = await superValidate(zod(_addConfirmationSchema), { errors: false });
    const secretaryApprovalForm = await superValidate(zod(_quarterSecretaryApproval), { errors: false });
    const directorApprovalForm = await superValidate(zod(_quarterCommonApproval), { errors: false });
    const quarterDetailForm = await superValidate(zod(_addQuarterDetails), { errors: false });
    const quarterPaymentForm = await superValidate(zod(_quartersPayment), { errors: false });
    //outsider
    const personalDetailForm = await superValidate(zod(_outsiderApplication));
    const outsiderFamily = await superValidate(zod(_outsiderFamily));
    const outsiderServiceForm = await superValidate(zod(_outsiderService));

    if (params.id !== "baru" && applicationType == "kakitangan") {
        const personalDetailResponse: CommonResponseDTO =
            await QuartersServices.getApplicationPersonalDetail(currentId);
        personalDetail =
            personalDetailResponse.data?.details as QuartersPersonalDetail;
        if (personalDetailResponse.status == "success") {
            personalDetailForm.data = personalDetail
        }
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
        if (confirmationStatusResponse.status == "success") {
            confirmationForm.data = confirmationStatus;
        }
        const quarterDocumentsResponse: CommonResponseDTO =
            await QuartersServices.getApplicationDocuments(currentId);
        if (quarterDocumentsResponse.data?.details.document !== null) {
            quarterDocuments =
                quarterDocumentsResponse.data?.details as QuartersGetDocument;
        }

        const secretaryApprovalResponse: CommonResponseDTO =
            await QuartersServices.getApplicationSecretaryApproval(currentId);
        secretaryApproval =
            secretaryApprovalResponse.data?.details as QuarterSecretaryApproval;
        if (secretaryApprovalResponse.status == "success") {
            secretaryApprovalForm.data = secretaryApproval
        }
        const quarterDetailsResponse: CommonResponseDTO =
            await QuartersServices.getApplicationQuarterDetails(currentId);
        quarterDetails =
            quarterDetailsResponse.data?.details as QuarterDetails;
        if (quarterDetailsResponse.status == "success") {
            quarterDetailForm.data = quarterDetails;
        }
        const directorApprovalResponse: CommonResponseDTO =
            await QuartersServices.getApplicationDirectorApproval(currentId);
        directorApproval =
            directorApprovalResponse.data?.details as QuarterCommonApproval;
        if (directorApprovalResponse.status == "success") {
            directorApprovalForm.data = directorApproval;
        }
        const eligibilityDetailResponse: CommonResponseDTO =
            await QuartersServices.getEligibility(currentId);
        eligibilityDetail =
            eligibilityDetailResponse.data?.details as QuartersEligibilityDetail;
        const paymentDetailResponse: CommonResponseDTO =
            await QuartersServices.getQuarterPayment(currentId);
        paymentDetail =
            paymentDetailResponse.data?.details as QuarterPayment;
        if (paymentDetailResponse.status == "success") {
            quarterPaymentForm.data = paymentDetail;
        }

    } else if (params.id !== "baru" && applicationType == "luar") {
        const personalDetailResponse: CommonResponseDTO =
            await QuartersServices.getOutsiderPersonalDetail(currentId);
        personalDetail =
            personalDetailResponse.data?.details as QuartersPersonalDetail;
        if (personalDetailResponse.status == "success") {
            personalDetailForm.data = personalDetail;
        }
        const outsiderPartnerResponse: CommonResponseDTO =
            await QuartersServices.getOutsiderPartnerDetail(currentId);
        outsiderFamily.data = outsiderPartnerResponse.data?.details as OutsiderFamily
        const outsiderServiceResponse: CommonResponseDTO =
            await QuartersServices.getOutsiderServiceDetail(currentId);
        outsiderServiceForm.data = outsiderServiceResponse.data?.details as OutsiderServiceDetail;
        const quarterDocumentsResponse: CommonResponseDTO =
            await QuartersServices.getApplicationDocuments(currentId);
        if (quarterDocumentsResponse.data?.details.document !== null) {
            quarterDocuments =
                quarterDocumentsResponse.data?.details as QuartersGetDocument;
        }

        const secretaryApprovalResponse: CommonResponseDTO =
            await QuartersServices.getApplicationSecretaryApproval(currentId);
        secretaryApproval =
            secretaryApprovalResponse.data?.details as QuarterSecretaryApproval;
        if (secretaryApprovalResponse.status == "success") {
            secretaryApprovalForm.data = secretaryApproval;
        }
        const quarterDetailsResponse: CommonResponseDTO =
            await QuartersServices.getApplicationQuarterDetails(currentId);
        quarterDetails =
            quarterDetailsResponse.data?.details as QuarterDetails;
        if (quarterDetailsResponse.status == "success") {
            quarterDetailForm.data = quarterDetails;
        }
        const directorApprovalResponse: CommonResponseDTO =
            await QuartersServices.getApplicationDirectorApproval(currentId);
        directorApproval =
            directorApprovalResponse.data?.details as QuarterCommonApproval;
        if (directorApprovalResponse.status == "success") {
            directorApprovalForm.data = directorApproval;
        }
        const paymentDetailResponse: CommonResponseDTO =
            await QuartersServices.getQuarterPayment(currentId);
        paymentDetail =
            paymentDetailResponse.data?.details as QuarterPayment;
        if (paymentDetailResponse.status == "success") {
            quarterPaymentForm.data = paymentDetail;
        }

    } else if (params.id == "baru" && currentRoleCode == UserRoleConstant.kakitangan.code) {
        isFirstApplication = true;
        const response: CommonResponseDTO =
            await QuartersServices.getEmployeePersonalDetail()
        personalDetailForm.data = response.data?.details as QuartersPersonalDetail;
    }

    let quartersOfferLetter: string = getSuratTawaranKuarters();
    return {
        currentRoleCode,
        lookup,
        isFirstApplication,
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
        quartersOfferLetter,
        eligibilityDetail,
        applicationType,
        quarterPaymentForm,
        //outsider
        personalDetailForm,
        outsiderFamily,
        outsiderServiceForm,
    }
}


export const _applyQuarters = async () => {
    const response: CommonResponseDTO =
        await QuartersServices.addMovingInApplication();

    if (response.status == "success") {
        goto('/pinjaman-dan-kuarters/permohonan-masuk-kuarters/butiran/' + response.data?.details.id + '-kakitangan')
    } else {
        throw new Error('Failed to create new application.')
    }
}
export const _applyMoveoutQuarters = async (form: commonIdRequestDTO) => {
    const response: CommonResponseDTO =
        await QuartersServices.addMovingOutEmployee(form);

    if (response.status == "success") {
        setTimeout(() => goto(
            '/pinjaman-dan-kuarters/permohonan-keluar-kuarters'
        ), 1000)
    } else {
        throw new Error('Failed to create new application.')
    }
}
export const _applyMoveoutQuartersForOutsiders = async (form: commonIdRequestDTO) => {
    const response: CommonResponseDTO =
        await QuartersServices.addMovingOutForOutsider(form);

    if (response.status == "success") {
        setTimeout(() => goto(
            '/pinjaman-dan-kuarters/permohonan-keluar-kuarters'
        ), 1000)
    } else {
        throw new Error('Failed to create new application.')
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

export const _submitSecretaryApprovalForm = async (formData: QuarterSecretaryApproval) => {
    const form = await superValidate(formData, zod(_quarterSecretaryApproval));

    if (form.valid) {
        const response: CommonResponseDTO =
            await QuartersServices.addApplicationSecretaryApproval(form.data as QuarterSecretaryApproval)

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
export const _submitQuarterDetailsForm = async (formData: QuarterDetails) => {
    const form = await superValidate(formData, zod(_addQuarterDetails));

    if (form.valid) {
        const response: CommonResponseDTO =
            await QuartersServices.addApplicationQuarterDetails(form.data as QuarterDetails)

        return { response }
    }
}
export const _submitQuarterPayment = async (formData: QuarterPayment) => {
    const form = await superValidate(formData, zod(_quartersPayment));

    if (form.valid) {
        const response: CommonResponseDTO =
            await QuartersServices.addQuarterPayment(form.data as QuarterPayment)

        return { response }
    }
}


// ======================================== Outsider Registration
export const _submitOutsiderFamilyForm = async (formData: OutsiderFamily) => {
    const form = await superValidate(formData, zod(_outsiderFamily));
    if (form.valid) {
        const response: CommonResponseDTO =
            await QuartersServices.addOutsiderFamily(form.data as OutsiderFamily)

        return { response }
    }
}
export const _submitOutsiderServiceForm = async (formData: OutsiderServiceDetail, id: number) => {
    const form = await superValidate(formData, zod(_outsiderService));
    if (form.valid) {
        const response: CommonResponseDTO =
            await QuartersServices.addOutsiderService(form.data as OutsiderServiceDetail)

        if (response.status == "success") {
            let outsiderId: OutsiderId = {
                outsiderId: id,
            }
            const res = await registerOutsider(outsiderId);

            setTimeout(() => goto('/pinjaman-dan-kuarters/permohonan-masuk-kuarters/butiran/' + res.response.data?.details.id + "-" + "luar"), 1000)
        }

        return { response }
    }
}

const registerOutsider = async (formData: OutsiderId) => {
    const response: CommonResponseDTO =
        await QuartersServices.addOutsiderApplication(formData);

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

export function _submitOutsiderApplicationForm(formData: QuartersPersonalDetail): Promise<CommonResponseDTO> {
    return new Promise(async (resolve, reject) => {
        try {
            const form = await superValidate(formData, zod(_outsiderApplication))

            if (form.valid) {
                const response: CommonResponseDTO =
                    await QuartersServices.addOutsiderPersonalDetail(formData as QuartersPersonalDetail)
                if (response.status == "success") {
                    resolve(response)
                }
            }
        } catch (e) {
            reject(e)
        }

    })
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

const getSuratTawaranKuarters = () => {
    const url: string = "http://localhost:3333/quarter/moving_in/offer_letter"

    return url;
}