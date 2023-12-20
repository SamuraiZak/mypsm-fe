<script lang="ts">
    import SvgMinusCircle from '$lib/assets/svg/SvgMinusCircle.svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { Button } from 'flowbite-svelte';
    import DropdownSelect from '../input/DropdownSelect.svelte';
    import DateSelector from '../input/DateSelector.svelte';
    import { hubungan } from '$lib/mocks/klinik-panel/hubungan';
    let selectedHubungan = hubungan[0].value;
    export let disabled: boolean = false;
    let selectedDate = new Date();
    // export let key: string = 'key';

    let selectedPatient: {
        [key: string]: string;
    } = {};

    // ##Patient List------------------------------------------------
    let patientListFormGroup: IPatient = {};
    let patientListNextGroupId = 1;

    function addPatientListFormGroup() {
        patientListFormGroup = {
            ...patientListFormGroup,
            [patientListNextGroupId.toString()]: {
                patient: '',
            },
        };
        patientListNextGroupId += 1;
    }

    function removePatientListFormGroup(groupId: string) {
        patientListFormGroup = {
            ...patientListFormGroup,
        };
        delete patientListFormGroup[groupId];
    }
    // ##END Patient List------------------------------------------------

    function handleDateChange(event: any) {
        selectedDate = new Date(event.target.value);
        const formattedDate = selectedDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        console.log(formattedDate);
    }
</script>

<SectionHeader title="Senarai Pesakit"
    ><div class="mr-2">
        <TextIconButton
            primary
            onClick={() => {
                addPatientListFormGroup();
            }}
            label="Tambah Pesakit"><SvgPlus /></TextIconButton
        >
    </div></SectionHeader
>

{#each Object.entries(patientListFormGroup) as [groupId, group], index}
    <SectionHeader color="system-primary" title="Pesakit #{index + 1}"
        >{#if selectedPatient !== null}
            <div class="w-12">
                <Button
                    outline={false}
                    on:click={() => {
                        removePatientListFormGroup(groupId);
                    }}
                    ><span class="text-red-600"><SvgMinusCircle /></span
                    ></Button
                >
            </div>
        {/if}
    </SectionHeader>
    <div class="flex w-full flex-col items-center gap-2.5 text-base">
        <form
            action=""
            class="flex w-full flex-row items-center gap-2.5 border-b"
        >
            <!-- <label for="" class="w-[220px] text-base font-medium"
                >Rawatan #{index + 1}</label
            > -->
            <div class="mb-2.5 flex w-full flex-col gap-2.5">
                <TextField
                    name="namaPesakit"
                    label={'Nama Pesakit'}
                    value={'Ali Bin Abu'}
                ></TextField>
                <DropdownSelect
                    name="hubunganDropdown"
                    label="Hubungan"
                    dropdownType="label-left-full"
                    bind:index={selectedHubungan}
                    options={hubungan}
                ></DropdownSelect>
                <TextField
                    name="noKadPengenalan"
                    label={'No. K/P'}
                    value={'111111-11-1111'}
                ></TextField>
                <TextField
                    name="pejabatLkim"
                    label={'Pejabat LKIM'}
                    value={'Bahagian Teknologi Maklumat'}
                ></TextField>
                <DateSelector {handleDateChange} label={'Tarikh'} />
            </div>
        </form>
    </div>
{/each}
