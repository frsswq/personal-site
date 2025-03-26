<script lang="ts">
	import { onMount } from 'svelte';
	import { quintIn, quintOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	let time = $state(new Date());

	let hours = $derived(time.getHours().toString().padStart(2, '0'));
	let minutes = $derived(time.getMinutes().toString().padStart(2, '0'));
	let seconds = $derived(time.getSeconds().toString().padStart(2, '0'));

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);

		return () => clearInterval(interval);
	});

	const numClass =
		'numberContainer text-lg md:text-2xl flex overflow-hidden items-center justify-center px-3 py-1.5 md:px-5  md:py-6 rounded-md border border-zinc-200 bg-white min-w-[35px] min-h-[30px]';
</script>

<div
	class="clock flex max-w-[250px] items-center justify-center gap-x-1 rounded-lg border border-zinc-200
		bg-zinc-50/60 p-1 leading-none font-semibold text-zinc-800 select-none md:max-w-[300px]"
>
	{@render counterAnim(hours[0])}
	{@render counterAnim(hours[1])}:
	{@render counterAnim(minutes[0])}
	{@render counterAnim(minutes[1])}:
	{@render counterAnim(seconds[0])}
	{@render counterAnim(seconds[1])}
</div>

{#snippet counterAnim(time: string)}
	<div class={numClass}>
		{#key time}
			<span class="absolute" in:fly={{ y: 50, opacity: 0 }} out:fly={{ y: -50, opacity: 0 }}>
				{time}
			</span>
		{/key}
	</div>
{/snippet}

<style>
	.clock {
		font-family: 'Inter', sans-serif;
		font-feature-settings: 'ss01';
	}

	.numberContainer {
		contain: paint;
	}
</style>
