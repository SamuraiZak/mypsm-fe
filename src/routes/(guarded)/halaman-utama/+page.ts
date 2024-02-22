import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import { redirect } from '@sveltejs/kit';

const authorisedRoleCode: string[] = [
    UserRoleConstant.calon.code,
    UserRoleConstant.kakitangan.code,
];

export const load = async () => {
    const currentRoleCode = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );
    if (currentRoleCode !== null) {
        if (authorisedRoleCode.includes(currentRoleCode)) {
            // TODO: YOUR CODE
        } else {
            // TODO:
            console.error(401);
        }
    } else {
        throw redirect(300, '../../login');
    }
    // let token: string | null = localStorage.getItem(
    //     LocalStorageKeyConstant.accessToken,
    // );

    // if (token == null) {
    //     throw redirect(300, '../../login');
    // }

    // TODO: get list of agendas

    // TODO: get list
};
