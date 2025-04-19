<script lang="ts">
	import { cn } from '@utils/cn';

	let isOpen: boolean = $state(false);
</script>

<div
	class="flex min-h-[200px] min-w-[250px] items-center justify-center bg-transparent md:min-h-[275px]
		md:min-w-[325px]"
>
	<button
		class={cn(
			`relative flex h-10 w-[125px] origin-center cursor-pointer rounded-[5rem] border border-zinc-200
			bg-white transition-all duration-500`,
			{
				'h-[200px] w-[250px] rounded-md md:h-[275px] md:w-[325px]': isOpen
			}
		)}
		onclick={() => (isOpen = !isOpen)}
	>
		<span
			class={cn(
				` absolute top-1/2 left-1/2 -translate-1/2 text-base font-medium tracking-tight transition-all
				duration-500 ease-in-out`,
				{
					'top-3 left-4 origin-top-left translate-0 text-zinc-400': isOpen
				},
				{
					'origin-center': !isOpen
				}
			)}
		>
			Feedback
		</span>
	</button>
</div>
