<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    import { goto } from '$app/navigation';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import { Checkbox } from 'flowbite-svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import { ZodError, z } from 'zod';

    const options: RadioOption[] = [
        {
            value: 'ada',
            label: 'Ada',
        },
        {
            value: 'tidak ada',
            label: 'Tidak Ada',
        },
    ];

    let editable: boolean = true;
    let isSupported: string = 'true';
    const supportOptions: RadioOption[] = [
        {
            value: 'true',
            label: 'SOKONG',
        },
        {
            value: 'false',
            label: 'TIDAK SOKONG',
        },
    ];

    // =========================================================================
    // z validation schema and submit function for the new employment form fields
    // =========================================================================
    let errorData: any;

    const longTextSchema = z
        .string({ required_error: 'Medan ini tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim();

    // New Employment - Supporter Result section
    const stateDirectorResultSchema = z.object({
        stateDirectorRemark: longTextSchema,
        stateDirectorResult: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
    });

    export const submitStateDirectorResultForm = async (event: Event) => {
        const formElement = event.target as HTMLFormElement;
        const formData = new FormData(formElement);

        const stateDirectorResultData = {
            stateDirectorRemark: String(formData.get('stateDirectorRemark')),
            stateDirectorResult: String(formData.get('stateDirectorResult')),
        };

        try {
            errorData = [];
            const result = stateDirectorResultSchema.parse(
                stateDirectorResultData,
            );
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });
                setTimeout(() => goto('../../tanggung-kerja'), 1500);
            }
        } catch (error: unknown) {
            if (error instanceof ZodError) {
                const { fieldErrors: errors } = error.flatten();
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

<!-- header section -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Permohonan Tanggung Kerja"
        description="Sila lengkapkan butiran yang berkaitan"
    >
        <!-- TODO: put buttons in this area if necessary -->
        <TextIconButton
            label="Tutup"
            onClick={() => {
                goto('/pengarah-bahagian-negeri/perjawatan/tanggung-kerja');
            }}
        >
            <SvgXMark></SvgXMark>
        </TextIconButton>
    </ContentHeader>
</section>

<!-- content section -->
<!-- do not change the style of this section -->
<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-start justify-start overflow-y-hidden"
>
    <!-- start your content with this div and style it with your own preference -->
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Butiran Permohonan Tanggung Kerja"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-2"
                >
                    <TextField
                        label="Nama Gred"
                        disabled={true}
                        placeholder="-"
                        value="N32"
                    />
                    <TextField
                        label="Kementerian/Jabatan"
                        disabled={true}
                        placeholder="-"
                        value="Jabatan 1"
                    />
                    <TextField
                        label="Nombor Butiran Anggaran Belanjawan Mengurus/Waran Penjawatan"
                        disabled={true}
                        placeholder="-"
                        value="123456"
                    />
                    <TextField
                        label="Tarikh Mula"
                        disabled={true}
                        placeholder="-"
                        value="12/02/2023"
                    />
                    <TextField
                        label="Tarikh Tamat"
                        disabled={true}
                        placeholder="-"
                        value="12/03/2023"
                    />
                    <TextField
                        label="Tempat Kekosongan"
                        disabled={true}
                        placeholder="-"
                        value="Tempat 1"
                    />
                    <LongTextField
                        label="Sebab-sebab Kekosongan"
                        disabled={true}
                        placeholder="-"
                        value="Sebab-sebab..."
                    />
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Pegawai yang Menanggung Kerja"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-2"
                >
                    <TextField
                        label="Nama Pegawai"
                        disabled={true}
                        placeholder="-"
                        value="Mohd. Irfan Bin Abu"
                    />
                    <TextField
                        label="No. K/P"
                        disabled={true}
                        placeholder="-"
                        value="890701-13-5667"
                    />
                    <TextField
                        label="Tarikh Lantikan Jawatan Sekarang"
                        disabled={true}
                        placeholder="-"
                        value="dd/mm/yyyy"
                    />
                    <TextField
                        label="Tarikh Sah Dalam Jawatan Sekarang"
                        disabled={true}
                        placeholder="-"
                        value="dd/mm/yyyy"
                    />
                    <TextField
                        label="Jawatan/Gred"
                        disabled={true}
                        placeholder="-"
                        value="F41 - Pegawai Teknologi Maklumat"
                    />
                    <TextField
                        label="Tarikh Mula Bertugas di Jawatan Sekarang"
                        disabled={true}
                        placeholder="-"
                        value="dd/mm/yyyy"
                    />
                    <TextField
                        label="Tempat Bertugas Semasa"
                        disabled={true}
                        placeholder="-"
                        value="Tempat 2"
                    />
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Tempoh Penanggungan Kerja"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-2"
                >
                    <SectionHeader
                        title="Tempoh Penanggungan Kerja bagi Jawatan yang SAMA Sebelum Ini (Jika Ada)"
                    ></SectionHeader>
                    <div class="flex w-full gap-2">
                        <TextField
                            labelType="label-fit"
                            label="Dari"
                            placeholder="-"
                            disabled={true}
                            value="dd/mm/yyyy"
                        />
                        <TextField
                            labelType="label-fit"
                            label="Hingga"
                            placeholder="-"
                            disabled={true}
                            value="dd/mm/yyyy"
                        />
                    </div>
                    <SectionHeader
                        title="Tempoh Penanggungan Kerja yang Diperakukan"
                    ></SectionHeader>
                    <div class="flex w-full gap-2">
                        <TextField
                            labelType="label-fit"
                            label="Dari"
                            placeholder="-"
                            disabled={true}
                            value="dd/mm/yyyy"
                        />
                        <TextField
                            labelType="label-fit"
                            label="Hingga"
                            placeholder="-"
                            disabled={true}
                            value="dd/mm/yyyy"
                        />
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Muat Naik Dokumen Berkaitan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-2"
                >
                    <SectionHeader
                        color="system-primary"
                        title="Fail-fail yang dimuat naik:"
                    ></SectionHeader>
                    <ul
                        class="w-full list-disc pl-4 text-sm text-txt-secondary"
                    >
                        <li>
                            Carta Organisasi (Kedudukan Pegawai dan Jawatan yang
                            Ditanggung Kerja);
                        </li>
                        <li>Salinan Surat Arahan Penangguhan Kerja;</li>
                        <li>Maklumat Cuti yang Terkini;</li>
                        <li>
                            Senarai Tugas Jawatan Ditanggung Kerja dan Pegawai
                            Menanggung Kerja
                        </li>
                    </ul>
                    <ul
                        class="flex w-full list-decimal flex-col gap-2 pl-4 text-sm"
                    >
                        <li>
                            <DownloadAttachment fileName="Carta Organisasi" />
                        </li>
                        <li>
                            <DownloadAttachment
                                fileName="Salinan Surat Arahan Penangguhan Kerja"
                            />
                        </li>
                        <li>
                            <DownloadAttachment
                                fileName="Maklumat Cuti Terkini"
                            />
                        </li>
                        <li><DownloadAttachment fileName="Senarai Tugas" /></li>
                    </ul>
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Pelangkauan dari Segi Kekananan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-2"
                >
                    <SectionHeader title="Pelangkauan dari Segi Kekananan"
                    ></SectionHeader>
                    <RadioSingle {options} disabled={true}></RadioSingle>
                    <LongTextField
                        label="Jika Ada, sila nyatakan sebab-sebab pelangkauan"
                        disabled={true}
                        placeholder="-"
                        value="Sebab-sebab..."
                    ></LongTextField>
                    <div class="w-full py-10">
                        <Checkbox checked disabled
                            ><span class="font-semibold"
                                >Saya dengan ini mengesahkan bahawa maklumat
                                sebagaimana yang dinyatakan berikut adalah
                                benar.</span
                            ></Checkbox
                        >
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader
                title="Sokongan dari Pengarah Bahagian/Negeri"
            >
                <TextIconButton
                    primary
                    label="Simpan"
                    form="stateDirectorResultForm"
                /></StepperContentHeader
            >
            <StepperContentBody>
                <SectionHeader
                    title="Ulasan Keputusan daripada Pengarah Bahagian/Negeri"
                ></SectionHeader>
                <form
                    id="stateDirectorResultForm"
                    on:submit|preventDefault={submitStateDirectorResultForm}
                    class="flex w-full flex-col gap-2.5"
                >
                    <!-- Penyokong Card -->
                    <div class="mb-5">
                        <b class="text-sm text-system-primary"
                            >Keputusan Pengarah Bahagian/Negeri</b
                        >
                    </div>
                    <LongTextField
                        hasError={errorData?.stateDirectorRemark}
                        name="stateDirectorRemark"
                        id="supporter-remark"
                        label="Tindakan/Ulasan"
                        value=""
                    ></LongTextField>
                    {#if errorData?.stateDirectorRemark}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.stateDirectorRemark[0]}</span
                        >
                    {/if}

                    <RadioSingle
                        name="stateDirectorResult"
                        disabled={!editable}
                        options={supportOptions}
                        legend={'Keputusan'}
                        bind:userSelected={isSupported}
                    ></RadioSingle>
                    {#if errorData?.stateDirectorResult}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.stateDirectorResult[0]}</span
                        >
                    {/if}
                    <hr />
                </form>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
<Toaster />
