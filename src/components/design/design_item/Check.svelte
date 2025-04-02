<script lang="ts">
	import { tick } from 'svelte';

	// --- State for the Flip Animation ---
	let currentValue = $state(0); // The number currently fully displayed
	let nextValue = $state(0); // The number that will flip in
	let isFlipping = $state(false); // Controls the animation trigger class
	const animationDuration = 500; // ms - MUST match CSS animation duration

	// --- Logic to trigger the flip ---
	async function flipDigit() {
		if (isFlipping) return; // Don't allow clicks during animation

		const previousValue = currentValue;
		const newValue = (previousValue + 1) % 10; // Simple increment 0-9

		nextValue = newValue; // Set the number for the incoming halves
		isFlipping = true; // Add the .flipping class via binding below

		// Wait for the animation to finish
		await new Promise((resolve) => setTimeout(resolve, animationDuration));

		// Animation finished: Update the static value and remove trigger class
		currentValue = newValue;
		isFlipping = false;

		// Optional: Wait for Svelte DOM update before potential next flip
		// This helps ensure styles reset correctly if 'forwards' is used
		await tick();

		// If not using 'forwards' or if issues persist, you might need
		// to manually reset the inline style transforms here after tick()
	}

	// --- Your original counter class (if needed) ---
	class numberCounter {
		smallNum: number = $state(0);
		bigNum: number = $state(0);
		// ... increment/decrement methods ...
		// You would adapt flipDigit() to use and update this state
	}
	// const counter = new numberCounter();
	// Replace flipDigit with a method calling counter.increment() and managing flip state
</script>

<div
	class="flex items-center justify-center gap-x-1 rounded-lg border border-zinc-200 bg-white p-2
		font-semibold text-zinc-800 select-none"
>
	<div class="container{isFlipping ? 'flipping' : ''}">
		<div class="card current">
			<div class="half top"><span>{currentValue}</span></div>
			<div class="half bottom"><span>{currentValue}</span></div>
		</div>
		<div class="card next">
			<div class="half top"><span>{nextValue}</span></div>
			<div class="half bottom"><span>{nextValue}</span></div>
		</div>
	</div>

	<button class="pl-2" onclick={flipDigit}>Plus</button>
</div>

<style>
	:root {
		/* Define colors for easier changes */
		--flip-bg-top: hsl(240, 6%, 25%);
		--flip-bg-bottom: hsl(240, 6%, 30%);
		--flip-text-color: white;
		--flip-border-color: rgba(0, 0, 0, 0.4);
		--flip-height: 120px; /* Adjust size */
		--flip-width: 80px; /* Adjust size */
		--flip-font-size: 4rem; /* Adjust size */
		--flip-border-radius: 0.5rem;
	}

	.container {
		position: relative;
		height: var(--flip-height);
		width: var(--flip-width);
		perspective: 1000px; /* Enable 3D space */
		font-size: var(--flip-font-size); /* Base font size */
		line-height: 1; /* Prevent extra space */
		color: var(--flip-text-color);
	}

	.card {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0; /* Cover container */
		/* Prevent flicker during transform */
		backface-visibility: hidden;
		/* Apply 3D transforms to children */
		transform-style: preserve-3d;
	}

	.half {
		position: absolute;
		left: 0;
		width: 100%;
		height: 50%;
		overflow: hidden; /* Clip the number */
		backface-visibility: hidden; /* Hide back during rotation */
		display: flex; /* For centering text */
		justify-content: center;
		border-radius: var(--flip-border-radius);
	}

	.half.top {
		top: 0;
		align-items: flex-end; /* Align number to bottom edge */
		background: var(--flip-bg-top);
		border-bottom: 1px solid var(--flip-border-color); /* Divider */
		transform-origin: bottom; /* Rotate around bottom edge */
		border-radius: var(--flip-border-radius) var(--flip-border-radius) 0 0;
	}

	.half.bottom {
		bottom: 0;
		align-items: flex-start; /* Align number to top edge */
		background: var(--flip-bg-bottom);
		transform-origin: top; /* Rotate around top edge */
		border-radius: 0 0 var(--flip-border-radius) var(--flip-border-radius);
	}

	/* Precise positioning of number within each half */
	.half span {
		display: block; /* Needed for transform */
		position: relative; /* Allow fine-tuning */
	}
	.half.top span {
		transform: translateY(50%); /* Move text origin down */
	}
	.half.bottom span {
		transform: translateY(-50%); /* Move text origin up */
	}

	/* --- Initial States (Before Flip) --- */

	/* Current card: top half visible, bottom half below it */
	.card.current .top {
		transform: rotateX(0deg);
		z-index: 2;
	}
	.card.current .bottom {
		transform: rotateX(0deg);
		z-index: 1;
	}

	/* Next card: top half static behind current top, bottom half rotated forward */
	.card.next .top {
		transform: rotateX(0deg);
		z-index: 1;
	} /* Static, behind current top */
	.card.next .bottom {
		transform: rotateX(90deg);
		z-index: 2;
	} /* Ready to flip down */

	/* --- Flipping States (Triggered by '.flipping' on container) --- */

	/* Animate the current top half flipping away */
	.flipping .card.current .top {
		transform-origin: bottom; /* Ensure origin is correct */
		animation: flipTop var(--animation-duration, 500ms) linear forwards;
		z-index: 3; /* Flips above other static parts */
	}

	/* Animate the next bottom half flipping into view */
	.flipping .card.next .bottom {
		transform-origin: top; /* Ensure origin is correct */
		animation: flipBottom var(--animation-duration, 500ms) linear forwards;
		/* Use higher z-index so it appears 'on top' as it rotates down */
		z-index: 4;
	}

	/* --- Keyframes --- */
	@keyframes flipTop {
		/* Start from current state (0deg) */
		to {
			transform: rotateX(-90deg);
		}
	}

	@keyframes flipBottom {
		/* Start from initial state (90deg) */
		from {
			transform: rotateX(90deg);
		}
		to {
			transform: rotateX(0deg);
		}
	}

	/* --- Button Basic Style --- */
	button {
		margin-left: 1rem;
		padding: 0.5rem 1rem;
		background-color: #eee;
		border: 1px solid #ccc;
		border-radius: 4px;
		cursor: pointer;
	}
	button:hover {
		background-color: #ddd;
	}
</style>
