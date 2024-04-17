import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { commonIdRequestDTO } from '$lib/dto/core/common/id-request.dto'
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto.js';
import type { ClinicCommonResult } from '$lib/dto/mypsm/perubatan/clinic-common-approval.dto.js';
import type { MedicalClinicEmployeePaymentPersonalDetail } from '$lib/dto/mypsm/perubatan/tuntutan-kakitangan/clinic-employee-payment-personal-detail.dto';
import type { MedicalEmployeeMakePayment } from '$lib/dto/mypsm/perubatan/tuntutan-kakitangan/employee-make-payment.dto';
import type { MedicalEmployeeClaimPayment, MedicalEmployeeClaimPaymentDetail } from '$lib/dto/mypsm/perubatan/tuntutan-kakitangan/employee-payment-detail.dto';
import { _clinicCommonResultSchema, _clinicPaymentSchema } from '$lib/schemas/mypsm/medical/medical-schema.js';
import { MedicalServices } from '$lib/services/implementation/mypsm/perubatan/medical.service';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async ({ params }) => {
    let currentRoleCode: string | null = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    let currentId: commonIdRequestDTO = {
        id: Number(params.employeeId)
    }
    let lookup = await getLookup();

    let paymentPersonalDetail = {} as MedicalClinicEmployeePaymentPersonalDetail;
    let paymentDetail = {} as MedicalEmployeeClaimPaymentDetail;
    let employeePaymentDetail = {} as MedicalEmployeeClaimPayment;
    let secretaryApproval = {} as ClinicCommonResult;


    if (currentRoleCode == UserRoleConstant.urusSetiaPerubatan.code) {
        const paymentPersonalDetailResponse: CommonResponseDTO =
            await MedicalServices.getClinicEmployeePaymentPersonalDetail(currentId);
        paymentPersonalDetail =
            paymentPersonalDetailResponse.data?.details as MedicalClinicEmployeePaymentPersonalDetail
        const paymentDetailResponse: CommonResponseDTO =
            await MedicalServices.getClinicEmployeePaymentDetail(currentId);
        paymentDetail =
            paymentDetailResponse.data?.details as MedicalEmployeeClaimPaymentDetail;
        const secretaryApprovalResponse =
            await MedicalServices.getPaymentSecretaryApproval(currentId);
        secretaryApproval =
            secretaryApprovalResponse.data?.details as ClinicCommonResult;
    } else if (currentRoleCode == UserRoleConstant.kakitangan.code) {
        const employeePaymentDetailResponse: CommonResponseDTO =
            await MedicalServices.getEmployeePaymenDetailForEmployee(currentId);
            employeePaymentDetail =
            employeePaymentDetailResponse.data?.details as MedicalEmployeeClaimPayment;
    }

    const paymentForm = await superValidate(zod(_clinicPaymentSchema))
    const secretaryApprovalForm = await superValidate(secretaryApproval,zod(_clinicCommonResultSchema))
    return {
        currentRoleCode,
        currentId,
        paymentPersonalDetail,
        paymentDetail,
        paymentForm,
        lookup,
        secretaryApprovalForm,
        employeePaymentDetail,
    }
}

export const _submitPaymentForm = async (formData: MedicalEmployeeMakePayment) => {
    const form = await superValidate(formData, zod(_clinicPaymentSchema));

    if (form.valid) {
        const response: CommonResponseDTO =
            await MedicalServices.addEmployeeClaimPayment(form.data as MedicalEmployeeMakePayment)

        return { response }
    }
}
export const _submitSecretaryApprovalForm = async (formData: ClinicCommonResult) => {
    const form = await superValidate(formData, zod(_clinicCommonResultSchema));

    if (form.valid) {
        const {supporterName, approverName, ...tempObj} = form.data
        const response: CommonResponseDTO =
            await MedicalServices.addPaymentSecretaryApproval(tempObj as ClinicCommonResult)

        return { response }
    }
}

const getLookup = async () => {
    const paymentTypeLookup: DropdownDTO[] = [
        { name: "Transaksi Atas Talian", value: "Transaksi Atas Talian" },
        { name: "Penolakan Gaji", value: "Penolakan Gaji" },
    ]

    return {
        paymentTypeLookup,
    }
}