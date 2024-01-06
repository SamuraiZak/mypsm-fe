<script lang="ts">
    // Importing external components and libraries
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { goto } from '$app/navigation';
    import TextField from '$lib/components/input/TextField.svelte';

    const characters: string = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let generatedLink: string = '';

    function generateRandomString() {
        let randomString =
            'https://www.mypsm.com.gov.my/lantikan-baru/calon/daftar-';

        for (let i = 0; i < 15; i++) {
            randomString +=
                characters[Math.floor(Math.random() * characters.length)];
        }
        generatedLink = randomString + '.com';
    }

    // funtion to copy text from html body
    import toast, { Toaster } from 'svelte-french-toast';
    import { z } from 'zod';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import api from '$lib/services/core/ky.service';

    // =====================================================================================
    // z validation schema for the new employment form fields===============================
    // =====================================================================================
    let errorData: any;

    const examApplicationSchema = z.object({
        temporaryStaffId: z
            .string({ required_error: 'ID Sementara tidak boleh kosong.' })
            .min(4, {
                message: 'ID Sementara hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'ID Sementara tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        staffEmail: z
            .string({ required_error: 'Emel calon tidak boleh kosong.' })
            .min(5, {
                message: 'Emel calon hendaklah lebih daripada 5 karakter.',
            })
            .email({ message: 'Emel tidak sah' })
            .max(124, {
                message: 'Emel calon tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        // generatedUrl: z
        //     .string()
        //     .url({ message: 'Sila klik butang "Jana Pautan"' }),
    });

    // =========================================================================
    // new employment form fields submit function===============================
    // =========================================================================

    const submitNewEmployementForm = async (event: Event) => {
        const formElement = event.target as HTMLFormElement;
        const formData = new FormData(formElement);

        const examApplicationData = {
            temporaryStaffId: String(formData.get('temporaryStaffId')),
            staffEmail: String(formData.get('staffEmail')),
            // generatedUrl: String(formData.get('generatedUrl')),
        };

        try {
            const result = examApplicationSchema.parse(examApplicationData);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });

                setTimeout(() => goto('../lantikan-baru'), 1500);

                // const response = await api.post('', { body: formData });

                // if (response.ok) {
                //     toast.success('Berjaya disimpan!', {
                //         style: 'background: #333; color: #fff;',
                //     });

                //     // functions
                // } else {
                //     toast.error('Tidak Berjaya disimpan. Sila semak lagi');
                // }
            }
        } catch (err: unknown) {
            if (err instanceof z.ZodError) {
                const { fieldErrors: errors } = err.flatten();
                errorData = errors;
                toast.error(
                    'Sila pastikan maklumat adalah lengkap dengan tepat.',
                    {
                        style: 'background: #333; color: #fff;',
                    },
                );
            }
        }
    };
</script>

<!-- test button to click to copy -->
<!-- <button use:clickToCopy={'generated-link'}> Click to copy </button> -->

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Maklumat kakitangan baru daripada e-Pengambilan "
        description="Hal-hal berkaitan Lantikan Baru. Sila semak dan simpan pautan setelah selesai."
    >
        <FormButton
            type="back"
            addLabel="Cetak"
            onClick={() => {
                goto('../lantikan-baru');
            }}
        />
        <FormButton type="reset" addLabel="Simpan" onClick={() => {}} />
    </ContentHeader>
</section>

<!-- content body starts here -->
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary p-3"
>
    <form id="createEmployment" on:submit={submitNewEmployementForm} novalidate>
        <SectionHeader title="Maklumat kakitangan baru daripada e-Pengambilan"
            ><TextIconButton
                primary
                label="Simpan"
                form="createEmployment"
            /></SectionHeader
        >

        <div class="my-5 space-y-2.5">
            <TextField
                hasError={errorData?.temporaryStaffId}
                type="text"
                name="temporaryStaffId"
                label="ID Sementara"
                placeholder="contoh: 12345"
                value=""
            />
            {#if errorData?.temporaryStaffId}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{errorData?.temporaryStaffId[0]}</span
                >
            {/if}
            <TextField
                hasError={errorData?.staffEmail}
                type="email"
                name="staffEmail"
                placeholder="contoh: ali@lkim.com"
                label="Emel"
                value=""
            />
            {#if errorData?.staffEmail}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{errorData?.staffEmail[0]}</span
                >
            {/if}
        </div>
        <!-- <div class="mb-5 w-fit" aria-disabled="true">
            <FormButton
                type="generate-link"
                onClick={() => generateRandomString()}
            />
        </div> -->

        <!-- <SectionHeader title="Maklumat kakitangan baru daripada e-Pengambilan"
        ></SectionHeader>
        <div class="my-5 space-y-2.5">
            <TextField
                hasError={errorData?.generatedUrl}
                name="generatedUrl"
                type="text"
                label="Pautan"
                placeholder="https://"
                bind:value={generatedLink}
            />
            {#if errorData?.generatedUrl}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{errorData?.generatedUrl[0]}</span
                >
            {/if}
        </div> -->
    </form>
</section>

<Toaster />
