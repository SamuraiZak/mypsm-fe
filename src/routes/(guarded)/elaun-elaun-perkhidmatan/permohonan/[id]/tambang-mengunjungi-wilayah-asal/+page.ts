import { ApplyOnBehalfConstant } from '$lib/constants/core/apply-on-behalf.constant.js';
import { ServiceAllowanceTypeConstant } from '$lib/constants/core/service-allowance.constant.js';
import { StateConstant } from '$lib/constants/core/state.constant.js';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto.js';
import { LookupHelper } from '$lib/helpers/core/lookup.helper';
import { _addTambangMengunjungiWilayahAsalSchemaSchema } from '$lib/schemas/mypsm/service-allowance/service-allowance.schema';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

// on page load function
export async function load({ params }) {
    // ===================================================================
    // Variables
    // ===================================================================

    // get application id; new = baru
    const applicationId = params.id;

    // set default allowanceTypeCode
    let currentAllowanceType: string =
        ServiceAllowanceTypeConstant.tambangMengunjungiWilayahAsal.code;

    // fetch get allowance type lookup
    let allowanceTypeDropdown: DropdownDTO[] = [];

    const allowanceTypeResponse: CommonResponseDTO =
        await LookupServices.getAllowanceTypeEnums();

    if (allowanceTypeResponse.status == 'success') {
        const allowanceTypeLookup: LookupDTO[] = allowanceTypeResponse.data
            ?.dataList as LookupDTO[];

        allowanceTypeDropdown =
            LookupHelper.toDropdownDescriptionWithUrl(allowanceTypeLookup);
    }

    // get apply on behalf dropdown
    let applyOnBehalfDropdown: DropdownDTO[] = LookupHelper.toDropdownProper(
        ApplyOnBehalfConstant.list,
    );

    // get state dropdown
    let stateDropdown: DropdownDTO[] = [];

    let stateLookup: LookupDTO[] = [];

    const stateLookupResponse: CommonResponseDTO =
        await LookupServices.getStateEnums();

    if (stateLookupResponse.status == 'success') {
        stateLookup = stateLookupResponse.data?.dataList as LookupDTO[];

        stateDropdown = LookupHelper.toDropdownProper(
            stateLookup.filter((item) => item.countryCode === 'MYS'),
        );
    } else {
        stateLookup = StateConstant.list;

        stateDropdown = LookupHelper.toDropdownProper(stateLookup);
    }

    
    // ===================================================================
    // Create Application Detail Form
    // ===================================================================
    
    // create form
    const allowanceDetailForm = await superValidate(
        zod(_addTambangMengunjungiWilayahAsalSchemaSchema),
    );

    // ===================================================================
    // Create Document Detail Form
    // ===================================================================


    // ===================================================================
    // Create verification Form
    // ===================================================================


    // check if user is making new application or viewing aplpication details
    if (applicationId == 'baru') {
        // if new create form

        // set the form allowance type code to default
        allowanceDetailForm.data.allowanceTypeCode = currentAllowanceType;

        // set the form allowance apply on behalf
        allowanceDetailForm.data.applyCode = ApplyOnBehalfConstant.self.code;

        // set the form allowance stateCode to default
        allowanceDetailForm.data.stateCode = stateDropdown[0].value;
    } else {
        // if not new fetch the application details
    }

    // return necessary page data
    return {
        props: {
            applicationId,
            currentAllowanceType,
            allowanceTypeDropdown,
            applyOnBehalfDropdown,
            stateDropdown,
            allowanceDetailForm,
        },
    };
}

// submit add allowance detail
export const _submitAllowanceDetail = async (allowanceDetail: object) => {
    const form = await superValidate(
        allowanceDetail,
        zod(_addTambangMengunjungiWilayahAsalSchemaSchema),
    );
};
