<script lang="ts">
	import { projects } from '$lib/data/resume';
	import PageShell from '../PageShell.svelte';
</script>

<PageShell background="page7.png" cover contentTop="3rem">
	<div class="max-w-80">
		<h2 class="page-title">Projects</h2>
		{#each projects as project (project.name)}
			<div class="project">
				<p>{project.name}</p>
				<p>{project.description}</p>
			</div>
		{/each}
	</div>
</PageShell>

<style>
	/* Was a hand-applied `mt-4` on every project but the first. */
	.project + .project {
		margin-top: 1rem;
	}
</style>
