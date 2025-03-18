<script lang="ts">
	import MynauiCopy from '../icons/MynauiCopy.svelte';
	import MynauiEditOne from '../icons/MynauiEditOne.svelte';
	import MynauiPin from '../icons/MynauiPin.svelte';
	import MynauiLinkOne from '../icons/MynauiLinkOne.svelte';

	const menuItems = [
		{ label: 'Copy', icon: MynauiCopy },
		{ label: 'Edit', icon: MynauiEditOne },
		{ label: 'Pin', icon: MynauiPin },
		{ label: 'Copy Link', icon: MynauiLinkOne }
	];
</script>

<div
	class="flex min-w-[250px] flex-col rounded-xs bg-zinc-200/80 leading-none tracking-tight text-zinc-600 md:min-w-[325px]"
>
	{#each menuItems as { label, icon: Icon }, index}
		<button
			class="group mx-0.75 my-0.5 flex items-center justify-between rounded-xs px-1 hover:cursor-pointer hover:bg-zinc-300/80"
		>
			<p class="m-2 group-hover:text-black">{label}</p>
			<Icon className="my-2 mr-2.5 size-5 text-zinc-700 group-hover:text-black" />
		</button>
		{#if index !== menuItems.length - 1}
			<hr class="h-px w-full text-zinc-300/80" />
		{/if}
	{/each}
</div>
