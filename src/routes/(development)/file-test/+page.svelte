<script lang="ts">
    import CustomFileInput from '$lib/components/inputs/file-input-field/CustomFileInput.svelte';

    let uploadedFiles: File[] = [];

    function handleFilesChange(files: File[]) {
        uploadedFiles = files;
        // Handle uploaded files as needed
    }
</script>

<CustomFileInput
    bind:value={uploadedFiles}
    on:change={() => {
        handleFilesChange(uploadedFiles);
    }}
/>
