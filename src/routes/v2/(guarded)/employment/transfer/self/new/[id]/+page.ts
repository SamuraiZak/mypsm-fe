import { CommonResponseConstant } from '$lib/constants/core/common-response.constant.js';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type {
    TransferApplicationPersonalDetailDTO,
    TransferApplicationServiceDetailDTO,
} from '$lib/dto/mypsm/employment/transfer/transfer.dto';
import {
    TransferApplicationConfirmationSchema,
    TransferApplicationEmployeeDetailSchema,
    TransferApplicationServiceDetailSchema,
    TransferApplicationTransferDetailSchema,
    type TransferApplicationConfirmationType,
    type TransferApplicationTransferDetailType,
} from '$lib/schemas/mypsm/employment/transfer/transfer.schema';
import { TransferServices } from '$lib/services/implementation/mypsm/employment/transfer/transfer.service.js';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({ params, parent }) {
    const { layoutData } = await parent();

    // application id
    const currentApplicationId: number = parseInt(params.id);

    // ==========================================================
    // FORMS
    // ==========================================================

    // employee detail form
    const employeeDetailForm = await superValidate(
        zod(TransferApplicationEmployeeDetailSchema),
    );

    // service detail form
    const serviceDetailForm = await superValidate(
        zod(TransferApplicationServiceDetailSchema),
    );

    // transfer detail form
    const transferDetailForm = await superValidate(
        zod(TransferApplicationTransferDetailSchema),
    );

    // confirmation form
    const applicationConfirmationForm = await superValidate(
        zod(TransferApplicationConfirmationSchema),
    );

    // ==========================================================
    // DEFAULT VALUES
    // ==========================================================
    if (currentApplicationId == 0) {
        // employee detail
        employeeDetailForm.data = await _getCurrentEmployeeDetails();
    }

    // ==========================================================
    // Lookup
    // ==========================================================
    const transferCategoryOption: DropdownDTO[] = [
        {
            name: 'Pertukaran Dalam Ibu Pejabat/Negeri/Wilayah',
            value: 'Pertukaran Dalam Ibu Pejabat/Negeri/Wilayah',
        },
        {
            name: 'Pertukaran Luar Ibu Pejabat/Negeri/Wilayah',
            value: 'Pertukaran Luar Ibu Pejabat/Negeri/Wilayah',
        },
    ];

    const transferReasonOption: DropdownDTO[] = [
        {
            name: 'Mengikut Pasangan',
            value: 'Mengikut Pasangan',
        },
        {
            name: 'Menjaga Ibu/ Bapa yang uzur/sakit',
            value: 'Menjaga Ibu/ Bapa yang uzur/sakit',
        },
        {
            name: 'Kes Kesihatan Kronik Pemohon',
            value: 'Kes Kesihatan Kronik Pemohon',
        },
        {
            name: 'Lain-lain (sila nyatakan)',
            value: 'Lain-lain (sila nyatakan)',
        },
    ];

    return {
        props: {
            currentApplicationId,
            layoutData,
        },
        forms: {
            employeeDetailForm,
            serviceDetailForm,
            transferDetailForm,
            applicationConfirmationForm,
        },
        lookup: {
            transferCategoryOption,
            transferReasonOption,
        },
    };
}

// =====================================================================
// Application flows
// =====================================================================
// 1. get current employee detail
export async function _getCurrentEmployeeDetails() {
    let result: TransferApplicationPersonalDetailDTO = {
        name: 'Tiada Maklumat',
        identityDocumentNumber: 'Tiada Maklumat',
        employeeNumber: 'Tiada Makluamt',
        phone: 'Tiada Maklumat',
        maritalStatus: 'Tiada Maklumat',
        childCount: 1,
        childInSchoolCount: 1,
    };

    const response: CommonResponseDTO =
        await TransferServices.getCurrentEmployeeDetail();

    if (response.status == 'success') {
        result = response.data?.details as TransferApplicationPersonalDetailDTO;
    }

    return result;
}

// 2. get current employee service detail
export async function _getCurrentEmployeeServiceDetails() {
    let result: TransferApplicationServiceDetailDTO = {
        position: 'Tiada Maklumat',
        grade: 'Tiada Maklumat',
        hiringDate: 'Tiada Maklumat',
        officeName: 'Tiada Maklumat',
        officeAddress: 'Tiada Maklumat',
        department: 'Tiada Maklumat',
        servicePeriod: 0,
    };

    const response: CommonResponseDTO =
        await TransferServices.getCurrentEmployeeServiceDetail();

    if (response.status == 'success') {
        result = response.data?.details as TransferApplicationServiceDetailDTO;
    }

    return result;
}

// 3. create application
export async function _(params: TransferApplicationTransferDetailType) {
    const form = await superValidate(
        params,
        zod(TransferApplicationTransferDetailSchema),
    );

    if (form.valid) {
        const response = await TransferServices.addTransferDetail(form.data);

        if (response.status == 'success') {
            return response;
        } else {
            return CommonResponseConstant.httpError;
        }
    } else {
        return CommonResponseConstant.httpError;
    }
}

// add confirmation
export async function _applicationConfirmationSubmit(
    params: TransferApplicationConfirmationType,
) {
    const form = await superValidate(
        params,
        zod(TransferApplicationConfirmationSchema),
    );

    if (form.valid) {
        const response = await TransferServices.addApplicationConfirmation(
            form.data,
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
