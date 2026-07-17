<script lang="ts">
	import type { ResumeEntry } from '$lib/data/resume';
	import PageShell from '../PageShell.svelte';

	/** A titled page with one role, a date range, and bullets — Experience and
	 * Education are the same page with different words in it. */
	let { entry, background }: { entry: ResumeEntry; background: string } = $props();
</script>

<PageShell {background} cover contentTop="3rem">
	<div class="max-w-80">
		<h2 class="page-title">{entry.title}</h2>
		<p class="role">{entry.role}</p>
		<p class="period">{entry.period}</p>
		<ul>
			{#each entry.points as point (point)}
				<li>{point}</li>
			{/each}
		</ul>
	</div>
</PageShell>

<style>
	.role {
		font-size: 1rem;
		font-weight: 600;
		color: var(--book-accent);
		margin: 0;
	}

	.period {
		font-size: 0.875rem;
		color: var(--book-ink-muted);
		margin: 0 0 0.6rem;
	}
</style>
