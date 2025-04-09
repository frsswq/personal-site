<script lang="ts">
	// TODO: proper hover and onclick button styling

	import { cubicIn, cubicOut } from 'svelte/easing';
	import type { TransitionConfig } from 'svelte/transition';
	import CaretUp from '../../icons/BasilCaretUpSolid.svelte';
	import CaretDown from '../../icons/BasilCaretDownSolid.svelte';

	type flipTypes = {
		delay?: number;
		duration?: number;
		easing?: (t: number) => number;
	};

	let smallNum: number = $state(0);
	let bigNum: number = $state(0);
	let delayedSmallNum: number = $state(0);
	let delayedBigNum: number = $state(0);
	let isAnimating: boolean = $state(false);

	const animDuration: number = 150;

	function increment(): void {
		if (isAnimating) return;

		isAnimating = true;

		smallNum = (smallNum + 1) % 10;
		if (smallNum === 0) {
			bigNum = (bigNum + 1) % 10;
		}
	}

	function decrement(): void {
		if (isAnimating) return;

		isAnimating = true;

		smallNum = (smallNum - 1 + 10) % 10;
		if (smallNum === 9) {
			bigNum = (bigNum - 1 + 10) % 10;
		}
	}

	function flipTopCurrent(node: HTMLElement, params: flipTypes = {}): TransitionConfig {
		const { delay = 0, duration = animDuration, easing = cubicIn } = params;

		return {
			delay,
			duration,
			easing,
			css: (t: number) => {
				const rotation = -90 * (1 - t);

				return `
					background: linear-gradient(
						to top,
						color-mix(in oklab, var(--color-zinc-300) ${100 * Math.min(2 * (1 - t), 1)}%, var(--color-zinc-200)),
						color-mix(in oklab, var(--color-zinc-300) ${100 * Math.min(Math.max(2 * (1 - t), 0.125), 1)}%, var(--color-white)),
						color-mix(in oklab, var(--color-zinc-300) ${100 * Math.min(2 * (1 - t), 1)}%, var(--color-white))
					);

					transform: rotateX(${rotation}deg);
				`;
			},
			tick: (t: number) => {
				if (node.parentElement) {
					if (t > 0) {
						node.parentElement.style.zIndex = '10';
					} else {
						node.parentElement.style.zIndex = '';
					}
				}
			}
		};
	}

	function flipBottomNext(node: HTMLElement, params: flipTypes = {}): TransitionConfig {
		const { delay = animDuration, duration = animDuration, easing = cubicOut } = params;

		return {
			delay,
			duration,
			easing,
			css: (t: number) => {
				const rotation = 90 * (1 - t);
				return `
					transform: rotateX(${rotation}deg);
				`;
			},
			tick: (t: number) => {
				if (node.parentElement) {
					if (t === 1) {
						delayedSmallNum = smallNum;
						delayedBigNum = bigNum;
						requestAnimationFrame(() => {
							isAnimating = false;
						});
					} else if (t < 1) {
						node.parentElement.style.zIndex = '10';
					} else {
						node.parentElement.style.zIndex = '';
					}
				}
			}
		};
	}
</script>

<div class="flex items-center justify-center gap-x-2 select-none">
	<div
		class="main-container gap-x-1 rounded-[1.25rem] border-3 border-zinc-200 bg-black px-1 py-1.25"
	>
		<div class="counter-container">
			{#key bigNum}
				<div class="card current">
					<div class="half top" out:flipTopCurrent>
						<span>{bigNum}</span>
					</div>
					<div class="half bottom">
						<span>{delayedBigNum}</span>
					</div>
				</div>
				<div class="card next">
					<div class="half bottom" in:flipBottomNext>
						<span>{bigNum}</span>
					</div>
				</div>
			{/key}
		</div>
		<div class="counter-container">
			{#key smallNum}
				<div class="card current">
					<div class="half top" out:flipTopCurrent>
						<span>{smallNum}</span>
					</div>
					<div class="half bottom">
						<span>{delayedSmallNum}</span>
					</div>
				</div>
				<div class="card next">
					<div class="half bottom" in:flipBottomNext>
						<span>{smallNum}</span>
					</div>
				</div>
			{/key}
		</div>
	</div>
	<div class="flex flex-col rounded-[10px] border border-zinc-200 bg-black">
		<button
			class="button-top group m-[2.5px] mb-0 flex size-8 cursor-pointer items-center justify-center
				rounded-t-[7px] border-b-[0.75px] border-black"
			onclick={() => increment()}
			><CaretUp className="text-zinc-800 size-6 group-hover:text-black"></CaretUp></button
		>
		<button
			class="button-bottom group m-[2.5px] mt-0 flex size-8 cursor-pointer items-center justify-center
				rounded-b-[7px] border-t-[0.75px] border-black"
			onclick={() => decrement()}
			><CaretDown className="text-zinc-800 size-6 group-hover:text-black"></CaretDown></button
		>
	</div>
</div>

<style>
	.main-container {
		--counter-size-mobile: 15.625rem;
		--counter-size: 18.75rem;

		display: flex;
		align-items: center;
		justify-content: center;
		max-width: var(--counter-size);

		@media (width <= 48rem) {
			max-width: var(--counter-size-mobile);
		}
	}

	.counter-container {
		position: relative;
		height: 8.75rem;
		width: 6.25rem;
		perspective: 500px;
		font-size: 6.5rem;
		font-weight: 500;
		line-height: 1;
		color: var(--color-zinc-800);
		font-family: 'Inter Display', sans-serif;

		@media (width <= 48rem) {
			height: 7.5rem;
			width: 5rem;
			font-size: 5rem;
		}
	}

	.card {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		backface-visibility: hidden;
		transform-style: preserve-3d;
	}

	.button-top {
		background: linear-gradient(
			to top,
			var(--color-zinc-200) 0%,
			var(--color-zinc-100) 10%,
			var(--color-zinc-50) 20%,
			var(--color-white) 100%
		);

		&:hover {
			background: linear-gradient(
				to top,
				var(--color-zinc-200) 0%,
				var(--color-zinc-100) 25%,
				var(--color-zinc-50) 50%,
				var(--color-white) 100%
			);
		}
	}

	.button-bottom {
		background: linear-gradient(
			to bottom,
			var(--color-zinc-200) 0%,
			var(--color-zinc-100) 10%,
			var(--color-zinc-50) 20%,
			var(--color-white) 100%
		);

		&:hover {
			background: linear-gradient(
				to bottom,
				var(--color-zinc-200) 0%,
				var(--color-zinc-100) 25%,
				var(--color-zinc-50) 50%,
				var(--color-white) 100%
			);
		}
	}

	.half {
		position: absolute;
		height: 50%;
		width: 100%;
		display: flex;
		justify-content: center;
		will-change: transform, z-index;
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.025);
	}

	.half.top {
		top: 0;
		background: linear-gradient(
			to top,
			var(--color-zinc-200) 0%,
			var(--color-zinc-100) 12.5%,
			var(--color-zinc-50) 25%,
			var(--color-white) 100%
		);
		transform: translateY(-0.75px);
		transform-origin: bottom;
		border-radius: 0.875rem 0.875rem 0 0;
		align-items: flex-end;
		overflow: hidden;
	}

	.half.bottom {
		bottom: 0;
		background: linear-gradient(
			to bottom,
			var(--color-zinc-200) 0%,
			var(--color-zinc-100) 12.5%,
			var(--color-zinc-50) 25%,
			var(--color-white) 100%
		);
		transform: translateY(0.75px);
		transform-origin: top;
		border-radius: 0 0 0.875rem 0.875rem;
		align-items: flex-start;
		overflow: hidden;
	}

	.half span {
		display: block;
		position: relative;
	}

	.top span {
		transform: translateY(51%);
	}

	.bottom span {
		transform: translateY(-50%);
	}
</style>
