<script module lang="ts">
	import { cn } from '@utils/cn';
	import Icon from '@components/icons/MingcuteRandomLine.svelte';
	import { designStore } from '@utils/shuffle.svelte';
</script>

<button
	class={cn(
		`nav-button relative flex cursor-pointer items-center justify-center gap-x-2 rounded-md border
		border-transparent px-2.5 py-2.5 text-sm leading-none tracking-tight text-zinc-500
		hover:border-zinc-200/50 hover:bg-zinc-100/80 hover:text-black md:text-base`
	)}
	onclick={() => designStore.shuffle()}
>
	<Icon className="size-6 md:size-5" />
</button>
