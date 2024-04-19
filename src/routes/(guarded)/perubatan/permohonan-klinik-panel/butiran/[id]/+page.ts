import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import type { DocumentBase64RequestDTO } from "$lib/dto/core/common/base-64-document-request.dto";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { commonIdRequestDTO } from "$lib/dto/core/common/id-request.dto.js";
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto";
import type { ClinicCommonResult } from "$lib/dto/mypsm/perubatan/clinic-common-approval.dto";
import type { ClinicSetSupporterApprover } from "$lib/dto/mypsm/perubatan/clinic-common-supporter-approver.dto.js";
import type { MedicalClinicApplication } from "$lib/dto/mypsm/perubatan/permohonan-klinik/medical-clinic-application.dto";
import type { ClinicContract } from "$lib/dto/mypsm/perubatan/permohonan-klinik/medical-clinic-contract.dto";
import type { QuartersGetDocument } from "$lib/dto/mypsm/pinjaman/kuarters/application-get-document.dto.js";
import { _addClinicApplicationSchema, _addClinicContractSchema, _clinicCommonResultSchema, _clinicSupporterApproverSchema } from "$lib/schemas/mypsm/medical/medical-schema";
import { LookupServices } from "$lib/services/implementation/core/lookup/lookup.service";
import { MedicalServices } from "$lib/services/implementation/mypsm/perubatan/medical.service";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

export const load = async ({ params }) => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    const clinicId: commonIdRequestDTO = {
        id: Number(params.id)
    }
    const lookup = await getLookup();
    let clinicDetail = {} as MedicalClinicApplication;
    let clinicContract = {} as ClinicContract;
    let clinicSecretaryApproval = {} as ClinicCommonResult;
    let clinicSupporterAndApprover = {} as ClinicSetSupporterApprover;
    let clinicSupporterApproval = {} as ClinicCommonResult;
    let clinicApproverApproval = {} as ClinicCommonResult;
    let applicationDoc = {} as QuartersGetDocument;

    const clinicDetailResponse: CommonResponseDTO =
        await MedicalServices.getClinicApplicationDetail(clinicId);
    clinicDetail =
        clinicDetailResponse.data?.details as MedicalClinicApplication;

    const clinicContractForm = await superValidate(zod(_addClinicContractSchema), { errors: false });

    const clinicContractResponse: CommonResponseDTO =
        await MedicalServices.getClinicContractDetail(clinicId)
    clinicContract =
        clinicContractResponse.data?.details as ClinicContract;
        if(clinicContractResponse.status == "success"){
            clinicContractForm.data = clinicContract;   
        }

    const clinicSecretaryApprovalResponse: CommonResponseDTO =
        await MedicalServices.getClinicSecretaryApproval(clinicId)
    clinicSecretaryApproval =
        clinicSecretaryApprovalResponse.data?.details as ClinicCommonResult;

    const clinicSupporterAndApproverResponse: CommonResponseDTO =
        await MedicalServices.getClinicSupporterApprover(clinicId)
    clinicSupporterAndApprover =
        clinicSupporterAndApproverResponse.data?.details as ClinicSetSupporterApprover;

    const clinicSupporterApprovalResponse: CommonResponseDTO =
        await MedicalServices.getClinicSupporterApproval(clinicId);
    clinicSupporterApproval =
        clinicSupporterApprovalResponse.data?.details as ClinicCommonResult;

    const clinicApproverApprovalResponse: CommonResponseDTO =
        await MedicalServices.getClinicApproverApproval(clinicId);
    clinicApproverApproval =
        clinicApproverApprovalResponse.data?.details as ClinicCommonResult;

    const applicationDocResponse: CommonResponseDTO =
        await MedicalServices.getClinicApplicationDocument(clinicId)
    applicationDoc =
        applicationDocResponse.data?.details as QuartersGetDocument;


    //supervalidate
    const secretaryApprovalForm = await superValidate(clinicSecretaryApproval, zod(_clinicCommonResultSchema), { errors: false });
    const supporterApproverForm = await superValidate(clinicSupporterAndApprover, zod(_clinicSupporterApproverSchema), { errors: false });
    const supporterApprovalForm = await superValidate(clinicSupporterApproval, zod(_clinicCommonResultSchema), { errors: false });
    const approverApprovalForm = await superValidate(clinicApproverApproval, zod(_clinicCommonResultSchema), { errors: false });
    return {
        currentRoleCode,
        clinicId,
        lookup,
        clinicDetail,
        clinicContractForm,
        secretaryApprovalForm,
        supporterApproverForm,
        supporterApprovalForm,
        approverApprovalForm,
        clinicSupporterApproval,
        clinicApproverApproval,
        clinicSecretaryApproval,
        applicationDoc,
    }
}

export const _submitClinicContractForm = async (formData: ClinicContract) => {
    const form = await superValidate(formData, zod(_addClinicContractSchema))

    if (form.valid) {
        const response: CommonResponseDTO =
            await MedicalServices.addClinicContract(form.data as ClinicContract)

        if (response.status == "success") {
            return { response }
        }
    }
}

export const _uploadClinicApplicationForm = async (formData: string) => {
    const response: CommonResponseDTO =
        await MedicalServices.addClinicApplicationDocument(formData)
    return { response }
}

export const _submitSecretaryApprovalForm = async (formData: ClinicCommonResult) => {
    const form = await superValidate(formData, zod(_clinicCommonResultSchema))

    if (form.valid) {
        const response: CommonResponseDTO =
            await MedicalServices.addClinicSecretaryApproval(form.data as ClinicCommonResult)

        if (response.status == "success") {
            return { response }
        }
    }
}

export const _submitSupporterApproverForm = async (formData: ClinicSetSupporterApprover) => {
    const form = await superValidate(formData, zod(_clinicSupporterApproverSchema))

    if (form.valid) {
        const response: CommonResponseDTO =
            await MedicalServices.addClinicSupporterApprover(form.data as ClinicSetSupporterApprover)

        if (response.status == "success") {
            return { response }
        }
    }
}

export const _submitSupporterApprovalForm = async (formData: ClinicCommonResult) => {
    const form = await superValidate(formData, zod(_clinicCommonResultSchema))

    if (form.valid) {
        const response: CommonResponseDTO =
            await MedicalServices.addClinicSupporterApproval(form.data as ClinicCommonResult)

        if (response.status == "success") {
            return { response }
        }
    }
}

export const _submitApproverApprovalForm = async (formData: ClinicCommonResult) => {
    const form = await superValidate(formData, zod(_clinicCommonResultSchema))

    if (form.valid) {
        const response: CommonResponseDTO =
            await MedicalServices.addClinicApproverApproval(form.data as ClinicCommonResult)

        if (response.status == "success") {
            return { response }
        }
    }
}

// =======================================================
// Dropdown Lookup =======================================
// =======================================================
const getLookup = async () => {
    // -------------------------------------------------------
    const cityLookupResponse: CommonResponseDTO =
        await LookupServices.getCityEnums();

    const cityLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(cityLookupResponse);
    // -------------------------------------------------------
    const districtLookupResponse: CommonResponseDTO =
        await LookupServices.getDistrictEnums();

    const districtLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(districtLookupResponse);
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

    const supporterApproverLookup: DropdownDTO[] = LookupServices.setSelectOptionSupporterAndApproverBothAreName(
        supporterApproverResponse,
    );
    return {
        districtLookup,
        cityLookup,
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