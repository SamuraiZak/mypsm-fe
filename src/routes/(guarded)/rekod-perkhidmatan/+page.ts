import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { ProceedingChargeListResponseDTO } from '$lib/dto/mypsm/integrity/proceeding/proceeding-charges-response.dto';
import type { academicResponseDTO } from '$lib/dto/mypsm/profile/academic-detail.dto';
import { _proceedingStaffDetailResponseSchema } from '$lib/schemas/mypsm/integrity/proceeding-scheme';
import {
    _academicListResponseSchema,
    _nextOfKinListResponseSchema,
} from '$lib/schemas/mypsm/profile/profile-schemas';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { ServiceRecordServices } from '$lib/services/implementation/mypsm/buku-rekod-perkhidmatan/service-record.service';
import { IntegrityProceedingServices } from '$lib/services/implementation/mypsm/integriti/integrity-proceeding.service';
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
    const proceedingListResponse: CommonResponseDTO =
        await IntegrityProceedingServices.getProceedingChargeAppealList(param);

    const proceedingList =
        (proceedingListResponse.data
            ?.dataList as ProceedingChargeListResponseDTO) ?? [];

    // get qualification list
    const qualificationListResponse =
        await ServiceRecordServices.getQualificationList();

    // get service statement list
    const serviceStatementListResponse =
        await ServiceRecordServices.getServiceStatementList(param);

    // ============================================================
    // Supervalidated form initialization
    // ============================================================
    const personalDetailForm = await superValidate(
        // personalDetailResponse.data?.details as CandidatePersonalResponseDTO,
        zod(_proceedingStaffDetailResponseSchema),
        { errors: false },
    );

    const qualificationInfoForm = await superValidate(
        qualificationListResponse.data?.details as academicResponseDTO,
        zod(_academicListResponseSchema),
    );

    const nextOFKInInfoForm = await superValidate(
        zod(_nextOfKinListResponseSchema),
    );
    // ==========================================================================
    // Get Lookup Functions
    // ==========================================================================
    const statusLookupResponse: CommonResponseDTO =
        await LookupServices.getStatusEnums();

    const statusLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsInString(statusLookupResponse);

    // ===========================================================================

    return {
        param,
        list: {
            proceedingList,
        },
        forms: {
            personalDetailForm,
            nextOFKInInfoForm,
            qualificationInfoForm,
        },
        responses: {
            proceedingListResponse,
            serviceStatementListResponse,
        },
        selectionOptions: {
            statusLookup,
        },
    };
};
