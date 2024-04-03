<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import DownloadAttachment from '$lib/components/inputs/attachment/DownloadAttachment.svelte';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import { certifyOptions } from '$lib/constants/core/radio-option-constants';
    import type { PageData } from './$types';
    export let data: PageData
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Rekod Pembayaran Tidak Ditanggung LKIM">
        <TextIconButton
            icon="cancel"
            type="neutral"
            label="Tutup"
            onClick={() => goto('/perubatan/bil-tuntutan-kakitangan')}
        />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div class="flex w-full flex-col p-5">
        <ContentHeader title="Maklumat  Kakitangan" borderClass="border-none" />
        <CustomTextField
            label="No. Pekerja"
            disabled
            id="employeeNumber"
            bind:val={data.paymentPersonalDetail.employeeNumber}
            />
        <CustomTextField
            label="Nama"
            disabled
            id="name"
            bind:val={data.paymentPersonalDetail.name}
            />
        <CustomTextField
            label="No. Kad Pengenalan"
            disabled
            id="ICNumber"
            bind:val={data.paymentPersonalDetail.ICNumber}
            />
        <CustomTextField
            label="Jawatan"
            disabled
            id="position"
            bind:val={data.paymentPersonalDetail.position}
            />
        <CustomTextField
            label="Penempatan"
            disabled
            id="placement"
            bind:val={data.paymentPersonalDetail.placement}
            />
        <ContentHeader title="Maklumat  Pembayaran" borderClass="border-none" />
        <CustomTextField
            label="Jumlah Tunggakan (RM)"
            disabled
            id=""
            val=""
            />
        <CustomTextField
            label="Kaedah Pembayaran"
            disabled
            id=""
            val=""
            />
        <CustomTextField
            label="No. Rujukan Transaksi"
            disabled
            id=""
            val=""
            />
        <CustomTextField
            label="Bank Penerima"
            disabled
            id=""
            val=""
            />
        <CustomTextField
            label="Tarikh Transaksi"
            disabled
            type="date"
            id=""
            val=""
            />
        
        <ContentHeader title="Bukti Pembayaran" borderClass="border-none"/>
        <DownloadAttachment fileName="receipt.pdf"/>
  
            <ContentHeader title="Keputusan Urus Setia" borderClass="border-none"/>
            <CustomTextField
            label="Tindakan/Ulasan"
            id=""
            val=""
            />
            <CustomRadioBoolean
                label="Keputusan"
                id=""
                options={certifyOptions}
                val={true}
                />
    </div>
</section>
