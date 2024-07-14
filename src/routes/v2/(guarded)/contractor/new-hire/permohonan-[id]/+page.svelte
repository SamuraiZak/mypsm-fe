<script lang="ts">
    import { goto } from "$app/navigation";
    import TextIconButton from "$lib/components/button/TextIconButton.svelte";
    import ContentHeader from "$lib/components/headers/ContentHeader.svelte";
    import CustomTextField from "$lib/components/inputs/text-field/CustomTextField.svelte";
    import { superForm } from "sveltekit-superforms/client";
    import type { PageData } from "./$types";
    import { _addNewContractEmployeeSchema } from "$lib/schemas/mypsm/contract-employee/contract-employee-schemas";
    import { _submit } from "./+page";
    import { zod } from "sveltekit-superforms/adapters";
    import { Toaster } from "svelte-french-toast";
    import { Alert, Modal } from "flowbite-svelte";

    export let data: PageData;
    let existingEmail: boolean = false;
    // let errorMessage: string = "insert into";
    const { form, errors, enhance } = superForm(data.form, {
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        id: "addContractForm",
        validators: zod(_addNewContractEmployeeSchema),
        async onSubmit() {
            if(data.isEditing == "baru"){
                const res = await _submit($form, data.isEditing);
                if(res?.message?.includes("Terdapat masalah")){
                    existingEmail = true;
                }
            } else {
                $form.id = data.contractId.id;
                _submit($form, data.isEditing)
            }
        },
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Pelantikan Baharu (Kontrak)">
        <TextIconButton
            icon="cancel"
            type="neutral"
            label="Batal"
            onClick={() => goto('./')}
        />
        <TextIconButton
            icon="save"
            type="neutral"
            label="Simpan"
            form="addContractForm"
            onClick={() => {$form.isDraft = true; $form.id = null }}
        />
        <TextIconButton
            icon="check"
            type="primary"
            label="Hantar"
            form="addContractForm"
            onClick={() => $form.isDraft = false}
        />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>

    <form class="w-full flex flex-col justify-start p-5 gap-2.5"
        id="addContractForm"
        method="POST"
        use:enhance
    >
        <ContentHeader title="Maklumat Kakitangan dan Kontrak" borderClass="border-none"/>
        <CustomTextField
            label="Nama"
            id="name"
            type="text"
            errors={$errors.name}
            bind:val={$form.name}
        />
        <CustomTextField
            label="Emel"
            id="email"
            type="text"
            errors={$errors.email}
            bind:val={$form.email}
        />
        <CustomTextField
            label="No. Kad Pengenalan"
            id="identityDocumentNumber"
            placeholder="Contoh: 901102085611"
            type="text"
            errors={$errors.identityDocumentNumber}
            bind:val={$form.identityDocumentNumber}
        />
        <CustomTextField
            label="Tarikh Mula Kontrak"
            id="startContract"
            type="date"
            errors={$errors.startContract}
            bind:val={$form.startContract}
        />
        <CustomTextField
            label="Tarikh Tamat Kontrak"
            id="endContract"
            type="date"
            errors={$errors.endContract}
            bind:val={$form.endContract}
        />
        <CustomTextField
            label="Kadar Upah (RM)"
            id="wageRate"
            type="number"
            errors={$errors.wageRate}
            bind:val={$form.wageRate}
        />
        <CustomTextField
            label="Gelaran Tugas"
            id="designation"
            type="text"
            errors={$errors.designation}
            bind:val={$form.designation}
        />
        <CustomTextField
            label="Tarikh Lapor Diri"
            id="reportDutyDate"
            type="date"
            errors={$errors.reportDutyDate}
            bind:val={$form.reportDutyDate}
        />
    </form>
</section>
<Toaster/>
<Modal title="Sistem MyPSM" bind:open={existingEmail} dismissable={false} size="sm">
    <Alert color="red">
        <p>
            <span class="font-medium">Ralat! </span>
            Emel yang digunakan telah wujud dalam pangkalan data. Sila guna emel yang lain.
        </p>
    </Alert>
    <div class="flex gap-3 justify-center">
        <TextIconButton
            label="Kembali"
            icon="previous"
            type="neutral"
            onClick={() => (existingEmail = false)}
        />
    </div>
</Modal>