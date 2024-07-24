<script lang="ts">
    import DocumentInput from '$lib/components/document-input/DocumentInput.svelte';
    import SuratPertukaran from '$lib/components/letter/SuratPertukaran.svelte';
    import SingleChoiceInput from '$lib/components/inputs/single-choice-input/SingleChoiceInput.svelte';

    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';

    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import { goto } from '$app/navigation';
    import SvgChevronLeft from '$lib/assets/svg/SvgChevronLeft.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import type { PageData } from './$types';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import {
        approveAltOptions,
        approveOptions,
        commonOptions,
        supportAltOptions,
    } from '$lib/constants/core/radio-option-constants';
    import CustomBanner from '$lib/components/banner/CustomBanner.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';

    export let data: PageData;

    let selectedValue: string = 'Disokong tanpa pengganti';
</script>

<section class="flex w-full flex-col items-center justify-center">
    <ContentHeader title="Permohonan Pertukaran - Permohonan Sendiri">
        <TextIconButton
            type="draft"
            label="Kembali"
            onClick={() => {
                goto('/v2/employment/transfer');
            }}
        >
            <SvgChevronLeft></SvgChevronLeft>
        </TextIconButton>
    </ContentHeader>
</section>

<section
    class="flex h-full w-full flex-col items-start justify-start overflow-y-hidden"
>
    <Stepper activeIndex={0}>
        <!-- ======================================================================= -->
        <!-- DETAILS -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Butiran Peribadi">
                <TextIconButton label="Simpan" type="draft" icon="save"
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-2"
                >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-10 xl:w-1/2"
                    >
                        <!-- form wrapper starts here -->
                        <div
                            class="flex w-full flex-col items-start justify-start gap-2"
                        >
                            <form
                                action=""
                                class="flex w-full flex-col items-start justify-start gap-1"
                            >
                                <CustomTextField
                                    disabled
                                    id="name"
                                    label="Nama Pemohon"
                                    type="text"
                                    val=""
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="identityDocumentNumber"
                                    label="No. Kad Pengenalan"
                                    type="text"
                                    val=""
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="employeeNumber"
                                    label="No. Pekerja"
                                    type="text"
                                    val=""
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="phone"
                                    label="No. Telefon Bimbit"
                                    type="text"
                                    val=""
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="maritalStatus"
                                    label="Status"
                                    type="text"
                                    val=""
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="childCount"
                                    label="Bilangan Anak"
                                    type="text"
                                    val=""
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="childInSchoolCount"
                                    label="Bilangan Anak Bersekolah"
                                    type="text"
                                    val=""
                                ></CustomTextField>
                            </form>
                        </div>
                        <!-- form wrapper ends here -->
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <!-- ======================================================================= -->
        <!-- DETAILS -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Maklumat Perkhidmatan">
                <TextIconButton label="Simpan" type="draft" icon="save"
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-2"
                >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-10 xl:w-1/2"
                    >
                        <!-- form wrapper starts here -->
                        <div
                            class="flex w-full flex-col items-start justify-start gap-2"
                        >
                            <form
                                action=""
                                class="flex w-full flex-col items-start justify-start gap-1"
                            >
                                <CustomTextField
                                    disabled
                                    id="position"
                                    label="Nama Jawatan"
                                    type="text"
                                    val=""
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="grade"
                                    label="Gred"
                                    type="text"
                                    val=""
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="hiringDate"
                                    label="Tarikh Lantikan"
                                    type="text"
                                    val=""
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="officeName"
                                    label="Nama Jabatan"
                                    type="text"
                                    val=""
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="officeAddress"
                                    label="Alamat Jabatan"
                                    type="text"
                                    val=""
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="department"
                                    label="Bahagian/ Unit"
                                    type="text"
                                    val=""
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="servicePeriod"
                                    label="Tempoh Perkhidmatan Di Penempatan Sekarang"
                                    type="text"
                                    val=""
                                ></CustomTextField>
                            </form>
                        </div>
                        <!-- form wrapper ends here -->
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <!-- ======================================================================= -->
        <!-- APPLICATION DETAILS -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Butiran Permohonan">
                <TextIconButton label="Simpan" type="draft" icon="save"
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-2"
                >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-10 xl:w-1/2"
                    >
                        <!-- notes starts here -->
                        <div
                            class="flex w-full flex-col items-center justify-start bg-slate-50 p-2"
                        >
                            <p
                                class="w-full text-wrap text-start text-base font-medium text-slate-500"
                            >
                                Sila baca keterangan yang berikut sebelum
                                mengisi borang:
                            </p>
                            <ol
                                class="w-full list-decimal px-4 text-start text-base text-slate-500"
                            >
                                <li class="w-full">
                                    Borang ini hendaklah diisi dalam dua (2)
                                    salinan.
                                </li>
                                <li>
                                    Sebarang perubahan maklumat kepada
                                    permohonan pertukaran yang telah didaftarkan
                                    hendaklah dimaklumkan secara bertulis.
                                </li>
                                <li>
                                    Bagi permohonan kerana mengikut pasangan
                                    (suami/isteri), salinan Sijil Nikah dan
                                    Surat Akuan Majikan pasangan hendaklah
                                    disertakan.
                                </li>
                                <li>
                                    Permohonan ini sah dan berkuatkuasa bagi
                                    tempoh satu (1) tahun dari tarikh
                                    permohonan. Selepas tempoh tersebut,
                                    permohonan ini akan terbatal dengan
                                    sendirinya dan sekiranya tuan dan puan masih
                                    berminat untuk bertukar, sila kemukakan
                                    permohonan baharu.
                                </li>
                            </ol>
                        </div>
                        <!-- notes ends here -->

                        <!-- form wrapper starts here -->
                        <div
                            class="flex w-full flex-col items-start justify-start gap-2"
                        >
                            <form
                                action=""
                                class="flex w-full flex-col items-start justify-start gap-1"
                            >
                                <SingleChoiceInput
                                    id="category"
                                    label="Jenis Pertukaran"
                                    choices={data.lookup.transferCategoryOption}
                                    bind:val={selectedValue}
                                ></SingleChoiceInput>
                                <CustomTextField
                                    id="appliedLocation"
                                    label="Penempatan Bertukar"
                                    val=""
                                ></CustomTextField>
                                <SingleChoiceInput
                                    id="reason"
                                    label="Alasan Pertukaran"
                                    choices={data.lookup.transferReasonOption}
                                    bind:val={selectedValue}
                                ></SingleChoiceInput>
                                <CustomTextField
                                    id="remark"
                                    label="Sila Berikan Penjelasan Sekiranya Anda Memilih Lain-lain Sebagai Alasan Pertukaran"
                                    val=""
                                ></CustomTextField>

                                <p class="text-base font-medium text-slate-700">
                                    Sekiranya Alasan Pertukaran Pemohon Kerana
                                    Mengikut Pasangan Sila Isikan Maklumat
                                    Pasangan Seperti Berikut:
                                </p>

                                <CustomTextField
                                    id="workPlaceDistance"
                                    type="number"
                                    label="Jarak Tempat Kerja (KM)"
                                    val=""
                                ></CustomTextField>
                                <CustomTextField
                                    id="employerName"
                                    type="text"
                                    label="Nama Majikan"
                                    val=""
                                ></CustomTextField>
                                <CustomTextField
                                    id="startDate"
                                    type="date"
                                    label="Tarikh Mula Berkhidmat Di Penempatan Sekarang"
                                    val=""
                                ></CustomTextField>
                            </form>
                        </div>
                        <!-- form wrapper ends here -->
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <!-- ======================================================================= -->
        <!-- EMPLOYEE CONFIRMATION -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Perakuan Pemohon">
                <TextIconButton label="Hantar" type="primary" icon="check"
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-2"
                >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-4 xl:w-1/2"
                    >
                        <CustomBanner
                            text="Sila buat perakuan anda di bawah dan klik butang Hantar untuk menghantar permohonan ini ke Urus Setia Perjawatan dan diproses."
                        ></CustomBanner>

                        <form
                            action=""
                            class="flex w-full flex-col items-start justify-start gap-4 p-2"
                        >
                            <div
                                class="flex w-full flex-row items-start justify-start gap-2"
                            >
                                <div
                                    class="flex h-6 w-fit flex-col items-center justify-center"
                                >
                                    <input
                                        id="status"
                                        type="checkbox"
                                        value={false}
                                        class="rounded focus:outline-none focus:ring-0"
                                    />
                                </div>
                                <p
                                    class="text-justify text-base font-normal leading-loose tracking-wide text-slate-700"
                                >
                                    Saya sesungguhnya mengakui bahawa semua
                                    keterangan di atas adalah benar. Lembaga
                                    Kemajuan Ikan Malaysia (LKIM) berhak
                                    membatalkan permohonan saya jika didapati
                                    ada maklumat yang tidak benar. Saya faham
                                    bahawa pertukaran ini hanyalah ke Ibu
                                    Pejabat/Negeri/Wilayah yang saya nyatakan di
                                    atas sahaja. Saya juga faham bahawa
                                    penempatan saya ke mana-mana tempat di dalam
                                    Ibu Pejabat/Negeri/Wilayah itu adalah
                                    terpulang kepada pertimbangan dan sokongan
                                    Pengarah Bahagian/Negeri berkenaan. Saya
                                    juga mengambil maklum bahawa sekiranya saya
                                    membatalkan pertukaran yang telah diluluskan
                                    oleh Jawatankuasa Penyelarasan Penempatan
                                    Pegawai dan Kakitangan LKIM, saya tidak
                                    layak beri sebarang pertimbangan pertukaran
                                    ke tempat yang sama dalam tempoh satu (1)
                                    tahun dari tarikh pembatalan dilakukan.
                                </p>
                            </div>
                            <CustomTextField
                                id="date"
                                type="date"
                                label="Tarikh Perakuan"
                                val=""
                            ></CustomTextField>
                        </form>
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <!-- ======================================================================= -->
        <!-- ASSIGN DIRECTOR -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Lantikan Pengarah Bahagian/Negeri">
                <TextIconButton label="Hantar" type="draft" icon="save"
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-2"
                >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-10 xl:w-1/2"
                    >
                        <form
                            action=""
                            class="flex w-full flex-col items-center justify-start gap-2"
                        >
                            <CustomSelectField
                                id="identityDocumentNumber"
                                label={'Sila pilih Pengarah Bahagian/Negeri untuk memberi sokongan bagi permohonan ini'}
                                val=""
                                options={data.lookup.directorDrodpwon}
                            ></CustomSelectField>
                            <CustomTextField
                                disabled
                                id="employeeName"
                                label={'Nama Pengarah'}
                                val=""
                            ></CustomTextField>
                            <CustomTextField
                                disabled
                                id="identityDocumentNumber"
                                label={'No Kad Pengenalan'}
                                val=""
                            ></CustomTextField>
                        </form>
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <!-- ======================================================================= -->
        <!-- DIRECTOR SUPPORT -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Perakuan Pengarah Bahagian/Negeri">
                <TextIconButton label="Simpan" type="draft" icon="save"
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-2"
                >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-10 xl:w-1/2"
                    >
                        <!-- form wrapper starts here -->
                        <div
                            class="flex w-full flex-col items-start justify-start gap-2"
                        >
                            <form
                                action=""
                                class="flex w-full flex-col items-start justify-start gap-1"
                            >
                                <p class="text-base font-medium text-slate-700">
                                    Saya mengesahkan bahawa maklumat yang
                                    diberikan adalah benar. Oleh itu saya
                                    memperakukan permohonan ini seperti ulasan
                                    berikut:
                                </p>
                                <SingleChoiceInput
                                    id="reason"
                                    label="Maklum Balas Pengarah"
                                    choices={data.lookup.directorFeedbackOption}
                                    bind:val={selectedValue}
                                ></SingleChoiceInput>

                                <CustomTextField
                                    id="remark"
                                    label="Ulasan"
                                    type="textarea"
                                    val=""
                                ></CustomTextField>

                                <CustomTextField
                                    disabled
                                    id="date"
                                    label="Tarikh"
                                    type="date"
                                    val=""
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="name"
                                    label="Nama Pengarah"
                                    type="text"
                                    val=""
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="identityDocumentNumber"
                                    label="No. Kad Pengenalan"
                                    type="text"
                                    val=""
                                ></CustomTextField>
                            </form>
                        </div>
                        <!-- form wrapper ends here -->
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <!-- ======================================================================= -->
        <!-- MEETING RESULT -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Keputusan Mesyuarat">
                <TextIconButton label="Simpan" type="draft" icon="save"
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-2"
                >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-10 xl:w-1/2"
                    >
                        <!-- form wrapper starts here -->
                        <div
                            class="flex w-full flex-col items-start justify-start gap-2"
                        >
                            <CustomBanner
                                text="Sila masukkan butiran dan keputusan mesyuarat di ruangan yang tersedia di bawah."
                            ></CustomBanner>
                            <form
                                action=""
                                class="flex w-full flex-col items-start justify-start gap-1"
                            >
                                <CustomTextField
                                    id="meetingName"
                                    label="Nama Mesyuarat"
                                    type="text"
                                    val=""
                                ></CustomTextField>
                                <CustomTextField
                                    id="meetingDate"
                                    label="Tarikh Mesyuarat"
                                    type="date"
                                    val=""
                                ></CustomTextField>
                                <CustomRadioBoolean
                                    disabled={false}
                                    id="status"
                                    label="Keputusan Mesyuarat Permohonan Ini Adalah:"
                                    val={null}
                                    options={approveOptions}
                                ></CustomRadioBoolean>
                                <CustomTextField
                                    id="remark"
                                    label="Ulasan"
                                    type="textarea"
                                    val=""
                                ></CustomTextField>
                            </form>
                        </div>
                        <!-- form wrapper ends here -->
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <!-- ======================================================================= -->
        <!-- ACCEPTANCE LETTER -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Butiran Surat Pertukaran">
                <TextIconButton label="Simpan" type="draft" icon="save"
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-2"
                >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-10 xl:w-1/2"
                    >
                        <!-- form wrapper starts here -->
                        <div
                            class="flex w-full flex-col items-start justify-start gap-2"
                        >
                            <SuratPertukaran></SuratPertukaran>
                        </div>
                        <!-- form wrapper ends here -->
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <!-- ======================================================================= -->
        <!-- POSTPONE -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Permohonan Penangguhan">
                <TextIconButton label="Hantar" type="primary" icon="check"
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-2"
                >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-10 xl:w-1/2"
                    >
                        <!-- form wrapper starts here -->
                        <div
                            class="flex w-full flex-col items-start justify-start gap-2"
                        >
                            <form
                                action=""
                                class="flex w-full flex-col items-start justify-start gap-1"
                            >
                                <CustomRadioBoolean
                                    disabled={false}
                                    id="status"
                                    label="Adakah Anda Ingin Memohon Penangguhan Tarikh Pertukaran"
                                    val={null}
                                    options={commonOptions}
                                ></CustomRadioBoolean>
                                <CustomTextField
                                    id="remark"
                                    label="Ulasan"
                                    type="textarea"
                                    val=""
                                ></CustomTextField>
                                <DocumentInput
                                    documents={[]}
                                    label="Sila Muat Naik Surat Permohonan Penangguhan"
                                ></DocumentInput>
                                <CustomTextField
                                    id="date"
                                    label="Tarikh Permohonan Dihantar"
                                    type="date"
                                    val=""
                                ></CustomTextField>
                            </form>
                        </div>
                        <!-- form wrapper ends here -->
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <!-- ======================================================================= -->
        <!-- ASSIGN POSTPONE APPROVER -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader
                title="Lantikan Penyokong Permohonan Penangguhan"
            >
                <TextIconButton label="Hantar" type="primary" icon="check"
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-2"
                >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-10 xl:w-1/2"
                    >
                        <!-- form wrapper starts here -->
                        <div
                            class="flex w-full flex-col items-start justify-start gap-2"
                        >
                            <form
                                action=""
                                class="flex w-full flex-col items-center justify-start gap-2"
                            >
                                <CustomSelectField
                                    id="identityDocumentNumber"
                                    label={'Sila pilih penyokong untuk memberi sokongan bagi permohonan penangguhan pertukaran ini'}
                                    val=""
                                    options={data.lookup.directorDrodpwon}
                                ></CustomSelectField>
                                <CustomTextField
                                    disabled
                                    id="employeeName"
                                    label={'Nama Penyokong'}
                                    val=""
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="identityDocumentNumber"
                                    label={'No Kad Pengenalan'}
                                    val=""
                                ></CustomTextField>
                            </form>
                        </div>
                        <!-- form wrapper ends here -->
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <!-- ======================================================================= -->
        <!-- POSTPONE APPROVAL -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Sokongan Permohonan Penangguhan">
                <TextIconButton label="Hantar" type="primary" icon="check"
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-2"
                >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-10 xl:w-1/2"
                    >
                        <!-- form wrapper starts here -->
                        <div
                            class="flex w-full flex-col items-start justify-start gap-2"
                        >
                            <form
                                action=""
                                class="flex w-full flex-col items-start justify-start gap-1"
                            >
                                <CustomRadioBoolean
                                    disabled={false}
                                    id="status"
                                    label="Permohonan Penangguhan Pertukaran Pegawai Di Atas Adalah:"
                                    val={null}
                                    options={supportAltOptions}
                                ></CustomRadioBoolean>
                                <CustomTextField
                                    id="remark"
                                    label="Ulasan"
                                    type="textarea"
                                    val=""
                                ></CustomTextField>
                                <CustomTextField
                                    id="date"
                                    label="Tarikh Maklum Balas Dihantar"
                                    type="date"
                                    val=""
                                ></CustomTextField>
                            </form>
                        </div>
                        <!-- form wrapper ends here -->
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <!-- ======================================================================= -->
        <!-- POSTPONE LETTER -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Butiran Surat Penangguhan Pertukaran">
                <TextIconButton label="Hantar" type="primary" icon="check"
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-2"
                >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-10 xl:w-1/2"
                    >
                        <!-- form wrapper starts here -->
                        <div
                            class="flex w-full flex-col items-start justify-start gap-2"
                        >
                            <form
                                action=""
                                class="flex w-full flex-col items-center justify-start gap-2"
                            ></form>
                        </div>
                        <!-- form wrapper ends here -->
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <!-- ======================================================================= -->
        <!-- TRANSFER ITINERARY -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Dokumen Keperluan Pertukaran">
                <TextIconButton label="Hantar" type="primary" icon="check"
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-2"
                >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-10 xl:w-1/2"
                    >
                        <!-- form wrapper starts here -->
                        <div
                            class="flex w-full flex-col items-start justify-start gap-2"
                        >
                            <form
                                action=""
                                class="flex w-full flex-col items-start justify-start gap-1"
                            >
                                <DocumentInput
                                    documents={[]}
                                    label="Sila Muat Naik Salinan Borang-borang yang Telah Diisi"
                                ></DocumentInput>
                                <CustomTextField
                                    id="date"
                                    label="Tarikh Dokumen Dihantar"
                                    type="date"
                                    val=""
                                ></CustomTextField>
                            </form>
                        </div>
                        <!-- form wrapper ends here -->
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <!-- ======================================================================= -->
        <!-- ASSIGN SUPPORTER AND APPROVER -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Lantikan Penyokong dan Pelulus">
                <TextIconButton label="Hantar" type="primary" icon="check"
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-2"
                >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-10 xl:w-1/2"
                    >
                        <!-- form wrapper starts here -->
                        <div
                            class="flex w-full flex-col items-start justify-start gap-2"
                        >
                            <form
                                action=""
                                class="flex w-full flex-col items-center justify-start gap-2"
                            >
                                <CustomSelectField
                                    id="identityDocumentNumber"
                                    label={'Sila Pilih Penyokong Untuk Menyokong Pertukaran Ini'}
                                    val=""
                                    options={data.lookup.directorDrodpwon}
                                ></CustomSelectField>
                                <CustomSelectField
                                    id="identityDocumentNumber"
                                    label={'Sila Pilih Pelulus Untuk Meluluskan Pertukaran Ini'}
                                    val=""
                                    options={data.lookup.directorDrodpwon}
                                ></CustomSelectField>
                                <CustomTextField
                                    disabled
                                    id="employeeName"
                                    label={'Nama Penyokong'}
                                    val=""
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="identityDocumentNumber"
                                    label={'No Kad Pengenalan Penyokong'}
                                    val=""
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="employeeName"
                                    label={'Nama Pelulus'}
                                    val=""
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="identityDocumentNumber"
                                    label={'No Kad Pengenalan Pelulus'}
                                    val=""
                                ></CustomTextField>
                            </form>
                        </div>
                        <!-- form wrapper ends here -->
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <!-- ======================================================================= -->
        <!-- TRANSFER SUPPORT -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Maklum Balas Penyokong">
                <TextIconButton label="Hantar" type="primary" icon="check"
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-2"
                >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-10 xl:w-1/2"
                    >
                        <!-- form wrapper starts here -->
                        <div
                            class="flex w-full flex-col items-start justify-start gap-2"
                        >
                            <form
                                action=""
                                class="flex w-full flex-col items-start justify-start gap-1"
                            >
                                <CustomRadioBoolean
                                    disabled={false}
                                    id="status"
                                    label="Pertukaran Pegawai Di Atas Adalah:"
                                    val={null}
                                    options={supportAltOptions}
                                ></CustomRadioBoolean>
                                <CustomTextField
                                    id="remark"
                                    label="Ulasan"
                                    type="textarea"
                                    val=""
                                ></CustomTextField>
                                <CustomTextField
                                    id="date"
                                    label="Tarikh Maklum Balas Dihantar"
                                    type="date"
                                    val=""
                                ></CustomTextField>
                            </form>
                        </div>
                        <!-- form wrapper ends here -->
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <!-- ======================================================================= -->
        <!-- TRANSFER APPROVAL -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Maklum Balas Pelulus">
                <TextIconButton label="Hantar" type="primary" icon="check"
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-2"
                >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-10 xl:w-1/2"
                    >
                        <!-- form wrapper starts here -->
                        <div
                            class="flex w-full flex-col items-start justify-start gap-2"
                        >
                            <form
                                action=""
                                class="flex w-full flex-col items-start justify-start gap-1"
                            >
                                <CustomRadioBoolean
                                    disabled={false}
                                    id="status"
                                    label="Pertukaran Pegawai Di Atas Adalah:"
                                    val={null}
                                    options={approveAltOptions}
                                ></CustomRadioBoolean>
                                <CustomTextField
                                    id="remark"
                                    label="Ulasan"
                                    type="textarea"
                                    val=""
                                ></CustomTextField>
                                <CustomTextField
                                    id="date"
                                    label="Tarikh Maklum Balas Dihantar"
                                    type="date"
                                    val=""
                                ></CustomTextField>
                            </form>
                        </div>
                        <!-- form wrapper ends here -->
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
