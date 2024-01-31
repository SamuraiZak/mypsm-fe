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
import type { GetPersonalServiceResponse } from '$lib/view-models/mypsm/profile/profile-get-personal-service-response.modal';
import type { GetPersonalDetailResponse } from '$lib/view-models/mypsm/profile/proflle-get-personal-detail-response.modal';
import type { PutPersonalDetailRequest } from '$lib/view-models/mypsm/profile/proflle-put-personal-detail-request.modal';
import type { PutPersonalDetailResponse } from '$lib/view-models/mypsm/profile/proflle-put-personal-detail-response.modal';

export class ProfileService {
    // maklumat Peribadi
    static async ProfileDetail(): Promise<GetPersonalDetailResponse> {
        const response: GetPersonalDetailResponse = await http
            .get(`personal-details/detail`, {})
            .json();

        return response;
    }

    // Maklumat Perkhidmatan
    static async ProfileServiceDetail(): Promise<GetPersonalServiceResponse> {
        const response: GetPersonalServiceResponse = await http
            .get(`personal-details/service`, {})
            .json();

        return response;
    }

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

    static async medicalGeneralAssessment(): Promise<GetPersonalMedicalRecordGeneralAssessmentResponse> {
        const response: GetPersonalMedicalRecordGeneralAssessmentResponse =
            await http
                .get(`personal-details/medical-record/general-assessment`, {})
                .json();

        return response;
    }
}
