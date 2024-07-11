import { CeremonyClothingRequestSchema } from '$lib/schemas/v2/mypsm/service-allowance/service-allowance.schema.js';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({ parent }) {
    const ceremonyClothingForm = await superValidate(
        zod(CeremonyClothingRequestSchema),
    );

    return {
        forms: {
            ceremonyClothingForm,
        },
    };
}
