<script lang="ts">
	import { cn } from '../../utils/cn';
	import { onMount } from 'svelte';

	import HomeIcon from '../icons/IconamoonSignDivisionSlashLight.svelte';
	import DesignIcon from '../icons/IconoirDesignNib.svelte';
	import BlogIcon from '../icons/HugeiconsQuillWrite01.svelte';
	import GithubIcon from '../icons/IconoirGithub.svelte';

	let currentPath = $state('');

	onMount(() => {
		currentPath = window.location.pathname;
	});

	const linkClass: string = `nav-button relative flex items-center justify-center gap-x-2 rounded-md border border-transparent
		px-2.5 py-2.5 text-sm leading-none tracking-tight text-zinc-500 hover:border-zinc-200/50
		hover:bg-zinc-100/80 hover:text-black md:text-base`;
</script>

<a
	href="/"
	aria-label="Home"
	data-text="Home"
	class={cn(linkClass, currentPath === '/' ? 'text-black' : '')}
	><HomeIcon className="size-6 md:size-5"></HomeIcon>
</a>
<a
	href="/design"
	aria-label="Design"
	data-text="Design"
	class={cn(linkClass, currentPath === '/design' ? 'text-black' : '')}
	><DesignIcon className="size-6 md:size-5"></DesignIcon>
</a>
<a
	href="/blog"
	aria-label="Blog"
	data-text="Blog"
	class={cn(linkClass, currentPath === '/blog' ? 'text-black' : '')}
	><BlogIcon className="size-6 md:size-5"></BlogIcon>
</a>
<a
	href="https://github.com/frsswq"
	aria-label="Github"
	data-text="Github"
	target="_blank"
	class={linkClass}
>
	<GithubIcon className="size-6 md:size-5"></GithubIcon>
</a>

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
