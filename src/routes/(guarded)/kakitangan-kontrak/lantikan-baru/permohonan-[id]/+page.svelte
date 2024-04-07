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

    export let data: PageData;
    
    const { form, errors, enhance } = superForm(data.form, {
        SPA: true,
        taintedMessage: false,
        id: "addContractForm",
        validators: zod(_addNewContractEmployeeSchema),
        onSubmit() {
            if(data.isEditing == "baru"){
                _submit($form, data.isEditing);
            } else {
                $form.candidateId = data.contractId.id;
                _submit($form, data.isEditing)
            }
        },
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Perlantikan Baharu (Kontrak)">
        <TextIconButton
            icon="cancel"
            type="neutral"
            label="Batal"
            onClick={() => goto('./')}
        />
        <TextIconButton
            icon="check"
            type="primary"
            label="Simpan"
            form="addContractForm"
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
            label="Kadar Upah"
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