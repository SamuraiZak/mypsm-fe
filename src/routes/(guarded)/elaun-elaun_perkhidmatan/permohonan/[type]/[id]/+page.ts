import { goto, invalidateAll } from '$app/navigation';
import { AllowanceTypeConstant } from '$lib/constants/core/allowance-type.constant';
import { CommonResponseConstant } from '$lib/constants/core/common-response.constant.js';
import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant.js';
import { RoleConstant } from '$lib/constants/core/role.constant.js';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DocumentDTO } from '$lib/dto/core/document/document.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
import type {
    AllowanceAplicationDetailDTO,
    AllowanceCeremonyClothingDetailDTO,
    AllowanceDetailRequestDTO,
    AllowanceEndorsementDTO,
    AllowanceEndorserDetailDTO,
    AllowanceFuneralArrangmentDetailDTO,
    AllowanceHouseMovingDetailDTO,
    AllowanceInsurancePaymentDetailsDTO,
    AllowancePassportPaymentDetailsDTO,
    AllowanceTypeDTO,
    AllowanceWelfareFundDetailDTO,
    AllowanceWinterClothingDetailDTO,
} from '$lib/dto/mypsm/allowance/allowance.dto';
import { DocumentHelper } from '$lib/helpers/core/document.helper';
import { LookupHelper } from '$lib/helpers/core/lookup.helper';
import {
    AllowanceCeremonyClothingSchema,
    AllowanceEndorsementSchema,
    AllowanceEndorserDetailSchema,
    AllowanceFamilyDetailSchema,
    AllowanceFuneralArrangementSchema,
    AllowanceHouseMovingSchema,
    AllowanceInsurancePaymentSchema,
    AllowancePassportPaymentSchema,
    AllowanceStateVisitSchema,
    AllowanceWelfareFundSchema,
    AllowanceWinterClothingSchema,
} from '$lib/schemas/mypsm/allowance/allowance.schema';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { AllowanceServices } from '$lib/services/implementation/mypsm/allowance/allowance.service';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({ params }) {
    const currentRoleCode: string =
        localStorage.getItem(LocalStorageKeyConstant.currentRoleCode) ??
        RoleConstant.kakitangan.code;

    let mode: string = 'kakitangan';

    switch (currentRoleCode) {
        case RoleConstant.kakitangan.code:
            mode = 'kakitangan';
            break;
        case RoleConstant.urusSetiaElaunElaunPerkhidmatan.code:
            mode = 'urusetia';
            break;
        case RoleConstant.pengarahBahagian.code:
            mode = 'pengarah';
            break;
        case RoleConstant.pengarahNegeri.code:
            mode = 'pengarah';
            break;
        case RoleConstant.penyokong.code:
            mode = 'penyokong';
            break;
        case RoleConstant.pelulus.code:
            mode = 'pelulus';
            break;
        default:
            mode = 'kakitangan';
            break;
    }
    // set default application id
    let currentApplicationId: number = 0;

    // set default allowance type
    let currentAllowanceType: AllowanceTypeDTO =
        AllowanceTypeConstant.list.find(
            (item) => item.description === params.type,
        ) ?? AllowanceTypeConstant.ceremonyClothing;

    console.log(params.type);

    // set default application detail
    let currentApplicationDetail: AllowanceAplicationDetailDTO = {
        applicationDetail: null,
        directorSupport: null,
        verification: null,
        supportApprover: null,
        support: null,
        approval: null,
    };

    // get allowance type lookup
    // set default allowance dropdown
    let allowanceTypeOption: DropdownDTO[] = [];

    // fetch allowance type
    const allowanceTypeResponse: CommonResponseDTO =
        await LookupServices.getAllowanceTypeEnums();

    if (allowanceTypeResponse.status == 'success') {
        const allowanceTypeLookup: LookupDTO[] = allowanceTypeResponse.data
            ?.dataList as LookupDTO[];

        allowanceTypeOption =
            LookupHelper.toDropdownProper(allowanceTypeLookup);
    }

    // get endorsement option
    let allowanceEndorsementOption: DropdownDTO[] = [
        {
            value: true,
            name: 'Ya',
        },
        {
            value: false,
            name: 'Tidak',
        },
    ];

    // create detail form for each type
    // ceremony clothing
    const ceremonyClothingForm = await superValidate(
        zod(AllowanceCeremonyClothingSchema),
    );

    // winter clothing
    const winterClothingForm = await superValidate(
        zod(AllowanceWinterClothingSchema),
    );

    // state visit
    const stateVisitForm = await superValidate(zod(AllowanceStateVisitSchema));

    // funeral arrangement
    const funeralArrangementForm = await superValidate(
        zod(AllowanceFuneralArrangementSchema),
    );

    // welfare fund
    const welfareFundForm = await superValidate(
        zod(AllowanceWelfareFundSchema),
    );

    // house moving
    const houseMovingForm = await superValidate(
        zod(AllowanceHouseMovingSchema),
    );

    // passport payment details
    const passportPaymentForm = await superValidate(
        zod(AllowancePassportPaymentSchema),
    );

    // insurance payment
    const insurancePaymentForm = await superValidate(
        zod(AllowanceInsurancePaymentSchema),
    );

    // create director endorsement form
    const directorEndorsementForm = await superValidate(
        zod(AllowanceEndorsementSchema),
    );

    // create secretary check form
    const secretaryCheckForm = await superValidate(
        zod(AllowanceEndorsementSchema),
    );

    // create endorser detail form
    const endorserDetailForm = await superValidate(
        zod(AllowanceEndorserDetailSchema),
    );

    // create supporter endorsement form
    const supporterEndorsementForm = await superValidate(
        zod(AllowanceEndorsementSchema),
    );

    // create approver endorsement form
    const approverEndorsementForm = await superValidate(
        zod(AllowanceEndorsementSchema),
    );

    // cargo shipping
    // set application id to actual record id
    currentApplicationId = parseInt(params.id);

    // fetch the application detail
    // set default response value
    let detailResponse: CommonResponseDTO = CommonResponseConstant.httpError;

    // set request parameters
    const detailRequest: AllowanceDetailRequestDTO = {
        allowanceId: currentApplicationId,
        allowanceTypeCode: currentAllowanceType.code,
    };

    // send the request
    detailResponse =
        await AllowanceServices.getApplicationDetail(detailRequest);

    // set the detail
    if (detailResponse.status == 'success') {
        currentApplicationDetail = detailResponse.data?.details;
        switch (currentAllowanceType) {
            // 1. ceremony clothing
            case AllowanceTypeConstant.ceremonyClothing:
                let tempDetailCeremonyClothing: AllowanceCeremonyClothingDetailDTO =
                    detailResponse.data?.details
                        .applicationDetail as AllowanceCeremonyClothingDetailDTO;
                currentApplicationDetail.applicationDetail =
                    tempDetailCeremonyClothing;
                ceremonyClothingForm.data = {
                    allowanceTypeCode:
                        tempDetailCeremonyClothing.allowanceTypeCode,
                    reason: tempDetailCeremonyClothing.reason,
                    personal: tempDetailCeremonyClothing.personal,
                    partner: tempDetailCeremonyClothing.partner,
                };
                break;

            // 2. winter clothing
            case AllowanceTypeConstant.winterClothing:
                let tempDetailWinterClothing: AllowanceWinterClothingDetailDTO =
                    detailResponse.data?.details
                        .applicationDetail as AllowanceWinterClothingDetailDTO;
                currentApplicationDetail.applicationDetail =
                    tempDetailWinterClothing;
                winterClothingForm.data = {
                    allowanceTypeCode:
                        tempDetailWinterClothing.allowanceTypeCode,
                    reason: tempDetailWinterClothing.reason,
                    personal: tempDetailWinterClothing.personal,
                    partner: tempDetailWinterClothing.partner,
                };
                break;

            // 3. state visit

            // 4. funeral arrangement
            case AllowanceTypeConstant.funeralArrangement:
                let tempFuneralArrangement: AllowanceFuneralArrangmentDetailDTO =
                    detailResponse.data?.details
                        .applicationDetail as AllowanceFuneralArrangmentDetailDTO;
                currentApplicationDetail.applicationDetail =
                    tempFuneralArrangement;
                funeralArrangementForm.data = {
                    allowanceTypeCode: tempFuneralArrangement.allowanceTypeCode,
                    deathDate: tempFuneralArrangement.deathDate,
                    deathTime: tempFuneralArrangement.deathTime,
                };
                break;

            // 5. welfare fund
            case AllowanceTypeConstant.welfareFund:
                let tempWelfareFund: AllowanceWelfareFundDetailDTO =
                    detailResponse.data?.details
                        .applicationDetail as AllowanceWelfareFundDetailDTO;
                currentApplicationDetail.applicationDetail = tempWelfareFund;
                welfareFundForm.data = {
                    allowanceTypeCode: tempWelfareFund.allowanceTypeCode,
                    welfareTypeCode: tempWelfareFund.welfareTypeCode,
                };
                break;

            // 6. house moving
            case AllowanceTypeConstant.houseMoving:
                let tempHouseMoving: AllowanceHouseMovingDetailDTO =
                    detailResponse.data?.details
                        .applicationDetail as AllowanceHouseMovingDetailDTO;
                currentApplicationDetail.applicationDetail = tempHouseMoving;
                houseMovingForm.data = {
                    allowanceTypeCode: tempHouseMoving.allowanceTypeCode,
                    movingDate: tempHouseMoving.movingDate,
                    oldAddress: tempHouseMoving.oldAddress,
                    newAddress: tempHouseMoving.newAddress,
                };
                break;

            // 7. passport payment
            case AllowanceTypeConstant.passportPayment:
                let passportPayment: AllowancePassportPaymentDetailsDTO =
                    detailResponse.data?.details
                        .applicationDetail as AllowancePassportPaymentDetailsDTO;
                currentApplicationDetail.applicationDetail = passportPayment;
                passportPaymentForm.data = {
                    allowanceTypeCode: passportPayment.allowanceTypeCode,
                    renewDate: passportPayment.renewDate,
                    reason: passportPayment.reason,
                };
                break;

            // 8. insurance payment
            case AllowanceTypeConstant.insurancePayment:
                let tempInsurancePayment: AllowanceInsurancePaymentDetailsDTO =
                    detailResponse.data?.details
                        .applicationDetail as AllowanceInsurancePaymentDetailsDTO;
                currentApplicationDetail.applicationDetail =
                    tempInsurancePayment;
                insurancePaymentForm.data = {
                    allowanceTypeCode: tempInsurancePayment.allowanceTypeCode,
                    regionCode: tempInsurancePayment.regionCode,
                    insuranceType: tempInsurancePayment.insuranceType,
                    startDate: tempInsurancePayment.startDate,
                    endDate: tempInsurancePayment.endDate,
                    reason: tempInsurancePayment.reason,
                };
                break;
            default:
                break;
        }

        // director endorsement
        if (currentApplicationDetail.directorSupport != null) {
            directorEndorsementForm.data = {
                allowanceId:
                    currentApplicationDetail.directorSupport.allowanceId,
                allowanceTypeCode:
                    currentApplicationDetail.directorSupport.allowanceTypeCode,
                status: currentApplicationDetail.directorSupport.status,
                remark: currentApplicationDetail.directorSupport.remark,
            };
        } else {
            directorEndorsementForm.data.allowanceId = currentApplicationId;
            directorEndorsementForm.data.allowanceTypeCode =
                currentAllowanceType.code;
        }

        // secretary check
        if (currentApplicationDetail.verification != null) {
            secretaryCheckForm.data = {
                allowanceId: currentApplicationDetail.verification.allowanceId,
                allowanceTypeCode:
                    currentApplicationDetail.verification.allowanceTypeCode,
                status: currentApplicationDetail.verification.status,
                remark: currentApplicationDetail.verification.remark,
            };
        } else {
            secretaryCheckForm.data.allowanceId = currentApplicationId;
            secretaryCheckForm.data.allowanceTypeCode =
                currentAllowanceType.code;
        }

        // endorser detail
        if (currentApplicationDetail.supportApprover != null) {
            endorserDetailForm.data = {
                allowanceId:
                    currentApplicationDetail.supportApprover.allowanceId,
                allowanceTypeCode:
                    currentApplicationDetail.supportApprover.allowanceTypeCode,
                supporter: currentApplicationDetail.supportApprover.supporter,
                approver: currentApplicationDetail.supportApprover.approver,
            };
        } else {
            endorserDetailForm.data.allowanceId = currentApplicationId;
            endorserDetailForm.data.allowanceTypeCode =
                currentAllowanceType.code;
        }

        // supporter
        if (currentApplicationDetail.support != null) {
            supporterEndorsementForm.data = {
                allowanceId: currentApplicationDetail.support.allowanceId,
                allowanceTypeCode:
                    currentApplicationDetail.support.allowanceTypeCode,
                status: currentApplicationDetail.support.status,
                remark: currentApplicationDetail.support.remark,
            };
        } else {
            supporterEndorsementForm.data.allowanceId = currentApplicationId;
            supporterEndorsementForm.data.allowanceTypeCode =
                currentAllowanceType.code;
        }

        // approver
        if (currentApplicationDetail.approval != null) {
            approverEndorsementForm.data = {
                allowanceId: currentApplicationDetail.approval.allowanceId,
                allowanceTypeCode:
                    currentApplicationDetail.approval.allowanceTypeCode,
                status: currentApplicationDetail.approval.status,
                remark: currentApplicationDetail.approval.remark,
            };
        } else {
            approverEndorsementForm.data.allowanceId = currentApplicationId;
            approverEndorsementForm.data.allowanceTypeCode =
                currentAllowanceType.code;
        }
    }

    const welfareTypeResponse: CommonResponseDTO =
        await LookupServices.getWelfareTypeEnums();

    const welfareTypeOptions: DropdownDTO[] = LookupHelper.toDropdownProper(
        welfareTypeResponse.data?.dataList as LookupDTO[],
    );

    const areaResponse: CommonResponseDTO = await LookupServices.getAreaEnums();

    const areaOptions: DropdownDTO[] = LookupHelper.toDropdownProper(
        areaResponse.data?.dataList as LookupDTO[],
    );

    const suppAppResponse: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 10000,
        orderBy: 'name',
        orderType: 0,
        filter: {
            program: 'TETAP',
            employeeNumber: null,
            name: null,
            identityCard: null,
            scheme: null,
            grade: null,
            position: null,
        },
    };
    const supporterApproverResponse: CommonResponseDTO =
        await LookupServices.getEmployeeList(suppAppResponse);

    const supporterApproverLookup: DropdownDTO[] =
        LookupServices.setSelectOptionSupporterAndApproverKP(
            supporterApproverResponse,
        );

    return {
        props: {
            currentRoleCode,
            currentApplicationId,
            currentAllowanceType,
            currentApplicationDetail,
            allowanceTypeOption,
            allowanceEndorsementOption,
            welfareTypeOptions,
            areaOptions,
            mode,
            supporterApproverLookup,
        },
        forms: {
            ceremonyClothingForm,
            winterClothingForm,
            stateVisitForm,
            funeralArrangementForm,
            welfareFundForm,
            houseMovingForm,
            passportPaymentForm,
            insurancePaymentForm,
            directorEndorsementForm,
            secretaryCheckForm,
            endorserDetailForm,
            supporterEndorsementForm,
            approverEndorsementForm,
        },
    };
}

export async function _submitDirectorEndorsementForm(
    params: AllowanceEndorsementDTO,
) {
    const form = await superValidate(params, zod(AllowanceEndorsementSchema));

    let response: CommonResponseDTO = CommonResponseConstant.httpError;
    let detailResponse: CommonResponseDTO = CommonResponseConstant.httpError;
    let detail: AllowanceAplicationDetailDTO = {
        applicationDetail: null,
        directorSupport: null,
        verification: null,
        supportApprover: null,
        support: null,
        approval: null,
    };

    if (form.valid) {
        response = await AllowanceServices.directorEndorsement(params);

        if (response.status == 'success') {
            let detailParam: AllowanceDetailRequestDTO = {
                allowanceId: params.allowanceId,
                allowanceTypeCode: params.allowanceTypeCode,
            };

            detailResponse =
                await AllowanceServices.getApplicationDetail(detailParam);

            if (detailResponse.status == 'success') {
                detail = detailResponse.data?.details;
            }
        }
    }

    return {
        response,
        detailResponse,
        detail,
    };
}

export async function _submitSecretaryCheckForm(
    params: AllowanceEndorsementDTO,
) {
    const form = await superValidate(params, zod(AllowanceEndorsementSchema));

    let response: CommonResponseDTO = CommonResponseConstant.httpError;
    let detailResponse: CommonResponseDTO = CommonResponseConstant.httpError;
    let detail: AllowanceAplicationDetailDTO = {
        applicationDetail: null,
        directorSupport: null,
        verification: null,
        supportApprover: null,
        support: null,
        approval: null,
    };

    if (form.valid) {
        response = await AllowanceServices.secretaryCheck(params);

        if (response.status == 'success') {
            let detailParam: AllowanceDetailRequestDTO = {
                allowanceId: params.allowanceId,
                allowanceTypeCode: params.allowanceTypeCode,
            };

            detailResponse =
                await AllowanceServices.getApplicationDetail(detailParam);

            if (detailResponse.status == 'success') {
                detail = detailResponse.data?.details;
            }
        }
    }

    return {
        response,
        detailResponse,
        detail,
    };
}

export async function _submitEndorserDetailForm(
    params: AllowanceEndorserDetailDTO,
) {
    const form = await superValidate(params, zod(AllowanceEndorsementSchema));

    let response: CommonResponseDTO = CommonResponseConstant.httpError;
    let detailResponse: CommonResponseDTO = CommonResponseConstant.httpError;
    let detail: AllowanceAplicationDetailDTO = {
        applicationDetail: null,
        directorSupport: null,
        verification: null,
        supportApprover: null,
        support: null,
        approval: null,
    };

    if (form.valid) {
        response = await AllowanceServices.endorserDetail(params);

        if (response.status == 'success') {
            let detailParam: AllowanceDetailRequestDTO = {
                allowanceId: params.allowanceId,
                allowanceTypeCode: params.allowanceTypeCode,
            };

            detailResponse =
                await AllowanceServices.getApplicationDetail(detailParam);

            if (detailResponse.status == 'success') {
                detail = detailResponse.data?.details;
            }
        }
    }

    return {
        response,
        detailResponse,
        detail,
    };
}

export async function _submitSupporterEndorsementForm(
    params: AllowanceEndorsementDTO,
) {
    const form = await superValidate(params, zod(AllowanceEndorsementSchema));

    let response: CommonResponseDTO = CommonResponseConstant.httpError;
    let detailResponse: CommonResponseDTO = CommonResponseConstant.httpError;
    let detail: AllowanceAplicationDetailDTO = {
        applicationDetail: null,
        directorSupport: null,
        verification: null,
        supportApprover: null,
        support: null,
        approval: null,
    };

    if (form.valid) {
        response = await AllowanceServices.supporterEndorsement(params);

        if (response.status == 'success') {
            let detailParam: AllowanceDetailRequestDTO = {
                allowanceId: params.allowanceId,
                allowanceTypeCode: params.allowanceTypeCode,
            };

            detailResponse =
                await AllowanceServices.getApplicationDetail(detailParam);

            if (detailResponse.status == 'success') {
                detail = detailResponse.data?.details;
            }
        }
    }

    return {
        response,
        detailResponse,
        detail,
    };
}

export async function _submitApproverEndorsementForm(
    params: AllowanceEndorsementDTO,
) {
    const form = await superValidate(params, zod(AllowanceEndorsementSchema));

    let response: CommonResponseDTO = CommonResponseConstant.httpError;
    let detailResponse: CommonResponseDTO = CommonResponseConstant.httpError;
    let detail: AllowanceAplicationDetailDTO = {
        applicationDetail: null,
        directorSupport: null,
        verification: null,
        supportApprover: null,
        support: null,
        approval: null,
    };

    if (form.valid) {
        response = await AllowanceServices.approverEndorsement(params);

        if (response.status == 'success') {
            let detailParam: AllowanceDetailRequestDTO = {
                allowanceId: params.allowanceId,
                allowanceTypeCode: params.allowanceTypeCode,
            };

            detailResponse =
                await AllowanceServices.getApplicationDetail(detailParam);

            if (detailResponse.status == 'success') {
                detail = detailResponse.data?.details;
            }
        }
    }

    return {
        response,
        detailResponse,
        detail,
    };
}
