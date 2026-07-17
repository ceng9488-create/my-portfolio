<script lang="ts">
	import { contact } from '$lib/data/resume';
	import PageShell from '../PageShell.svelte';
</script>

<PageShell background="page5.png" cover contentTop="3rem">
	<div class="max-w-80">
		<h2 class="page-title">{contact.title}</h2>
		<p>{contact.blurb}</p>
		<ul class="mt-4">
			{#each contact.links as link (link)}
				<li>{link}</li>
			{/each}
		</ul>
	</div>
</PageShell>
