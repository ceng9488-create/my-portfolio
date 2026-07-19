<script lang="ts">
	import { projects, projectsOutro } from '$lib/data/resume';
	import PageShell from '../PageShell.svelte';
	import SpreadTitle from '../SpreadTitle.svelte';
</script>

<PageShell background="page7.png" cover contentTop="3rem">
	<div class="max-w-80">
		<SpreadTitle chapter={5} title="Projects" />
		{#each projects as project (project.name)}
			<div class="project">
				{#if project.href}
					<a href={project.href} target="_blank" rel="noreferrer">{project.name}</a>
				{:else}
					<p>{project.name}</p>
				{/if}
				<p>{project.description}</p>
			</div>
		{/each}
		<p class="outro">{projectsOutro}</p>
	</div>
</PageShell>

<style>
	/* Was a hand-applied `mt-4` on every project but the first. */
	.project + .project {
		margin-top: 1rem;
	}

	.project a {
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.outro {
		margin-top: 1.5rem;
		font-style: italic;
		opacity: 0.7;
	}
</style>
