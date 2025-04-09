<script lang="ts">
	import { innerWidth } from 'svelte/reactivity/window';
	import type { Component } from 'svelte';

	import Pinterest from '../../icons/MynauiBrandPinterest.svelte';
	import Spotify from '../../icons/MynauiBrandSpotify.svelte';
	import Dribble from '../../icons/MynauiBrandDribbble.svelte';

	const width = innerWidth.current || 0;

	const icons: {Icon: Component, text: string}[] = [
		{ Icon: Dribble, text: 'Dribble' },
		{ Icon: Pinterest, text: 'Pinterest' },
		{ Icon: Spotify, text: 'Spotify' }
	];

	let activeButton: number = $state(0);
	let clipPath: string[] = [
		'inset(0 68.5% 0 1.5% round 0.4rem)',
		'inset(0 32.5% 0 32.5% round 0.4rem)',
		'inset(0 2% 0 68.5% round 0.4rem)'
	];

	let clipPathMobile: string[] = [
		'inset(0 69% 0 1% round 0.4rem)',
		'inset(0 33% 0 32% round 0.4rem)',
		'inset(0 1% 0 68% round 0.4rem)'
		
	]

	const buttonContainerClass = 'absolute flex items-center justify-center gap-x-4 md:gap-x-6 py-2 pr-3 pl-2 md:pr-4 md:pl-3';
    const buttonClass = 'flex items-center justify-center gap-x-0.5  cursor-pointer ';
    const textClass = 'text-sm md:text-lg leading-none font-medium tracking-tight';
    const iconClass = 'size-3.5 md:size-5 md:mb-[1px]';
</script>

<div class="flex h-[2.3rem] md:h-[2.75rem] w-full items-center justify-center rounded-[0.5rem] bg-zinc-200 select-none">
	<div class="relative mx-auto flex w-fit items-center justify-center">
		<div class='{buttonContainerClass} bg-orange-400 transition-all z-[1]' style="clip-path: {width < 768 ? clipPathMobile[activeButton] : clipPath[activeButton]};">
			{#each icons as { Icon, text }}
				<button class="{buttonClass} text-white">
					<Icon className={iconClass} />
					<span class={textClass}>{text}</span>
				</button>
			{/each}
		</div>
		<div class={buttonContainerClass}>
			{#each icons as { Icon, text }, index}
				<button
					class="{buttonClass} text-zinc-700"
					onclick={() => (activeButton = index)}
				>
					<Icon className={iconClass} />
					<span class={textClass}>{text}</span>
				</button>
			{/each}
		</div>
	</div>
</div>

<style>
</style>
