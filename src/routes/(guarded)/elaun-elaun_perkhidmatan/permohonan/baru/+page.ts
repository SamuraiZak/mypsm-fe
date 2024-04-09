import { goto, invalidateAll } from '$app/navigation';
import { AllowanceTypeConstant } from '$lib/constants/core/allowance-type.constant';
import { CommonResponseConstant } from '$lib/constants/core/common-response.constant.js';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DocumentDTO } from '$lib/dto/core/document/document.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
import type {
    AllowanceAplicationDetailDTO,
    AllowanceCeremonyClothingDetailDTO,
    AllowanceDetailRequestDTO,
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

export async function load() {
    // set default allowance type
    let currentAllowanceType: AllowanceTypeDTO =
        AllowanceTypeConstant.ceremonyClothing;

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

    const welfareTypeResponse: CommonResponseDTO =
        await LookupServices.getWelfareTypeEnums();

    const welfareTypeOptions: DropdownDTO[] = LookupHelper.toDropdownProper(
        welfareTypeResponse.data?.dataList as LookupDTO[],
    );

    const areaResponse: CommonResponseDTO = await LookupServices.getAreaEnums();

    const areaOptions: DropdownDTO[] = LookupHelper.toDropdownProper(
        areaResponse.data?.dataList as LookupDTO[],
    );

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

    // cargo shipping

    // handle data
    // set allowanceTypeCode for each detail form
    ceremonyClothingForm.data.allowanceTypeCode =
        AllowanceTypeConstant.ceremonyClothing.code;
    winterClothingForm.data.allowanceTypeCode =
        AllowanceTypeConstant.winterClothing.code;
    stateVisitForm.data.allowanceTypeCode =
        AllowanceTypeConstant.stateVisit.code;
    funeralArrangementForm.data.allowanceTypeCode =
        AllowanceTypeConstant.funeralArrangement.code;
    welfareFundForm.data.allowanceTypeCode =
        AllowanceTypeConstant.welfareFund.code;
    houseMovingForm.data.allowanceTypeCode =
        AllowanceTypeConstant.houseMoving.code;
    passportPaymentForm.data.allowanceTypeCode =
        AllowanceTypeConstant.passportPayment.code;
    insurancePaymentForm.data.allowanceTypeCode =
        AllowanceTypeConstant.insurancePayment.code;

    return {
        props: {
            currentAllowanceType,
            allowanceTypeOption,
            allowanceEndorsementOption,
            welfareTypeOptions,
            areaOptions,
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
        },
    };
}

// 1. ceremony clothing
export async function _submitCeremonyClothingForm(
    data: AllowanceCeremonyClothingDetailDTO,
    files: FileList,
) {
    // creating the string
    _ceremonyClothingToJson(files, data).then(async (output) => {
        const response: CommonResponseDTO =
            await AllowanceServices.addCeremonyClothingDetail(output);

        if (response.status == 'success') {
            // get the info from the response
            let currentAllowanceType: AllowanceTypeDTO =
                AllowanceTypeConstant.list.find(
                    (item) =>
                        item.code == response.data?.details.allowanceTypeCode,
                ) ?? AllowanceTypeConstant.ceremonyClothing;
            let currentApplicationId: number =
                response.data?.details.allowanceId;
            // set the url
            let url =
                '/elaun-elaun_perkhidmatan/permohonan/' +
                currentAllowanceType.description +
                '/' +
                currentApplicationId;

            // redirect to detail page
            setTimeout(() => {
                goto(url);
            }, 1000);
        }
    });
}

async function _ceremonyClothingToJson(
    fileList: FileList,
    formData: AllowanceCeremonyClothingDetailDTO,
) {
    let resultObject: AllowanceCeremonyClothingDetailDTO = {
        documents: [],
        allowanceTypeCode: formData.allowanceTypeCode,
        reason: formData.reason,
        personal: formData.personal,
        partner: formData.partner,
    };

    for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const base64String = await DocumentHelper.toBase64(file);
        const documentObject: DocumentDTO = {
            base64: base64String,
            name: file.name,
        };
        resultObject.documents?.push(documentObject);
    }

    return JSON.stringify(resultObject);
}

// 2. winter clothing
export async function _submitWinterClothingForm(
    data: AllowanceWinterClothingDetailDTO,
    files: FileList,
) {
    // creating the string
    _ceremonyWinterToJson(files, data).then(async (output) => {
        const response: CommonResponseDTO =
            await AllowanceServices.addWinterClothingDetail(output);

        if (response.status == 'success') {
            // get the info from the response
            let currentAllowanceType: AllowanceTypeDTO =
                AllowanceTypeConstant.list.find(
                    (item) =>
                        item.code == response.data?.details.allowanceTypeCode,
                ) ?? AllowanceTypeConstant.winterClothing;
            let currentApplicationId: number =
                response.data?.details.allowanceId;
            // set the url
            let url =
                '/elaun-elaun_perkhidmatan/permohonan/' +
                currentAllowanceType.description +
                '/' +
                currentApplicationId;

            // redirect to detail page
            setTimeout(() => {
                goto(url);
            }, 1000);
        }
    });
}

async function _ceremonyWinterToJson(
    fileList: FileList,
    formData: AllowanceWinterClothingDetailDTO,
) {
    let resultObject: AllowanceWinterClothingDetailDTO = {
        documents: [],
        allowanceTypeCode: formData.allowanceTypeCode,
        reason: formData.reason,
        personal: formData.personal,
        partner: formData.partner,
    };

    for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const base64String = await DocumentHelper.toBase64(file);
        const documentObject: DocumentDTO = {
            base64: base64String,
            name: file.name,
        };
        resultObject.documents?.push(documentObject);
    }

    return JSON.stringify(resultObject);
}

// 3. state visit

// 4. funeral arrangement

export async function _submitFuneralArrangementForm(
    data: AllowanceFuneralArrangmentDetailDTO,
    files: FileList,
) {
    // creating the string
    _funeralArrangementToJson(files, data).then(async (output) => {
        const response: CommonResponseDTO =
            await AllowanceServices.addFuneralArrangementDetail(output);

        if (response.status == 'success') {
            // get the info from the response
            let currentAllowanceType: AllowanceTypeDTO =
                AllowanceTypeConstant.list.find(
                    (item) =>
                        item.code == response.data?.details.allowanceTypeCode,
                ) ?? AllowanceTypeConstant.funeralArrangement;
            let currentApplicationId: number =
                response.data?.details.allowanceId;
            // set the url
            let url =
                '/elaun-elaun_perkhidmatan/permohonan/' +
                currentAllowanceType.description +
                '/' +
                currentApplicationId;

            // redirect to detail page
            setTimeout(() => {
                goto(url);
            }, 1000);
        }
    });
}

async function _funeralArrangementToJson(
    fileList: FileList,
    formData: AllowanceFuneralArrangmentDetailDTO,
) {
    let resultObject: AllowanceFuneralArrangmentDetailDTO = {
        documents: [],
        allowanceTypeCode: formData.allowanceTypeCode,
        deathDate: formData.deathDate,
        deathTime: formData.deathTime,
    };

    for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const base64String = await DocumentHelper.toBase64(file);
        const documentObject: DocumentDTO = {
            base64: base64String,
            name: file.name,
        };
        resultObject.documents?.push(documentObject);
    }

    return JSON.stringify(resultObject);
}

// 5. welfare fund

export async function _submitWelfareFundForm(
    data: AllowanceWelfareFundDetailDTO,
    files: FileList,
) {
    // creating the string
    _welfareFundToJson(files, data).then(async (output) => {
        const response: CommonResponseDTO =
            await AllowanceServices.addWelfareFundDetail(output);

        if (response.status == 'success') {
            // get the info from the response
            let currentAllowanceType: AllowanceTypeDTO =
                AllowanceTypeConstant.list.find(
                    (item) =>
                        item.code == response.data?.details.allowanceTypeCode,
                ) ?? AllowanceTypeConstant.welfareFund;
            let currentApplicationId: number =
                response.data?.details.allowanceId;
            // set the url
            let url =
                '/elaun-elaun_perkhidmatan/permohonan/' +
                currentAllowanceType.description +
                '/' +
                currentApplicationId;

            // redirect to detail page
            setTimeout(() => {
                goto(url);
            }, 1000);
        }
    });
}

async function _welfareFundToJson(
    fileList: FileList,
    formData: AllowanceWelfareFundDetailDTO,
) {
    let resultObject: AllowanceWelfareFundDetailDTO = {
        documents: [],
        allowanceTypeCode: formData.allowanceTypeCode,
        welfareTypeCode: formData.welfareTypeCode,
    };

    for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const base64String = await DocumentHelper.toBase64(file);
        const documentObject: DocumentDTO = {
            base64: base64String,
            name: file.name,
        };
        resultObject.documents?.push(documentObject);
    }

    return JSON.stringify(resultObject);
}

// 6. house moving

export async function _submitHouseMovingForm(
    data: AllowanceHouseMovingDetailDTO,
    files: FileList,
) {
    // creating the string
    _houseMovingToJson(files, data).then(async (output) => {
        const response: CommonResponseDTO =
            await AllowanceServices.addHouseMovingDetail(output);

        if (response.status == 'success') {
            // get the info from the response
            let currentAllowanceType: AllowanceTypeDTO =
                AllowanceTypeConstant.list.find(
                    (item) =>
                        item.code == response.data?.details.allowanceTypeCode,
                ) ?? AllowanceTypeConstant.houseMoving;
            let currentApplicationId: number =
                response.data?.details.allowanceId;
            // set the url
            let url =
                '/elaun-elaun_perkhidmatan/permohonan/' +
                currentAllowanceType.description +
                '/' +
                currentApplicationId;

            // redirect to detail page
            setTimeout(() => {
                goto(url);
            }, 1000);
        }
    });
}

async function _houseMovingToJson(
    fileList: FileList,
    formData: AllowanceHouseMovingDetailDTO,
) {
    let resultObject: AllowanceHouseMovingDetailDTO = {
        documents: [],
        allowanceTypeCode: formData.allowanceTypeCode,
        movingDate: formData.movingDate,
        oldAddress: formData.oldAddress,
        newAddress: formData.newAddress,
    };

    for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const base64String = await DocumentHelper.toBase64(file);
        const documentObject: DocumentDTO = {
            base64: base64String,
            name: file.name,
        };
        resultObject.documents?.push(documentObject);
    }

    return JSON.stringify(resultObject);
}

// 7. passport payment

export async function _submitPassportPaymentForm(
    data: AllowancePassportPaymentDetailsDTO,
    files: FileList,
) {
    // creating the string
    _passportPaymentToJson(files, data).then(async (output) => {
        const response: CommonResponseDTO =
            await AllowanceServices.addPassportPaymentDetail(output);

        if (response.status == 'success') {
            // get the info from the response
            let currentAllowanceType: AllowanceTypeDTO =
                AllowanceTypeConstant.list.find(
                    (item) =>
                        item.code == response.data?.details.allowanceTypeCode,
                ) ?? AllowanceTypeConstant.passportPayment;
            let currentApplicationId: number =
                response.data?.details.allowanceId;
            // set the url
            let url =
                '/elaun-elaun_perkhidmatan/permohonan/' +
                currentAllowanceType.description +
                '/' +
                currentApplicationId;

            // redirect to detail page
            setTimeout(() => {
                goto(url);
            }, 1000);
        }
    });
}

async function _passportPaymentToJson(
    fileList: FileList,
    formData: AllowancePassportPaymentDetailsDTO,
) {
    let resultObject: AllowancePassportPaymentDetailsDTO = {
        documents: [],
        allowanceTypeCode: formData.allowanceTypeCode,
        renewDate: formData.renewDate,
        reason: formData.reason,
    };

    for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const base64String = await DocumentHelper.toBase64(file);
        const documentObject: DocumentDTO = {
            base64: base64String,
            name: file.name,
        };
        resultObject.documents?.push(documentObject);
    }

    return JSON.stringify(resultObject);
}

// 8. insurance payment

export async function _submitInsurancePaymentForm(
    data: AllowanceInsurancePaymentDetailsDTO,
    files: FileList,
) {
    // creating the string
    _insurancePaymentToJson(files, data).then(async (output) => {
        const response: CommonResponseDTO =
            await AllowanceServices.addInsurancePaymentDetail(output);

        if (response.status == 'success') {
            // get the info from the response
            let currentAllowanceType: AllowanceTypeDTO =
                AllowanceTypeConstant.list.find(
                    (item) =>
                        item.code == response.data?.details.allowanceTypeCode,
                ) ?? AllowanceTypeConstant.insurancePayment;
            let currentApplicationId: number =
                response.data?.details.allowanceId;
            // set the url
            let url =
                '/elaun-elaun_perkhidmatan/permohonan/' +
                currentAllowanceType.description +
                '/' +
                currentApplicationId;

            // redirect to detail page
            setTimeout(() => {
                goto(url);
            }, 1000);
        }
    });
}

async function _insurancePaymentToJson(
    fileList: FileList,
    formData: AllowanceInsurancePaymentDetailsDTO,
) {
    let resultObject: AllowanceInsurancePaymentDetailsDTO = {
        documents: [],
        allowanceTypeCode: formData.allowanceTypeCode,
        regionCode: formData.regionCode,
        insuranceType: formData.insuranceType,
        startDate: formData.startDate,
        endDate: formData.endDate,
        reason: formData.reason,
    };

    for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const base64String = await DocumentHelper.toBase64(file);
        const documentObject: DocumentDTO = {
            base64: base64String,
            name: file.name,
        };
        resultObject.documents?.push(documentObject);
    }

    return JSON.stringify(resultObject);
}
