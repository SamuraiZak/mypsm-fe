import type { DocumentBase64RequestDTO } from "$lib/dto/core/common/base-64-document-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { ClinicClaimDetail } from "$lib/dto/mypsm/perubatan/clinic-panel-claim-detail.dto";
import type { ClinicPanelProfile } from "$lib/dto/mypsm/perubatan/clinic-panel-profile.dto";
import { _clinicClaimDetailSchema } from "$lib/schemas/mypsm/medical/medical-schema";
import { MedicalServices } from "$lib/services/implementation/mypsm/perubatan/medical.service";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

export const load = async () => {
    let profile = {} as ClinicPanelProfile;

    const clinicPanelProfileResponse: CommonResponseDTO =
        await MedicalServices.getClinicPanelProfile()
    profile =
        clinicPanelProfileResponse.data?.details as ClinicPanelProfile;

    const claimDetailForm = await superValidate(zod(_clinicClaimDetailSchema))

    return {
        profile,
        claimDetailForm,
    }
}

export const _submitClaimDetailForm = async (formData: ClinicClaimDetail) => {
    const form = await superValidate(formData, zod(_clinicClaimDetailSchema))

    if(form.valid){
        const response: CommonResponseDTO =
            await MedicalServices.addClinicPanelClaimDetail(form.data as ClinicClaimDetail)

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