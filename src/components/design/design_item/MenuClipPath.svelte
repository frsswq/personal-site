<script lang="ts">
	import { onMount, type Component } from 'svelte';

	import Pinterest from '../../icons/MynauiBrandPinterest.svelte';
	import Spotify from '../../icons/MynauiBrandSpotify.svelte';
	import Dribble from '../../icons/MynauiBrandDribbble.svelte';

	let width: number = $state(0);
	let activeButton: number = $state(0);

	const icons: { Icon: Component; text: string }[] = [
		{ Icon: Dribble, text: 'Dribble' },
		{ Icon: Pinterest, text: 'Pinterest' },
		{ Icon: Spotify, text: 'Spotify' }
	];

	const clipPath: { desktop: string[]; mobile: string[] } = {
		desktop: [
			'inset(0 68.5% 0 1.75% round 0.4rem)',
			'inset(0 32.5% 0 32.5% round 0.4rem)',
			'inset(0 1.75% 0 68.5% round 0.4rem)'
		],
		mobile: [
			'inset(0 69% 0 1% round 0.4rem)',
			'inset(0 33% 0 32% round 0.4rem)',
			'inset(0 1% 0 68% round 0.4rem)'
		]
	};

	let currentClipPath: string = $derived(
		width >= 768 ? clipPath.desktop[activeButton] : clipPath.mobile[activeButton]
	);

	onMount(() => {
		width = window.innerWidth;

		const handleResize = () => {
			width = window.innerWidth;
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<div
	class="flex h-[2.3rem] w-full items-center justify-center rounded-[0.5rem] bg-zinc-200 select-none
		md:h-[2.75rem]"
>
	<div class="relative mx-auto flex w-fit items-center justify-center">
		<div
			class="clip-button absolute z-[1] flex items-center justify-center gap-x-4 bg-orange-400 py-2 pr-3 pl-2
				md:gap-x-6 md:pr-4 md:pl-3"
			style="clip-path: {currentClipPath};"
		>
			{#each icons as { Icon, text }}
				<button class="flex cursor-pointer items-center justify-center gap-x-0.5 text-white">
					<Icon className="size-3.5 md:size-5 md:mb-[1px]" />
					<span class="text-sm leading-none font-medium tracking-tight md:text-lg">{text}</span>
				</button>
			{/each}
		</div>
		<div
			class="absolute flex items-center justify-center gap-x-4 py-2 pr-3 pl-2 md:gap-x-6 md:pr-4 md:pl-3"
		>
			{#each icons as { Icon, text }, index}
				<button
					class="flex cursor-pointer items-center justify-center gap-x-0.5 text-zinc-700"
					onclick={() => (activeButton = index)}
				>
					<Icon className="size-3.5 md:size-5 md:mb-[1px]" />
					<span class="text-sm leading-none font-medium tracking-tight md:text-lg">{text}</span>
				</button>
			{/each}
		</div>
	</div>
</div>

<style>
	.clip-button {
		transition: clip-path 0.15s cubic-bezier(0.22, 1, 0.36, 1);
		will-change: clip-path;
	}
</style>
