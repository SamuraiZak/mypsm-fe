import { AllowanceTypeConstant } from '$lib/constants/core/allowance-type.constant.js';
import { CommonResponseConstant } from '$lib/constants/core/common-response.constant.js';
import { PageSlugModeConstant } from '$lib/constants/core/system/page-slug.constant.js';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
import type {
    AllowanceAplicationDetailDTO,
    AllowanceTypeDTO,
} from '$lib/dto/mypsm/allowance/allowance.dto.js';
import { LookupHelper } from '$lib/helpers/core/lookup.helper';
import { ServiceAllowanceHelpers } from '$lib/helpers/v2/mypsm/service-allowance/service-allowance.helper.js';
import {
    AllowanceCeremonyClothingSchema,
    AllowanceDirectorAssignSchema,
    AllowanceEndorsementSchema,
    AllowanceEndorserDetailSchema,
    type AllowanceCeremonyClothingDetailType,
    type DocumentType,
} from '$lib/schemas/mypsm/allowance/allowance.schema.js';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { ServiceAllowanceServices } from '$lib/services/v2/service-allowance/service-allowance.service.js';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({ params, parent }) {
    const { layoutData } = await parent();

    const currentRoleCode: string = layoutData.accountDetails.currentRoleCode;

    // set default application id
    let currentApplicationId: number = parseInt(params.id);

    // set default allowance type
    let currentAllowanceType: AllowanceTypeDTO =
        AllowanceTypeConstant.list.find(
            (item) => item.description === params.type,
        ) ?? AllowanceTypeConstant.ceremonyClothing;

    // set default application detail
    let currentApplicationDetail: AllowanceAplicationDetailDTO = {
        applicationDetail: null,
        directorSupport: null,
        verification: null,
        supportApprover: null,
        support: null,
        approval: null,
    };

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

    // get endorsement option
    let allowanceEndorsementOption: DropdownDTO[] = [
        {
            value: true,
            name: 'Ya',
        },
        {
            value: false,
            name: 'Tidak',
        },
    ];

    // create detail form for each allowance type
    // =================================================
    // details forms starts here
    // =================================================
    // ceremony clothing
    const ceremonyClothingForm = await superValidate(
        zod(AllowanceCeremonyClothingSchema),
    );

    // =================================================
    // endorsement forms starts here
    // =================================================
    // employee confirmation form
    const employeeConfirmationForm = await superValidate(
        zod(AllowanceEndorsementSchema),
    );

    // secretary verification form
    const secretaryVerificationForm = await superValidate(
        zod(AllowanceEndorsementSchema),
    );

    // secretary director assign form
    const assignDirectorForm = await superValidate(
        zod(AllowanceDirectorAssignSchema),
    );

    // secretary verification form
    const directorFeedbackForm = await superValidate(
        zod(AllowanceEndorsementSchema),
    );

    // assign endorser form
    const assignEndorserForm = await superValidate(
        zod(AllowanceEndorserDetailSchema),
    );

    // supporter feedback form
    const supporterFeedbackForm = await superValidate(
        zod(AllowanceEndorsementSchema),
    );

    // approver feedback form
    const approverFeedbackForm = await superValidate(
        zod(AllowanceEndorsementSchema),
    );

    // return
    return {
        props: {
            currentRoleCode,
            currentApplicationId,
            currentAllowanceType,
            currentApplicationDetail,
            allowanceTypeOption,
            allowanceEndorsementOption,
        },
        forms: {
            ceremonyClothingForm,
            employeeConfirmationForm,
            secretaryVerificationForm,
            assignDirectorForm,
            directorFeedbackForm,
            assignEndorserForm,
            supporterFeedbackForm,
            approverFeedbackForm,
        },
    };
}

export async function _ceremonyClothingFormSubmit(
    fileList: FileList,
    formData: AllowanceCeremonyClothingDetailType,
) {
    let documents: DocumentType[] =
        await ServiceAllowanceHelpers.fileListToBase64String(fileList);

    formData.documents = documents ?? [];

    let form = await superValidate(
        formData,
        zod(AllowanceCeremonyClothingSchema),
    );

    if (form.valid) {
        const response: CommonResponseDTO =
            await ServiceAllowanceServices.ceremonyClothingDetailsSubmit(
                formData,
            );

        if (response.status == 'success') {
            return response;
        } else {
            return CommonResponseConstant.httpError;
        }
    } else {
        return CommonResponseConstant.httpError;
    }
}
