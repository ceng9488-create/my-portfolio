<script lang="ts">
	import type { SpreadSide } from '$lib/book/dial-geometry';
	import { experience } from '$lib/data/resume';
	import PageShell from '../PageShell.svelte';

	/**
	 * One leaf of the experience spread. The roles run most-recent-first across
	 * both leaves; each leaf takes its half. Only the left leaf carries the title —
	 * centred on the spread, it would otherwise print twice.
	 */
	let { side, background }: { side: SpreadSide; background: string } = $props();

	const half = Math.ceil(experience.roles.length / 2);
	let roles = $derived(side === 'left' ? experience.roles.slice(0, half) : experience.roles.slice(half));
</script>

<PageShell {background} cover contentTop={side === 'left' ? '4rem' : '3rem'}>
	<div class="max-w-80">
		{#if side === 'left'}
			<h2 class="spread-title">{experience.title}</h2>
		{/if}
		{#each roles as role (role.title + role.period)}
			<section class="role-block">
				<p class="role">{role.title}</p>
				<p class="period">{role.period}</p>
				<ul>
					{#each role.points as point (point)}
						<li>{point}</li>
					{/each}
				</ul>
			</section>
		{/each}
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

	.role-block + .role-block {
		margin-top: 1.1rem;
	}

	.role {
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--book-accent);
		margin: 0;
	}

	.period {
		font-size: 0.8rem;
		color: var(--book-ink-muted);
		margin: 0 0 0.3rem;
	}

	.role-block :global(li) {
		font-size: 0.85rem;
		line-height: 1.4;
	}
</style>
