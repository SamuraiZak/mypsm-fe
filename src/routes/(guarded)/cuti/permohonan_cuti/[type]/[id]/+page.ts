import { LeaveTypeConstant } from '$lib/constants/core/leave-type.constant';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
import { LookupHelper } from '$lib/helpers/core/lookup.helper';
import {
    LeaveCommonDetailsSchema,
    LeaveDeliveryDetailsSchema,
    LeaveStudyDetailsSchema,
    LeaveUnrecordedDetailsSchema,
} from '$lib/schemas/mypsm/leave/leave.schema';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({ params }) {
    // get current leave type
    let currentLeaveType: LookupDTO =
        LeaveTypeConstant.list.find(
            (item) => item.description == params.type,
        ) ?? LeaveTypeConstant.unrecordedLeave;

    let currentApplicationId: number = parseInt(params.id);

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
    const currentLeaveTypeCode: string = LeaveTypeConstant.unrecordedLeave.code;

    return {
        props: {
            currentLeaveType,
            currentLeaveTypeCode,
            currentApplicationId,
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
