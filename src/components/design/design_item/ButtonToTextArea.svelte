<script lang="ts">
	// TODO: fix anim performance

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
	<button
		id="main-button"
		class={cn(
			' relative h-[40px] w-[100px] origin-center bg-white text-base font-medium tracking-tight',
			`${duration} ${easeOutQuint} transition-transform`,
			{
				[`scale-x-[calc(250/100)] scale-y-[calc(150/40)] cursor-default rounded-xs md:scale-x-[calc(325/100)]
				md:scale-y-[calc(175/40)]`]: isOpen
			},
			{
				'scale-100 cursor-pointer rounded-md': !isOpen
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
				'flex h-[40px] w-[100px] origin-center items-center justify-center select-none',
				`${duration} ${easeOutQuint} transition-[translate, color]`,
				{
					[`text-zinc-400 md:-translate-x-8 md:-translate-y-3 md:scale-x-[calc(100/325)]
					md:scale-y-[calc(40/175)]`]: isOpen
				},
				{
					' translate-0 scale-100 text-black': !isOpen
				}
			)}
		>
			{textArea ? '' : 'Feedback'}
		</span>
	</button>
	<p class="absolute -top-1.5 -left-1 text-[10px] text-zinc-500 md:text-xs">
		Performant [unfinished]
	</p>
	<p class="absolute -bottom-3 text-[10px] text-zinc-500 md:text-xs">
		Remake of <a class="hover:text-sky-500" href="https://x.com/emilkowalski_" target="_blank"
			>@emilkowalski_</a
		> design
	</p>
</div>
