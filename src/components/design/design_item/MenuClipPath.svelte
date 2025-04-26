<script lang="ts">
	import { type Component } from 'svelte';

	import Pinterest from '../../icons/MynauiBrandPinterest.svelte';
	import Spotify from '../../icons/MynauiBrandSpotify.svelte';
	import Dribble from '../../icons/MynauiBrandDribbble.svelte';

	let activeButton: number = $state(0);

	const icons: { Icon: Component; text: string }[] = [
		{ Icon: Dribble, text: 'Dribble' },
		{ Icon: Pinterest, text: 'Pinterest' },
		{ Icon: Spotify, text: 'Spotify' }
	];
</script>

<div
	class="flex h-[2.3rem] w-full items-center justify-center rounded-[0.5rem] bg-zinc-200 select-none
		md:h-[2.75rem]"
>
	<div class="relative mx-auto flex w-fit items-center justify-center">
		<div
			class="clip-button absolute z-[1] flex items-center justify-center gap-x-4 bg-orange-400 py-2 pr-3 pl-2
				md:gap-x-6 md:pr-4 md:pl-3"
			data-active-button={activeButton}
		>
			{#each icons as { Icon, text }}
				<div class="flex cursor-pointer items-center justify-center gap-x-0.5 text-white">
					<Icon className="size-3.5 md:size-5 md:mb-[1px]" />
					<span class="text-sm leading-none font-medium tracking-tight md:text-lg">{text}</span>
				</div>
			{/each}
		</div>
		<div
			class="absolute flex items-center justify-center gap-x-4 py-2 pr-3 pl-2 md:gap-x-6 md:pr-4 md:pl-3"
		>
			{#each icons as { Icon, text }, index}
				<button
					class="relative -my-1.5 -mr-2.25 -ml-1.25 flex cursor-pointer items-center justify-center gap-x-0.5
						rounded-sm py-1.5 pr-2.25 pl-1.25 text-zinc-700 before:absolute before:inset-0
						focus-visible:outline-[1.75px] focus-visible:outline-zinc-500 focus-visible:before:scale-100"
					onmousedown={() => (activeButton = index)}
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
		transition: clip-path 0.3s cubic-bezier(0.22, 1, 0.36, 1);
		will-change: clip-path;

		&[data-active-button='0'] {
			clip-path: inset(0 68.5% 0 1.75% round 0.4rem);
		}
		&[data-active-button='1'] {
			clip-path: inset(0 32.5% 0 32.5% round 0.4rem);
		}
		&[data-active-button='2'] {
			clip-path: inset(0 1.75% 0 68.5% round 0.4rem);
		}

		@media (width < 48rem) {
			&[data-active-button='0'] {
				clip-path: inset(0 68.5% 0 1.75% round 0.4rem);
			}
			&[data-active-button='1'] {
				clip-path: inset(0 33% 0 32% round 0.4rem);
			}
			&[data-active-button='2'] {
				clip-path: inset(0 1% 0 68% round 0.4rem);
			}
		}
	}
</style>
