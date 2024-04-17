import { goto } from '$app/navigation';
import { LeaveTypeConstant } from '$lib/constants/core/leave-type.constant';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
import type {
    LeaveCommonDetailsDTO,
    LeaveDeliveryDetailsDTO,
    LeaveStudyDetailsDTO,
    LeaveUnrecordedDetailsDTO,
} from '$lib/dto/mypsm/leave/leave.dto';
import { LookupHelper } from '$lib/helpers/core/lookup.helper';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import {
    LeaveCommonDetailsSchema,
    LeaveDeliveryDetailsSchema,
    LeaveStudyDetailsSchema,
    LeaveUnrecordedDetailsSchema,
} from '$lib/schemas/mypsm/leave/leave.schema';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { LeaveApplicationServices } from '$lib/services/implementation/mypsm/leave/leave-application.service';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load() {
    // ============================================
    // create forms
    // ============================================
    // leave common form
    const leaveCommonForm = await superValidate(zod(LeaveCommonDetailsSchema));

    // leave unrecorded form
    const leaveUnrecordedForm = await superValidate(
        zod(LeaveUnrecordedDetailsSchema),
    );

    // leave delivery form
    const leaveDeliveryForm = await superValidate(
        zod(LeaveDeliveryDetailsSchema),
    );

    // leave study form
    const leaveStudyForm = await superValidate(zod(LeaveStudyDetailsSchema));

    // ============================================
    // get all enums
    // ============================================

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

    // set default current leave type code
    const currentLeaveType: LookupDTO = LeaveTypeConstant.unrecordedLeave;

    const currentLeaveTypeCode: string = currentLeaveType.code;

    return {
        props: {
            currentLeaveType,
            currentLeaveTypeCode,
            leaveTypeDropdown,
            unrecordedLeaveTypeDropdown,
            halfDayTypeDropdown,
            halfDayOptionDropdown,
        },
        forms: {
            leaveCommonForm,
            leaveUnrecordedForm,
            leaveDeliveryForm,
            leaveStudyForm,
        },
    };
}

// submit common leave form
export async function _leaveCommonFormSubmit(
    formData: LeaveCommonDetailsDTO,
    leaveType: LookupDTO,
) {
    const form = await superValidate(formData, zod(LeaveCommonDetailsSchema));

    if (form.valid) {
        const response =
            await LeaveApplicationServices.addCommonLeave(formData);

        if (response.status == 'success') {
            const result: LeaveCommonDetailsDTO = response.data
                ?.details as LeaveCommonDetailsDTO;

            let url =
                '/cuti/permohonan/' +
                leaveType.description +
                '/' +
                result.leaveId;

            setTimeout(() => {
                goto(url);
            }, 1000);
        }
    } else {
        getErrorToast('Sila semak semula maklumat permohonan.');
        error(400, { message: '' });
    }
}

// submit common leave form
export async function _leaveUnrecordedFormSubmit(
    formData: LeaveUnrecordedDetailsDTO,
    leaveType: LookupDTO,
) {
    const form = await superValidate(
        formData,
        zod(LeaveUnrecordedDetailsSchema),
    );

    if (form.valid) {
        const response =
            await LeaveApplicationServices.addUnrecordedLeave(formData);

        if (response.status == 'success') {
            const result: LeaveUnrecordedDetailsDTO = response.data
                ?.details as LeaveUnrecordedDetailsDTO;

            let url =
                '/cuti/permohonan/' +
                leaveType.description +
                '/' +
                result.leaveId;

            setTimeout(() => {
                goto(url);
            }, 1000);
        }
    } else {
        getErrorToast('Sila semak semula maklumat permohonan.');
        error(400, { message: '' });
    }
}

// submit Delivery leave form
export async function _leaveDeliveryFormSubmit(
    formData: LeaveDeliveryDetailsDTO,
    leaveType: LookupDTO,
) {
    const form = await superValidate(formData, zod(LeaveDeliveryDetailsSchema));

    if (form.valid) {
        const response =
            await LeaveApplicationServices.addDeliveryLeave(formData);

        if (response.status == 'success') {
            const result: LeaveDeliveryDetailsDTO = response.data
                ?.details as LeaveDeliveryDetailsDTO;

            let url =
                '/cuti/permohonan/' +
                leaveType.description +
                '/' +
                result.leaveId;

            setTimeout(() => {
                goto(url);
            }, 1000);
        }
    } else {
        getErrorToast('Sila semak semula maklumat permohonan.');
        error(400, { message: '' });
    }
}

// submit common leave form
export async function _leaveStudyFormSubmit(
    formData: LeaveStudyDetailsDTO,
    leaveType: LookupDTO,
) {
    const form = await superValidate(formData, zod(LeaveStudyDetailsSchema));

    if (form.valid) {
        const response = await LeaveApplicationServices.addStudyLeave(formData);

        if (response.status == 'success') {
            const result: LeaveStudyDetailsDTO = response.data
                ?.details as LeaveStudyDetailsDTO;

            let url =
                '/cuti/permohonan/' +
                leaveType.description +
                '/' +
                result.leaveId;

            setTimeout(() => {
                goto(url);
            }, 1000);
        }
    } else {
        getErrorToast('Sila semak semula maklumat permohonan.');
        error(400, { message: '' });
    }
}
