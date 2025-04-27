<script lang="ts">
	import { cn } from '@utils/cn';
	import { onMouseDownOutside } from '@utils/outside';
	import Spinner from '@components/icons/SvgSpinnersBarsRotateFade.svelte';

	let isOpen: boolean = $state(false);
	let textArea: string = $state('');
	let isSubmitting: boolean = $state(false);

	$effect(() => {
		if (!isOpen) {
			textArea = '';
		}
	});

	const easeOutQuint: string = 'ease-[cubic-bezier(0.22, 1, 0.36, 1)]';
	const duration: string = 'duration-500';

	async function handleSubmit(e: SubmitEvent) {
		isSubmitting = true;
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			isOpen = false;
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div
	class="relative flex min-h-[200px] min-w-[250px] items-center justify-center bg-transparent
		md:min-h-[275px] md:min-w-[325px]"
>
	<div
		role="button"
		tabindex="0"
		class={cn(
			` relative flex origin-center rounded-lg border border-zinc-200 bg-white text-base font-medium
			tracking-tight `,
			`${duration} ${easeOutQuint} transition-[width, height, inset-ring]`,
			{
				'h-[150px] w-[250px] cursor-default inset-ring-4 inset-ring-zinc-100 md:h-[175px] md:w-[325px]':
					isOpen
			},
			{
				'h-10 w-[100px] cursor-pointer inset-ring-0 inset-ring-white': !isOpen
			}
		)}
		onmousedown={() => (isOpen = true)}
		onkeydown={(e) =>
			e.key === 'Enter' ? (isOpen = true) : e.key === 'Escape' ? (isOpen = false) : null}
		use:onMouseDownOutside={() => {
			if (isSubmitting) return;
			isOpen = false;
		}}
	>
		<span
			class={cn(
				' absolute h-fit w-fit select-none',
				`${duration} ${easeOutQuint} transition-[transform, left, top, color]`,
				{
					'top-3 left-4 origin-top-left text-zinc-400 ': isOpen
				},
				{
					'top-[7.5px] left-[13.5px] origin-center text-black': !isOpen
				}
			)}
		>
			{textArea ? '' : 'Feedback'}
		</span>
		<form
			class="flex flex-col"
			onsubmit={(e) => {
				e.preventDefault();
				handleSubmit(e);
			}}
		>
			<textarea
				class={cn(
					`absolute top-3.5 left-4 h-[60%] w-[calc(100%-2rem)] resize-none overflow-auto border-none
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
			<hr
				class={cn(
					'absolute bottom-[30%] left-1 h-0 w-[calc(100%-0.5rem)] text-zinc-200',
					`border-[0.75px] border-dashed
					[border-image:repeating-linear-gradient(90deg,#e4e4e7_0_4px,transparent_4px_8px)_1]`,
					`${duration} ${easeOutQuint} origin-bottom`,
					{
						'scale-0 opacity-0': !isOpen
					},
					{
						'scale-100 opacity-100': isOpen
					}
				)}
			/>

			<div
				class={cn(
					'absolute right-3 bottom-3 h-6 w-26 md:h-8 md:w-30',
					`${duration} ${easeOutQuint} will-change-[opacity, transform] transition-[opacity,transform
					origin-bottom-right`,
					{
						'scale-100 opacity-100': isOpen
					},
					{
						'scale-0 opacity-0': !isOpen
					}
				)}
			>
				<button
					type="submit"
					disabled={isSubmitting}
					class="flex h-fit min-h-full w-fit min-w-full flex-nowrap items-center justify-center rounded-md border
						border-amber-100 bg-gradient-to-b from-amber-300 to-amber-400 text-xs leading-none tracking-tight
						text-yellow-800 md:text-sm"
				>
					{#if isSubmitting}
						<Spinner className="size-5 text-amber-600" />
					{:else}
						Send feedback
					{/if}
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
