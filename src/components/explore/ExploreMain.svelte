<script lang="ts">
	import FolderSection from './FolderSection.svelte';
	import WhiteKeycaps from './WhiteKeycaps.svelte';
	import WhiteMenu from './WhiteMenu.svelte';

	const designItems = [WhiteKeycaps, WhiteMenu, FolderSection];
</script>

<section>
	<h1
		class="title pt-12 text-center text-[2rem] leading-none font-bold tracking-tighter text-zinc-700
			md:text-[3.5rem]"
	>
		Handcrafted Designs<br />Built from Scratch
	</h1>
	<p
		class="subtitle pt-4 text-center text-[1rem] font-medium tracking-tight text-zinc-500 md:text-2xl"
	>
		Zero dependencies. Good design. Raw code.
	</p>
	<div class="flex w-full shrink-0 flex-col justify-center pt-12 md:flex-row md:gap-x-4">
		<div
			class="flex h-fit w-fit flex-col items-center justify-center gap-2.5 bg-white md:items-end md:gap-4"
		>
			{#each designItems as Item, index}
				{#if index % 3 === 0}
					<div
						class="flex h-fit w-[300px] items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 p-6.25
							md:w-[375px]"
					>
						<Item />
					</div>
				{/if}
			{/each}
		</div>
		<div
			class="mt-2.5 flex h-fit w-fit flex-col items-center justify-center gap-2.5 bg-white md:mt-0
				md:items-center md:gap-4"
		>
			{#each designItems as Item, index}
				{#if index % 3 === 1}
					<div
						class="flex h-fit w-[300px] items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 p-6.25
							md:w-[375px]"
					>
						<Item />
					</div>
				{/if}
			{/each}
		</div>

		<div
			class="mt-2.5 flex h-fit w-fit flex-col items-center justify-center gap-2.5 bg-white md:mt-0 md:items-start
				md:gap-4"
		>
			{#each designItems as Item, index}
				{#if index % 3 === 2}
					<div
						class="flex h-fit w-[300px] items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 p-6.25
							md:w-[375px]"
					>
						<Item />
					</div>
				{/if}
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
