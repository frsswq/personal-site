<script lang="ts">
	import { designStore } from '@utils/shuffle.svelte';
</script>

<section class="mx-auto w-fit columns-1 gap-2.5 pt-5 pb-10 md:columns-2 md:pt-6">
	{#each designStore.designItems as Item, index (index)}
		<div
			class="item mb-2.5 flex w-[calc(100vw-40px)] max-w-[768px] min-w-[300px] break-inside-avoid items-center justify-center
				rounded-xl border border-zinc-200 bg-zinc-50 p-6.25 md:table md:w-[23.4375rem] md:max-w-dvw"
		>
			<Item />
		</div>
	{/each}
</section>

<style>
	.item {
		break-inside: avoid;
		page-break-inside: avoid;

		@media (width <= 48rem) {
		}
	}
</style>
