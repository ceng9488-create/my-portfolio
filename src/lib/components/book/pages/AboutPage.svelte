<script lang="ts">
	import { about } from '$lib/data/resume';
	import PageShell from '../PageShell.svelte';
</script>

<PageShell background="page2.png">
	<div class="max-w-80">
		<h2 class="page-heading">{about.title}</h2>
		<p class="pt-8">{about.body}</p>
	</div>
</PageShell>
