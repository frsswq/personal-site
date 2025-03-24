<script lang="ts">
	import { onMount } from 'svelte';

	let time = $state(new Date());

	let hours = $derived(time.getHours().toString().padStart(2, '0'));
	let minutes = $derived(time.getMinutes().toString().padStart(2, '0'));

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

	const numClass =
		'flex items-center justify-center px-1.5 py-1 rounded-md border border-zinc-200 bg-white min-w-[35px]';
</script>

<div
	class="clock hidden w-fit items-center justify-center gap-x-0.5 rounded-lg border border-zinc-200
		bg-zinc-50/60 p-0.5 leading-none font-semibold text-zinc-800 select-none md:flex"
>
	<span class={numClass}>{hours}</span>
	<span class={numClass}>{minutes}</span>
</div>

<style>
	.clock {
		font-family: 'Inter', sans-serif;
		font-feature-settings: 'ss01';
	}
</style>
