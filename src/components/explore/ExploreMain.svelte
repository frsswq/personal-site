<script lang="ts">
    import FolderSection from "./FolderSection.svelte";
    import WhiteKeycaps from "./WhiteKeycaps.svelte";
    import WhiteMenu from "./WhiteMenu.svelte";

	const designItems = [WhiteKeycaps, WhiteMenu, FolderSection];
</script>

<section class="my-12 flex flex-col justify-center md:flex-row md:gap-x-4">
    <div
        class="flex h-fit w-full flex-col items-center justify-center gap-2.5 bg-white md:items-end md:gap-4"
    >
        {#each designItems as Item, index}
            {#if index % 2 === 0}
                <div
                    class="flex h-fit w-[300px] items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 p-6.25 md:w-[375px]"
                >
                    <Item />
                </div>
            {/if}
        {/each}
    </div>
    <div
        class="mt-2.5 flex h-fit w-full flex-col items-center justify-center gap-2.5 bg-white md:mt-0 md:items-start md:gap-4"
    >
        {#each designItems as Item, index}
            {#if index % 2 !== 0}
                <div
                    class="flex h-fit w-[300px] items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 p-6.25 md:w-[375px]"
                >
                    <Item />
                </div>
            {/if}
        {/each}
    </div>
</section>