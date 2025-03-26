<button popovertarget="info" class="top-parent cursor-pointer">
	<div class="parent parent-1 z-3">
		<div class="folder folder-1 bg-amber-200 leading-none tracking-tight"></div>
	</div>
	<div class="top-tab bg-amber-200"></div>
	<div class="bottom-tab bg-amber-200"></div>
	<div class="box bg-gradient-to-b from-amber-300 to-amber-400"></div>
	<p
		class="folder-text pb-2.5 pl-3 text-xl leading-none font-semibold tracking-tight text-yellow-600 md:pb-4
			md:pl-4.5 md:text-3xl"
	>
		Archive
	</p>
</button>

<div
	popover
	id="info"
	class="size-fit rounded-lg border border-zinc-200 bg-zinc-50/80 py-1.5 pr-2 pl-2.5 text-center text-xs
		leading-none tracking-tight text-black tabular-nums md:text-sm"
>
	Last Modified:
	<span
		class="ml-0.5 inline-block rounded-md border border-zinc-200/80 bg-white px-1.5 py-1 leading-none
			font-medium tracking-tighter">18/03/2025</span
	>
</div>

<svg
	style="visibility: hidden; position: absolute;"
	width="0"
	height="0"
	xmlns="http://www.w3.org/2000/svg"
	version="1.1"
>
	<defs>
		<filter id="goo"
			><feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
			<feColorMatrix
				in="blur"
				mode="matrix"
				values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
				result="goo"
			/>
			<feComposite in="SourceGraphic" in2="goo" operator="atop" />
		</filter>
	</defs>
</svg>

<style>
	:root {
		--folder-width: 300px;
		--folder-height: 250px;
		--folder-width-mobile: 250px;
		--folder-height-mobile: 200px;
	}

	.folder-1,
	.parent-1 {
		clip-path: polygon(10% 0, 27.5% 0, 40% 15%, 0 15%);
	}

	.folder {
		position: absolute;
		top: 0;
		left: 0;
		cursor: pointer;
	}

	.parent {
		position: absolute;
		top: 0;
		left: 0;
		filter: url('#goo');
		overflow: hidden;
	}

	.top-parent {
		position: relative;
		anchor-name: --top-parent;
	}

	@supports not (position-anchor: --top-parent) {
		#info {
			display: none;
		}
	}

	@supports (position-anchor: --top-parent) {
		#info {
			position: absolute;
			inset: unset;
			top: anchor(bottom);
			left: anchor(center);
			position-anchor: --top-parent;
			position-try-fallbacks: flip-block;
			margin-block-start: 0.75rem;
			translate: -50%;
			animation: scale-out 0.15s forwards;

			&:popover-open {
				animation: scale-in 0.15s forwards;
			}
		}
	}

	.bottom-tab {
		position: absolute;
		left: 0;
		top: 0;
		clip-path: inset(7.5% 0 75% 5% round 0rem 1rem 0rem 0rem);
		z-index: 9;
	}

	.top-tab {
		position: absolute;
		left: 0;
		top: 0;
		clip-path: inset(0% 85% 75% 0 round 1rem 0rem 0rem 0rem);
		z-index: 9;
	}

	.box {
		position: absolute;
		left: 0;
		top: 0;
		clip-path: inset(12.5% 0 0 0 round 1.25rem 1.25rem 1.25rem 1.25rem);
		z-index: 10;
	}

	.folder-text {
		position: absolute;
		left: 0.5rem;
		bottom: 0.5rem;
		z-index: 11;
	}

	.parent,
	.top-parent,
	.box,
	.bottom-tab,
	.top-tab,
	.folder {
		width: var(--folder-width);
		height: var(--folder-height);

		@media (width < 48rem) {
			width: var(--folder-width-mobile);
			height: var(--folder-height-mobile);
		}

		&:focus-visible {
			outline: none;
		}
	}

	@keyframes scale-in {
		from {
			opacity: 0;
			transform: rotateX(-10deg) scale(0.9);
		}
		to {
			opacity: 1;
			transform: rotateX(0deg) scale(1);
		}
	}

	@keyframes scale-out {
		from {
			opacity: 1;
			transform: rotateX(0deg) scale(1);
		}
		to {
			opacity: 0;
			transform: rotateX(-10deg) scale(0.95);
		}
	}
</style>
