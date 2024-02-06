import { CommonListRequestConvert } from '$lib/dto/core/common/common-list-request.dto';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import { GetPersonalSalaryAllowencesResponseConvert, type GetPersonalSalaryAllowencesResponse } from '$lib/dto/mypsm/profile/gaji-elaun/personal-salary-allowances-response-get.dto';
import { GetPersonalDetailRequestConvert, type GetPersonalDetailRequest } from '$lib/dto/mypsm/profile/maklumat-peribadi/personal-detail-request-get.dto';
import { GetPersonalDetailResponseConvert, type GetPersonalDetailResponse } from '$lib/dto/mypsm/profile/maklumat-peribadi/personal-detail-response-get.dto';
import type { GetPersonalServiceResponse } from '$lib/dto/mypsm/profile/maklumat-peribadi/personal-service-response-get.dto';
import type { GetPersonalMedicalGeneralAssessmentResponse } from '$lib/dto/mypsm/profile/rekod-kesihatan/personal-medical-record-general-assessment-response-get.dto';
import type { GetPersonalMedicalRecordHistoryResponse } from '$lib/dto/mypsm/profile/rekod-kesihatan/personal-medical-record-history-response-get.dto';
import http from '$lib/services/provider/service-provider.service';
import type { GetPersonalAcademicResponse } from '$lib/view-models/mypsm/profile/profile-get-personal-academic-response.modal';
import type { GetPersonalActivityResponse } from '$lib/view-models/mypsm/profile/profile-get-personal-activity-response.modal';
import type { GetPersonalDependentResponse } from '$lib/view-models/mypsm/profile/profile-get-personal-dependent-response.modal';
import type { GetPersonalExperiencesResponse } from '$lib/view-models/mypsm/profile/profile-get-personal-experiences-response.modal';
import type { GetPersonalFamilyResponse } from '$lib/view-models/mypsm/profile/profile-get-personal-family-response.modal';
import type { MedicalHistoryDiseaseNamesResponse } from '$lib/view-models/mypsm/profile/profile-get-personal-medical-history-name-response.modal';
import type { GetPersonalMedicalRecordGeneralAssessmentResponse } from '$lib/view-models/mypsm/profile/profile-get-personal-medical-record-general-assessment-response.modal';
import type { GetPersonalMedicalRecordResponse } from '$lib/view-models/mypsm/profile/profile-get-personal-medical-record-history-response.modal';
import type { GetPersonalNextOfKinsRequest } from '$lib/view-models/mypsm/profile/profile-get-personal-next-of-kins-request.modal';

import type { PutPersonalDetailRequest } from '$lib/view-models/mypsm/profile/proflle-put-personal-detail-request.modal';
import type { PutPersonalDetailResponse } from '$lib/view-models/mypsm/profile/proflle-put-personal-detail-response.modal';

export class ProfileService {
    // maklumat Peribadi
    // static async ProfileDetail(): Promise<GetPersonalDetailResponse> {
    //     const response: GetPersonalDetailResponse = await http
    //         .get(`personal-details/detail`, {})
    //         .json();

    //     return response;
    // }

    //get personal detail
    static async getPersonalDetail(
    ) {

        const response: Response = await http.get('personal-details/detail', {}).json();

        const result = CommonResponseConvert.fromResponse(response);
        const personalDetailResult: GetPersonalDetailResponse = result.data?.details as GetPersonalDetailResponse;

        return personalDetailResult
    }

    static async getServiceDetail(
        ) {

            const response: Response = await http.get('personal-details/service', {}).json();

            const result = CommonResponseConvert.fromResponse(response);
            const personalDetailResult: GetPersonalServiceResponse = result.data?.details as GetPersonalServiceResponse;

            return personalDetailResult
        }

    // Maklumat Perkhidmatan

    // static async ProfileServiceDetail(): Promise<GetPersonalServiceResponse> {
    //     const response: GetPersonalServiceResponse = await http
    //         .get(`personal-details/service`, {})
    //         .json();

    //     return response;
    // }

    // Maklumat Akademik
    static async ProfileEducationsDetail(): Promise<GetPersonalAcademicResponse> {
        const response: GetPersonalAcademicResponse = await http
            .get(`personal-details/educations`, {})
            .json();

        return response;
    }

    // Maklumat Pengalaman
    static async ProfileExperiencesDetail(): Promise<GetPersonalExperiencesResponse> {
        const response: GetPersonalExperiencesResponse = await http
            .get(`personal-details/experiences`, {})
            .json();

        return response;
    }
    // Maklumat Kegiatan
    static async ProfileActivitiesDetail(): Promise<GetPersonalActivityResponse> {
        const response: GetPersonalActivityResponse = await http
            .get(`personal-details/activities`, {})
            .json();

        return response;
    }

    // Maklumat Keluarga
    static async ProfileFamilyDetail(): Promise<GetPersonalFamilyResponse> {
        const response: GetPersonalFamilyResponse = await http
            .get(`personal-details/families`, {})
            .json();

        return response;
    }

    // Maklumat Tanggungan
    static async ProfileDependentDetail(): Promise<GetPersonalDependentResponse> {
        const response: GetPersonalDependentResponse = await http
            .get(`personal-details/dependents`, {})
            .json();

        return response;
    }

    // Maklumat Waris
    static async ProfileNextOfKinsDetail(): Promise<GetPersonalNextOfKinsRequest> {
        const response: GetPersonalNextOfKinsRequest = await http
            .get(`personal-details/next-of-kins`, {})
            .json();

        return response;
    }

    // Rekod Kesihatan
    // ================

    // static async getPersonalMedicalHistory() {

    //     const response: Response = await http.get('personal-details/medical-record/history').json();

    //     const result = CommonResponseConvert.fromResponse(response);
    //     const personalMedicalHistoryResult: GetPersonalMedicalRecordHistoryResponse[] = result.data?.dataList as GetPersonalMedicalRecordHistoryResponse[];

    //     return personalMedicalHistoryResult
    // }

    // Agenda semasa
    // ================

    static async getPersonalSalary() {

            const response: Response = await http.get('personal-details/salary-allowances').json();

            const result = CommonResponseConvert.fromResponse(response);
            const personalDetailResult: GetPersonalSalaryAllowencesResponse[] = result.data?.dataList as GetPersonalSalaryAllowencesResponse[];

            return personalDetailResult
        }


        // static async getServiceDetail(
        //     ) {

        //         const response: Response = await http.get('personal-details/service', {}).json();

        //         const result = CommonResponseConvert.fromResponse(response);
        //         const personalDetailResult: GetPersonalServiceResponse = result.data?.details as GetPersonalServiceResponse;

        //         return personalDetailResult
        //     }

    // Rekod Kesihatan
    // ================

    //Sejarah Penyakit

    static async medicalHistory(): Promise<GetPersonalMedicalRecordResponse> {
        const response: GetPersonalMedicalRecordResponse = await http
            .get(`personal-details/medical-record/history`, {})
            .json();

        return response;
    }

    static async getDiseases(): Promise<MedicalHistoryDiseaseNamesResponse> {
        const response: MedicalHistoryDiseaseNamesResponse = await http
            .get(`personal-details/medical-record/list-diseases`, {})
            .json();

        return response;
    }

    //Pemeriksaan Doktor

//     static async medicalGeneralAssessment(): Promise<GetPersonalMedicalRecordGeneralAssessmentResponse> {
//         const response: GetPersonalMedicalRecordGeneralAssessmentResponse =
//             await http
//                 .get(`personal-details/medical-record/general-assessment`, {})
//                 .json();

//         return response;
//     }

// static async medicalGeneralAssessment(): Promise<GetPersonalMedicalGeneralAssessmentResponse> {
//     const response: GetPersonalMedicalGeneralAssessmentResponse = await http
//         .get(`personal-details/medical-record/history`, {})
//         .json();

//     return response;
// }

static async getPersonalMedicalGenaralAssesment(
    ) {

        const response: Response = await http.get('personal-details/detail', {}).json();

        const result = CommonResponseConvert.fromResponse(response);
        const personalDetailResult: GetPersonalMedicalGeneralAssessmentResponse = result.data?.details as GetPersonalMedicalGeneralAssessmentResponse;

        return personalDetailResult
    }
}
