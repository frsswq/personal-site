<script lang="ts">
	import { designStore } from '@utils/shuffle.svelte';
</script>

<section class="mx-auto w-fit columns-1 gap-4 py-10 md:columns-2">
	{#each designStore.designItems as Item, index (index)}
		<div
			class="mb-2.5 flex w-[18.75rem] break-inside-avoid items-center justify-center rounded-xl border
				border-zinc-200 bg-zinc-50 p-6.25 md:mb-4 md:w-[23.4375rem]"
		>
			<Item />
		</div>
	{/each}
</section>
