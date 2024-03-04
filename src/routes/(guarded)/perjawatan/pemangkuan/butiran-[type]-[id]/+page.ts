import type { CommonFilterDTO } from "$lib/dto/core/common/common-filter.dto";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto.js";
import { z, type AnyZodObject } from 'zod';
import { superValidate } from "sveltekit-superforms/client";
import { error } from '@sveltejs/kit';
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto.js";
import { LookupServices } from "$lib/services/implementation/core/lookup/lookup.service.js";
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto.js";
import { _approverResultSchema, _directorResultSchema, _mainSupporterAndApproverSchema, _mainUpdateActingEmployeeDetailSchema, _mainUpdatePromotionMeetingResultDetailSchema, _mainUpdatePromotionMeetingResultSchema, _placementAmendmentApplication, _supporterResultSchema, _updateActingResultSchema, _updateEmployeePlacementMeetingResultSchema, _updateMeetingDetailSchema, _updateMeetingResultSchema, _updatePlacementAmendmentApplicationResultSchema, _updatePromotionMeetingResultSchema, _verifyMeetingResultDetailSchema } from "$lib/schemas/mypsm/employment/acting/acting-schemas";
import type { ZodValidation } from "sveltekit-superforms";

export const load = async ({params}) => {
    let actingType: string = params.type;
    let id: string = params.id;
    
    // filter
    const filter: CommonFilterDTO = {
        identityCard: null,
        employeeNumber: null,
        name: null,
        position: null,
        status: null,
        grade: null,
        scheme: null,
    };
    
    const param = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: filter,
    };

    const dataList = [
        { employeeNumber: 28339, name: 'David Beckham', identityCard: 990122136443, program: '-', skim: '-', grade: 'E21', position: 'Setiausaha Pejabat', penempatanSekarang: '-', pengisytiahranHarta: '-', akuanPinjamanPendidikan: '-' },
        { employeeNumber: 28340, name: 'Cristiano Ronaldo', identityCard: 990122136443, program: '-', skim: '-', grade: 'E21', position: 'Pegawai Teknologi Maklumat', penempatanSekarang: '-', pengisytiahranHarta: '-', akuanPinjamanPendidikan: '-' },
        { employeeNumber: 28341, name: 'Gareth Bale', identityCard: 990122136443, program: '-', skim: '-', grade: 'DV41', position: 'Pegawai Sains', penempatanSekarang: '-', pengisytiahranHarta: '-', akuanPinjamanPendidikan: '-' },
        { employeeNumber: 28342, name: 'Karim Benzema', identityCard: 990122136443, program: '-', skim: '-', grade: 'E22', position: 'Pegawai Metrologi', penempatanSekarang: '-', pengisytiahranHarta: '-', akuanPinjamanPendidikan: '-' },
    ];

    //5th Stepper
    const dataList2 = [
        { employeeNumber: 28339, name: 'David Beckham', identityCard: 990122136443, suratSetujuTerima: '-', borangLaporDiri: '-', notaSerahTugas: '-', keputusanPemangkuanKakitangan: '-'},
        { employeeNumber: 28340, name: 'Cristiano Ronaldo', identityCard: 990122136443, suratSetujuTerima: '-', borangLaporDiri: '-', notaSerahTugas: '-', keputusanPemangkuanKakitangan: '-'},
    ];

    const dataList3 = [
        { employeeNumber: 28339, name: 'David Beckham', identityCard: 990122136443, grade: '-', position: '-', penempatanSekarang: 'Bahagian Teknologi', permohonanPindaanPenempatan: 'Ada', keputusanPermohonanPindaanPenempatan: 'Lulus'},
        { employeeNumber: 28340, name: 'Cristiano Ronaldo', identityCard: 990122136443, grade: '-', position: '-', penempatanSekarang: '-', permohonanPindaanPenempatan: 'Ada', keputusanPermohonanPindaanPenempatan: 'Lulus'},
        { employeeNumber: 28340, name: 'Kylian Mbapper', identityCard: 990122136443, grade: '-', position: '-', penempatanSekarang: 'Bahagian Sains', permohonanPindaanPenempatan: 'Ada', keputusanPermohonanPindaanPenempatan: 'Lulus'},
    ];

    const verifyMeetingResultDetailForm = await superValidate(_verifyMeetingResultDetailSchema)
    const directorResultForm = await superValidate (_directorResultSchema)
    const updateMeetingDetailForm = await superValidate(_updateMeetingDetailSchema)
    const updateMeetingResultForm = await superValidate(_updateMeetingResultSchema)
    const updatePromotionMeetingResultForm = await superValidate(_updatePromotionMeetingResultSchema)
    const updateEmployeePlacementMeetingResultForm = await superValidate(_updateEmployeePlacementMeetingResultSchema)
    const updatePlacementAmendmentApplicationResultForm = await superValidate(_updatePlacementAmendmentApplicationResultSchema)
    const updateActingResultForm = await superValidate(_updateActingResultSchema)
    const supporterResultForm = await superValidate(_supporterResultSchema)
    const approverResultForm = await superValidate(_approverResultSchema)
    const updateMainPromotionMeetingResultForm = await superValidate(_mainUpdatePromotionMeetingResultSchema)
    const updateMainPromotionMeetingResultDetailForm = await superValidate(_mainUpdatePromotionMeetingResultDetailSchema)
    const updateMainActingEmployeeDetailForm = await superValidate(_mainUpdateActingEmployeeDetailSchema)
    const mainSupporterAndApproverForm = await superValidate(_mainSupporterAndApproverSchema)
    const employeeNeedPlacementAmendmentForm = await superValidate(_placementAmendmentApplication)

    // =======================================================
    // Dropdown Lookup =======================================
    // =======================================================
    const gradeLookupResponse: CommonResponseDTO = 
        await LookupServices.getServiceGradeEnums();

    const gradeLookup: DropdownDTO[] = 
        LookupServices.setSelectOptions(gradeLookupResponse);
    // -------------------------------------------------------
    const stateLookupResponse: CommonResponseDTO =
        await LookupServices.getStateEnums();

    const stateLookup: DropdownDTO[] = 
        LookupServices.setSelectOptions(stateLookupResponse)
    // -------------------------------------------------------
    const placementLookupResponse: CommonResponseDTO = 
        await LookupServices.getPlacementEnums();

    const placementLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(placementLookupResponse)
    // -------------------------------------------------------
    const positionLookupResponse: CommonResponseDTO =
        await LookupServices.getPositionEnums();

    const positionLookup: DropdownDTO[] = 
        LookupServices.setSelectOptions(positionLookupResponse)
    // -------------------------------------------------------
    const departmentLookupResponse: CommonResponseDTO =
        await LookupServices.getDepartmentEnums();

    const departmentLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(departmentLookupResponse)
    // -------------------------------------------------------
    const meetingNameLookup: DropdownDTO[] = [
        { value: 'Mesyuarat 1/12', name: 'Mesyuarat 1/12' },
        { value: 'Mesyuarat 1/102', name: 'Mesyuarat 1/102' },
        { value: 'Mesyuarat 2/101', name: 'Mesyuarat 2/101' },
    ]
    

    return {
        dataList, dataList2, dataList3,
        param, actingType, verifyMeetingResultDetailForm, 
        updateMeetingDetailForm, updateMeetingResultForm,
        updatePromotionMeetingResultForm, updateEmployeePlacementMeetingResultForm,
        updatePlacementAmendmentApplicationResultForm, updateActingResultForm,
        updateMainPromotionMeetingResultForm, updateMainPromotionMeetingResultDetailForm,
        updateMainActingEmployeeDetailForm, mainSupporterAndApproverForm, supporterResultForm,
        approverResultForm, directorResultForm, employeeNeedPlacementAmendmentForm,

        selectionOptions: {
            gradeLookup,
            stateLookup,
            meetingNameLookup,
            placementLookup,
            positionLookup,
            departmentLookup,
        }
    };

};

export const _updateTable = async (param: CommonListRequestDTO) => {
    const response = {
        status: 'success',
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        dataList: [
            { employeeNumber: 28339, name: 'David Beckham', identityCard: 990122136443, program: '-', skim: '-', grade: 'E21', position: 'Setiausaha Pejabat', penempatanSekarang: '-', pengisytiahranHarta: '-', akuanPinjamanPendidikan: '-' },
            { employeeNumber: 28340, name: 'Cristiano Ronaldo', identityCard: 990122136443, program: '-', skim: '-', grade: 'E21', position: 'Pegawai Teknologi Maklumat', penempatanSekarang: '-', pengisytiahranHarta: '-', akuanPinjamanPendidikan: '-' },
            { employeeNumber: 28341, name: 'Gareth Bale', identityCard: 990122136443, program: '-', skim: '-', grade: 'DV41', position: 'Pegawai Sains', penempatanSekarang: '-', pengisytiahranHarta: '-', akuanPinjamanPendidikan: '-' },
            { employeeNumber: 28342, name: 'Karim Benzema', identityCard: 990122136443, program: '-', skim: '-', grade: 'E22', position: 'Pegawai Metrologi', penempatanSekarang: '-', pengisytiahranHarta: '-', akuanPinjamanPendidikan: '-' },
        ],
    };
    
    return {
        param,
        response,
    };
};

// =================== gred 1 - 54 and flexi 41 submit form
export const _submitVerifyMeetingResultDetailForm = async (formData: object) => {
    const verifyMeetingResultDetailForm = await superValidate(
        formData,
        _verifyMeetingResultDetailSchema,
    );
    if(verifyMeetingResultDetailForm.valid){
        const response = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(verifyMeetingResultDetailForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (verifyMeetingResultDetailForm.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
};
export const _submitDirectorResultForm = async (formData: object) => {
    const directorResultForm = await superValidate(
        formData,
        _directorResultSchema,
    );
    if(directorResultForm.valid){
        const response = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(directorResultForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (directorResultForm.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
};
export const _submitUpdateMeetingDetailForm = async (formData: object) => {
    const updateMeetingForm = await superValidate(
        formData,
        _updateMeetingDetailSchema,
    );
    if(updateMeetingForm.valid){
        const response = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(updateMeetingForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (updateMeetingForm.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
}
export const _submitUpdateMeetingResultForm = async (formData: object) => {
    const updateMeetingResultForm = await superValidate(
        formData,
        _updateMeetingResultSchema,
    );
    console.log(updateMeetingResultForm)
    if(updateMeetingResultForm.valid){
        const response = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(updateMeetingResultForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (updateMeetingResultForm.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
}
export const _submitUpdatePromotionMeetingResultForm = async (formData: object) => {
    const updatePromotionMeetingResultForm = await superValidate(
        formData,
        _updatePromotionMeetingResultSchema,
    );
    if(updatePromotionMeetingResultForm.valid){
        const response = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(updatePromotionMeetingResultForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (updatePromotionMeetingResultForm.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
}
export const _submitUpdateEmployeePlacementMeetingResultForm = async (formData: object) => {
    const updateEmployeePlacementMeetingResultForm = await superValidate(
        formData,
        _updateEmployeePlacementMeetingResultSchema,
    );
    if(updateEmployeePlacementMeetingResultForm.valid){
        const response = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(updateEmployeePlacementMeetingResultForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (updateEmployeePlacementMeetingResultForm.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
}
export const _submitUpdatePlacementAmendmentApplicationResultForm = async (formData: object) => {
    const updatePlacementAmendmentApplicationResultForm = await superValidate(
        formData,
        _updatePlacementAmendmentApplicationResultSchema,
    );
    console.log(updatePlacementAmendmentApplicationResultForm)
    if(updatePlacementAmendmentApplicationResultForm.valid){
        const response = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(updatePlacementAmendmentApplicationResultForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (updatePlacementAmendmentApplicationResultForm.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
}
export const _submitUpdateActingResultForm = async (formData: object) => {
    const updateActingResultForm = await superValidate(
        formData,
        _updateActingResultSchema,
    );
    if(updateActingResultForm.valid){
        const response = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(updateActingResultForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (updateActingResultForm.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
}
export const _submitSupporterResultForm = async (formData: object) => {
    const supporterResultForm = await superValidate(
        formData,
        _updateActingResultSchema,
    );
    if(supporterResultForm.valid){
        const response = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(supporterResultForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (supporterResultForm.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
}
export const _submitApproverResultForm = async (formData: object) => {
    const approverResultForm = await superValidate(
        formData,
        _approverResultSchema,
    );
    if(approverResultForm.valid){
        const response = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(approverResultForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (approverResultForm.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
}

// =================== gred utama submit form
export const _submitUpdateMainPromotionMeetingResultForm = async (formData: object) => {
    const updateMainPromotionMeetingResultForm = await superValidate(
        formData,
        _mainUpdatePromotionMeetingResultSchema,
    );
    if(updateMainPromotionMeetingResultForm.valid){
        const response = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(updateMainPromotionMeetingResultForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (updateMainPromotionMeetingResultForm.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
}
export const _submitUpdateMainPromotionMeetingResultDetailForm = async (formData: object) => {
    const updatePromotionMeetingResultDetailForm = await superValidate(
        formData,
        _mainUpdatePromotionMeetingResultDetailSchema,
    );
    if(updatePromotionMeetingResultDetailForm.valid){
        const response = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(updatePromotionMeetingResultDetailForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (updatePromotionMeetingResultDetailForm.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
}
export const _submitUpdateMainActingEmployeeDetailForm = async (formData: object) => {
    const updateMainActingEmployeeDetailForm = await superValidate(
        formData,
        _mainUpdateActingEmployeeDetailSchema,
    );
    if(updateMainActingEmployeeDetailForm.valid){
        const response = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(updateMainActingEmployeeDetailForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (updateMainActingEmployeeDetailForm.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
}
export const _submitMainSupporterAndApproverForm = async (formData: object) => {
    const mainSupporterAndApproverForm = await superValidate(
        formData,
        _mainSupporterAndApproverSchema,
    );
    console.log(mainSupporterAndApproverForm)
    if(mainSupporterAndApproverForm.valid){
        const response = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(mainSupporterAndApproverForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (mainSupporterAndApproverForm.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
}

// ================ kakitangan submit form

export const _submitEmployeeNeedPlacementAmendmentForm = async (formData: object) => {
    const employeeNeedPlacementAmendmentForm = await superValidate(
        formData,
        _placementAmendmentApplication,
    );
    console.log(employeeNeedPlacementAmendmentForm)
    if(employeeNeedPlacementAmendmentForm.valid){
        const response = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(employeeNeedPlacementAmendmentForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (employeeNeedPlacementAmendmentForm.valid) {
            const result: string | null = 'success';
            return { response, result };
        } else {
            const result: string | null = 'fail';
            return { response, result };
        }
    }
}




