<script lang="ts">
	import { fly } from 'svelte/transition';

	let num: number = $state(0);

	const numClass =
		'numberContainer text-lg md:text-2xl flex overflow-hidden items-center justify-center px-3 py-1.5 md:px-5  md:py-6 rounded-md border border-zinc-200 bg-white min-w-[35px] min-h-[30px]';
</script>

<div
	class="clock flex max-w-[250px] items-center justify-center gap-x-1 rounded-lg border border-zinc-200
		bg-zinc-50/60 p-1 leading-none font-semibold text-zinc-800 select-none md:max-w-[300px]"
>
	<div class={numClass}>
		{#key num}
			<span class="absolute" in:fly={{ y: 50, opacity: 0 }} out:fly={{ y: -50, opacity: 0 }}>
				{num}
			</span>
		{/key}
	</div>
	<button onclick={() => num++}>CLICK</button>
</div>

<!-- {#snippet counterAnim(time: string)}
	<button class={numClass} onclick={time}>
		{#key time}
			<span class="absolute" in:fly={{ y: 50, opacity: 0 }} out:fly={{ y: -50, opacity: 0 }}>
				{time}
			</span>
		{/key}
	</button>
{/snippet} -->

<style>
	.clock {
		font-family: 'Inter', sans-serif;
		font-feature-settings: 'ss01';
	}

	.numberContainer {
		contain: paint;
	}
</style>
