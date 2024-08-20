<script lang="ts">
</script>

<main
    class="flex h-screen min-h-screen w-screen flex-row items-start justify-start overflow-hidden"
>
    <!-- sidebar -->
    <div
        class="flex h-full w-60 min-w-60 flex-col items-center justify-start border-r bg-gradient-to-r from-indigo-500 to-blue-500"
    ></div>

    <!-- body -->
    <div
        class="flex h-full min-h-full w-full flex-col items-start justify-center overflow-hidden"
    >
        <!-- header -->
        <div class="flex h-14 min-h-14 w-full flex-row border-b"></div>
        <!-- content -->
        <div class="h-full w-full"></div>
    </div>

    <slot />
</main>
