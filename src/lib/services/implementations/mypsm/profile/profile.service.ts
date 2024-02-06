import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import type { PostPersonalActivityRequest } from '$lib/dto/mypsm/profile/maklumat-peribadi/personal-activity-request-post.dto';
import type { PostPersonalDependentRequest } from '$lib/dto/mypsm/profile/maklumat-peribadi/personal-dependent-request-post.dto';
import type { PutPersonalDetailRequest } from '$lib/dto/mypsm/profile/maklumat-peribadi/personal-detail-request-put.dto';
import { type GetPersonalDetailResponse } from '$lib/dto/mypsm/profile/maklumat-peribadi/personal-detail-response-get.dto';
import type { PostPersonalExperiencesRequest } from '$lib/dto/mypsm/profile/maklumat-peribadi/personal-experiences-request-post.dto';
import type { PostPersonalFamilyRequest } from '$lib/dto/mypsm/profile/maklumat-peribadi/personal-family-request-post.dto';
import type { PostPersonalNextOfKinRequest } from '$lib/dto/mypsm/profile/maklumat-peribadi/personal-next-of-kin-request-post.dto';
import type { GetPersonalMedicalGeneralAssessmentResponse } from '$lib/dto/mypsm/profile/rekod-kesihatan/personal-medical-record-general-assessment-response-get.dto';
import http from '$lib/services/provider/service-provider.service';
import type { MedicalHistoryDiseaseNamesResponse } from '$lib/view-models/mypsm/profile/profile-get-personal-medical-history-name-response.modal';
import type { GetPersonalMedicalRecordResponse } from '$lib/view-models/mypsm/profile/profile-get-personal-medical-record-history-response.modal';
import type { PostPersonalAcademicRequest } from '$lib/view-models/mypsm/profile/profile-post-personal-academic-request.modal';

export class ProfileService {
    // maklumat Peribadi
    static async ProfileDetail(): Promise<CommonResponseDTO> {
        const response: CommonResponseDTO = await http
            .get(`personal-details/detail`)
            .json();

        return response;
    }

    //get personal detail
    static async getPersonalDetail() {
        const response: Response = await http
            .get('personal-details/detail')
            .json();

        const result = CommonResponseConvert.fromResponse(response);
        const personalDetailResult: GetPersonalDetailResponse = result.data
            ?.details as GetPersonalDetailResponse;

        return personalDetailResult;
    }

    static async editPersonalDetail(
        param: PutPersonalDetailRequest,
    ): Promise<CommonResponseDTO> {
        const response: CommonResponseDTO = await http
            .put('personal-details/detail', { body: JSON.stringify(param) })
            .json();

        return response;
    }

    static async createAcademicDetail(
        param: PostPersonalAcademicRequest,
    ): Promise<CommonResponseDTO> {
        const response: CommonResponseDTO = await http
            .post('personal-details/education', { body: JSON.stringify(param) })
            .json();

        return response;
    }

    static async createExperienceDetail(
        param: PostPersonalExperiencesRequest,
    ): Promise<CommonResponseDTO> {
        const response: CommonResponseDTO = await http
            .post('personal-details/education', { body: JSON.stringify(param) })
            .json();

        return response;
    }
    static async createActivityDetail(
        param: PostPersonalActivityRequest,
    ): Promise<CommonResponseDTO> {
        const response: CommonResponseDTO = await http
            .post('personal-details/activity', { body: JSON.stringify(param) })
            .json();

        return response;
    }
    static async createFamilyDetail(
        param: PostPersonalFamilyRequest,
    ): Promise<CommonResponseDTO> {
        const response: CommonResponseDTO = await http
            .post('personal-details/family', { body: JSON.stringify(param) })
            .json();

        return response;
    }

    static async createDependencyDetail(
        param: PostPersonalDependentRequest,
    ): Promise<CommonResponseDTO> {
        const response: CommonResponseDTO = await http
            .post('personal-details/dependent', { body: JSON.stringify(param) })
            .json();

        return response;
    }

    static async createNextOfKinDetail(
        param: PostPersonalNextOfKinRequest,
    ): Promise<CommonResponseDTO> {
        const response: CommonResponseDTO = await http
            .post('personal-details/next-of-kin', {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    static async getServiceDetail() {
        const response: CommonResponseDTO = await http
            .get('personal-details/service')
            .json();

        return response;
    }

    // Maklumat Perkhidmatan

    // static async ProfileServiceDetail(): Promise<GetPersonalServiceResponse> {
    //     const response: GetPersonalServiceResponse = await http
    //         .get(`personal-details/service`)
    //         .json();

    //     return response;
    // }

    // Maklumat Akademik
    static async ProfileEducationsDetail(): Promise<CommonResponseDTO> {
        const response: CommonResponseDTO = await http
            .get(`personal-details/educations`)
            .json();

        return response;
    }

    // Maklumat Pengalaman
    static async ProfileExperiencesDetail(): Promise<CommonResponseDTO> {
        const response: CommonResponseDTO = await http
            .get(`personal-details/experiences`)
            .json();

        return response;
    }
    // Maklumat Kegiatan
    static async ProfileActivitiesDetail(): Promise<CommonResponseDTO> {
        const response: CommonResponseDTO = await http
            .get(`personal-details/activities`)
            .json();

        return response;
    }

    // Maklumat Keluarga
    static async ProfileFamilyDetail(): Promise<CommonResponseDTO> {
        const response: CommonResponseDTO = await http
            .get(`personal-details/families`)
            .json();

        return response;
    }

    // Maklumat Tanggungan
    static async ProfileDependentDetail(): Promise<CommonResponseDTO> {
        const response: CommonResponseDTO = await http
            .get(`personal-details/dependents`)
            .json();

        return response;
    }

    // Maklumat Waris
    static async ProfileNextOfKinsDetail(): Promise<CommonResponseDTO> {
        const response: CommonResponseDTO = await http
            .get(`personal-details/next-of-kins`)
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

    static async getEmployeeAgenda(param: CommonListRequestDTO) {
        const response: CommonResponseDTO = await http
            .post('personal-details/current-agendas', {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    static async getPersonalSalaryAllowance(param: CommonListRequestDTO) {
        const response: CommonResponseDTO = await http
            .post('personal-details/salary-allowances', {
                body: JSON.stringify(param),
            })
            .json();

        return response;
    }

    static async getPersonalSalary() {
        const response: CommonResponseDTO = await http
            .get('personal-details/salary-allowances')
            .json();

        return response;
    }

    // Rekod Kesihatan
    // ================

    //Sejarah Penyakit

    static async medicalHistory(): Promise<GetPersonalMedicalRecordResponse> {
        const response: GetPersonalMedicalRecordResponse = await http
            .get(`personal-details/medical-record/history`)
            .json();

        return response;
    }

    static async getDiseases(): Promise<MedicalHistoryDiseaseNamesResponse> {
        const response: MedicalHistoryDiseaseNamesResponse = await http
            .get(`personal-details/medical-record/list-diseases`)
            .json();

        return response;
    }

    //Pemeriksaan Doktor

    //     static async medicalGeneralAssessment(): Promise<GetPersonalMedicalRecordGeneralAssessmentResponse> {
    //         const response: GetPersonalMedicalRecordGeneralAssessmentResponse =
    //             await http
    //                 .get(`personal-details/medical-record/general-assessment`)
    //                 .json();

    //         return response;
    //     }

    // static async medicalGeneralAssessment(): Promise<GetPersonalMedicalGeneralAssessmentResponse> {
    //     const response: GetPersonalMedicalGeneralAssessmentResponse = await http
    //         .get(`personal-details/medical-record/history`)
    //         .json();

    //     return response;
    // }

    static async getPersonalMedicalGenaralAssesment() {
        const response: Response = await http
            .get('personal-details/detail')
            .json();

        const result = CommonResponseConvert.fromResponse(response);
        const personalDetailResult: GetPersonalMedicalGeneralAssessmentResponse =
            result.data?.details as GetPersonalMedicalGeneralAssessmentResponse;

        return personalDetailResult;
    }
}
