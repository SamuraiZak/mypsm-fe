<script lang="ts">
    //TBD

    import FormButton from '$lib/components/buttons/FormButton.svelte';
</script>

<div class="flex h-full w-full flex-col items-center justify-center gap-3">
    <FormButton
        type="back"
        onClick={() => {
            window.history.back();
        }}
    ></FormButton>
    <img
        src="https://png.pngtree.com/png-clipart/20230804/original/pngtree-under-construction-sign-design-place-banner-vector-picture-image_9633498.png"
        alt=""
        width="500"
        height="333"
    />
</div>
