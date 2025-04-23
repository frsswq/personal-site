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
</script>

<div
	class="relative flex min-h-[200px] min-w-[250px] items-center justify-center bg-transparent
		md:min-h-[275px] md:min-w-[325px]"
>
	<div
		role="button"
		tabindex="0"
		class={cn(
			`ease-[cubic-bezier(0.22, 1, 0.36, 1)] relative flex h-10 w-[112px] origin-center cursor-pointer
			rounded-3xl border border-zinc-200 bg-white text-sm font-medium tracking-tight transition-all
			md:w-[128px] md:text-base`,
			{
				[`h-[150px] w-[250px] cursor-default rounded-xl inset-ring-4 inset-ring-zinc-100 duration-[500ms]
				md:h-[175px] md:w-[325px]`]: isOpen
			},
			{
				'duration-[400ms]': !isOpen
			}
		)}
		onmousedown={() => (isOpen = true)}
		onkeydown={(e) =>
			e.key === 'Enter' ? (isOpen = true) : e.key === 'Escape' ? (isOpen = false) : null}
		use:onMouseDownOutside={() => (isOpen = false)}
	>
		<span
			class={cn(
				'ease-[cubic-bezier(0.22, 1, 0.36, 1)] absolute transition-all select-none',
				{
					'top-3 left-4 origin-top-left text-zinc-400 duration-[400ms]': isOpen
				},
				{
					'top-1/2 left-1/2 origin-center -translate-1/2 duration-[500ms]': !isOpen
				}
			)}
		>
			{textArea ? '' : 'Feedback'}
		</span>
		<form>
			<textarea
				class={cn(
					`absolute top-3 left-4 h-3/4 w-[calc(100%-2rem)] resize-none overflow-hidden border-none
					leading-tight outline-none`,
					{
						hidden: !isOpen
					}
				)}
				required
				minlength="1"
				maxlength="300"
				spellcheck="false"
				bind:value={textArea}
			></textarea>
			<div
				class={cn(
					`ease-[cubic-bezier(0.22, 1, 0.36, 1)] will-change-[opacity, transform] absolute h-6 w-26 text-xs
					transition-all md:h-8 md:w-30 md:text-sm`,
					{
						'right-3 bottom-3 origin-bottom-right scale-100 opacity-100 duration-[400ms] ': isOpen
					},
					{
						'right-1/4 bottom-1/4 origin-center translate-1/4 scale-0 opacity-0 duration-[400ms]':
							!isOpen
					}
				)}
			>
				<button
					type="submit"
					class="flex h-fit min-h-full w-fit min-w-full flex-nowrap items-center justify-center rounded-md border
						border-amber-100 bg-gradient-to-b from-amber-300 to-amber-400 leading-none tracking-tight
						text-yellow-800"
				>
					Send feedback
				</button>
			</div>
		</form>
	</div>
	<p class="absolute -bottom-3 text-xs text-zinc-500 md:text-zinc-700">
		remake of <a class="hover:text-sky-500" href="https://x.com/emilkowalski_" target="_blank"
			>@emilkowalski_</a
		> design
	</p>
</div>
