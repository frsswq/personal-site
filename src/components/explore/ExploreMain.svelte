<script lang="ts">
	import FolderSection from './FolderSection.svelte';
	import WhiteKeycaps from './WhiteKeycaps.svelte';
	import WhiteMenu from './WhiteMenu.svelte';

	const designItems = [WhiteKeycaps, WhiteMenu, FolderSection];
</script>

<section>
	<h1
		class="title pt-8 text-center text-[2rem] leading-none font-bold tracking-tighter text-zinc-700 md:pt-12
			md:text-[3.5rem]"
	>
		Handcrafted Designs<br />Built from Scratch
	</h1>
	<p
		class="subtitle pt-2 text-center text-[1rem] font-medium tracking-tight text-zinc-500 md:pt-4 md:text-2xl"
	>
		Zero dependencies. Pure vibes.
	</p>
	<div class="flex w-full flex-col justify-center pt-8 md:flex-row md:gap-x-4 md:pt-12">
		<div
			class="grid h-fit w-full grid-rows-1 items-center justify-center gap-2.5 bg-white md:w-fit md:grid-cols-2
				md:items-start md:gap-4 xl:grid-cols-3"
		>
			{#each designItems as Item, index}
				<div
					class="flex h-fit w-[300px] items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 p-6.25
						md:w-[375px]"
				>
					<Item />
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.title,
	.subtitle {
		font-family: 'Inter Display', 'Inter', sans-serif;
		font-feature-settings: 'cv06', 'cv11';
	}
</style>
