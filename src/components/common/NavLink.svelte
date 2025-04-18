<script lang="ts">
	import { cn } from '@utils/cn';
	import { onMount, type Component } from 'svelte';

	let currentPath = $state('');

	onMount(() => {
		currentPath = window.location.pathname;
	});
</script>

<!-- {@render NavLink('/', 'Home', '_self', HomeIcon)}
{@render NavLink('/design', 'Design', '_self', DesignIcon)}
{@render NavLink('/blog', 'Blog', '_self', BlogIcon)}
{@render NavLink('https://github.com/frsswq', 'Github', '_blank', GithubIcon)} -->

{#snippet NavLink(href: string, label: string, target: string = '_self', Icon: Component)}
	<a
		{href}
		aria-label={label}
		data-text={label}
		{target}
		class={cn(
			`nav-button relative flex items-center justify-center gap-x-2 rounded-md border border-transparent
			px-2.5 py-2.5 text-sm leading-none tracking-tight text-zinc-500 hover:border-zinc-200/50
			hover:bg-zinc-100/80 hover:text-black md:text-base`,
			target === '_self' && currentPath === href ? 'text-black' : ''
		)}
	>
		<Icon className="size-6 md:size-5"></Icon>
	</a>
{/snippet}

<style>
	.nav-button::before {
		display: none;
		content: attr(data-text);
		position: absolute;
		transform: translateY(-50%);
		top: 110%;
		animation: scale-in 0.2s forwards;

		font-size: 0.875rem;
		padding: 0.5rem 0.6rem 0.5rem 0.5rem;
		background-color: var(--color-zinc-50);
		border: 0.5px solid var(--color-zinc-200);
		border-radius: 0.25rem;
	}

	.nav-button:hover::before {
		display: block;
	}

	@keyframes scale-in {
		0% {
			opacity: 0;
			transform: rotateX(-10deg) scale(0.9);
		}
		100% {
			opacity: 1;
			transform: rotateX(0deg) scale(1);
		}
	}
</style>
