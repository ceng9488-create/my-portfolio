<script lang="ts">
	import type { SpreadSide } from '$lib/book/dial-geometry';
	import { education } from '$lib/data/resume';
	import PageShell from '../PageShell.svelte';

	/**
	 * One leaf of the education spread: degrees on the left, certificates on the
	 * right. Each leaf owns a whole list rather than half of one, so adding a
	 * certificate can never orphan a degree across the gutter.
	 */
	let { side, background }: { side: SpreadSide; background: string } = $props();
</script>

<PageShell {background} cover contentTop={side === 'left' ? '4rem' : '3rem'}>
	<div class="max-w-80">
		{#if side === 'left'}
			<h2 class="spread-title">{education.title}</h2>
			{#each education.schools as school (school.institution + school.period)}
				<section class="entry">
					<p class="headline">{school.institution}</p>
					<p class="detail">{school.qualification}</p>
					<p class="meta">{school.period}</p>
				</section>
			{/each}
		{:else}
			<h2 class="spread-title">{education.certificationsTitle}</h2>
			{#each education.certifications as cert (cert.name)}
				<section class="entry cert">
					<p class="headline">
						{#if cert.url}
							<a href={cert.url} target="_blank" rel="noopener noreferrer">{cert.name}</a>
						{:else}
							{cert.name}
						{/if}
					</p>
					<p class="meta">{cert.issuer} · {cert.issued}</p>
				</section>
			{/each}
		{/if}
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

	.entry + .entry {
		margin-top: 1.1rem;
	}

	.headline {
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--book-accent);
		margin: 0;
	}

	.detail {
		font-size: 0.85rem;
		line-height: 1.4;
		margin: 0.15rem 0 0;
	}

	.meta {
		font-size: 0.8rem;
		color: var(--book-ink-muted);
		margin: 0.15rem 0 0;
	}

	/* Five certificates share one leaf, so their rows sit tighter than the
	   degrees opposite and drop the qualification line entirely. */
	.cert + .cert {
		margin-top: 0.7rem;
	}

	.cert .headline {
		font-size: 0.9rem;
		line-height: 1.3;
	}

	.headline a {
		color: inherit;
		text-decoration: underline;
		text-underline-offset: 0.15em;
	}
</style>
