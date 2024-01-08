<script lang="ts">
    import mypsmLogo from '$lib/assets/MyPSM.png';
    import lkimLogo from '$lib/assets/logo.png';
</script>

<section class="bg-ios-backgroundColors-secondarySystemBackground-light">
    <div
        class="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0"
    >
        <div class="mb-6 flex items-center">
            <img class="h-20" src={lkimLogo} alt="logo" />
        </div>
        <div
            class="bg-ios-backgroundColors-systemBackground-light w-full rounded-lg shadow sm:max-w-md md:mt-0 xl:p-0"
        >
            <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
                <h1
                    class="text-ios-labelColors-label-light text-center text-xl font-bold leading-tight tracking-tight md:text-xl"
                >
                    Log Masuk
                </h1>
                <form class="space-y-4 md:space-y-6" action="#">
                    <div>
                        <label
                            for="email"
                            class="text-ios-labelColors-label-light mb-2 block text-base font-medium"
                            >E-mel</label
                        >
                        <input
                            type="email"
                            name="email"
                            id="email"
                            class=" focus:ring-ios-activeColors-activeBlue-light focus:border-ios-activeColors-activeBlue-light border-ios-labelColors-separator-light bg-ios-systemColors-quaternarySystemFill-light block h-9 w-full rounded-md border p-2.5 text-base focus:ring-1"
                            placeholder="name@company.com"
                        />
                    </div>
                    <div>
                        <label
                            for="password"
                            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                            >Password</label
                        >
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            class=" focus:ring-ios-activeColors-activeBlue-light focus:border-ios-activeColors-activeBlue-light border-ios-labelColors-separator-light bg-ios-systemColors-quaternarySystemFill-light block h-9 w-full rounded-md border p-2.5 text-base focus:ring-1"
                        />
                    </div>
                    <div class="flex items-center justify-between">
                        <div
                            class="flex flex-row items-start justify-center align-middle"
                        >
                            <div class="flex h-5 items-center">
                                <input
                                    id="remember"
                                    aria-describedby="remember"
                                    type="checkbox"
                                    class="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                                />
                            </div>
                            <div class="ml-3 text-sm">
                                <label
                                    for="remember"
                                    class="leading-loose text-gray-500 dark:text-gray-300"
                                    >Ingat Akaun Saya</label
                                >
                            </div>
                        </div>
                        <a
                            href="#"
                            class=" text-ios-labelColors-link-light text-sm font-medium hover:underline"
                            >Terlupa Kata Laluan</a
                        >
                    </div>
                    <button
                        type="submit"
                        class="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
                        >Sign in</button
                    >
                    <p
                        class="text-sm font-light text-gray-500 dark:text-gray-400"
                    >
                        Don’t have an account yet? <a
                            href="#"
                            class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                            >Sign up</a
                        >
                    </p>
                </form>
            </div>
        </div>
    </div>
</section>
