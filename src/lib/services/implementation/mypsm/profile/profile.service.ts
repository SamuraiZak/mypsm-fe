import { invalidateAll } from '$app/navigation';
import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import type { CandidateIDRequestBody } from '$lib/dto/core/common/candidate-id-request.view-dto';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import type { profileIDRequestBody } from '$lib/dto/mypsm/profile/profile-employeeid-request.view-dto';
import type { Input } from 'ky';
import { getPromiseToast } from '$lib/helpers/core/toast.helper';
import http from '../../service-provider.service';
import type { CandidatePersonalRequestDTO } from '$lib/dto/mypsm/profile/personal-detail.dto';
import type { serviceRequestDTO } from '$lib/dto/mypsm/profile/service-detail.dto';
import type { academicRequestDTO } from '$lib/dto/mypsm/profile/academic-detail.dto';
import type { experiencesRequestDTO } from '$lib/dto/mypsm/profile/experience-detail.dto';
import type { dependencyRequestDTO, familyRequestDTO, nextOfKinRequestDTO } from '$lib/dto/mypsm/profile/relation-detail.dto';
import type { medicalAssessmentRequestDTO } from '$lib/dto/mypsm/profile/medical-assessment.dto';
import type { generalAssessmentRequestDTO } from '$lib/dto/mypsm/profile/general-assessment.dto';
import type { activityRequestDTO } from '$lib/dto/mypsm/profile/activity-detail.dto';



export class ProfileServices {

    //============================================
    //========= Get Personal Detail ==============
    //============================================

    static async getProfilePersonalDetails() {
        try {
            const url: Input = 'profile/personal/get';

            // get the promise response
            const promiseRes: Promise<Response> = http.get(url).json();

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


    //============================================
    //========= Add Personal Detail ==============
    //============================================

    static async addProfilePersonalDetails(param: CandidatePersonalRequestDTO) {
        try {
            const url: Input = 'profile/personal/add';

            // get the promise response
            const promiseRes: Promise<Response> = http.get(url).json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);
            //   const response: Response = await promiseRes;

            // parse the json response to object
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

    //============================================
    //========= Get Service Detail  ==============
    //============================================

    static async getProfileServiceDetails() {
        try {
            const url: Input = 'profile/employee/get';

            // get the promise response
            const promiseRes: Promise<Response> = http.get(url).json();

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


    //============================================
    //========= Add Service Detail ==============
    //============================================

    static async addProfileServiceDetails(param: serviceRequestDTO) {
        try {
            const url: Input = 'profile/personal/add';

            // get the promise response
            const promiseRes: Promise<Response> = http.get(url).json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);
            //   const response: Response = await promiseRes;

            // parse the json response to object
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

    //============================================
    //========= Get Academic Detail  ===========
    //============================================

    static async getProfileAcademicDetails() {
        try {
            const url: Input = 'profile/academic/get';

            // get the promise response
            const promiseRes: Promise<Response> = http.get(url).json();

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

     //============================================
    //========= Add Academic Detail ==============
    //============================================

    static async addProfileAcademicDetails(param: academicRequestDTO) {
        try {
            const url: Input = 'profile/academic/add';

            // get the promise response
            const promiseRes: Promise<Response> = http.get(url).json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);
            //   const response: Response = await promiseRes;

            // parse the json response to object
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


     //============================================
    //========= Get experience Detail  ===========
    //============================================

    static async getProfileExperienceDetails() {
        try {
            const url: Input = 'profile/experience/get';

            // get the promise response
            const promiseRes: Promise<Response> = http.get(url).json();

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

      //============================================
    //========= Add experience Detail ==============
    //============================================

    static async addProfileExperienceDetails(param: experiencesRequestDTO) {
        try {
            const url: Input = 'profile/experience/add';

            // get the promise response
            const promiseRes: Promise<Response> = http.get(url).json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);
            //   const response: Response = await promiseRes;

            // parse the json response to object
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

      //============================================
    //========= Get Activity Detail  ===========
    //============================================

    static async getProfileActivityDetails() {
        try {
            const url: Input = 'profile/activity/get';

            // get the promise response
            const promiseRes: Promise<Response> = http.get(url).json();

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

     //============================================
    //========= Add Activity Detail ==============
    //============================================

    static async addProfileActivityDetails(param: activityRequestDTO) {
        try {
            const url: Input = 'profile/activity/add';

            // get the promise response
            const promiseRes: Promise<Response> = http.get(url).json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);
            //   const response: Response = await promiseRes;

            // parse the json response to object
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

    //============================================
    //========= Get Family Detail  ===========
    //============================================

    static async getProfileFamilyDetails() {
        try {
            const url: Input = 'profile/family/get';

            // get the promise response
            const promiseRes: Promise<Response> = http.get(url).json();

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

    //============================================
    //========= Add Family Detail ==============
    //============================================

    static async addProfileFamilyDetails(param: familyRequestDTO) {
        try {
            const url: Input = 'profile/family/add';

            // get the promise response
            const promiseRes: Promise<Response> = http.get(url).json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);
            //   const response: Response = await promiseRes;

            // parse the json response to object
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

     //============================================
    //========= Get Dependent Detail  ===========
    //============================================

    static async getProfileDependentDetails() {
        try {
            const url: Input = 'profile/dependent/get';

            // get the promise response
            const promiseRes: Promise<Response> = http.get(url).json();

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
      //============================================
    //========= Add Dependent Detail ==============
    //============================================

    static async addProfileDependentDetails(param: dependencyRequestDTO) {
        try {
            const url: Input = 'profile/dependent/add';

            // get the promise response
            const promiseRes: Promise<Response> = http.get(url).json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);
            //   const response: Response = await promiseRes;

            // parse the json response to object
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

    //============================================
    //========= Get Next of Kin Detail  ===========
    //============================================

    static async getProfileNextOfKinDetails() {
        try {
            const url: Input = 'profile/next_of_kin/get';

            // get the promise response
            const promiseRes: Promise<Response> = http.get(url).json();

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

    //============================================
    //========= AddNext of Kin Detail ==============
    //============================================

    static async addProfileNextOfKinDetails(param: nextOfKinRequestDTO) {
        try {
            const url: Input = 'profile/next_of_kin/add';

            // get the promise response
            const promiseRes: Promise<Response> = http.get(url).json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);
            //   const response: Response = await promiseRes;

            // parse the json response to object
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

    //============================================
    //========= Salary Allowance List ============
    //============================================

    static async getSalaryAllowanceListDetails(
        param: CommonListRequestDTO,
    ) {
        try {
            const url: Input = 'profile/salary_allowance';

            // get the promise response
            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            // await toast for resolved or rejected state
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

    //============================================
    //====== Get Medical Assesment Detail  =======
    //============================================

    static async getProfileMedicalAssessmentDetails() {
        try {
            const url: Input = 'profile/assessment/medical/get';

            // get the promise response
            const promiseRes: Promise<Response> = http.get(url).json();

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

    //============================================
    //===== Add  Medical Assesment Detail ========
    //============================================

    static async addProfileMedicalAssessmentDetails(param: medicalAssessmentRequestDTO) {
        try {
            const url: Input = 'profile/assessment/medical/add';

            // get the promise response
            const promiseRes: Promise<Response> = http.get(url).json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);
            //   const response: Response = await promiseRes;

            // parse the json response to object
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

    //============================================
    //====== Get General Assesment Detail  =======
    //============================================

    static async getProfileGeneralAssessmentDetails() {
        try {
            const url: Input = 'profile/assessment/general/get';

            // get the promise response
            const promiseRes: Promise<Response> = http.get(url).json();

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

    //============================================
    //===== Add  General Assesment Detail ========
    //============================================

    static async addProfileGeneralAssessmentDetails(param: generalAssessmentRequestDTO) {
        try {
            const url: Input = 'profile/assessment/general/add';

            // get the promise response
            const promiseRes: Promise<Response> = http.get(url).json();

            // await toast for resolved or rejected state
            const response: Response = await getPromiseToast(promiseRes);
            //   const response: Response = await promiseRes;

            // parse the json response to object
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


}
