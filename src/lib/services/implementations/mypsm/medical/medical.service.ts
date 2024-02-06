// ===============================================================
// Medical Services
// ===============================================================

import { CommonResponseConstant } from '$lib/constants/core/common-response-constant';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import {
    CommonRequestConvert,
    type CommonRequestDTO,
} from '$lib/dto/core/common/common-request.dto';
import {
    CommonResponseConvert,
    type CommonResponseDTO,
} from '$lib/dto/core/common/common-response.dto';
import {
    AddClinicAppRequestConvert,
    type AddClinicAppRequestDTO,
} from '$lib/dto/mypsm/medical/application/add-clinic-app-request.dto';
import http from '$lib/services/provider/service-provider.service';
import type { Input } from 'ky';

export class MedicalServices {
    static async getKPEmployeeList(param: CommonListRequestDTO) {
        // fetch data
        const response: Response = await http
            .post('clinics/employees', {
                body: CommonListRequestConvert.toJson(param),
            })
            .json();

        return CommonResponseConvert.fromResponse(response);
    }

    static async getClinicApplicationList(param: CommonListRequestDTO) {
        try {
            let url: Input = 'medicals/clinics';

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

    // =================================================================================
    //  Add Panel Clinic Process Starts Here
    // =================================================================================
    // add clinic application
    static async addClinicApplication(param: object) {
        try {
            let url: Input = 'medicals/add-clinic';

            const response: Response = await http
                .post(url, {
                    body: JSON.stringify(param),
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

    // verification
    static async verifyClinicApp(param: object) {
        try {
            let url: Input = 'medicals/edit-clinic-process';

            const response: Response = await http
                .put(url, {
                    body: JSON.stringify(param),
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

    // add approver and supporter
    static async addClinicAppApproverSupporter(param: object) {
        try {
            let url: Input =
                'medicals/edit-clinic-approve-process-verification';

            const response: Response = await http
                .post(url, {
                    body: JSON.stringify(param),
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

    // approval
    static async approveClinicApp(param: object) {
        try {
            let url: Input = 'medicals/edit-clinic-approve-process-approval';

            const response: Response = await http
                .post(url, {
                    body: JSON.stringify(param),
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

    // support
    static async supportClinicApp(param: object) {
        try {
            let url: Input = 'medicals/edit-clinic-approve-process-support';

            const response: Response = await http
                .post(url, {
                    body: JSON.stringify(param),
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

    // support
    static async editClinicDetails(param: object) {
        try {
            let url: Input = 'medicals/edit-clinic';

            const response: Response = await http
                .post(url, {
                    body: JSON.stringify(param),
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

    // =================================================================================
    //  Add Panel Clinic Process Ends Here
    // =================================================================================

    static async getClinicAppDetail(param: CommonRequestDTO) {
        try {
            let url: Input = 'medicals/get-clinic';

            const response: Response = await http
                .post(url, {
                    body: CommonRequestConvert.toJson(param),
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
