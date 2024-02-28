import type { CommonFilterDTO } from "$lib/dto/core/common/common-filter.dto";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto.js";
import { z } from 'zod';
import { superValidate } from "sveltekit-superforms/client";
import { error } from '@sveltejs/kit';

export const load = async ({params}) => {
    let actingType: string = params.id

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
    
    return {
        dataList, dataList2, dataList3, param, actingType, verifyMeetingResultDetailForm
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

export const _verifyMeetingResultDetailSchema = z.object({
    integritySecretaryName: z.string().min(1, {message: "Medan ini hendaklah dipilih."}),
    directorName: z.string().min(1, {message: "Medan ini hendaklah dipilih."}),
})

export const _submitVerifyMeetingResultDetailForm = async (formData: object) => {
    const verifyMeetingResultDetailForm = await superValidate(
        formData,
        _verifyMeetingResultDetailSchema,
    );
       console.log(verifyMeetingResultDetailForm) 
    if(verifyMeetingResultDetailForm.valid){
        const response = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(verifyMeetingResultDetailForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        console.log("pass")
        return {
            response
        }
    }
};
