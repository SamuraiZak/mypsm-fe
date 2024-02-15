<script lang="ts">
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import mypsmLogo from '$lib/assets/images/MyPSM.png';
</script>

<div class="flex w-full flex-col items-center h-[100vh] px-20">
    <div class="flex w-full flex-row items-center justify-center h-full">
        <img src={mypsmLogo} class="h-8 object-scale-down" alt="logo" />
    </div>

    <div class="w-full flex-row items-center justify-center gap-2 h-full">
        <!-- Button start here -->
        <!-- Usage: same as before just added some features such as preset icon, new bg colour and custom class -->
        <!-- 1. change icon to your preference, usable icon: cancel/delete/check/next/previous/print -->
        <!--    do not declare or just leave it as empty string (icon="") if you want to add custom icon. -->
        <!-- 2. to change button bg change the type, usable type: primary/danger/neutral (default is primary)-->
        <TextIconButton
            icon="delete"
            type="danger"
            label="Buang"
        />
        <!-- Button end here -->
    </div>
</div>
