<script lang="ts">
	import { messages } from '#lib/i18n/messages.ts';
</script>

<svelte:head>
	<title>{messages.home.title}</title>
</svelte:head>

<main>
	<h1>{messages.app.name}</h1>
	<p>{messages.app.tagline}</p>
	<p>{messages.home.soon}</p>
</main>
