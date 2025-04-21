<script lang="ts">
	import { cn } from '@utils/cn';
	import { onMouseDownOutside } from '@utils/outside';

	let isOpen: boolean = $state(false);
	let textArea: string = $state('');

	$effect(() => {
		if (!isOpen) {
			textArea = '';
		}
	});

	const quintOut: string = 'ease-[cubic-bezier(0.22, 1, 0.36, 1)]';
</script>

<div
	class="relative flex min-h-[200px] min-w-[250px] items-center justify-center bg-transparent
		md:min-h-[275px] md:min-w-[325px]"
>
	<button
		class={cn(
			`${quintOut} relative flex h-10 w-[125px] origin-center cursor-pointer rounded-[2rem] border
			border-zinc-200 bg-white text-sm font-medium tracking-tight transition-all duration-500 md:text-base`,
			{
				[`h-[150px] w-[250px] cursor-default rounded-xl inset-ring-4 inset-ring-zinc-100 md:h-[225px]
				md:w-[325px]`]: isOpen
			}
		)}
		onmousedown={() => (isOpen = true)}
		use:onMouseDownOutside={() => (isOpen = false)}
	>
		<span
			class={cn(
				`${quintOut} absolute transition-all duration-[400ms]`,
				{
					'top-3 left-4 origin-top-left translate-0 text-zinc-400': isOpen
				},
				{
					'top-1/2 left-1/2 origin-center -translate-1/2': !isOpen
				}
			)}
		>
			{textArea ? '' : 'Feedback'}
		</span>
		{#if isOpen}
			<textarea
				class="absolute top-3 left-4 h-3/4 w-[calc(100%-2rem)] resize-none overflow-hidden border-none
					leading-tight outline-none"
				required
				minlength="1"
				maxlength="300"
				spellcheck="false"
				bind:value={textArea}
			></textarea>
		{/if}
	</button>
	<p class="absolute -bottom-3 text-xs text-zinc-500 md:text-zinc-700">
		remake of <a class="hover:text-sky-500" href="https://x.com/emilkowalski_" target="_blank"
			>@emilkowalski_</a
		> design
	</p>
</div>
