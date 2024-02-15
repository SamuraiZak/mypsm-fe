<script lang="ts">
    import mypsmLogo from '$lib/assets/images/MyPSM.png';
</script>

<!-- login card starts here -->
<div
    class="flex w-[350px] flex-col gap-2 rounded-md bg-ios-basic-white p-4 shadow-md"
>
    <div class="flex w-full flex-row items-center justify-center">
        <img src={mypsmLogo} class="h-8 object-scale-down" alt="logo" />
    </div>
    <!-- card header starts here -->
    <div class="flex h-fit w-full flex-row items-center justify-center">
        <p class="text-base font-medium leading-tight">Lupa Kata Laluan</p>
    </div>
    <!-- card header ends here -->

    <!-- form wrapper starts here -->
    <div class="mt-2 flex h-fit w-full flex-col items-center justify-start">
        <!-- form starts here -->
        <form
            id="loginForm"
            method="POST"
            class="flex w-full flex-col items-center justify-start gap-2"
        >
            <!-- submit button section starts here -->
            <div class=" mt-2 flex w-full flex-col items-center justify-center">
                <button
                    type="submit"
                    class=" focus:ring-primary-300 h-8 w-full rounded bg-ios-systemColors-systemBlue-light text-center text-sm font-medium text-white hover:bg-ios-systemColors-systemBlue-dark focus:outline-none focus:ring-4"
                    >Set Semula Kata Laluan</button
                >
            </div>
            <!-- submit button section ends here -->

            <!-- remember me and forgot password section starts here -->
            <div class="flex h-5 w-full flex-row items-center justify-center">
                <!-- forgot password starts here -->
                <div
                    class="flex h-full w-fit flex-row items-center justify-end gap-1"
                >
                    <div
                        class="flex h-full flex-col items-center justify-center"
                    >
                        <a
                            class="text-sm leading-loose text-ios-activeColors-activeBlue-light"
                            href="/login">Kembali</a
                        >
                    </div>
                </div>
                <!-- forgot password ends here -->
            </div>
            <!-- rember me and forgot password section ends here -->
        </form>
        <!-- form ends here -->
    </div>
    <!-- form wrapper ends here -->
</div>
<!-- login card ends here -->
