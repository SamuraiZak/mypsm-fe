<script lang="ts">
</script>

<div
    class="flex h-fit w-full cursor-pointer flex-row items-start gap-3 hover:scale-105 p-4 hover:bg-blue-100"
>
    <!-- notification avatar -->
    <div class="flex h-full w-10 flex-col items-center justify-start">
        <div
            class="flex h-9 w-9 flex-col items-center justify-center rounded-xl bg-ios-activeColors-activeBlue-light"
        >
            <span class="text-white">
                <svg
                    width="19"
                    height="19"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M8 14C9.10457 14 10 13.1046 10 12H6C6 13.1046 6.89543 14 8 14Z"
                        fill="currentColor"
                    />
                    <path
                        d="M12 10V7C12 4.23858 9.76142 2 8 2C6.23858 2 4 4.23858 4 7V10L3 11V12H13V11L12 10Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        fill="none"
                    />
                </svg>
            </span>
        </div>
    </div>
    <div class="flex h-fit w-full flex-col items-center justify-center">
        <!-- notification title -->
        <div class="flex h-fit w-full flex-row items-center justify-start">
            <p
                class="text-wrap text-start text-base font-semibold text-gray-700"
            >
                Permohonan anda telah diterima!
            </p>
        </div>
        <!-- notification timestamp -->
        <div class="fit flex w-full flex-row items-center justify-start">
            <p class="text-wrap text-start text-base font-medium text-gray-500">
                5 Julai 2024
            </p>
        </div>
        <div class="fit flex w-full flex-row items-center justify-start">
            <p class="text-wrap text-start text-base font-medium text-gray-500">
                Cuti
            </p>
        </div>
    </div>
</div>
