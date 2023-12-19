<script lang="ts">
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';
    import { mockEmployeeDocumentLists } from '$lib/mocks/database/mockEmployeeDocumentLists';

    export let disabled: boolean = false;

    let stepperFormTitleClass =
        'w-full h-fit mt-2 bg-bgr-primary text-system-primary text-sm font-medium';

    let radioValue: any = 'tidak';

    const options: RadioOption[] = [
        {
            value: 'ya',
            label: 'Ya',
        },
        {
            value: 'tidak',
            label: 'Tidak',
        },
    ];

    let isNormal: string = 'true';

    const normalAbnormalOptions: RadioOption[] = [
        {
            value: 'normal',
            label: 'Normal',
        },
        {
            value: 'abnormal',
            label: 'Abnormal',
        },
    ];

    const currentEmployeeUploadedDocuments = mockEmployeeDocumentLists;
</script>

<Stepper>
    <StepperContent>
        <StepperContentHeader title="Sejarah Penyakit"
            ><FormButton
                type="close"
                onClick={() => {
                    goto('/kakitangan/profil');
                }}
            /></StepperContentHeader
        >
        <StepperContentBody
            ><!-- Sejarah Penyakit -->

            <div class="flex w-full flex-col gap-2">
                <table class="text-left text-sm">
                    <tr>
                        <th></th>
                        <th>SENDIRI</th>
                        <th>KELUARGA</th>
                        <th>ULASAN</th>
                    </tr>
                    <tr>
                        <td>Penyakit sejak lahir atau baka</td>
                        <td
                            ><RadioSingle
                                {options}
                                legend=""
                                bind:userSelected={radioValue}
                                {disabled}
                            /></td
                        >
                        <td
                            ><RadioSingle
                                {options}
                                legend=""
                                bind:userSelected={radioValue}
                                {disabled}
                            /></td
                        >
                        <td><TextField {disabled} label=""></TextField></td>
                    </tr>
                    <tr>
                        <td>Alahan</td>
                        <td
                            ><RadioSingle
                                {options}
                                legend=""
                                bind:userSelected={radioValue}
                                {disabled}
                            /></td
                        >
                        <td
                            ><RadioSingle
                                {options}
                                legend=""
                                bind:userSelected={radioValue}
                                {disabled}
                            /></td
                        >
                        <td><TextField {disabled} label=""></TextField></td>
                    </tr>
                    <tr>
                        <td>Sakit jiwa</td>
                        <td
                            ><RadioSingle
                                {options}
                                legend=""
                                bind:userSelected={radioValue}
                                {disabled}
                            /></td
                        >
                        <td
                            ><RadioSingle
                                {options}
                                legend=""
                                bind:userSelected={radioValue}
                                {disabled}
                            /></td
                        >
                        <td><TextField {disabled} label=""></TextField></td>
                    </tr>
                    <tr>
                        <td>Epilepsi, sawan, angin ahmar, penyakit saraf</td>
                        <td
                            ><RadioSingle
                                {options}
                                legend=""
                                bind:userSelected={radioValue}
                                {disabled}
                            /></td
                        >
                        <td
                            ><RadioSingle
                                {options}
                                legend=""
                                bind:userSelected={radioValue}
                                {disabled}
                            /></td
                        >
                        <td><TextField {disabled} label=""></TextField></td>
                    </tr>
                    <tr>
                        <td>Darah tinggi</td>
                        <td
                            ><RadioSingle
                                {options}
                                legend=""
                                bind:userSelected={radioValue}
                                {disabled}
                            /></td
                        >
                        <td
                            ><RadioSingle
                                {options}
                                legend=""
                                bind:userSelected={radioValue}
                                {disabled}
                            /></td
                        >
                        <td
                            ><TextField {disabled} label="" value="Bapa"
                            ></TextField></td
                        >
                    </tr>
                    <tr>
                        <td>Kencing manis</td>
                        <td
                            ><RadioSingle
                                {options}
                                legend=""
                                bind:userSelected={radioValue}
                                {disabled}
                            /></td
                        >
                        <td
                            ><RadioSingle
                                {options}
                                legend=""
                                bind:userSelected={radioValue}
                                {disabled}
                            /></td
                        >
                        <td><TextField {disabled} label=""></TextField></td>
                    </tr>
                    <tr>
                        <td>Jantung atatu salur darah</td>
                        <td
                            ><RadioSingle
                                {options}
                                legend=""
                                bind:userSelected={radioValue}
                                {disabled}
                            /></td
                        >
                        <td
                            ><RadioSingle
                                {options}
                                legend=""
                                bind:userSelected={radioValue}
                                {disabled}
                            /></td
                        >
                        <td><TextField {disabled} label=""></TextField></td>
                    </tr>
                    <tr>
                        <td>Asma</td>
                        <td
                            ><RadioSingle
                                {options}
                                legend=""
                                bind:userSelected={radioValue}
                                {disabled}
                            /></td
                        >
                        <td
                            ><RadioSingle
                                {options}
                                legend=""
                                bind:userSelected={radioValue}
                                {disabled}
                            /></td
                        >
                        <td><TextField {disabled} label=""></TextField></td>
                    </tr>
                    <tr>
                        <td>Sakit buah pinggang</td>
                        <td
                            ><RadioSingle
                                {options}
                                legend=""
                                bind:userSelected={radioValue}
                                {disabled}
                            /></td
                        >
                        <td
                            ><RadioSingle
                                {options}
                                legend=""
                                bind:userSelected={radioValue}
                                {disabled}
                            /></td
                        >
                        <td><TextField {disabled} label=""></TextField></td>
                    </tr>
                    <tr>
                        <td>Barah</td>
                        <td
                            ><RadioSingle
                                {options}
                                legend=""
                                bind:userSelected={radioValue}
                                {disabled}
                            /></td
                        >
                        <td
                            ><RadioSingle
                                {options}
                                legend=""
                                bind:userSelected={radioValue}
                                {disabled}
                            /></td
                        >
                        <td><TextField {disabled} label=""></TextField></td>
                    </tr>
                    <tr>
                        <td>Batuk kering</td>
                        <td
                            ><RadioSingle
                                {options}
                                legend=""
                                bind:userSelected={radioValue}
                                {disabled}
                            /></td
                        >
                        <td
                            ><RadioSingle
                                {options}
                                legend=""
                                bind:userSelected={radioValue}
                                {disabled}
                            /></td
                        >
                        <td><TextField {disabled} label=""></TextField></td>
                    </tr>
                    <tr>
                        <td>Ketagihan dadah</td>
                        <td
                            ><RadioSingle
                                {options}
                                legend=""
                                bind:userSelected={radioValue}
                                {disabled}
                            /></td
                        >
                        <td
                            ><RadioSingle
                                {options}
                                legend=""
                                bind:userSelected={radioValue}
                                {disabled}
                            /></td
                        >
                        <td><TextField {disabled} label=""></TextField></td>
                    </tr>
                    <tr>
                        <td>AIDS, HIV</td>
                        <td
                            ><RadioSingle
                                {options}
                                legend=""
                                bind:userSelected={radioValue}
                                {disabled}
                            /></td
                        >
                        <td
                            ><RadioSingle
                                {options}
                                legend=""
                                bind:userSelected={radioValue}
                                {disabled}
                            /></td
                        >
                        <td><TextField {disabled} label=""></TextField></td>
                    </tr>
                    <tr>
                        <td>Hepatitis B</td>
                        <td
                            ><RadioSingle
                                {options}
                                legend=""
                                bind:userSelected={radioValue}
                                {disabled}
                            /></td
                        >
                        <td
                            ><RadioSingle
                                {options}
                                legend=""
                                bind:userSelected={radioValue}
                                {disabled}
                            /></td
                        >
                        <td><TextField {disabled} label=""></TextField></td>
                    </tr>
                    <tr>
                        <td>Sejarah pembedahan</td>
                        <td
                            ><RadioSingle
                                {options}
                                legend=""
                                bind:userSelected={radioValue}
                                {disabled}
                            /></td
                        >
                        <td
                            ><RadioSingle
                                {options}
                                legend=""
                                bind:userSelected={radioValue}
                                {disabled}
                            /></td
                        >
                        <td><TextField {disabled} label=""></TextField></td>
                    </tr>
                    <tr>
                        <td>Kecacatan anggota, pancaindera</td>
                        <td
                            ><RadioSingle
                                {options}
                                legend=""
                                bind:userSelected={radioValue}
                                {disabled}
                            /></td
                        >
                        <td
                            ><RadioSingle
                                {options}
                                legend=""
                                bind:userSelected={radioValue}
                                {disabled}
                            /></td
                        >
                        <td><TextField {disabled} label=""></TextField></td>
                    </tr>
                    <tr>
                        <td>Merokok</td>
                        <td
                            ><RadioSingle
                                {options}
                                legend=""
                                bind:userSelected={radioValue}
                                {disabled}
                            /></td
                        >
                        <td
                            ><RadioSingle
                                {options}
                                legend=""
                                bind:userSelected={radioValue}
                                {disabled}
                            /></td
                        >
                        <td><TextField {disabled} label=""></TextField></td>
                    </tr>
                    <tr>
                        <td>Penyakit serius lain</td>
                        <td
                            ><RadioSingle
                                {options}
                                legend=""
                                bind:userSelected={radioValue}
                                {disabled}
                            /></td
                        >
                        <td
                            ><RadioSingle
                                {options}
                                legend=""
                                bind:userSelected={radioValue}
                                {disabled}
                            /></td
                        >
                        <td><TextField {disabled} label=""></TextField></td>
                    </tr>
                    <tr>
                        <td>Sedang menerima rawatan</td>
                        <td
                            ><RadioSingle
                                {options}
                                legend=""
                                bind:userSelected={radioValue}
                                {disabled}
                            /></td
                        >
                        <td
                            ><RadioSingle
                                {options}
                                legend=""
                                bind:userSelected={radioValue}
                                {disabled}
                            /></td
                        >
                        <td><TextField {disabled} label=""></TextField></td>
                    </tr>
                </table>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Pemeriksaan Doktor"
            ><FormButton
                type="close"
                onClick={() => {
                    goto('/kakitangan/profil');
                }}
            /><TextIconButton
                primary
                label="Hantar"
                onClick={() => {
                    goto('/kakitangan/profil');
                }}><SvgPaperAirplane /></TextIconButton
            ></StepperContentHeader
        >
        <StepperContentBody
            ><div
                class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
            >
                <p class="text-sm font-bold">Pemeriksaan Am</p>
                <TextField
                    {disabled}
                    id="tinggi"
                    label="Tinggi (cm)"
                    value="169"
                ></TextField>
                <TextField {disabled} id="berat" label="Berat (kg)" value="65"
                ></TextField>
                <TextField {disabled} id="bmi" label="BMI" value="22.76"
                ></TextField>
                <TextField
                    {disabled}
                    id="denyutanNadi"
                    label="Denyutan Nadi (setiap minit)"
                    value="90"
                ></TextField>
                <TextField {disabled} id="bp" label="BP (mmHg)" value="120/80"
                ></TextField>
                <RadioSingle
                    {options}
                    legend="Kulit pucat"
                    bind:userSelected={radioValue}
                    {disabled}
                />
                <RadioSingle
                    {options}
                    legend="Sianosis"
                    bind:userSelected={radioValue}
                    {disabled}
                />
                <RadioSingle
                    {options}
                    legend="Edama"
                    bind:userSelected={radioValue}
                    {disabled}
                />
                <RadioSingle
                    {options}
                    legend="Penyakit kuning"
                    bind:userSelected={radioValue}
                    {disabled}
                />
                <RadioSingle
                    {options}
                    legend="Kelenjar limfa"
                    bind:userSelected={radioValue}
                    {disabled}
                />
                <RadioSingle
                    {options}
                    legend="Penyakit kulit"
                    bind:userSelected={radioValue}
                    {disabled}
                />
            </div>
            <div
                class="flex w-full flex-col gap-2.5 border-b border-bdr-primary pb-5"
            >
                <p class="text-sm font-bold">Mata</p>
                <table class="text-left text-sm">
                    <tr>
                        <td class="w-[220px] min-w-[220px] max-w-[220px]"
                            >Penglihatan Tanpa Bantuan</td
                        >
                        <td class="w-[160px] min-w-[160px] max-w-[160px]"
                            ><TextField {disabled} label="" value="6/6"
                            ></TextField></td
                        >
                        <td
                            ><TextField {disabled} label="" value="6/6"
                            ></TextField></td
                        >
                        <td><TextField {disabled} label=""></TextField></td>
                    </tr>
                    <tr>
                        <td>Penglihatan Tanpa Bantuan</td>
                        <td
                            ><TextField {disabled} label="" value="6/6"
                            ></TextField></td
                        >
                        <td
                            ><TextField {disabled} label="" value="6/6"
                            ></TextField></td
                        >
                        <td><TextField {disabled} label=""></TextField></td>
                    </tr>
                    <tr>
                        <td>Penglihatan Dengan Bantuan</td>
                        <td
                            ><TextField {disabled} label="" value="6/6"
                            ></TextField></td
                        >
                        <td
                            ><TextField {disabled} label="" value="6/6"
                            ></TextField></td
                        >
                        <td><TextField {disabled} label=""></TextField></td>
                    </tr>
                    <tr>
                        <td>Penglihatan Warna</td>
                        <td
                            ><RadioSingle
                                {disabled}
                                options={normalAbnormalOptions}
                                legend={''}
                                bind:userSelected={isNormal}
                            ></RadioSingle></td
                        >
                        <td colspan="2"
                            ><TextField {disabled} label="" value="Didisease"
                            ></TextField></td
                        >
                    </tr>
                    <tr>
                        <td>Funduskopi</td>
                        <td
                            ><RadioSingle
                                {disabled}
                                options={normalAbnormalOptions}
                                legend={''}
                                bind:userSelected={isNormal}
                            ></RadioSingle></td
                        >
                        <td colspan="2"
                            ><TextField {disabled} label=""></TextField></td
                        >
                    </tr>
                </table>
            </div>
            <div
                class="flex w-full flex-col gap-2.5 border-b border-bdr-primary pb-5"
            >
                <table class="text-left text-sm">
                    <tr>
                        <td class="w-[220px] min-w-[220px] max-w-[220px]"
                            ><p class="text-sm font-bold">Telinga</p></td
                        >
                        <td class="w-[160px] min-w-[160px] max-w-[160px]"
                            ><RadioSingle
                                {disabled}
                                options={normalAbnormalOptions}
                                legend={''}
                                bind:userSelected={isNormal}
                            ></RadioSingle></td
                        >
                        <td colspan="2"
                            ><TextField {disabled} label=""></TextField></td
                        >
                    </tr>
                    <tr>
                        <td
                            ><p class="text-sm font-bold">
                                Rongga gigi dan mulut
                            </p></td
                        >
                        <td
                            ><RadioSingle
                                {disabled}
                                options={normalAbnormalOptions}
                                legend={''}
                                bind:userSelected={isNormal}
                            ></RadioSingle></td
                        >
                        <td colspan="2"
                            ><TextField {disabled} label=""></TextField></td
                        >
                    </tr>
                    <tr>
                        <td><p class="text-sm font-bold">Leher</p></td>
                        <td
                            ><RadioSingle
                                {disabled}
                                options={normalAbnormalOptions}
                                legend={''}
                                bind:userSelected={isNormal}
                            ></RadioSingle></td
                        >
                        <td colspan="2"
                            ><TextField {disabled} label=""></TextField></td
                        >
                    </tr>
                    <tr>
                        <td><p class="text-sm font-bold">Kardiovaskular</p></td>
                        <td
                            ><RadioSingle
                                {disabled}
                                options={normalAbnormalOptions}
                                legend={''}
                                bind:userSelected={isNormal}
                            ></RadioSingle></td
                        >
                        <td colspan="2"
                            ><TextField {disabled} label=""></TextField></td
                        >
                    </tr>
                </table>
            </div>
            <div
                class="flex w-full flex-col gap-2.5 border-b border-bdr-primary pb-5"
            >
                <p class="text-sm font-bold">Sistem pernafasan</p>
                <table class="text-left text-sm">
                    <tr>
                        <td class="w-[220px] min-w-[220px] max-w-[220px]"
                            >Pemeriksaan</td
                        >
                        <td class="w-[160px] min-w-[160px] max-w-[160px]"
                            ><RadioSingle
                                {disabled}
                                options={normalAbnormalOptions}
                                legend={''}
                                bind:userSelected={isNormal}
                            ></RadioSingle></td
                        >
                        <td colspan="2"
                            ><TextField {disabled} label=""></TextField></td
                        >
                    </tr>
                    <tr>
                        <td>X-ray</td>
                        <td
                            ><RadioSingle
                                {disabled}
                                options={normalAbnormalOptions}
                                legend={''}
                                bind:userSelected={isNormal}
                            ></RadioSingle></td
                        >
                        <td colspan="2"
                            ><TextField {disabled} label=""></TextField></td
                        >
                    </tr>
                </table>
                <TextField
                    {disabled}
                    id="tarikhPengambilanXray"
                    label="Tarikh pengambilan x-ray"
                    value="16/8/2023"
                ></TextField>
                <TextField
                    {disabled}
                    id="lokasiPengambilanXray"
                    label="Lokasi pengambilan x-ray"
                    value="Pusat Kesihatan Kuching"
                ></TextField>
                <TextField
                    {disabled}
                    id="nomborRujukanXray"
                    label="Nombor Rujukan x-ray"
                    value="7273659"
                ></TextField>
            </div>
            <div
                class="flex w-full flex-col gap-2.5 border-b border-bdr-primary pb-5"
            >
                <table class="text-left text-sm">
                    <tr>
                        <td class="w-[220px] min-w-[220px] max-w-[220px]"
                            ><p class="text-sm font-bold">
                                Abdomen dan hernia
                            </p></td
                        >
                        <td class="w-[160px] min-w-[160px] max-w-[160px]"
                            ><RadioSingle
                                {disabled}
                                options={normalAbnormalOptions}
                                legend={''}
                                bind:userSelected={isNormal}
                            ></RadioSingle></td
                        >
                        <td colspan="2"
                            ><TextField {disabled} label=""></TextField></td
                        >
                    </tr>
                    <tr>
                        <td
                            ><p class="text-sm font-bold">
                                Sistem saraf dan keadaan mental
                            </p></td
                        >
                        <td
                            ><RadioSingle
                                {disabled}
                                options={normalAbnormalOptions}
                                legend={''}
                                bind:userSelected={isNormal}
                            ></RadioSingle></td
                        >
                        <td colspan="2"
                            ><TextField {disabled} label=""></TextField></td
                        >
                    </tr>
                    <tr>
                        <td
                            ><p class="text-sm font-bold">
                                Sistem muskuloskeletal
                            </p></td
                        >
                        <td
                            ><RadioSingle
                                {disabled}
                                options={normalAbnormalOptions}
                                legend={''}
                                bind:userSelected={isNormal}
                            ></RadioSingle></td
                        >
                        <td colspan="2"
                            ><TextField {disabled} label=""></TextField></td
                        >
                    </tr>
                </table>
            </div>
            <div
                class="flex w-full flex-col gap-2.5 border-b border-bdr-primary pb-5"
            >
                <p class="text-sm font-bold">Kencing</p>
                <RadioSingle
                    {options}
                    legend="Gula"
                    bind:userSelected={radioValue}
                    {disabled}
                />
                <RadioSingle
                    {options}
                    legend="Albumin"
                    bind:userSelected={radioValue}
                    {disabled}
                />
                <TextField {disabled} id="mikroskopi" label="Mikroskopi"
                ></TextField>
            </div>
            <div class="flex w-full flex-col gap-2.5">
                <div class="flex w-full flex-col gap-2">
                    <p class={stepperFormTitleClass}>
                        Fail-fail yang dimuat naik:
                    </p>
                    {#each currentEmployeeUploadedDocuments as item, i}
                        <div
                            class="flex w-full flex-row items-center justify-between"
                        >
                            <label
                                for=""
                                class="block w-[20px] min-w-[20px] text-[11px] font-medium"
                                >{i + 1}.</label
                            >
                            <DownloadAttachment fileName={item.documentPath}
                            ></DownloadAttachment>
                        </div>
                    {/each}
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>
