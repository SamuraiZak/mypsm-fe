import { UserGroupConstant } from '$lib/constants/core/user-group.constant';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
import type { UserGroupDTO } from '$lib/dto/core/user-group/user-group.dto';
import { LookupHelper } from '$lib/helpers/core/lookup.helper';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

export const _loginSchema = z.object({
    userGroup: z.string(),
    currentRole: z.string(),
    username: z.string(),
    password: z.string(),
});

export const load = async () => {
    // fetch constant user group options
    const userGroupOptions: UserGroupDTO[] = UserGroupConstant.userGroup;

    // TODO: fetch role lookup
    let roleLookupList: LookupDTO[] = [
        {
            id: 1,
            code: '1',
            description: 'Kakitangan',
        },
        {
            id: 2,
            code: '2',
            description: 'Urus Setia',
        },
        {
            id: 3,
            code: '3',
            description: 'Pengarah',
        },
        {
            id: 4,
            code: '4',
            description: 'Unit Bahagian',
        },
    ];

    let roleOptions: DropdownDTO[] = LookupHelper.toDropdown(roleLookupList);

    // create form
    const form = await superValidate(_loginSchema);

    // set default usergroup
    form.data.userGroup = userGroupOptions[0].value;

    // set default role
    form.data.currentRole = roleOptions[0].value;

    return {
        props: {
            form,
            userGroupOptions,
            roleOptions,
        },
    };
};
