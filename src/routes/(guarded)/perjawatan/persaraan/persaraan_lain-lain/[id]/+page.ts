import type { RetirementForcedApplicationDetail } from "$lib/dto/mypsm/employment/retirement/retirement-force.dto";
import { RetirementForcedEndorsementSchema } from "$lib/schemas/mypsm/employment/retirement/retirement.schema";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";



export async function load({params}) {



// set default id
let currentApplicationId: number = 0;

if (params.id !== "Baru") {
    currentApplicationId = parseInt(params.id);
}
 // ============================================
    // CREATE ALL FORMS
    // ============================================

// STEP 1: Integrity unit feedback
const certificationDetailForm = await superValidate(zod(RetirementForcedEndorsementSchema));

// STEP 2: Secretary verification
const confirmationDetailForm = await superValidate(zod(RetirementForcedEndorsementSchema));

// STEP 3: Document verification
const documentForm = await superValidate(zod(RetirementForcedEndorsementSchema));

// STEP 4: Document verification
const letterCertificationDetailForm = await superValidate(zod(RetirementForcedEndorsementSchema));

let currentApplicationDetail: RetirementForcedApplicationDetail = {
    certificationDetail: null,
    confirmationDetail: null,
    document: null,
    letterCertificationDetail: null,
}
}