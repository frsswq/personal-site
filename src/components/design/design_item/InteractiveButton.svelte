<script lang="ts">
	import { cn } from '@utils/cn';

	let isClicked: boolean = $state(false);
</script>

<div class="flex min-h-[275px] min-w-[325px] items-center justify-center bg-transparent">
	<button
		class={cn(
			`relative flex h-12 w-[150px] origin-center cursor-pointer rounded-[5rem] border border-zinc-200
			bg-white transition-all duration-300`,
			{
				'h-[275px] w-[325px] rounded-md': isClicked
			}
		)}
		onclick={() => (isClicked = !isClicked)}
	>
		<span
			class={cn(
				`relative m-auto origin-center p-0 text-xl font-medium tracking-tight transition-all duration-300
				ease-in-out`,
				{
					'mt-0 ml-0 pt-3 pl-4 text-base text-zinc-500': isClicked
				}
			)}
		>
			Feedback
		</span>
	</button>
</div>
