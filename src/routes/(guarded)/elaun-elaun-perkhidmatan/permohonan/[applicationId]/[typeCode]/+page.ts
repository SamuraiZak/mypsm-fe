import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant.js';
import {
    ServiceAllowanceStepperConstant,
    ServiceAllowanceTypeConstant,
} from '$lib/constants/core/service-allowance.constant';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto.js';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto.js';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
import type { ServiceAllowanceStepperDTO } from '$lib/dto/mypsm/elaun-elaun-perkhidmatan/service-allowance-stepper.dto.js';
import { LookupHelper } from '$lib/helpers/core/lookup.helper.js';
import {
    ServiceAllowanceEndorsementSchema,
    ServiceAllowanceEndorserDetailSchema,
    ServiceAllowanceInfoCeremonyDressSchema,
} from '$lib/schemas/mypsm/service-allowance/service-allowance.schema.js';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service.js';
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
    }

    return {
        props: {
            currentApplicationId,
            currentAllowanceTypeCode,
            currentStepperSet,
            dropdownAllowanceType,
            dropdownEndorsementOption,
            detailFormCeremonyDress,
            directorFeedbackForm,
            secretaryCheckForm,
            endorserDetailForm,
            supporterFeedbackForm,
            approverFeedbackForm,
        },
    };
}
