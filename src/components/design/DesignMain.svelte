<script lang="ts">
	import type { Component } from 'svelte';

	const paths: Record<string, { default: Component }> = import.meta.glob('./design_item/*.svelte', {
		eager: true
	});

	const designItems: Component[] = Object.values(paths).map((path) => path.default);
</script>

<main>
	<h1
		class="title pt-8 text-center text-[2rem] leading-none font-bold tracking-tighter text-zinc-700 md:pt-10
			md:text-[3.5rem]"
	>
		Handcrafted Designs<br />Built from Scratch
	</h1>
	<p
		class="subtitle pt-2 text-center text-base font-medium tracking-tight text-zinc-500 md:pt-2 md:text-2xl"
	>
		Powered by Svelte and Tailwind CSS
	</p>
	<section class="mx-auto w-fit columns-1 gap-4 py-8 md:columns-2 md:py-12 xl:columns-3">
		{#each designItems as Item}
			<div
				class="mb-2.5 flex w-[18.75rem] break-inside-avoid items-center justify-center rounded-xl border
					border-zinc-200 bg-zinc-50 p-6.25 md:mb-4 md:w-[23.4375rem]"
			>
				<Item />
			</div>
		{/each}
	</section>
</main>

<style>
	.title,
	.subtitle {
		font-family: 'Inter Display', 'Inter', sans-serif;
		font-feature-settings: 'cv06', 'cv11';
	}
</style>
