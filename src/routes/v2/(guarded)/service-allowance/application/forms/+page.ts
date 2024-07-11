import { AllowanceTypeConstant } from '$lib/constants/core/allowance-type.constant';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
import type { AllowanceTypeDTO } from '$lib/dto/mypsm/allowance/allowance.dto';
import type { AllowanceCeremonyClothingRequestDTO } from '$lib/dto/mypsm/v2/service-allowance/service-allowance.dto';
import { LookupHelper } from '$lib/helpers/core/lookup.helper';
import { ServiceAllowanceHelpers } from '$lib/helpers/v2/mypsm/service-allowance/service-allowance.helper';
import { AllowanceCeremonyClothingRequestSchema } from '$lib/schemas/v2/mypsm/service-allowance/service-allowance.schema';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { ServiceAllowanceServices } from '$lib/services/v2/service-allowance/service-allowance.service';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load() {
    // set default allowance type
    let currentAllowanceType: AllowanceTypeDTO =
        AllowanceTypeConstant.ceremonyClothing;

    // get allowance type lookup
    // set default allowance dropdown
    let allowanceTypeOption: DropdownDTO[] = [];

    // fetch allowance type
    const allowanceTypeResponse: CommonResponseDTO =
        await LookupServices.getAllowanceTypeEnums();

    if (allowanceTypeResponse.status == 'success') {
        const allowanceTypeLookup: LookupDTO[] = allowanceTypeResponse.data
            ?.dataList as LookupDTO[];

        allowanceTypeOption =
            LookupHelper.toDropdownProper(allowanceTypeLookup);
    }

    const ceremonyClothingForm = await superValidate(
        zod(AllowanceCeremonyClothingRequestSchema),
    );

    // handle data
    // set allowanceTypeCode for each detail form
    ceremonyClothingForm.data.allowanceTypeCode =
        AllowanceTypeConstant.ceremonyClothing.code;

    return {
        props: {
            currentAllowanceType,
            allowanceTypeOption,
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
    ServiceAllowanceHelpers.formToJSON(formData, files).then(async (output) => {
        const response: CommonResponseDTO =
            await ServiceAllowanceServices.addCeremonyClothingDetail(output);

        if (response.status == 'success') {
            alert('success');
        }
    });
}
