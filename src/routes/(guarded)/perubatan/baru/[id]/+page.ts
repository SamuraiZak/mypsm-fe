import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant"
import { UserRoleConstant } from "$lib/constants/core/user-role.constant"
import type { DocumentBase64RequestDTO } from "$lib/dto/core/common/base-64-document-request.dto"
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto"
import type { commonIdRequestDTO } from "$lib/dto/core/common/id-request.dto"
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto"
import type { MedicalClaimsAdd } from "$lib/dto/mypsm/perubatan/medical-claim-add.dto.js"
import type { MedicalEmployeeDetail } from "$lib/dto/mypsm/perubatan/medical-employee-detail.dto"
import type { QuartersGetDocument } from "$lib/dto/mypsm/pinjaman/kuarters/application-get-document.dto.js"
import { _addEmployeeClaimsSchema } from "$lib/schemas/mypsm/medical/medical-schema"
import { LookupServices } from "$lib/services/implementation/core/lookup/lookup.service"
import { MedicalServices } from "$lib/services/implementation/mypsm/perubatan/medical.service"
import { superValidate } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"

export const load = async ({ params }) => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    const lookup = await getLookup();
    let employeeId: commonIdRequestDTO = {
        id: Number(params.id)
    }
    let employeeDetail = {} as MedicalEmployeeDetail;
    let uploadedDocument: QuartersGetDocument = {
        id: Number(params.id),
        document: [],
    };

    const employeeDetailResponse: CommonResponseDTO =
        await MedicalServices.getMedicalEmployeeDetail(employeeId)
    employeeDetail =
        employeeDetailResponse.data?.details as MedicalEmployeeDetail;
    

    const addClaimsForm = await superValidate(zod(_addEmployeeClaimsSchema))

    return {
        currentRoleCode,
        employeeDetail,
        addClaimsForm,
        lookup,
        uploadedDocument,
    }
}

export const _submitAddClaimsForm = async (formData: MedicalClaimsAdd) => {
    const form = await superValidate(formData, zod(_addEmployeeClaimsSchema));

    if (form.valid) {
        const response: CommonResponseDTO =
            await MedicalServices.addMedicalEmployeeClaims(form.data as MedicalClaimsAdd)

        return { response }
    }
}

export const _submitEmployeeClaimDocument = async (formData: string) => {
    const response: CommonResponseDTO =
        await MedicalServices.addEmployeeClaimDocument(formData)

    return { response }
}

export const _getUploadedDocument = async (getId: number) => {
    let currentId: commonIdRequestDTO = {
        id: getId,
    }
    const response: CommonResponseDTO =
        await MedicalServices.getEmployeeClaimDocument(currentId)

        return { response }
}

const getLookup = async () => {
    const clinicLookupResponse: CommonResponseDTO =
        await LookupServices.getClinicPanelList();

    const clinicLookup: DropdownDTO[] =
        LookupServices.setClinicOptions(clinicLookupResponse);

    return { clinicLookup }
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