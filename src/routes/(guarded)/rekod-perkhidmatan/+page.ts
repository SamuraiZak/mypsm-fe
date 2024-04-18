import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { academicResponseDTO } from '$lib/dto/mypsm/profile/academic-detail.dto';
import {
    _academicListResponseSchema,
} from '$lib/schemas/mypsm/profile/profile-schemas';
import { _serviceRecordPersonalDetailSchema } from '$lib/schemas/mypsm/service-record/service-record.schema';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { ServiceRecordServices } from '$lib/services/implementation/mypsm/buku-rekod-perkhidmatan/service-record.service';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async () => {
    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'integrityId',
        orderType: 1,
        filter: {
            identityCard: null, //string | null | undefined;
            grade: null,
            position: null,
            year: null,
            name: null,
            status: null, // status code from lookup | null | undefined;
        },
    };

    // proceeding - charge appeal list
    const personalDetailResponse: CommonResponseDTO =
        await ServiceRecordServices.getPersonalDetails();

    // get qualification list
    const qualificationListResponse =
        await ServiceRecordServices.getQualificationList();

    // get service statement list
    const serviceStatementListResponse =
        await ServiceRecordServices.getServiceStatementList(param);

    // get leave statemens list
    const leaveStatementListResponse =
        await ServiceRecordServices.getLeaveStatementList(param);

    // get behaviour histories list
    const behaviourHistoriesListResponse =
        await ServiceRecordServices.getBehaviourHistoriesList(param);

    // ============================================================
    // Supervalidated form initialization
    // ============================================================
    const personalDetailForm = await superValidate(
        personalDetailResponse.data?.details,
        zod(_serviceRecordPersonalDetailSchema),
        { errors: false },
    );

    const qualificationInfoForm = await superValidate(
        qualificationListResponse.data?.details as academicResponseDTO,
        zod(_academicListResponseSchema),
    );
    // ==========================================================================
    // Get Lookup Functions
    // ==========================================================================
    const statusLookupResponse: CommonResponseDTO =
        await LookupServices.getStatusEnums();

    const statusLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsInString(statusLookupResponse);

    // ===========================================================================

    const countryLookupResponse: CommonResponseDTO =
        await LookupServices.getCountryEnums();

    const countryLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        countryLookupResponse,
    );

    // ===========================================================================
    const institutionLookupResponse: CommonResponseDTO =
        await LookupServices.getInstitutionEnums();

    const institutionLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        institutionLookupResponse,
    );

    // ===========================================================================

    const educationLookupResponse: CommonResponseDTO =
        await LookupServices.getHighestEducationEnums();

    const educationLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        educationLookupResponse,
    );

    // ===========================================================================

    const sponsorshipLookupResponse: CommonResponseDTO =
        await LookupServices.getSponsorshipEnums();

    const sponsorshipLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        sponsorshipLookupResponse,
    );

    // ===========================================================================

    const majorMinorLookupResponse: CommonResponseDTO =
        await LookupServices.getMajorMinorEnums();

    const majorMinorLookup: DropdownDTO[] = LookupServices.setSelectOptions(
        majorMinorLookupResponse,
    );

    return {
        param,
        forms: {
            personalDetailForm,
            qualificationInfoForm,
        },
        responses: {
            personalDetailResponse,
            serviceStatementListResponse,
            leaveStatementListResponse,
            behaviourHistoriesListResponse,
        },
        selectionOptions: {
            statusLookup,
            countryLookup,
            institutionLookup,
            educationLookup,
            sponsorshipLookup,
            majorMinorLookup,
        },
    };
};
