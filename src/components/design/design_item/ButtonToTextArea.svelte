<script lang="ts">
	import { cn } from '@utils/cn';
	import { onMouseDownOutside } from '@utils/outside';

	let isOpen: boolean = $state(false);
	let textArea: string = $state('');
</script>

<div
	class="flex min-h-[200px] min-w-[250px] items-center justify-center bg-transparent md:min-h-[275px]
		md:min-w-[325px]"
>
	<button
		class={cn(
			`ease-[cubic-bezier(0.22, 1, 0.36, 1)] relative flex h-10 w-[125px] origin-center cursor-pointer
			rounded-[5rem] border border-zinc-200 bg-white transition-all duration-300`,
			{
				'h-[200px] w-[250px] rounded-md md:h-[275px] md:w-[325px]': isOpen
			}
		)}
		onmousedown={() => (isOpen = true)}
		use:onMouseDownOutside={() => (isOpen = false)}
	>
		<span
			class={cn(
				` ease-[cubic-bezier(0.22, 1, 0.36, 1)] absolute top-1/2 left-1/2 -translate-1/2 text-base
				font-medium tracking-tight transition-all duration-300`,
				{
					'top-3 left-4 origin-top-left translate-0 text-zinc-400': isOpen
				},
				{
					'origin-center': !isOpen
				}
			)}
		>
			{textArea ? '' : 'Feedback'}
		</span>
		<textarea
			class="top-3 left-4 h-full w-full resize-none border-none outline-none"
			required
			minlength="1"
			spellcheck="false"
			bind:value={textArea}
		></textarea>
	</button>
	<p class="absolute bottom-3 text-[10px] text-zinc-700">
		remake of <a class="hover:text-sky-500" href="https://x.com/emilkowalski_" target="_blank"
			>@emilkowalski_</a
		> design
	</p>
</div>
