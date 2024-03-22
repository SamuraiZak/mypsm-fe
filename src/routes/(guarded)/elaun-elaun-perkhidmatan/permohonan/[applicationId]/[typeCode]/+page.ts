import { goto, invalidateAll, replaceState } from '$app/navigation';
import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant.js';
import {
    ServiceAllowanceStepperConstant,
    ServiceAllowanceTypeConstant,
} from '$lib/constants/core/service-allowance.constant';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto.js';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto.js';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
import type { ServiceAllowanceStepperDTO } from '$lib/dto/mypsm/elaun-elaun-perkhidmatan/service-allowance-stepper.dto.js';
import type {
    ServiceAllowanceApplicationDTO,
    ServiceAllowanceDocumentDTO,
    ServiceAllowanceInfoCeremonyDressDTO,
    ServiceAllowanceViewRequestDTO,
} from '$lib/dto/mypsm/elaun-elaun-perkhidmatan/service-allowance.dto.js';
import { LookupHelper } from '$lib/helpers/core/lookup.helper.js';
import {
    ServiceAllowanceEndorsementSchema,
    ServiceAllowanceEndorserDetailSchema,
    ServiceAllowanceInfoCeremonyDressSchema,
} from '$lib/schemas/mypsm/service-allowance/service-allowance.schema.js';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service.js';
import { ServiceAllowanceServices } from '$lib/services/implementation/mypsm/elaun-elaun-perkhidmatan/service-allowance.service.js';
import type { RouteParam } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({ params }) {
    // setting up application id
    let currentApplicationId = 0;

    // setting up current allowance type code
    let currentAllowanceTypeCode = params.typeCode;

    // setting up current stepper set
    let currentStepperSet: ServiceAllowanceStepperDTO =
        ServiceAllowanceStepperConstant.ceremonyDress;

    switch (currentAllowanceTypeCode) {
        case ServiceAllowanceTypeConstant.bantuanPakaianIstiadat.code:
            currentStepperSet = ServiceAllowanceStepperConstant.ceremonyDress;
            break;
        case ServiceAllowanceTypeConstant.bantuanPakaianPanas.code:
            currentStepperSet = ServiceAllowanceStepperConstant.warmClothes;
            break;
        case ServiceAllowanceTypeConstant.tambangMengunjungiWilayahAsal.code:
            currentStepperSet = ServiceAllowanceStepperConstant.hometownVisit;
            break;
        case ServiceAllowanceTypeConstant.bantuanMengurusJenazah.code:
            currentStepperSet = ServiceAllowanceStepperConstant.funeral;
            break;
        case ServiceAllowanceTypeConstant.tabungKebajikanKakitangan.code:
            currentStepperSet = ServiceAllowanceStepperConstant.welfareFund;
            break;
        case ServiceAllowanceTypeConstant.perpindahanRumah.code:
            currentStepperSet = ServiceAllowanceStepperConstant.houseMoving;
            break;
        case ServiceAllowanceTypeConstant.pembayaranBalikPassport.code:
            currentStepperSet = ServiceAllowanceStepperConstant.passportClaim;
            break;
        case ServiceAllowanceTypeConstant.insuransKesihatan.code:
            currentStepperSet = ServiceAllowanceStepperConstant.healthInsurance;
            break;
        case ServiceAllowanceTypeConstant.bayaranBalikPengangkutanBarang.code:
            currentStepperSet = ServiceAllowanceStepperConstant.shippingClaim;
            break;

        default:
            currentStepperSet = ServiceAllowanceStepperConstant.ceremonyDress;
            break;
    }

    // get allowance type option
    let dropdownAllowanceType: DropdownDTO[] = [];

    const allowanceTypeResponse: CommonResponseDTO =
        await LookupServices.getAllowanceTypeEnums();

    if (allowanceTypeResponse.status == 'success') {
        const allowanceTypeLookup: LookupDTO[] = allowanceTypeResponse.data
            ?.dataList as LookupDTO[];

        dropdownAllowanceType =
            LookupHelper.toDropdownProper(allowanceTypeLookup);
    }

    // get endorsement option
    let dropdownEndorsementOption: DropdownDTO[] = [
        {
            value: true,
            name: 'Ya',
        },
        {
            value: false,
            name: 'Tidak',
        },
    ];

    let detailFormCeremonyDress = await superValidate(
        zod(ServiceAllowanceInfoCeremonyDressSchema),
    );

    let detailFormCeremonyDressData: ServiceAllowanceInfoCeremonyDressDTO = {
        documents: null,
        allowanceId: currentApplicationId,
        allowanceTypeCode:
            ServiceAllowanceTypeConstant.bantuanPakaianIstiadat.code,
        allowanceType: null,
        reason: '',
        personal: 0,
        partner: 0,
    };

    // create director feedback form
    const directorFeedbackForm = await superValidate(
        zod(ServiceAllowanceEndorsementSchema),
    );

    // create director feedback form
    const secretaryCheckForm = await superValidate(
        zod(ServiceAllowanceEndorsementSchema),
    );

    // create director feedback form
    const endorserDetailForm = await superValidate(
        zod(ServiceAllowanceEndorserDetailSchema),
    );

    // create director feedback form
    const supporterFeedbackForm = await superValidate(
        zod(ServiceAllowanceEndorsementSchema),
    );

    // create director feedback form
    const approverFeedbackForm = await superValidate(
        zod(ServiceAllowanceEndorsementSchema),
    );

    if (params.applicationId == 'Baru') {
        currentApplicationId = 0;

        // init ceremony dress form
        detailFormCeremonyDress.data.allowanceTypeCode =
            currentAllowanceTypeCode;
    } else {
        currentApplicationId = parseInt(params.applicationId);

        const viewParam: ServiceAllowanceViewRequestDTO = {
            allowanceId: currentApplicationId,
            allowanceTypeCode: currentAllowanceTypeCode,
        };
        const detailResponse: CommonResponseDTO =
            await ServiceAllowanceServices.viewApplication(viewParam);

        if (detailResponse.status == 'success') {
            const applicationDetailRes: ServiceAllowanceApplicationDTO =
                detailResponse.data?.details as ServiceAllowanceApplicationDTO;

            const applicationInfo: ServiceAllowanceInfoCeremonyDressDTO =
                applicationDetailRes.applicationDetail as ServiceAllowanceInfoCeremonyDressDTO;

            detailFormCeremonyDress.data = {
                allowanceTypeCode: applicationInfo.allowanceTypeCode ?? '',
                reason: applicationInfo.reason ?? '',
                personal: applicationInfo.personal ?? 0,
                partner: applicationInfo.partner ?? 0,
            };
        }
    }

    return {
        props: {
            currentApplicationId,
            currentAllowanceTypeCode,
            currentStepperSet,
            dropdownAllowanceType,
            dropdownEndorsementOption,
            detailFormCeremonyDress,
            detailFormCeremonyDressData,
            directorFeedbackForm,
            secretaryCheckForm,
            endorserDetailForm,
            supporterFeedbackForm,
            approverFeedbackForm,
        },
    };
}

// file to base 64 string

export async function _submitCeremonyDressForm(
    data: ServiceAllowanceInfoCeremonyDressDTO,
    files: FileList,
) {
    _ceremonyDressDataToJson(files, data)
        .then(async (jsonString) => {
            const response: CommonResponseDTO =
                await ServiceAllowanceServices.addInfoCeremonyDress(jsonString);

            if (response.status == 'success') {
                const applicationInfo: ServiceAllowanceInfoCeremonyDressDTO =
                    response.data
                        ?.details as ServiceAllowanceInfoCeremonyDressDTO;

                const currentAllowanceType: LookupDTO | null =
                    ServiceAllowanceTypeConstant.list.find(
                        (item) =>
                            item.code == applicationInfo.allowanceTypeCode,
                    ) ?? null;

                let redirectUrl: string =
                    '/elaun-elaun-perkhidmatan/permohonan/' +
                    applicationInfo.allowanceId +
                    '/' +
                    currentAllowanceType?.code;

                goto(redirectUrl, {
                    replaceState: true,
                    invalidateAll: false,
                });
                // invalidateAll();
            } else {
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

export async function _ceremonyDressDataToJson(
    fileList: FileList,
    formData: ServiceAllowanceInfoCeremonyDressDTO,
): Promise<string> {
    let resultObject: ServiceAllowanceInfoCeremonyDressDTO = {
        documents: [],
        allowanceId: formData.allowanceId,
        allowanceTypeCode: formData.allowanceTypeCode,
        allowanceType: null,
        reason: formData.reason,
        personal: formData.personal,
        partner: formData.partner,
    };

    for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const base64String = await _fileToBase64String(file);
        const documentObject: ServiceAllowanceDocumentDTO = {
            base64: base64String,
            name: file.name,
        };
        resultObject.documents?.push(documentObject);
    }

    return JSON.stringify(resultObject);
}

export function _fileToBase64String(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            if (event.target && event.target.result) {
                const base64String = event.target.result
                    .toString()
                    .split(',')[1];
                resolve(base64String);
            } else {
                reject(new Error('Failed to read file.'));
            }
        };

        reader.onerror = () => {
            reject(new Error('Failed to read file.'));
        };

        reader.readAsDataURL(file);
    });
}
