<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Maklumat Kakitangan">
        <TextIconButton
            label="Kembali"
            icon="previous"
            type="neutral"
            onClick={() => goto('/klinik-panel/maklumat-kakitangan')}
        />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <div class="flex w-full flex-col gap-2.5 pb-10">
        <div class="flex w-full flex-col justify-start gap-2.5 md:w-1/2 p-5">
            <CustomTextField
                label="Nama"
                disabled
                id="fullName"
                bind:val={data.employeeDetail.fullName}
            />
            <CustomTextField
                label="No. Pekerja"
                disabled
                id="employeeNumber"
                bind:val={data.employeeDetail.employeeNumber}
            />
            <CustomTextField
                label="No. Kad Pengenalan"
                disabled
                id="identityCardNumber"
                bind:val={data.employeeDetail.identityCardNumber}
            />
            <CustomTextField
                label="Gred"
                disabled
                id="grade"
                bind:val={data.employeeDetail.grade}
            />
            <CustomTextField
                label="Penempatan"
                disabled
                id="placement"
                bind:val={data.employeeDetail.placement}
            />
            <CustomTextField
                label="Kumpulan"
                disabled
                id="serviceGroup"
                bind:val={data.employeeDetail.serviceGroup}
            />
        </div>
    </div>
</section>
