// ===============================================================
// Medical Services
// ===============================================================

import { invalidateAll } from '$app/navigation';
import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import { commonIdRequestDTOConvert, type commonIdRequestDTO } from '$lib/dto/core/common/id-request.dto';
import { ClinicPanelProfileConvert, type ClinicPanelProfile } from '$lib/dto/mypsm/perubatan/clinic-panel-profile.dto';
import { MedicalClinicApplicationConvert, type MedicalClinicApplication } from '$lib/dto/mypsm/perubatan/medical-clinic-application.dto';
import { getPromiseToast } from '$lib/helpers/core/toast.helper';
import http from '$lib/services/implementation/service-provider.service';
import type { Input } from 'ky';

export class MedicalServices {

    //==============================================================
    // Kakitangan    
    //==============================================================
    static async getMedicalClaimList(param: CommonListRequestDTO) {
        try {
            let url: Input = 'medical/employee_claim/list';

            const response: Response = await http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }
    // get medical employee detail
    static async getMedicalEmployeeDetail(param: commonIdRequestDTO) {
        try {
            let url: Input = 'medical/clinic/employee/get';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
                })
                .json();

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }


    //==============================================================
    // Urus Setia    
    //==============================================================
    // Tuntutan Klinik Panel
    //==============================================================
    static async getMedicalClinicPanelClaimList(param: CommonListRequestDTO) {
        try {
            let url: Input = 'medical/clinic_claim/list';

            const response: Response = await http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }
    //==============================================================
    // Urus Setia    
    //==============================================================
    // Permohonan Klinik Panel
    //==============================================================
    //edit clinic panel profile
    static async addClinicApplication(param: MedicalClinicApplication) {
        try {
            let url: Input = 'medical/clinic/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: MedicalClinicApplicationConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }



    //==============================================================
    // Klinik Panel    
    //==============================================================
    // Profile
    //==============================================================

    //get clinic panel profile
    static async getClinicPanelProfile() {
        try {
            const url: Input = 'medical/clinic_panel/profile/get';

            // get the promise response
            const promiseRes: Promise<Response> = http.post(url).json();

            // await toast for resolved or rejected state
            // const response: Response = await getPromiseToast(promiseRes);
            const response: Response = await promiseRes;

            // parse the json response to object
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }
    //edit clinic panel profile
    static async editClinicPanelProfile(param: ClinicPanelProfile) {
        try {
            let url: Input = 'medical/clinic_panel/profile/edit';

            const promiseRes: Promise<Response> = http
                .put(url, {
                    body: ClinicPanelProfileConvert.toJson(param),
                })
                .json();

            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }


    //==============================================================
    // Maklumat Bil Rawatan
    //==============================================================
    //get treatment bill list
    static async getTreatmentBill(param: CommonListRequestDTO) {
        try {
            let url: Input = 'medical/clinic/treatment_bill/get';

            const response: Response = await http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //get employee detail
    static async getClinicPanelEmployeeDetail(param: commonIdRequestDTO) {
        try {
            let url: Input = 'medical/clinic/employee/get';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
                })
                .json();

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }
    //get patient detail
    static async getClinicPanelPatientDetail(param: commonIdRequestDTO) {
        try {
            let url: Input = 'medical/clinic/patient/get';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
                })
                .json();

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }
    //get treatment details
    static async getClinicPanelTreatmentDetail(param: commonIdRequestDTO) {
        try {
            let url: Input = 'medical/clinic/treatment/get';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
                })
                .json();

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //==============================================================
    // Maklumat Kakitangan
    //==============================================================
    //get treatment details



    //==============================================================
    // Sejarah Tuntutan
    //==============================================================
    //get claim history list
    static async getClinicPanelClaimHistory(param: CommonListRequestDTO) {
        try {
            let url: Input = 'medical/clinic_panel/history/list';

            const response: Response = await http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }
    //get claim history employee detail
    static async getClinicPanelClaimEmployee(param: commonIdRequestDTO) {
        try {
            let url: Input = 'medical/clinic/employee/get';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
                })
                .json();

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }
    // get claim history patient detail
    static async getClinicPanelClaimPatient(param: commonIdRequestDTO) {
        try {
            let url: Input = 'medical/clinic/patient/get';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
                })
                .json();

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //==============================================================
    // Bil Tuntutan Panel Klinik
    //==============================================================
    //get bil tuntutan table
    static async getClinicPanelClaimList(param: CommonListRequestDTO) {
        try {
            let url: Input = 'medical/clinic_panel/claim/list';

            const response: Response = await http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
                })
                .json();

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }
    //get bil tuntutan detail
    static async getClinicPanelClaimDetail(param: commonIdRequestDTO) {
        try {
            let url: Input = 'medical/clinic_panel/claim/get';

            const response: Response = await http
                .post(url, {
                    body: commonIdRequestDTOConvert.toJson(param),
                })
                .json();

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }
}
