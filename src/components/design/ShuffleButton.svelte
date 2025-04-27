<script lang="ts">
	import { cn } from '@utils/cn';
	import Icon from '@components/icons/MingcuteRandomLine.svelte';
	import { designStore } from '@utils/shuffle.svelte';
</script>

<button
	class={cn(
		`flex cursor-pointer items-center justify-center rounded-md px-2.5 py-2.5 text-sm leading-none
		tracking-tight text-zinc-500 md:text-base`,
		`border border-transparent hover:border-zinc-200 hover:bg-zinc-100/80 hover:text-black
		md:border-zinc-200 md:bg-zinc-100/80`,
		'fixed right-2 bottom-1.5 z-50 md:right-6 md:bottom-6'
	)}
	onclick={() => designStore.shuffle()}
	aria-label="Shuffle"
	title="Shuffle"
>
	<Icon className="size-6 md:size-8" />
</button>
