import { superValidate } from "sveltekit-superforms/client";
import { _stepperRetirementApplicationSupporter } from "./form-schema";

export const load = async () => {
    const stepperRetirementApplicationSupporterForm = await superValidate(
        _stepperRetirementApplicationSupporter,
    );

    return {
        stepperRetirementApplicationSupporterForm,
    };
};
