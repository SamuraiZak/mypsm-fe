import { goto } from '$app/navigation';
import { LeaveTypeConstant } from '$lib/constants/core/leave-type.constant';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
import type {
    LeaveAddExtendedSickDTO,
    LeaveAddHalfPayDTO,
    LeaveAddUnrecordedDTO,
    LeaveViewExtendedSickDTO,
    LeaveViewHalfPayDTO,
    LeaveViewUnrecordedDTO,
} from '$lib/dto/mypsm/leave/leave.dto';
import { LookupHelper } from '$lib/helpers/core/lookup.helper';
import {
    SchemaExtendedSickLeave,
    SchemaHalfPayLeave,
    SchemaUnrecordedLeave,
} from '$lib/schemas/mypsm/leave/leave.schema';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { LeaveServices } from '$lib/services/implementation/mypsm/leave/leave.service';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load() {
    // =======================================================================
    // prep variables
    // =======================================================================
    // get list of leave type
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

    // set current leave type code to default
    let currentLeaveTypeCode: string = '';

    // get list of half day option
    const halfDayOptionDropdown: DropdownDTO[] = [
        {
            value: true,
            name: 'Ya',
        },
        {
            value: false,
            name: 'Tidak',
        },
    ];

    // get list of half type option
    const halfDayTypeDropdown: DropdownDTO[] = [
        {
            value: 'Pagi',
            name: 'Pagi',
        },
        {
            value: 'Petang',
            name: 'Petang',
        },
    ];

    // get list of unrecorded leave type
    let unrecordedLeaveTypeList: LookupDTO[] = [];

    const unrecordedLeaveTypeResponse: CommonResponseDTO =
        await LookupServices.getUnrecordedLeaveTypeEnums();

    if (unrecordedLeaveTypeResponse.status == 'success') {
        unrecordedLeaveTypeList = unrecordedLeaveTypeResponse.data
            ?.dataList as LookupDTO[];
    } else {
        leaveTypeList = LeaveTypeConstant.list;
    }

    unrecordedLeaveTypeList = unrecordedLeaveTypeList
        .slice()
        .sort((a, b) => a.description.localeCompare(b.description));

    const unrecordedLeaveTypeDropdown: DropdownDTO[] =
        LookupHelper.toDropdownProper(unrecordedLeaveTypeList);

    // =======================================================================
    // create form
    // =======================================================================

    // unrecorded leave
    const unrecordedLeaveForm = await superValidate(zod(SchemaUnrecordedLeave));

    // extended sick leave
    const extendedSickLeaveForm = await superValidate(
        zod(SchemaExtendedSickLeave),
    );

    // half paid leave
    const halfPayLeaveForm = await superValidate(zod(SchemaHalfPayLeave));

    return {
        props: {
            currentLeaveTypeCode,
            leaveTypeDropdown,
            halfDayOptionDropdown,
            halfDayTypeDropdown,
            unrecordedLeaveTypeDropdown,
        },
        forms: {
            unrecordedLeaveForm,
            extendedSickLeaveForm,
            halfPayLeaveForm,
        },
    };
}


// submit unrecorded leave
export async function _submitUnrecordedLeaveForm(
    formData: LeaveAddUnrecordedDTO,
) {
    const form = await superValidate(formData, zod(SchemaUnrecordedLeave));

    if (form.valid) {
        const response: CommonResponseDTO =
            await LeaveServices.addUnrecordedLeave(formData);

        if (response.status == 'success') {
            const applicationDetails: LeaveViewUnrecordedDTO = response.data
                ?.details as LeaveViewUnrecordedDTO;

            let url =
                '/cuti/permohonan/' +
                LeaveTypeConstant.unrecordedLeave.description +
                '/' +
                applicationDetails.alternateUntrackedLeaveId;

            goto(url);
        }
    } else {
        return fail(400, form);
    }
}

// submit extended sick leave
export async function _submitExtendedSickLeaveForm(
    formData: LeaveAddExtendedSickDTO,
) {
    const form = await superValidate(formData, zod(SchemaUnrecordedLeave));

    if (form.valid) {
        const response: CommonResponseDTO =
            await LeaveServices.addExtendedSickLeave(formData);

        if (response.status == 'success') {
            const applicationDetails: LeaveViewExtendedSickDTO = response.data
                ?.details as LeaveViewExtendedSickDTO;

            let url =
                '/cuti/permohonan/' +
                LeaveTypeConstant.extendedSickLeave.description +
                '/' +
                applicationDetails.extendedSickLeaveId;

            setTimeout(() => {
                goto(url);
            }, 1000);
        }
    } else {
        return fail(400, form);
    }
}

// submit half pay leave
export async function _submitHalfPayLeaveForm(
    formData: LeaveAddHalfPayDTO,
) {
    const form = await superValidate(formData, zod(SchemaUnrecordedLeave));

    if (form.valid) {
        const response: CommonResponseDTO =
            await LeaveServices.addHalfPayLeave(formData);

        if (response.status == 'success') {
            const applicationDetails: LeaveViewHalfPayDTO = response.data
                ?.details as LeaveViewHalfPayDTO;

            let url =
                '/cuti/permohonan/' +
                LeaveTypeConstant.extendedSickLeave.description +
                '/' +
                applicationDetails.halfPayLeaveId;

            setTimeout(() => {
                goto(url);
            }, 1000);
        }
    } else {
        return fail(400, form);
    }
}
