import { AllowanceTypeConstant } from '$lib/constants/core/allowance-type.constant';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DocumentDTO } from '$lib/dto/core/document/document.dto';
import type { AllowanceTypeDTO } from '$lib/dto/mypsm/allowance/allowance.dto';
import { ServiceAllowanceHelpers } from '$lib/helpers/v2/mypsm/service-allowance/service-allowance.helper';
import {
    AllowanceCeremonyClothingRequestSchema,
    type AllowanceCeremonyClothingRequestDTO,
} from '$lib/schemas/v2/mypsm/service-allowance/service-allowance.schema';
import { ServiceAllowanceServices } from '$lib/services/v2/service-allowance/service-allowance.service';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load() {
    const ceremonyClothingForm = await superValidate(
        zod(AllowanceCeremonyClothingRequestSchema),
    );

    ceremonyClothingForm.data.allowanceTypeCode =
        AllowanceTypeConstant.ceremonyClothing.code;
    ceremonyClothingForm.data.allowanceId = 0;

    let currentAllowanceType: AllowanceTypeDTO =
        AllowanceTypeConstant.ceremonyClothing;

    return {
        props: {
            currentAllowanceType,
        },
        forms: {
            ceremonyClothingForm,
        },
    };
}

export async function _ceremonyClothingFormSubmit(
    formData: AllowanceCeremonyClothingRequestDTO,
    files: FileList,
) {
    let documents: DocumentDTO[] =
        await ServiceAllowanceHelpers.fileListToBase64String(files);

    let form = await superValidate(
        formData,
        zod(AllowanceCeremonyClothingRequestSchema),
    );

    form.data.documents = documents;

    formData.documents = documents;

    if (form.valid) {
        const response: CommonResponseDTO =
            await ServiceAllowanceServices.ceremonyClothingDetailsSubmit(
                formData,
            );

        if (response.status == 'success') {
            alert('success');
        } else {
            alert('fail');
        }
    } else {
        alert('error');
    }
}
