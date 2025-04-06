<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import type { TransitionConfig } from 'svelte/transition';

	type flipTypes = {
		delay?: number;
		duration?: number;
		easing?: (t: number) => number;
	};

	let currentNum: number = $state(0);
	let nextNum: number = $derived((currentNum + 1) % 10);
	let displayCurrentNum: number = $state(0);

	function increment(): void {
		if (currentNum === 9 && nextNum === 9) return;

		currentNum = (currentNum + 1) % 10;
	}

	function flipped(): void {
		displayCurrentNum = currentNum;
	}

	function flipTopCurrent(node: HTMLElement, params: flipTypes = {}): TransitionConfig {
		/*	logic (onclick)
			- current top flip, show the next top
			- next bottom flip, hide the current bottom
		*/
		const { delay = 0, duration = 100, easing = cubicOut } = params;

		return {
			delay,
			duration,
			easing,
			css: (t: number) => {
				const rotation = -90 * (1 - t);

				return `
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
		const { delay = 100, duration = 100, easing = cubicOut } = params;

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
						displayCurrentNum = currentNum;
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

<div
	class="ju/stify-center flex max-w-[250px] items-center gap-x-1 rounded-xl border-2 border-zinc-200
		bg-gradient-to-b from-gray-400 to-gray-300 p-2 select-none md:max-w-[300px] md:gap-x-2 md:p-4"
>
	<div class="container">
		{#key currentNum}
			<div class="card current">
				<div class="half top" out:flipTopCurrent>
					<span>{currentNum}</span>
				</div>
				<div class="half bottom">
					<span>{displayCurrentNum}</span>
				</div>
			</div>
			<div class="card next">
				<div class="half bottom" in:flipBottomNext>
					<span>{currentNum}</span>
				</div>
			</div>
		{/key}
	</div>
	<button
		class="flex items-center rounded-sm bg-zinc-50 px-2 py-1.5 text-xs leading-none font-semibold
			tracking-tight md:text-sm"
		onclick={() => increment()}>+</button
	>
</div>

<style>
	.container {
		position: relative;
		height: 8.75rem;
		width: 6.25rem;
		perspective: 1000px;
		font-size: 6.5rem;
		font-weight: 500;
		line-height: 1;
		color: white;
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

	.half {
		position: absolute;
		height: 50%;
		width: 100%;
		display: flex;
		justify-content: center;
		will-change: transform, z-index;
	}

	.half.top {
		top: 0;
		border: 0.09375rem solid var(--color-zinc-50);
		border-bottom: 0.0625rem solid var(--color-zinc-50);
		background: linear-gradient(var(--color-zinc-900), var(--color-zinc-800));
		transform-origin: bottom;
		border-radius: 0.375rem 0.375rem 0 0;
		align-items: flex-end;
		overflow: hidden;
	}

	.half.bottom {
		bottom: 0;
		border: 0.09375rem solid var(--color-zinc-50);
		border-top: 0.0625rem solid var(--color-zinc-50);
		background: linear-gradient(var(--color-zinc-800), var(--color-zinc-600));
		transform-origin: top;
		border-radius: 0 0 0.375rem 0.375rem;
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

	.card.current {
		z-index: 2;
	}

	.card.next {
		z-index: 1;
	}
</style>
