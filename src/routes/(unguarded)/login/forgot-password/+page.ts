import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { UserGroupConstant } from '$lib/constants/core/user-group.constant';
import type { AuthenticationRequestDTO } from '$lib/dto/core/auth/authentication-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
import type { UserGroupDTO } from '$lib/dto/core/user-group/user-group.dto';
import { LookupHelper } from '$lib/helpers/core/lookup.helper';
import { AuthService } from '$lib/services/implementation/core/auth/authentication.service';
import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/client';
import { Schema, z } from 'zod';

export const _forgotPasswordSchema = z.object({
    email: z.string().email(),
});

// on page load
export const load = async () => {
    // create form
    const form = await superValidate(_forgotPasswordSchema);

    return {
        props: {
            form,
        },
    };
};

