import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import {
    GcrEndorsementSchema,
    GcrWithdrawalCalculationSchema,
    GcrWithdrawalDetailAddSchema,
} from '$lib/schemas/mypsm/leave/gcr.schema';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({ params }) {
    let currentApplicationId: number = 0;

    if (params.id !== 'Baru') {
        currentApplicationId = parseInt(params.id);
    }

    let userMode = 'employee';

    const currentRoleCode: string =
        localStorage.getItem(LocalStorageKeyConstant.currentRoleCode) ?? '';

    switch (currentRoleCode) {
        case UserRoleConstant.kakitangan.code:
            userMode = 'employee';
            break;
        case UserRoleConstant.ketuaSeksyen.code:
            userMode = 'sectionLeader';
            break;
        case UserRoleConstant.pengarahBahagian.code:
            userMode = 'director';
            break;
        case UserRoleConstant.pengarahNegeri.code:
            userMode = 'director';
            break;
        case UserRoleConstant.urusSetiaCuti.code:
            userMode = 'secretary';
            break;
        case UserRoleConstant.pengarahKhidmatPengurusan.code:
            userMode = 'management';
            break;
        case UserRoleConstant.penyokong.code:
            userMode = 'supporter';
            break;
        case UserRoleConstant.pelulus.code:
            userMode = 'approver';
            break;

        default:
            userMode = 'employee';
            break;
    }

    // =============================================
    // FORM
    // =============================================
    // application details
    const applicationDetailForm = await superValidate(
        zod(GcrWithdrawalDetailAddSchema),
    );

    // director feedback
    const directorFeedbackForm = await superValidate(zod(GcrEndorsementSchema));

    // secretary feedback
    const secretaryFeedbackForm = await superValidate(
        zod(GcrEndorsementSchema),
    );

    // integritySecretary feedback
    const integritySecretaryFeedbackForm = await superValidate(
        zod(GcrEndorsementSchema),
    );

    // chiefDirector feedback
    const chiefDirectorFeedbackForm = await superValidate(
        zod(GcrEndorsementSchema),
    );

    // chiefDirector feedback
    const calculationForm = await superValidate(
        zod(GcrWithdrawalCalculationSchema),
    );

    // =============================================
    // APPLICATION DETAIL
    // =============================================
    // let currentApplicationDetail: 
}
