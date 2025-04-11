<script lang="ts">
	type WhiteKeycapsProps = {
		buttonClass?: string;
		startNum: number;
	};
</script>

{#snippet WhiteKeycaps({ buttonClass, startNum }: WhiteKeycapsProps)}
	<div class="{buttonClass} button-container gap-x-0.75 md:gap-x-1">
		{#each { length: 3 }, i}
			<button class="button">
				<p class="button-text select-none">{i + startNum}</p>
			</button>
		{/each}
	</div>
{/snippet}

<div class="size-fit rounded-[0.9375rem] bg-zinc-200 p-0.75 md:rounded-[1.25rem] md:p-1">
	{@render WhiteKeycaps({ buttonClass: 'rounded-t-xl md:rounded-t-2xl', startNum: 7 })}
	{@render WhiteKeycaps({ startNum: 4 })}
	{@render WhiteKeycaps({ buttonClass: 'rounded-b-xl md:rounded-b-2xl', startNum: 1 })}
</div>

<style>
	:root {
		--button-size: 6.25rem;
		--button-size-mobile: 4.6875rem;
		--gray-50: rgb(250, 250, 250);
		--gray-100: rgb(245, 245, 245);
		--gray-150: rgb(242, 242, 242);
		--gray-200: rgb(238, 238, 238);
		--gray-250: rgb(231, 231, 231);
		--gray-300: rgb(224, 224, 224);
		--gray-350: rgb(207, 207, 207);
		--gray-400: rgb(189, 189, 189);
		--gray-450: rgb(174, 174, 174);
		--gray-500: rgb(158, 158, 158);
		--gray-550: rgb(145, 145, 145);
		--gray-600: rgb(131, 131, 131);
		--gray-650: rgb(118, 118, 118);
		--gray-700: rgb(105, 105, 105);
		--gray-750: rgb(92, 92, 92);
		--gray-800: rgb(79, 79, 79);
		--gray-850: rgb(66, 66, 66);
		--gray-900: rgb(33, 33, 33);
	}

	.button-container {
		display: flex;
		margin: 0 auto;
		background: black;
		padding: 0.25rem;

		&:first-child {
			padding-bottom: 0;
		}

		&:last-child {
			padding-top: 0;
		}

		@media (width < 48rem) {
			padding: 0.1875rem;
		}
	}

	.button-text {
		position: relative;
		font-family: 'Inter', sans-serif;
		font-size: 2rem;
		font-weight: 350;
		text-align: left;
		padding-top: 0.25rem;
		padding-left: 0.375rem;
		line-height: 1;
		font-variant-numeric: tabular-nums;
		color: var(--gray-500);
		transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

		@media (width < 48rem) {
			font-size: 1.5rem;
			padding-top: 0.1875rem;
			padding-bottom: 0.28125rem;
		}
	}

	.button {
		display: flex;
		align-items: baseline;
		cursor: pointer;
		position: relative;
		padding: 0.75rem;
		width: var(--button-size);
		height: var(--button-size);
		border-radius: 0.75rem;
		box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.1);
		background: conic-gradient(
			from 45deg,
			var(--gray-450),
			var(--gray-400) 2.5%,
			var(--gray-200) 25%,
			var(--gray-100) 27.5%,
			var(--gray-100) 47.5%,
			white 50%,
			var(--gray-100) 52.5%,
			var(--gray-100) 72.5%,
			var(--gray-300) 75%,
			var(--gray-350) 77.5%,
			var(--gray-400) 97.5%,
			var(--gray-450)
		);

		transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

		@media (width < 48rem) {
			width: var(--button-size-mobile);
			height: var(--button-size-mobile);
			padding: 0.5625rem;
			border-radius: 0.5625rem;
			box-shadow: 0 0 0 0.375px rgba(0, 0, 0, 0.1);
		}
	}

	.button::before {
		content: '';
		position: absolute;
		top: calc(var(--button-size) * 0.1125);
		left: calc(var(--button-size) * 0.1125);
		height: calc(var(--button-size) * 0.775);
		width: calc(var(--button-size) * 0.775);
		background: var(--gray-100);
		border-radius: 0.5rem;
		box-shadow: 0 0 0 0.75px rgba(255, 255, 255, 0.8);
		transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

		@media (width < 48rem) {
			top: calc(var(--button-size-mobile) * 0.1125);
			left: calc(var(--button-size-mobile) * 0.1125);
			height: calc(var(--button-size-mobile) * 0.775);
			width: calc(var(--button-size-mobile) * 0.775);
			box-shadow: 0 0 0 0.5625px rgba(255, 255, 255, 0.8);
		}
	}

	.button:hover {
		background: conic-gradient(
			from 45deg,
			var(--gray-500),
			var(--gray-450) 2.5%,
			var(--gray-250) 25%,
			var(--gray-150) 27.5%,
			var(--gray-150) 47.5%,
			var(--gray-50) 50%,
			var(--gray-150) 52.5%,
			var(--gray-150) 72.5%,
			var(--gray-350) 75%,
			var(--gray-400) 77.5%,
			var(--gray-450) 97.5%,
			var(--gray-500)
		);
	}


	.button:hover::before {
		background: var(--gray-200);
		box-shadow: 0 0 0 0.75px rgba(255, 255, 255, 0.7);

		@media (width < 48rem) {
			box-shadow: 0 0 0 0.5625px rgba(255, 255, 255, 0.7);
		}
	}

	.button:hover .button-text {
		color: var(--gray-600);
	}

	.button:active .button-text {
		padding-top: 0.125rem;
		padding-left: 0.25rem;

		@media (width < 48rem) {
			padding-top: 0.09375rem;
			padding-bottom: 0.1875rem;
		}
	}

	.button:active {
		background: conic-gradient(
			from 45deg,
			var(--gray-600),
			var(--gray-550) 2.5%,
			var(--gray-350) 25%,
			var(--gray-250) 27.5%,
			var(--gray-250) 47.5%,
			var(--gray-150) 50%,
			var(--gray-250) 52.5%,
			var(--gray-250) 72.5%,
			var(--gray-450) 75%,
			var(--gray-500) 77.5%,
			var(--gray-550) 97.5%,
			var(--gray-600)
		);
	}

	.button:active::before {
		background: var(--gray-250);
		top: calc(var(--button-size) * 0.09375);
		left: calc(var(--button-size) * 0.09375);
		height: calc(var(--button-size) * 0.8125);
		width: calc(var(--button-size) * 0.8125);
		box-shadow: 0 0 0 0.75px rgba(255, 255, 255, 0.5);

		@media (width < 48rem) {
			top: calc(var(--button-size-mobile) * 0.09375);
			left: calc(var(--button-size-mobile) * 0.09375);
			height: calc(var(--button-size-mobile) * 0.8125);
			width: calc(var(--button-size-mobile) * 0.8125);
			box-shadow: 0 0 0 0.5625px rgba(255, 255, 255, 0.5);
		}
	}
</style>
