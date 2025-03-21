<script lang="ts">
	import { innerWidth } from 'svelte/reactivity/window';
	import type { Component } from 'svelte';

	import FolderSection from './FolderSection.svelte';
	import WhiteKeycaps from './WhiteKeycaps.svelte';
	import WhiteMenu from './WhiteMenu.svelte';
	import WhiteSwitch from './WhiteSwitch.svelte';

	const designItems: Component[] = [WhiteKeycaps, WhiteMenu, FolderSection, WhiteSwitch];

	let screenWidth = $derived(innerWidth.current ?? 0);
	const designItemContainerClass: string =
		'flex h-fit w-full items-center justify-center gap-2.5 bg-white md:w-fit md:flex-col md:gap-4';
</script>

<section>
	<h1
		class="title pt-8 text-center text-[2rem] leading-none font-bold tracking-tighter text-zinc-700 md:pt-12
			md:text-[3.5rem]"
	>
		Handcrafted Designs<br />Built from Scratch
	</h1>
	<p
		class="subtitle pt-2 text-center text-base font-medium tracking-tight text-zinc-500 md:pt-4 md:text-2xl"
	>
		Form studies with zero depedencies
	</p>
	<div class="flex w-full flex-col justify-center gap-4 py-8 md:flex-row md:py-12">
		{#if screenWidth < 760}
			{@render masonry(1)}
		{:else if screenWidth < 1280}
			{@render masonry(2)}
		{:else}
			{@render masonry(3)}
		{/if}
	</div>
</section>

{#snippet designItemComponent(Item: Component)}
	<div
		class="flex h-fit w-[300px] items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 p-6.25
			md:w-[375px]"
	>
		<Item />
	</div>
{/snippet}

{#snippet masonry(columnNums: 1 | 2 | 3)}
	{#if columnNums === 1}
		{#each designItems as Item}
			<div class={designItemContainerClass}>
				{@render designItemComponent(Item)}
			</div>
		{/each}
	{:else if columnNums === 2}
		<div class={designItemContainerClass}>
			{#each designItems as Item, index}
				{#if index % 2 === 0}
					{@render designItemComponent(Item)}
				{/if}
			{/each}
		</div>
		<div class={designItemContainerClass}>
			{#each designItems as Item, index}
				{#if index % 2 !== 0}
					{@render designItemComponent(Item)}
				{/if}
			{/each}
		</div>
	{:else}
		<div class={designItemContainerClass}>
			{#each designItems as Item, index}
				{#if index % 3 === 0}
					{@render designItemComponent(Item)}
				{/if}
			{/each}
		</div>
		<div class={designItemContainerClass}>
			{#each designItems as Item, index}
				{#if index % 3 === 1}
					{@render designItemComponent(Item)}
				{/if}
			{/each}
		</div>
		<div class={designItemContainerClass}>
			{#each designItems as Item, index}
				{#if index % 3 === 2}
					{@render designItemComponent(Item)}
				{/if}
			{/each}
		</div>
	{/if}
{/snippet}

<style>
	.title,
	.subtitle {
		font-family: 'Inter Display', 'Inter', sans-serif;
		font-feature-settings: 'cv06', 'cv11';
	}
</style>
