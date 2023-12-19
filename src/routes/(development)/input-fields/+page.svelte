<script lang="ts">
    import FileInputFieldChildren from './../../../lib/components/input/FileInputFieldChildren.svelte';
    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { fileSelectionList } from '$lib/stores/globalState';
    import { onMount } from 'svelte';
    import DropdownField from '$lib/components/input/DropdownSelect.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import { meetings } from '$lib/mocks/mesyuarat/mesyuarat';
    import AccordianField from '$lib/components/input/AccordianField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import RichTextEditorField from '$lib/components/input/RichTextEditorField.svelte';

    export let selectedFiles: any = [];
    let target: any;

    onMount(() => {
        target = document.getElementById('hello');
    });

    // Function to handle the file changes
    function handleOnChange() {
        const files = target.files;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                selectedFiles.push(files[i]);
            }
        }

        fileSelectionList.set(selectedFiles);
    }
    // Function to handle the file deletion
    function handleDelete(index: number) {
        selectedFiles.splice(index, 1);
        fileSelectionList.set(selectedFiles);
    }

    let selectedValue: any = 'Sila Pilih';

    let textColor = 'text-system-primary';

    function onSelect(value: any) {
        if (value === 'Option 1') {
            textColor = 'text-system-primary';
        } else if (value === 'Option 2') {
            textColor = 'text-system-danger';
        } else if (value === 'Option 3') {
            textColor = 'text-system-success';
        }
    }

    // Function to handle the date changes
    let selectedDate = new Date();
    function handleDateChange(event: any) {
        selectedDate = new Date(event.target.value);
        const formattedDate = selectedDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        console.log(formattedDate);
    }

    let radioValue: any = 'lulus';

    const options: RadioOption[] = [
        {
            value: 'lulus',
            label: 'Lulus',
        },
        {
            value: 'tidak lulus',
            label: 'Tidak Lulus',
        },
    ];
</script>

<div class="m-5 flex flex-col gap-3">
    <!-- TEXT FIELD -->
    <h1>TEXTFIELD</h1>
    <TextField disabled={false}></TextField>
    <LongTextField disabled={false}></LongTextField>
    <!-- FILE INPUT -->
    <h1>FILE INPUT FIELD:</h1>
    <FileInputField id="hello" {handleOnChange} />
    <!-- Function to list out the chosen files  -->
    {#each $fileSelectionList as item, index}
        <FileInputFieldChildren
            handleDelete={() => handleDelete(index)}
            fileName={item.name}
        />
    {/each}
    <!-- DROPDOWN -->
    <h1>DROPDOWN</h1>
    <p class={textColor}>Selected: {selectedValue}</p>
    <div class="flex w-full flex-col gap-2">
        <!-- Dropdown with label -->
        <DropdownField
            label="Label"
            bind:index={selectedValue}
            onSelect={() => {
                onSelect(selectedValue);
            }}
            id="dropdown"
            options={meetings}
        />
        <!-- Dropdown without label -->
        <DropdownField
            dropdownType="noLabel"
            bind:index={selectedValue}
            onSelect={() => {
                onSelect(selectedValue);
            }}
            id="dropdown"
            options={meetings}
        />
    </div>
    <!-- DATE PICKER -->
    <h1>DATE PICKER</h1>
    <DateSelector  {handleDateChange} />
    <!-- RADIO BUTTON INPUT FIELD -->
    <h1>RADIO BUTTON INPUT FIELD</h1>
    <RadioSingle
        {options}
        legend="Anda fikir anda lulus?"
        bind:userSelected={radioValue}
        disabled={true}
    />
    <p>
        anda {radioValue}
    </p>
    <h1>ACCORDIAN FIELD</h1>
    <AccordianField>test</AccordianField>

    <h1>DOWNLOAD ATTACHMENT</h1>
    <h2>With Label</h2>
    <DownloadAttachment label="Label" />
    <h2>Without Label</h2>
    <DownloadAttachment />
    <h1>RICH TEXT EDITOR FIELD</h1>
    <RichTextEditorField  value='asdf'/>
</div>
