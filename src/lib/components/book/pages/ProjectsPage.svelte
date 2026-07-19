<script lang="ts">
	import { projects, projectsOutro } from '$lib/data/resume';
	import PageShell from '../PageShell.svelte';
</script>

<PageShell background="page7.png" cover contentTop="3rem">
	<div class="max-w-80">
		<h2 class="spread-title">Projects</h2>
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
	.spread-title {
		font-size: 1.25rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		margin: 0 0 1.2rem;
		text-align: center;
		color: var(--book-accent-deep);
	}
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
