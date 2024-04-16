import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { RoleConstant } from '$lib/constants/core/role.constant';
import type { CandidateIDRequestBody } from '$lib/dto/core/common/candidate-id-request.view-dto';
import type { CommonFilterDTO } from '$lib/dto/core/common/common-filter.dto';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto.js'
import type { VehicleFirstSchedule } from '$lib/dto/mypsm/pinjaman/car-first-schedule-detail.dto';
import type { FirstSchedule } from '$lib/dto/mypsm/pinjaman/first-schedule.dto';
import type { loanIdRequestDTO } from '$lib/dto/mypsm/pinjaman/loan-ID.dto';
import type { loanDetail } from '$lib/dto/mypsm/pinjaman/loan-detail.dto';
import type { OfferedLoan } from '$lib/dto/mypsm/pinjaman/offered-loan-detail.dto';
import type { PersonalDetail } from '$lib/dto/mypsm/pinjaman/personal-detail.dto';
import type { SecondSchedule } from '$lib/dto/mypsm/pinjaman/second-schedule.dto';
import type { suppliers } from '$lib/dto/mypsm/pinjaman/supplier-detail.dto';
import type { CandidatePersonalResponseDTO } from '$lib/dto/mypsm/profile/personal-detail.dto';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import { _firstSchedule, _loanDetail, _offerLoan, _personalDetail, _secondSchedule, _supplier, _vehicleDetail, _vehicleFirstSchedule } from '$lib/schemas/mypsm/loan/loan-application';
import { LoanServices } from '$lib/services/implementation/mypsm/pinjaman/loan.service';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';


export async function load({ params }) {

    let currentID: loanIdRequestDTO = {
        id: Number(params.id)
    }


    //==================================================
    //=============== Load Function ====================
    //================================================== 
    const personalDetailResponse: CommonResponseDTO =
        await LoanServices.getProfilePersonalDetails(currentID);


    const loanDetailResponse: CommonResponseDTO =
        await LoanServices.getLoanDetails(currentID);

        const offerLoanResponse: CommonResponseDTO =
        await LoanServices.getOfferLoanDetails(currentID);


    const vehicleFirstVehicleDetailResponse: CommonResponseDTO =
        await LoanServices.getVehicleFirstScheduleDetails(currentID);

    const firstDetailResponse: CommonResponseDTO =
        await LoanServices.getFirstScheduleDetails(currentID);

    const supplierDetailResponse: CommonResponseDTO =
        await LoanServices.getSupplierDetails(currentID);

    const secondScheduleDetailResponse: CommonResponseDTO =
        await LoanServices.getSecondScheduleDetails(currentID);




    const personalDetail = await superValidate(personalDetailResponse.data?.details as PersonalDetail, zod(
        _personalDetail))
        ;

    const loanDetails = await superValidate(loanDetailResponse.data?.details as loanDetail, zod(
        _loanDetail))
        ;

        const offerLoan = await superValidate(offerLoanResponse.data?.details as OfferedLoan, zod(
            _offerLoan))
            ;

    const vehicleFirstScheduleDetails = await superValidate(vehicleFirstVehicleDetailResponse.data?.details as VehicleFirstSchedule, zod(
        _vehicleFirstSchedule))
        ;

    const firstScheduleDetails = await superValidate(firstDetailResponse.data?.details as FirstSchedule, zod(
        _firstSchedule))
        ;

    const supplierDetails = await superValidate(supplierDetailResponse.data?.details as suppliers, zod(
        _supplier))
        ;
    const secondScheduleDetails = await superValidate(secondScheduleDetailResponse.data?.details as SecondSchedule, zod(
        _secondSchedule))
        ;

    return {
        personalDetailResponse,
        loanDetailResponse,
        offerLoanResponse,
        vehicleFirstVehicleDetailResponse,
        firstDetailResponse,
        supplierDetailResponse,
        secondScheduleDetailResponse,

        vehicleFirstScheduleDetails,
        personalDetail,
        loanDetails,
        offerLoan,
        firstScheduleDetails,
        supplierDetails,
        secondScheduleDetails,

    }
}
