<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import type { TransitionConfig } from 'svelte/transition';

	type flipTypes = {
		delay?: number;
		duration?: number;
		easing?: (t: number) => number;
	};

	function flipTop(node: HTMLElement, params: flipTypes = {}): TransitionConfig {
		const { delay = 0, duration = 150, easing = cubicOut } = params;

		return {
			delay,
			duration,
			easing,
			css: (t: number, u: number) => {
				const rotation = -90 * u;

				return `
					z-index: 10;
					transform: rotateX(${rotation}deg);
				`;
			}
		};
	}

	function flipBottom(node: HTMLElement, params: flipTypes = {}): TransitionConfig {
		const { delay = 150, duration = 150, easing = cubicOut } = params;

		return {
			delay,
			duration,
			easing,
			css: (t: number) => {
				const rotation = 90 * (1 - t);

				return `
					z-index: 10;
					transform: rotateX(${rotation}deg)
				`;
			}
		};
	}

	class numberCounter {
		smallNum: number = $state(0);
		bigNum: number = $state(0);
		smallNumPlusOne: number = $state(1);
		bigNumPlusOne: number = $state(1);

		get nextSmallNum(): number {
			if (this.smallNum === 9 && this.bigNum === 9) return 9;
			return (this.smallNum + 1) % 10;
		}

		get nextBigNum(): number {
			if (this.smallNum === 9 && this.bigNum === 9) return 9;
			if ((this.smallNum + 1) % 10 === 0) {
				return (this.bigNum + 1) % 10;
			}

			return this.bigNum;
		}

		async delayNextNum(): Promise<void> {
			await new Promise((resolve) => setTimeout(resolve, 150));
			this.smallNumPlusOne = this.nextSmallNum;
			this.bigNumPlusOne = this.nextBigNum;
		}

		increment(): void {
			if (this.smallNum === 9 && this.bigNum === 9) return;

			this.smallNum = (this.smallNum + 1) % 10;

			if (this.smallNum === 0) {
				this.bigNum = (this.bigNum + 1) % 10;
			}
		}

		decrement(): void {
			if (this.smallNum === 0 && this.bigNum === 0) return;

			if (this.smallNum === 0) {
				this.smallNum = 9;
				this.bigNum = (this.bigNum - 1 + 10) % 10;
			} else {
				this.smallNum--;
			}
		}

		reset(): void {
			this.smallNum = 0;
			this.bigNum = 0;
		}
	}

	const counter = new numberCounter();

	async function handleIncrement() {
		counter.increment();
		await counter.delayNextNum();
	}
</script>

<div
	class="flex max-w-[250px] items-center justify-center gap-x-1 rounded-xl border-2 border-zinc-200
		bg-gradient-to-b from-gray-400 to-gray-300 p-2 select-none md:max-w-[300px] md:gap-x-2 md:p-4"
>
	<div class="container">
		<div class="card current">
			<div class="half top"><span>{counter.smallNum}</span></div>
			<div class="half bottom"><span>{counter.smallNum}</span></div>
		</div>
		<div class="card next">
			<div class="half top"><span>{counter.smallNumPlusOne}</span></div>
			<div class="half bottom"><span>{counter.smallNumPlusOne}</span></div>
		</div>
	</div>
	<button
		class="flex items-center rounded-sm bg-zinc-50 px-2 py-1.5 text-xs leading-none font-semibold
			tracking-tight md:text-sm"
		onclick={handleIncrement}>+</button
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

	.container:hover .card.next .half.top {
		animation: flipTop 0.3s ease forwards;
		z-index: 10;
	}

	@keyframes flipTop {
		0% {
			transform: rotateX(0deg);
		}
		100% {
			transform: rotateX(-90deg);
		}
	}

	@keyframes flipBottom {
		0% {
			transform: rotateX(90deg);
		}
		100% {
			transform: rotateX(0deg);
		}
	}
</style>
