import { fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

const applicationConfirmationForm = async (event: Event) => {
    const formData = new FormData(event.target as HTMLFormElement);

    const exampleFormData = {
        applicationConfirmationResult: String(
            formData.get('applicationConfirmationResult'),
        ),
        applicationConfirmationReview: String(
            formData.get('applicationConfirmationReview'),
        ),
    };

    const exampleFormSchema = z.object({
        // checkbox schema
        applicationConfirmationResult: z.enum(['sah', 'tidakSah'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        // dateSelectorExample: dateScheme,
        applicationConfirmationReview: z
            .string({ required_error: 'Medan ini tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
    });

    try {
        const result = exampleFormSchema.parse(exampleFormData);
        if (result) {
            errorData = [];
            toast.success('Berjaya disimpan!', {
                style: 'background: #333; color: #fff;',
            });

            const id = crypto.randomUUID().toString();
            const validatedExamFormData = { ...exampleFormData, id };
            console.log(
                'REQUEST BODY: ',
                JSON.stringify(validatedExamFormData),
            );
        }
    } catch (err: unknown) {
        if (err instanceof ZodError) {
            const { fieldErrors: errors } = err.flatten();
            errorData = errors;
            console.log('ERROR!', err.flatten());
            toast.error(
                'Sila pastikan maklumat adalah lengkap dengan tepat.',
                {
                    style: 'background: #333; color: #fff;',
                },
            );
        }
    }
};

const supporterApproverForm = async (event: Event) => {
    const supporter1OptionSelector = document.getElementById(
        'supporter1Option',
    ) as HTMLSelectElement;
    const supporter2OptionSelector = document.getElementById(
        'supporter2Option',
    ) as HTMLSelectElement;
    const approverOptionSelector = document.getElementById(
        'approverOption',
    ) as HTMLSelectElement;

    const exampleFormData = {
        supporter1Option: String(supporter1OptionSelector.value),
        supporter2Option: String(supporter2OptionSelector.value),
        approverOption: String(approverOptionSelector.value),
    };

    const exampleFormSchema = z.object({
        // checkbox schema
        supporter1Option: z.enum(['1', '2', '3', '4'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),
        supporter2Option: z.enum(['1', '2', '3', '4'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),
        approverOption: z.enum(['1', '2', '3', '4'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),
    });

    try {
        const result = exampleFormSchema.parse(exampleFormData);
        if (result) {
            errorData = [];
            toast.success('Berjaya disimpan!', {
                style: 'background: #333; color: #fff;',
            });

            const id = crypto.randomUUID().toString();
            const validatedExamFormData = { ...exampleFormData, id };
            console.log(
                'REQUEST BODY: ',
                JSON.stringify(validatedExamFormData),
            );
        }
    } catch (err: unknown) {
        if (err instanceof ZodError) {
            const { fieldErrors: errors } = err.flatten();
            errorData = errors;
            console.log('ERROR!', err.flatten());
            toast.error(
                'Sila pastikan maklumat adalah lengkap dengan tepat.',
                {
                    style: 'background: #333; color: #fff;',
                },
            );
        }
    }
};
const applicationApprovalForm = async (event: Event) => {
    const formData = new FormData(event.target as HTMLFormElement);

    const exampleFormData = {
        applicationApprovalResult: String(
            formData.get('applicationApprovalResult'),
        ),
        applicationApprovalReview: String(
            formData.get('applicationApprovalReview'),
        ),
    };

    const exampleFormSchema = z.object({
        // checkbox schema
        applicationApprovalResult: z.enum(['lulus', 'tidakLulus'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        // dateSelectorExample: dateScheme,
        applicationApprovalReview: z
            .string({ required_error: 'Medan ini tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
    });

    try {
        const result = exampleFormSchema.parse(exampleFormData);
        if (result) {
            errorData = [];
            toast.success('Berjaya disimpan!', {
                style: 'background: #333; color: #fff;',
            });

            const id = crypto.randomUUID().toString();
            const validatedExamFormData = { ...exampleFormData, id };
            console.log(
                'REQUEST BODY: ',
                JSON.stringify(validatedExamFormData),
            );
        }
    } catch (err: unknown) {
        if (err instanceof ZodError) {
            const { fieldErrors: errors } = err.flatten();
            errorData = errors;
            console.log('ERROR!', err.flatten());
            toast.error(
                'Sila pastikan maklumat adalah lengkap dengan tepat.',
                {
                    style: 'background: #333; color: #fff;',
                },
            );
        }
    }
};
const validateDocumentForm = async (event: Event) => {
    const formData = new FormData(event.target as HTMLFormElement);

    const exampleFormData = {
        validateDocumentResult: String(
            formData.get('validateDocumentResult'),
        ),
        validateDocumentReview: String(
            formData.get('validateDocumentReview'),
        ),
    };

    const exampleFormSchema = z.object({
        // checkbox schema
        validateDocumentResult: z.enum(['sah', 'tidakSah'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        // dateSelectorExample: dateScheme,
        validateDocumentReview: z
            .string({ required_error: 'Medan ini tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
    });

    try {
        const result = exampleFormSchema.parse(exampleFormData);
        if (result) {
            errorData = [];
            toast.success('Berjaya disimpan!', {
                style: 'background: #333; color: #fff;',
            });

            const id = crypto.randomUUID().toString();
            const validatedExamFormData = { ...exampleFormData, id };
            console.log(
                'REQUEST BODY: ',
                JSON.stringify(validatedExamFormData),
            );
        }
    } catch (err: unknown) {
        if (err instanceof ZodError) {
            const { fieldErrors: errors } = err.flatten();
            errorData = errors;
            console.log('ERROR!', err.flatten());
            toast.error(
                'Sila pastikan maklumat adalah lengkap dengan tepat.',
                {
                    style: 'background: #333; color: #fff;',
                },
            );
        }
    }
};
const updateApplicationForm = async (event: Event) => {
    const formData = new FormData(event.target as HTMLFormElement);

    const exampleFormData = {
        updateApplicationResult: String(
            formData.get('updateApplicationResult'),
        ),
        updateApplicationReview: String(
            formData.get('updateApplicationReview'),
        ),
    };

    const exampleFormSchema = z.object({
        // checkbox schema
        updateApplicationResult: z.enum(['sah', 'tidakSah'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        // dateSelectorExample: dateScheme,
        updateApplicationReview: z
            .string({ required_error: 'Medan ini tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
    });

    try {
        const result = exampleFormSchema.parse(exampleFormData);
        if (result) {
            errorData = [];
            toast.success('Berjaya disimpan!', {
                style: 'background: #333; color: #fff;',
            });

            const id = crypto.randomUUID().toString();
            const validatedExamFormData = { ...exampleFormData, id };
            console.log(
                'REQUEST BODY: ',
                JSON.stringify(validatedExamFormData),
            );
        }
    } catch (err: unknown) {
        if (err instanceof ZodError) {
            const { fieldErrors: errors } = err.flatten();
            errorData = errors;
            console.log('ERROR!', err.flatten());
            toast.error(
                'Sila pastikan maklumat adalah lengkap dengan tepat.',
                {
                    style: 'background: #333; color: #fff;',
                },
            );
        }
    }
};

export const load = async () => {
    const stepperPermohonanPersaraan = await superValidate(
        _stepperPermohonanPersaraan,
    );

    return {
        stepperPermohonanPersaraan,
    };
};

export const _submitFormStepperPermohonanPersaraan = async (
    formData: object,
) => {
    const stepperPermohonanPersaraan = await superValidate(
        formData,
        _stepperPermohonanPersaraan,
    );

    if (!stepperPermohonanPersaraan.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, stepperPermohonanPersaraan);
    } else {
        console.log('Request Body: ', formData);
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(stepperPermohonanPersaraan),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });
                console.log('Response Returned: PermohonanPersaraan-54', json);
            });
    }
    return { stepperPermohonanPersaraan };
};