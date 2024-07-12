import { LeaveTypeConstant } from '$lib/constants/core/leave-type.constant';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
import { LookupHelper } from '$lib/helpers/core/lookup.helper';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import {
    LeaveStudyRequestSchema,
    type LeaveStudyRequestDTO,
} from '$lib/schemas/v2/mypsm/leave/leave.schema.js';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { LeaveServices } from '$lib/services/v2/leave/leave.service.js';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({ params }) {
    const currentApplicationId: number = parseInt(params.id);

    let currentLeaveTypeCode: string = '';

    // create forms
    const leaveStudyForm = await superValidate(zod(LeaveStudyRequestSchema));

    let currentApplicationIsDraft: boolean = true;

    // get leave type
    let leaveTypeList: LookupDTO[] = [];

    const leaveTypeResponse: CommonResponseDTO =
        await LookupServices.getLeaveTypeEnums();

    if (leaveTypeResponse.status == 'success') {
        leaveTypeList = leaveTypeResponse.data?.dataList as LookupDTO[];
    } else {
        leaveTypeList = LeaveTypeConstant.list;
    }

    leaveTypeList = leaveTypeList
        .slice()
        .sort((a, b) => a.description.localeCompare(b.description));

    const leaveTypeDropdown: DropdownDTO[] =
        LookupHelper.toDropdownProper(leaveTypeList);

    return {
        props: {
            currentApplicationId,
            currentApplicationIsDraft,
            currentLeaveTypeCode,
            leaveTypeDropdown,
        },
        forms: {
            leaveStudyForm,
        },
    };
}

export async function _leaveStudyFormSubmit(params: LeaveStudyRequestDTO) {
    const form = await superValidate(params, zod(LeaveStudyRequestSchema));

    if (form.valid) {
        const response = await LeaveServices.addLeaveApplication(params);

        if (response.status == 'success') {
            // let url =
            //     '/cuti/permohonan/' +
            //     leaveType.description +
            //     '/' +
            //     result.leaveId;
            // setTimeout(() => {
            //     goto(url);
            // }, 1000);
        } else {
            getErrorToast('Sila semak semula maklumat permohonan.');
        }
    } else {
        getErrorToast('Sila semak semula maklumat permohonan.');
        error(400, { message: '' });
    }
}
