<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { messages } from '#lib/i18n/messages.ts';
</script>

<svelte:head>
	<title>{messages.error.title}</title>
</svelte:head>

<main>
	<h1>{messages.error.title}</h1>
	<p>{page.status === 404 ? messages.error.notFound : messages.error.unexpected}</p>
	<p><a href={resolve('/')}>{messages.error.home}</a></p>
</main>
