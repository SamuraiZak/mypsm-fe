<script lang="ts">
    import { goto } from '$app/navigation';

    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import {
        Dropdown,
        RadioButton,
        Badge,
        type SelectOptionType,
    } from 'flowbite-svelte';

    // import RadioButton from 'flowbite-svelte';
    // import Dropdown from 'flowbite-svelte'

    import { onMount } from 'svelte';

    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';

    // import type { PageData } from '../tambah-rekod/$types';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import { Tooltip } from 'flowbite-svelte';
    // export let data: PageData;
    let stepperIndex = 0;
    let status: string = 'LULUS';

    let results = [
        { value: 'passed', name: 'LULUS' },
        { value: 'notPassed', name: 'TIDAK LULUS' },
        { value: 'supported', name: 'SOKONG' },
        { value: 'notSupported', name: 'TIDAK SOKONG' },
    ];
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Maklumat Permohonan Pemberian Taraf Berpencen"
        ><TextIconButton
            type="close"
            onClick={() => {
                goto('../PTB-dan-KWAP');
            }}
        /></ContentHeader
    >
</section>
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary"
>
    <Stepper bind:activeIndex={stepperIndex} dataId="#01" dataStatus="Draf">
        <!-- Maklumat Kakitangan -->
        <StepperContent>
            <StepperContentHeader title="Maklumat Kakitangan"
            ></StepperContentHeader>
            <!-- {#if editingCandidateList} -->
            <StepperContentBody>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                ></div>
                <form class="flex w-full flex-col gap-2.5">
                    <b class="text-sm text-system-primary">Maklumat Peribadi</b>
                    <CustomTextField
                        type="text"
                        id="staff-number"
                        label="No. Pekerja"
                        val=""
                    ></CustomTextField>
                    <CustomTextField
                        type="date"
                        id="service-status"
                        label="Status Pekerjaan"
                        val=""
                    ></CustomTextField>
                    <CustomTextField
                        type="date"
                        id="inactive-date-"
                        label="Tarikh Kuatkuasa Tidak Aktif"
                        val=""
                    ></CustomTextField>
                    <CustomTextField
                        type="text"
                        id="nama-penuh-"
                        label="Nama Penuh"
                        val=""
                    ></CustomTextField>
                    <CustomTextField
                        type="text"
                        id="nama-lain"
                        label="Nama Lain"
                        val=""
                    ></CustomTextField>
                    <CustomTextField
                        type="text"
                        id="ic-number-"
                        label="No. K/P"
                        val=""
                    ></CustomTextField>
                    <CustomTextField
                        type="text"
                        id="ic-color-"
                        label="Warna K/P"
                        val=""
                    ></CustomTextField>
                    <CustomTextField
                        type="date"
                        id="dob-"
                        label="Tarikh Lahir"
                        val=""
                    ></CustomTextField>
                    <CustomTextField
                        type="text"
                        id="place-of-birth-"
                        label="Tempat Lahir"
                        val=""
                    ></CustomTextField>
                    <CustomTextField
                        type="text"
                        id="citizenship-"
                        label="Warganegara"
                        val=""
                    ></CustomTextField>
                    <CustomTextField
                        type="text"
                        id="race-"
                        label="Bangsa"
                        val=""
                    ></CustomTextField>
                    <CustomTextField
                        type="text"
                        id="religion-"
                        label="Agama"
                        val=""
                    ></CustomTextField>
                    <CustomTextField
                        type="text"
                        id="gender-"
                        label="Jantina"
                        val=""
                    ></CustomTextField>
                    <CustomTextField
                        type="text"
                        id="status-"
                        label="Status"
                        val=""
                    ></CustomTextField>
                    <CustomTextField
                        type="email"
                        id="email-"
                        label="Emel"
                        val=""
                    ></CustomTextField>
                    <CustomTextField id="address-" label="Alamat Rumah" val=""
                    ></CustomTextField>
                    <CustomTextField
                        id="posting-address-"
                        label="Alamat Surat Menyurat (jika berlainan dari alamat rumah)"
                        val=""
                    ></CustomTextField>
                    <CustomTextField
                        type="text"
                        id="home-phone-"
                        label="No. Telefon Rumah"
                        val=""
                    ></CustomTextField>
                    <CustomTextField
                        type="text"
                        id="mobile-phone-"
                        label="No. Telefon Bimbit"
                        val=""
                    ></CustomTextField>
                    <CustomTextField
                        type="text"
                        id="home-"
                        label="Perumahan"
                        val=""
                    ></CustomTextField>
                    <CustomTextField
                        type="text"
                        id="loaned-home-"
                        label="Pinjaman Perumahan"
                        val=""
                    ></CustomTextField>
                    <CustomTextField
                        type="text"
                        id="loaned-vehicle-"
                        label="Pinjaman Kenderaam"
                        val=""
                    ></CustomTextField>
                    <!-- <RadioSingle
        
        {options}
        legend="Bekas Polis/Tentera"
        bind:userSelected={radioValueExSoldier}
    /> -->
                    <div class="pt-5">
                        <b class="text-sm text-system-primary"
                            >Maklumat Pertalian Dengan Kakitangan LKIM
                        </b>
                    </div>
                    <!-- <RadioSingle
        
        {options}
        legend="Pertalian Dengan Kakitangan LKIM"
        bind:userSelected={radioValueRelationToStaff}
    /> -->
                    <CustomTextField
                        type="text"
                        id="related-staff-number-"
                        label="No. Pekerja Kakitangan LKIM"
                        val=""
                    ></CustomTextField>
                    <CustomTextField
                        type="text"
                        id="related-staff-name-"
                        label="Nama Kakitangan LKIM"
                        val=""
                    ></CustomTextField>
                    <CustomTextField
                        type="text"
                        id="related-staff-position-"
                        label="Jawatan Kakitangan LKIM"
                        val=""
                    ></CustomTextField>
                    <CustomTextField
                        type="text"
                        id="related-staff-relations-"
                        label="Hubungan dengan Kakitangan LKIM"
                        val=""
                    ></CustomTextField>
                </form>
            </StepperContentBody>
            <!-- {:else} -->

            <!-- {/if} -->
        </StepperContent>

        <!-- Kemaskini Maklumat Pemangkuan -->
        <StepperContent>
            <StepperContentHeader title="Maklumat Perkhidmatan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                class="flex max-h-full w-full flex-col items-start justify-start"
                >
                <div class="flex w-full flex-col gap-2.5">
                        <b class="text-sm text-system-primary"
                            >Maklumat Perkhidmatan</b
                        >
                        <CustomTextField
                            id="gredSemasa"
                            label={'Gred Semasa'}
                            type="text"
                            val=""
                            placeholder=""
                        ></CustomTextField>
                        <CustomTextField
                            id="jawatan"
                            label={'Jawatan'}
                            type="text"
                            val=""
                            placeholder=""
                        ></CustomTextField>

                        <CustomTextField
                            id="penempatan"
                            label={'Penempatan'}
                            type="text"
                            val=""
                            placeholder=""
                        ></CustomTextField>

                        <CustomTextField
                            id="tarafPerkhidmatan"
                            label={'Taraf Perkhidmatan'}
                            type="text"
                            val=""
                            placeholder=""
                        ></CustomTextField>

                        <!-- <RadioButton
                        
                        options={faedahPersaraanOptions}
                        legend={'Faedah Persaraan'}
                        bind:userSelected={isFaedahKWSP}
                    ></RadioButton>  -->

                        <CustomTextField
                            id="noKWSP"
                            label={'No. KWSP'}
                            type="text"
                            val=""
                            placeholder=""
                        ></CustomTextField>
                        <CustomTextField
                            id="noSOCSO"
                            label={'No. SOCSO'}
                            type="text"
                            val=""
                            placeholder=""
                        ></CustomTextField>
                        <CustomTextField
                            id="noCukai"
                            label={'No. Cukai (LHDN)'}
                            type="text"
                            val=""
                            placeholder=""
                        ></CustomTextField>
                        <CustomTextField
                            id="bank"
                            label={'Bank'}
                            type="text"
                            val=""
                            placeholder=""
                        ></CustomTextField>
                        <CustomTextField
                            id="noAkaun"
                            label={'No. Akaun'}
                            type="text"
                            val=""
                            placeholder=""
                        ></CustomTextField>
                        <CustomTextField
                            id="program"
                            label={'Program'}
                            type="text"
                            val=""
                            placeholder=""
                        ></CustomTextField>
                        <CustomTextField
                            id="kelayakanCuti"
                            label={'Kelayakan Cuti'}
                            type="text"
                            val=""
                            placeholder=""
                        ></CustomTextField>
                        <CustomTextField
                            id="mulaDilantikPerkhidmatanKerajaan"
                            label={'Mula Dilantik Perkhidmatan Kerajaan'}
                            type="text"
                            val=""
                            placeholder=""
                        ></CustomTextField>
                        <CustomTextField
                            id="mulaDilantikPerkhidmatanLKIM"
                            label={'Mula Dilantik Perkhidmatan LKIM'}
                            type="text"
                            val=""
                            placeholder=""
                        ></CustomTextField>
                        <CustomTextField
                            id="mulaDilantikPerkhidmatanSekarang"
                            label={'Mula Dilantik Perkhidmatan Sekarang'}
                            type="text"
                            val=""
                            placeholder=""
                        ></CustomTextField>
                        <CustomTextField
                            id="disahkanDalamJawatanPertamaLKIM"
                            label={'Disahkan Dalam Jawatan Pertama LKIM'}
                            type="text"
                            val=""
                            placeholder=""
                        ></CustomTextField>
                        <CustomTextField
                            id="disahkanDalamJawatanSemasaLKIM"
                            label={'Disahkan Dalam Jawatan Semasa LKIM'}
                            type="text"
                            val=""
                            placeholder=""
                        ></CustomTextField>

                        <!-- <AccordianField
                        disabled={editable}
                        label="Sejarah Lantikan Jawatan LKIM (Gred, Jawatan, Tarikh Disahkan Jawatan, Tarikh Lantikan)"
                        header={'maklumatPerkhidmatanData.sejarahLantikanJawatanLKIM[0]'}
                    > 

                        <{#each maklumatPerkhidmatanData.sejarahLantikanJawatanLKIM as val, i} -->

                        <!-- <label
                            for=""
                            class="border-1 active:border-1 w-full rounded-[3px] border-bdr-primary text-base {!editable
                                ? 'text-txt-tertiary'
                                : 'text-txt-primary'}
                                                    hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0"
                            >{'i + 1'}. {'val'}</label
                        > -->
                        <!-- {/each} -->
                        <!-- </AccordianField>
                             -->
                        <CustomTextField
                            id="tarikhKelulusanPercantumanPerkhidmatanLepas"
                            label={'Tarikh Kelulusan Percantuman Perkhidmatan Lepas'}
                            type="text"
                            val=""
                            placeholder=""
                        ></CustomTextField>
                        <CustomTextField
                            id="pemangkuanSekarang"
                            label={'Pemangkuan Sekarang'}
                            type="text"
                            val=""
                            placeholder=""
                        ></CustomTextField>
                        <CustomTextField
                            id="tanggungKerjaSekarang"
                            label={'Tanggung Kerja Sekarang'}
                            type="text"
                            val=""
                            placeholder=""
                        ></CustomTextField>
                        <CustomTextField
                            id="skimPencen"
                            label={'Skim Pencen'}
                            type="text"
                            val=""
                            placeholder=""
                        ></CustomTextField>
                        <CustomTextField
                            id="kenaikanGajiAkhir"
                            label={'Kenaikan Gaji Akhir'}
                            type="text"
                            val=""
                            placeholder=""
                        ></CustomTextField>
                        <CustomTextField
                            id="kenaikanPangkatAkhir"
                            label={'Kenaikan Pangkat Akhir'}
                            type="text"
                            val=""
                            placeholder=""
                        ></CustomTextField>
                        <CustomTextField
                            id="bulanKGT"
                            label={'Bulan KGT'}
                            type="text"
                            val=""
                            placeholder=""
                        ></CustomTextField>
                        <CustomTextField
                            id="tarikhBersara"
                            label={'Tarikh Bersara'}
                            type="text"
                            val=""
                            placeholder=""
                        ></CustomTextField>
                        <b class="text-sm text-system-primary"
                            >Maklumat Gaji dan Elaun - Elaun</b
                        >
                        <div class="grid grid-cols-2 gap-10">
                            <div class="space-y-2.5">
                                <CustomTextField
                                    id="tarikhBerkuatkuasa"
                                    label={'Tarikh Berkuatkuasa'}
                                    type="text"
                                    val=""
                                    placeholder=""
                                ></CustomTextField>
                                <CustomTextField
                                    id="tanggaGaji"
                                    label={'Tangga Gaji'}
                                    type="text"
                                    val=""
                                    placeholder=""
                                ></CustomTextField>
                                <CustomTextField
                                    id="gajiPokok"
                                    label={'Gaji Pokok'}
                                    type="text"
                                    val=""
                                    placeholder=""
                                ></CustomTextField>
                            </div>
                            <!-- hasTooltip={true}
                                toolTipID="type-itka" -->
                            <div class="space-y-2.5">
                                <CustomTextField
                                    id="type-itka"
                                    label={'ITKA'}
                                    type="text"
                                    val=""
                                    placeholder=""
                                ></CustomTextField>
                                <CustomTextField
                                    id="itp"
                                    label={'ITP'}
                                    type="text"
                                    val=""
                                    placeholder=""
                                ></CustomTextField>
                                <CustomTextField
                                    id="epw"
                                    label={'EPW'}
                                    type="text"
                                    val=""
                                    placeholder=""
                                ></CustomTextField>
                                <CustomTextField
                                    id="cola"
                                    label={'COLA'}
                                    type="text"
                                    val=""
                                    placeholder=""
                                ></CustomTextField>
                                <!-- Tooltip body -->
                                <!-- <Tooltip
                                    type="dark"
                                    triggeredBy="[id^='type-']"
                                    on:show={assignContent}
                                    >"{tooltipContent}"</Tooltip
                                > -->
                            </div>
                        </div>
                    </div>
                </div></StepperContentBody
            >
        </StepperContent>

        <!-- Kemaskini Maklumat Temuduga -->
        <StepperContent>
            <StepperContentHeader title="Maklumat PTB dan KWAP"
            ></StepperContentHeader>
            <StepperContentBody>
                <ContentHeader
                    title="Semak dan kemaskini maklumat temuduga bagi calon-calon berikut untuk menjana surat tawaran temuduga"
                ></ContentHeader>
                <StepperContent>
                    <StepperContentBody>
                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start"
                        ></div>

                        <CustomTextField
                            id="PTBDate"
                            type="date"
                            label="Tarikh Diberi PTB"
                            val=""
                            placeholder=""
                        ></CustomTextField>

                        <CustomTextField
                            id="referenceNumber"
                            type="text"
                            label="No. Rujukan Surat JPA"
                            placeholder="contoh: 81672178"
                            val=""
                        ></CustomTextField>

                        <CustomTextField
                            id="referenceDate"
                            type="date"
                            label="Tarikh Rujukan"
                            val=""
                            placeholder=""
                        ></CustomTextField>

                        <CustomTextField
                            id="pensionNumber"
                            type="date"
                            label="No. Pencen"
                            val=""
                            placeholder=""
                        ></CustomTextField>

                        <CustomTextField
                            id="KWAPEmailDate"
                            type="date"
                            label="Tarikh Emel (KWAP)"
                            val=""
                            placeholder=""
                        ></CustomTextField>
                    </StepperContentBody>
                </StepperContent>
            </StepperContentBody>
        </StepperContent>

        <!-- keputusan Penyokong -->
        <StepperContent>
            <StepperContentHeader
                title="Sila Tetapkan Keputusan Anda - Penyokong"
            >
                <TextIconButton
                    type="primary"
                    label="Simpan"
                    form="supporterResultForm"
                >
                    <SvgCheck></SvgCheck>
                </TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <ContentHeader
                    title="Keputusan akan dihantar ke peranan - peranan berkaitan."
                ></ContentHeader>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                <form class="flex max-h-full w-full flex-col items-start justify-start">
                    
                    <div class="flex max-h-full w-full flex-col items-start justify-start">
                    <!-- Penyokong Card -->
                    
                        <b class="text-sm text-system-primary"
                            >Keputusan Penyokong</b
                        >
                    
                    
                        <CustomTextField
                       
                        id="supporterResult"
                        label="Tindakan/Ulasan"
                        val="Ali bin ABu"
                    ></CustomTextField>
                    <CustomTextField
                       
                        id="supporter-remark"
                        label="Tindakan/Ulasan"
                        val=""
                    ></CustomTextField>
                    <!-- <RadioSingle
                        name="supporterResult"
                        disabled={!editable}
                        options={supportOptions}
                        legend={'Keputusan'}
                        bind:userSelected={isSupported}
                        ></RadioSingle> -->

                    <hr />

                    </div>
                    <!-- Pelulus Card -->
                    <div  class="flex max-h-full w-full flex-col items-start justify-start">
                        <div  >
                            <b class="text-sm text-system-primary">Pelulus</b>
                        </div>
                        <CustomTextField
                            
                            type="text"
                            id="passer-name"
                            label="Nama"
                            val=""
                        ></CustomTextField>
                        <div class="text-sm text-system-primary">
                            <i class=""
                                ><li>
                                    ● Menunggu keputusan daripada PENYOKONG.
                                </li></i
                            >
                        </div>
                    </div>
                </form>
            </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
