import http from '$lib/services/provider/service-provider.service';
import type { GetPersonalMedicalRecordGeneralAssessmentResponse } from '$lib/view-models/mypsm/profile/profile-get-personal-medical-record-general-assessment-response.modal';
import type { GetPersonalDetailResponse } from '$lib/view-models/mypsm/profile/proflle-get-personal-detail-response.modal';
import type { PutPersonalDetailRequest } from '$lib/view-models/mypsm/profile/proflle-put-personal-detail-request.modal';
import type { PutPersonalDetailResponse } from '$lib/view-models/mypsm/profile/proflle-put-personal-detail-response.modal';





export class ProfileService {


    static async ProfileDetail(
    ): Promise<GetPersonalDetailResponse> {
        const response: GetPersonalDetailResponse = await http
            .put(`personal-details/detail`, {
            })
            .json();

        return response;
    }

    //Pemeriksaan Doktor

    static async medicalGeneralAssessment(
    ): Promise<GetPersonalMedicalRecordGeneralAssessmentResponse> {
        const response: GetPersonalMedicalRecordGeneralAssessmentResponse = await http
            .get(`personal-details/medical-record/general-assessment`, {
            })
            .json();

        return response;
    }


}

