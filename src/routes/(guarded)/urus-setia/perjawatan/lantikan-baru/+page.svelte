<script lang="ts">
    // Importing external components and libraries
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { status } from '$lib/mocks/status/status';
    import { goto } from '$app/navigation';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import FilterCard from '$lib/components/filter/FilterCard.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import FilterSelectInput from '$lib/components/filter/FilterSelectInput.svelte';
    import FilterDateSelector from '$lib/components/filter/FilterDateSelector.svelte';

    export let data;
    let selectedStatus = status[0].value; // Default selected filter

    // mock data
    const newStaffUrl = data.props.candidateLists;
    const lantikanBaru = data.props.newHireLists;

    let tempUrl: Candidate;
    let tempStaff: NewHire;

    const base64String = `JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwog
                            IC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAv
                            TWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0K
                            Pj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAg
                            L1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+
                            PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9u
                            dAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2Jq
                            Cgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJU
                            CjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVu
                            ZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4g
                            CjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAw
                            MDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9v
                            dCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G`; // Your Base64 string here

    // Convert the base64 string to a string
    export const convertBase64toPdf = async (base64String: string) => {
        const binaryString = atob(base64String);
        const byteArray = new Uint8Array(binaryString.length);

        for (let i = 0; i < binaryString.length; i++) {
            byteArray[i] = binaryString.charCodeAt(i);
        }

        const blob = new Blob([byteArray], { type: 'application/pdf' });
        const dataUrl = URL.createObjectURL(blob);

        return dataUrl;
    };

    // const submitFile = async (event: Event) => {
    //     const form = new FormData(event.target as HTMLFormElement);
    //     const file = form.getAll('fileInput');
    //     // const file = (event.target as HTMLFormElement).files?.[0];
    //     form.get('fileInput');
    //     // const filename = `uploads/${crypto.randomUUID()}${extname(uploadedFile?.name)}`;

    //     console.table(form.getAll('fileInput'));

    //     if (file) {
    //         const reader = new FileReader();

    //         reader.onload = (e) => {
    //             if (e.target) {
    //                 const base64String = e.target.result as string;
    //                 console.log(base64String);
    //             }
    //         };

    //         reader.readAsDataURL(file);
    //     }
    // };

    // onMount(async () => {
    //     const pdfUrl = await convertBase64toPdf(base64String);
    //     window.open(pdfUrl, '_blank');
    // });
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Lantikan Baru"
        description="Hal-hal berkaitan Lantikan Dalam Perkhidmatan"
    >
        <FormButton
            type="new"
            addLabel="Tambah Lantikan Baru"
            onClick={() => {
                goto('lantikan-baru/permohonan-baru');
            }}
        />
    </ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary p-3"
>
    <!-- Table filter placeholder -->
    <FilterCard>
        <FilterTextInput label="Nama Calon"></FilterTextInput>
        <FilterTextInput label="ID Calon"></FilterTextInput>
        <FilterTextInput label="No. Kad Pengenalan"></FilterTextInput>
        <FilterDateSelector handleDateChange label="Tarikh Mohon"
        ></FilterDateSelector>
        <FilterDateSelector handleDateChange label="Tarikh Lantikan"
        ></FilterDateSelector>
        <FilterSelectInput
            label="Status"
            options={status}
            selectedVal={selectedStatus}
        ></FilterSelectInput>
    </FilterCard>

    <!-- Sample table for testing purposes -->
    <div class="flex w-full flex-col items-start justify-center">
        <SectionHeader title="Senarai Rekod Pautan Belum Diisi"></SectionHeader>
        <DynamicTable
            withActions
            actionOptions={['detail']}
            detailActions={() => {
                const url = './lantikan-baru/permohonan-baru';
                goto(url);
            }}
            tableItems={newStaffUrl}
            bind:passData={tempUrl}
        ></DynamicTable>
        <br />
        <SectionHeader title="Senarai Rekod Selesai Diisi"></SectionHeader>
        <DynamicTable
            tableItems={lantikanBaru}
            bind:passData={tempStaff}
            withActions
            actionOptions={['edit']}
            editActions={() => {
                const url =
                    './lantikan-baru/kemaskini-permohonan-' +
                    tempStaff.idSementara +
                    '-' +
                    tempStaff.noKadPengenalan;
                goto(url);
            }}
        ></DynamicTable>
    </div>
</section>
