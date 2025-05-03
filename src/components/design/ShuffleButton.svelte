<script lang="ts">
	import { cn } from '@utils/cn';
	import { designStore } from '@utils/shuffle.svelte';
</script>

<button
	class={cn(
		'flex cursor-pointer items-center justify-center text-base leading-none font-medium tracking-tight',
		'bg-zinc-50/10 text-zinc-700 ring ring-zinc-950/10 hover:bg-zinc-50 hover:text-black',
		'inset-shad rounded-sm px-2.5 py-2'
	)}
	onclick={() => designStore.shuffle()}
	aria-label="Shuffle"
	title="Shuffle"
>
	Shuffle
</button>
