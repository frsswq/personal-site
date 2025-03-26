<script lang="ts">
	import { innerWidth } from 'svelte/reactivity/window';
	import { tick } from 'svelte';
	import type { Component } from 'svelte';

	import FolderSection from './OrangeFolder.svelte';
	import WhiteKeycaps from './WhiteKeycaps.svelte';
	import WhiteMenu from './WhiteMenu.svelte';
	import WhiteSwitch from './WhiteSwitch.svelte';
	import Clock from './Clock.svelte';
	import SvgSpinnersBarsRotateFade from '../icons/SvgSpinnersBarsRotateFade.svelte';

	const designItems: Component[] = [WhiteKeycaps, WhiteMenu, FolderSection, WhiteSwitch, Clock];
	const designItemContainerClass: string =
		'flex h-fit w-full items-center justify-center gap-2.5 bg-white md:w-fit md:flex-col md:gap-4';

	let screenWidth = $derived(innerWidth.current ?? 0);
	let isLoading: boolean = $state(true);

	$effect.pre(() => {
		tick().then(() => {
			isLoading = false;
		});
	});
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
		Form studies with zero depedencies
	</p>
	<section class="flex w-full flex-col justify-center gap-4 py-8 md:flex-row md:py-12">
		{#if isLoading}
			<SvgSpinnersBarsRotateFade
				className="size-10 text-zinc-500 absolute left-1/2 top-1/2 -translate-1/2"
			/>
		{:else if !isLoading}
			{#if screenWidth >= 1280}
				{@render pseudoMasonry(3)}
			{:else if screenWidth >= 768}
				{@render pseudoMasonry(2)}
			{:else}
				{@render pseudoMasonry(1)}
			{/if}
		{/if}
	</section>
</main>

{#snippet designItemComponent(Item: Component)}
	<div
		class="flex h-fit w-[300px] items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 p-6.25
			md:w-[375px]"
	>
		<Item />
	</div>
{/snippet}

{#snippet pseudoMasonry(columnNums: 1 | 2 | 3)}
	{#if columnNums === 1}
		{#each designItems as Item}
			<div class={designItemContainerClass}>
				{@render designItemComponent(Item)}
			</div>
		{/each}
	{:else if columnNums === 2}
		{#each { length: 2 }, i}
			<div class={designItemContainerClass}>
				{#each designItems as Item, index}
					{#if index % 2 === 0 && i === 0}
						{@render designItemComponent(Item)}
					{:else if index % 2 !== 0 && i === 1}
						{@render designItemComponent(Item)}
					{/if}
				{/each}
			</div>
		{/each}
	{:else}
		{#each { length: 3 }, i}
			<div class={designItemContainerClass}>
				{#each designItems as Item, index}
					{#if index % 3 === 0 && i === 0}
						{@render designItemComponent(Item)}
					{:else if index % 3 === 1 && i === 1}
						{@render designItemComponent(Item)}
					{:else if index % 3 === 2 && i === 2}
						{@render designItemComponent(Item)}
					{/if}
				{/each}
			</div>
		{/each}
	{/if}
{/snippet}

<style>
	.title,
	.subtitle {
		font-family: 'Inter Display', 'Inter', sans-serif;
		font-feature-settings: 'cv06', 'cv11';
	}
</style>
