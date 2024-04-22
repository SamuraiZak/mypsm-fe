import { invalidateAll } from "$app/navigation";
import { CommonResponseConstant } from "$lib/constants/core/common-response.constant";
import { CommonListRequestConvert, type CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import { CommonResponseConvert } from "$lib/dto/core/common/common-response.dto";
import type { RetirementForcedApplicationDetailRequestDTO } from "$lib/dto/mypsm/employment/retirement/retirement-force.dto";
import { UnspecifyAddDetailDTOConvert, type UnspecifyAddDetailDTO } from "$lib/dto/mypsm/employment/retirement/retirement-unspecify-add-detail.dto";
import type { RetirementEndorserDetail, RetirementRequestDTO, RetirementVoluntaryApplicationDetailRequestDTO } from "$lib/dto/mypsm/employment/retirement/retirement.dto";
import { getPromiseToast } from "$lib/helpers/core/toast.helper";
import type { RetirementEndorsement, RetirementForcedEndorsement, RetirementVoluntaryDetail } from "$lib/schemas/mypsm/employment/retirement/retirement.schema";
import http from "$lib/services/implementation/service-provider.service";
import type { Input } from "ky";

export class RetirementApplicationServices {

    //  get voluntary original retirement data
    static async getOriginalRetirementDetail() {
        try {
            let url: Input = 'employment/retirement/voluntary/retirement_date';

            const response: Response = await http
                .get(url)
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

    //  voluntary retirement application detail
    static async getRetirementVoluntaryApplicationDetail(param: RetirementVoluntaryApplicationDetailRequestDTO) {
        try {
            let url: Input = 'employment/retirement/voluntary/view';

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

    //  voluntary retirement application detail
    static async addRetirementVoluntaryDetail(param: RetirementVoluntaryDetail) {
        try {
            let url: Input = 'employment/retirement/voluntary/add';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                await invalidateAll();
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //  voluntary retirement certification
    static async addRetirementVoluntaryCertification(param: RetirementEndorsement) {
        try {
            let url: Input = 'employment/retirement/voluntary/certification';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                await invalidateAll();
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //  voluntary confirmation certification
    static async addRetirementVoluntaryConfirmation(param: RetirementEndorsement) {
        try {
            let url: Input = 'employment/retirement/voluntary/confirmation';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                await invalidateAll();
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //  voluntary retirement supportApprover
    static async addRetirementVoluntarySupportApprover(param: RetirementEndorserDetail) {
        try {
            let url: Input = 'employment/retirement/voluntary/supporter_approver';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                await invalidateAll();
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //  firstSupporter confirmation certification
    static async addFirstSupporterVoluntary(param: RetirementEndorsement) {
        try {
            let url: Input = 'employment/retirement/voluntary/first_supporter';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                await invalidateAll();
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //  secondSupporter confirmation certification
    static async addSecondSupporterVoluntary(param: RetirementEndorsement) {
        try {
            let url: Input = 'employment/retirement/voluntary/second_supporter';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                await invalidateAll();
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //  approval confirmation certification
    static async addRetirementApproval(param: RetirementEndorsement) {
        try {
            let url: Input = 'employment/retirement/voluntary/appointed_approval';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                await invalidateAll();
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //  secretaryApproval confirmation certification
    static async addRetirementSecretaryApproval(param: RetirementEndorsement) {
        try {
            let url: Input = 'employment/retirement/voluntary/secretary_approval';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                await invalidateAll();
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //  documentCertification confirmation certification
    static async addRetirementDocumentCertification(param: RetirementEndorsement) {
        try {
            let url: Input = 'employment/retirement/voluntary/document_certification';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                await invalidateAll();
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //  letterCertification confirmation certification
    static async addRetirementLetterCertification(param: RetirementEndorsement) {
        try {
            let url: Input = 'employment/retirement/voluntary/document_certification';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                await invalidateAll();
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }




    //  Forced retirement application detail
    static async getRetirementForcedApplicationDetail(param: RetirementForcedApplicationDetailRequestDTO) {
        try {
            let url: Input = 'employment/retirement/force/view';

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

    //  forced retirement certification
    static async addRetirementforcedCertification(param: RetirementForcedEndorsement) {
        try {
            let url: Input = 'employment/retirement/force/certification';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                await invalidateAll();
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }
    //  forced retirement confirm
    static async addRetirementforcedConfirmation(param: RetirementForcedEndorsement) {
        try {
            let url: Input = 'employment/retirement/force/confirmation';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                await invalidateAll();
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //  forced retirement Document
    static async addRetirementforcedDocument(param: RetirementForcedEndorsement) {
        try {
            let url: Input = 'employment/retirement/force/documents_certification';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                await invalidateAll();
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //  forced retirement Letter
    static async addRetirementforcedLetter(param: RetirementForcedEndorsement) {
        try {
            let url: Input = 'employment/retirement/force/letter_certification';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                await invalidateAll();
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

      //  Unspecify retirement application detail
      static async addRetirementUnspecifyDetail(param: RetirementVoluntaryDetail) {
        try {
            let url: Input = 'employment/retirement/unspecify/add';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                await invalidateAll();
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    //  Unspecify retirement Choosen List 
    static async addRetirementUnspecifyChoosenList(param: RetirementVoluntaryDetail) {
        try {
            let url: Input = 'employment/retirement/unspecify/chosen_list';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                await invalidateAll();
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }
      //  Unspecify retirement Document Certification 
      static async addRetirementUnspecifyDocumentCertification(param: RetirementVoluntaryDetail) {
        try {
            let url: Input = 'employment/retirement/unspecify/document_certification';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await getPromiseToast(promiseResponse);

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                await invalidateAll();
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

     //  unspecify retirement application detail
     static async getRetirementVoluntaryUnspecifyDetail(param: RetirementVoluntaryApplicationDetailRequestDTO) {
        try {
            let url: Input = 'employment/retirement/unspecify/view';

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
    

    //get employee list
    static async getUnspecifyEmployeeList(param: CommonListRequestDTO) {
        try {
            let url: Input = 'employment/retirement/unspecify/list_employee';

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

    //  Unspecify retirement Choosen add 
    static async addRetirementUnspecify(param: UnspecifyAddDetailDTO) {
        try {
            let url: Input = 'employment/retirement/unspecify/add';

            const response: Response = await http
                .post(url, {
                    body: UnspecifyAddDetailDTOConvert.toJson(param),
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

    // get unspecify retirement chosen list
    //  Unspecify retirement Choosen add 
    static async getUnspecifyRetirementChosenList(param: RetirementRequestDTO) {
        try {
            let url: Input = 'employment/retirement/unspecify/chosen_list';

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

}