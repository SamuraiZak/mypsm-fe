import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { DocumentBase64RequestDTO } from '$lib/dto/core/common/base-64-document-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { commonIdRequestDTO } from '$lib/dto/core/common/id-request.dto'
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto.js';
import type { ClinicCommonResult } from '$lib/dto/mypsm/perubatan/clinic-common-approval.dto.js';
import type { MedicalClinicEmployeePaymentPersonalDetail } from '$lib/dto/mypsm/perubatan/tuntutan-kakitangan/clinic-employee-payment-personal-detail.dto';
import type { MedicalEmployeeMakePayment } from '$lib/dto/mypsm/perubatan/tuntutan-kakitangan/employee-make-payment.dto';
import type { MedicalEmployeeClaimPayment, MedicalEmployeeClaimPaymentDetail } from '$lib/dto/mypsm/perubatan/tuntutan-kakitangan/employee-payment-detail.dto';
import type { QuartersGetDocument } from '$lib/dto/mypsm/pinjaman/kuarters/application-get-document.dto.js';
import { _clinicCommonResultSchema, _clinicPaymentSchema } from '$lib/schemas/mypsm/medical/medical-schema.js';
import { MedicalServices } from '$lib/services/implementation/mypsm/perubatan/medical.service';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async ({ params, parent}) => {
    const { layoutData } = await parent();
    const currentRoleCode: string = layoutData.accountDetails.currentRoleCode
    let currentId: commonIdRequestDTO = {
        id: Number(params.employeeid)
    }
    let lookup = await getLookup();


    let paymentPersonalDetail = {} as MedicalClinicEmployeePaymentPersonalDetail;
    let paymentDetail = {} as MedicalEmployeeClaimPaymentDetail;
    let employeePaymentDetail = {} as MedicalEmployeeClaimPayment;
    let paymentDocuments: QuartersGetDocument = {
        id: 0,
        document: [],
    };
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
        const paymentDocumentsResponse: CommonResponseDTO =
            await MedicalServices.getPaymentDocuments(currentId);
        paymentDocuments =
            paymentDocumentsResponse.data?.details as QuartersGetDocument;
    } else if (currentRoleCode == UserRoleConstant.kakitangan.code) {
        const employeePaymentDetailResponse: CommonResponseDTO =
            await MedicalServices.getEmployeePaymenDetailForEmployee(currentId);
        employeePaymentDetail =
            employeePaymentDetailResponse.data?.details as MedicalEmployeeClaimPayment;
        const paymentDocumentsResponse: CommonResponseDTO =
            await MedicalServices.getPaymentDocuments(currentId);
        paymentDocuments =
            paymentDocumentsResponse.data?.details as QuartersGetDocument;
    }
    const paymentForm = await superValidate(zod(_clinicPaymentSchema))
    const secretaryApprovalForm = await superValidate(secretaryApproval, zod(_clinicCommonResultSchema), {errors: false})
    return {
        currentRoleCode,
        currentId,
        paymentPersonalDetail,
        paymentDetail,
        paymentForm,
        lookup,
        secretaryApprovalForm,
        employeePaymentDetail,
        paymentDocuments,
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
        const { supporterName, approverName, ...tempObj } = form.data
        const response: CommonResponseDTO =
            await MedicalServices.addPaymentSecretaryApproval(tempObj as ClinicCommonResult)

        return { response }
    }
}

// Create a function that returns a promise resolving to an array of DocumentBase64RequestDTO objects
export function _fileToBase64Object(fileList: FileList): Promise<DocumentBase64RequestDTO[]> {
    return new Promise((resolve, reject) => {
        // Convert FileList to array
        const fileArray: File[] = Array.from(fileList);

        // Simulate fetching base64 data for each file asynchronously
        const filesPromiseArray: Promise<DocumentBase64RequestDTO>[] = [];
        fileArray.forEach((file) => {
            const filePromise = fetchBase64Data(file);
            filesPromiseArray.push(filePromise);
        });

        // Resolve the promise when all file promises are resolved
        Promise.all(filesPromiseArray)
            .then((files) => {
                resolve(files);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

// Function to fetch base64 data for a file asynchronously
function fetchBase64Data(file: File): Promise<DocumentBase64RequestDTO> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const base64Data = event.target?.result as string;
            const fileName = file.name;
            const fileObject: DocumentBase64RequestDTO = { name: fileName, base64: base64Data.split(",")[1] };
            resolve(fileObject);
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsDataURL(file);
    });
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