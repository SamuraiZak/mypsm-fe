import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import type { DocumentBase64RequestDTO } from "$lib/dto/core/common/base-64-document-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto";
import type { InterimApplicationDetailDTO, InterimDocument, InterimSkipping, InterimSupport } from "$lib/dto/mypsm/employment/tanggung-kerja/interim-application-detail-response.dto";
import type { InterimCommonApproval } from "$lib/dto/mypsm/employment/tanggung-kerja/interim-common-approval.dto.js";
import type { EmployeeInterimApplicationDetailRequestDTO } from "$lib/dto/mypsm/employment/tanggung-kerja/interim-employee-application-detail-request.dto";
import { _addInterimApprovalSchema, _addNewInterimApplicationSchema } from "$lib/schemas/mypsm/employment/tanggung-kerja/interim-schemas";
import { LookupServices } from "$lib/services/implementation/core/lookup/lookup.service";
import { EmploymentInterimServices } from "$lib/services/implementation/mypsm/perjawatan/employment-interim.service";
import { zod } from "sveltekit-superforms/adapters";
import { superValidate } from "sveltekit-superforms/client";

export const load = async ({ params }) => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    let employeeInterimApplicationDetailResponse: CommonResponseDTO = {}
    let lookup = await getLookup();
    let interimApplicationDetail = {} as InterimApplicationDetailDTO;

    //Employee POV: Get detail for tanggung kerja application
    const interimId: EmployeeInterimApplicationDetailRequestDTO = {
        interimId: Number(params.id)
    }

    employeeInterimApplicationDetailResponse =
        await EmploymentInterimServices.getInterimApplicationDetail(interimId)
    interimApplicationDetail =
        employeeInterimApplicationDetailResponse.data?.details as InterimApplicationDetailDTO;

    const skippingDetail: InterimSkipping = interimApplicationDetail.skipping;
    const directorApproval: InterimSupport = interimApplicationDetail.support;

    const skippingForm = await superValidate(skippingDetail,zod(_addInterimApprovalSchema), {errors: false});
    const directorForm = await superValidate(zod(_addInterimApprovalSchema), {errors: false});

    return {
        currentRoleCode,
        interimId,
        lookup,
        interimApplicationDetail,
        skippingForm,
        directorForm,
    }
}

export const _submitInterimDocument = async (formData: string) => {
    const response: CommonResponseDTO =
        await EmploymentInterimServices.addInterimUploadDocument(formData)

    return { response }
}

export const _submitSkippingForm = async (formData: InterimCommonApproval) => {
    const form = await superValidate(formData, zod(_addInterimApprovalSchema))

    if(form.valid){
        const response: CommonResponseDTO =
            await EmploymentInterimServices.addInterimSkipping(form.data as InterimCommonApproval)

        return { response }
    }
}
export const _submitDirectorForm = async (formData: InterimCommonApproval) => {
    const form = await superValidate(formData, zod(_addInterimApprovalSchema))

    if(form.valid){
        const response: CommonResponseDTO =
            await EmploymentInterimServices.addInterimDirectorApproval(form.data as InterimCommonApproval)

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
    // =======================================================
    // Dropdown Lookup =======================================
    // =======================================================
    const gradeLookupResponse: CommonResponseDTO =
        await LookupServices.getServiceGradeEnums();

    const gradeLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(gradeLookupResponse);
    // -------------------------------------------------------
    const placementLookupResponse: CommonResponseDTO =
        await LookupServices.getPlacementEnums();

    const placementLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(placementLookupResponse)
    // -------------------------------------------------------
    const positionLookupResponse: CommonResponseDTO =
        await LookupServices.getPositionEnums();

    const positionLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(positionLookupResponse)
    // -------------------------------------------------------
    const departmentLookupResponse: CommonResponseDTO =
        await LookupServices.getDepartmentEnums();

    const departmentLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(departmentLookupResponse)
    // -------------------------------------------------------

    return {

        gradeLookup,
        placementLookup,
        positionLookup,
        departmentLookup,

    }
}