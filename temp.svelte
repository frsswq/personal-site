<div
	id="invert-scale"
	class={cn(
		'relative z-10 flex h-[40px] w-[100px] origin-center items-center justify-center rounded-lg ',
		`${duration} ${easeOutQuint} transition-transform`,
		{
			' scale-x-[calc(100/250)] scale-y-[calc(40/150)] md:scale-x-[calc(100/325)] md:scale-y-[calc(40/175)]':
				isOpen
		},
		{
			'scale-100 ': !isOpen
		}
	)}
>
	<!-- -translate-x-18.25 -translate-y-12.75 scale-x-[calc(100/250)] scale-y-[calc(40/150)] text-zinc-400
					md:-translate-x-27.5 md:-translate-y-15.75 md:scale-x-[calc(100/325)] md:scale-y-[calc(40/175)] -->
	<!--  inset-ring-4 inset-ring-zinc-100 inset-ring-0 inset-ring-white -->
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
				`${duration} ${easeOutQuint} transition-[transform, opacity] origin-center`,
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
				`${duration} ${easeOutQuint} origin-center transition-[opacity,transform]`,
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
