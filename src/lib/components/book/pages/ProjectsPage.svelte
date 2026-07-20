<script lang="ts">
	import { blockFlip } from '$lib/actions/block-flip';
	import type { SpreadSide } from '$lib/book/dial-geometry';
	import type { ProjectCarousel } from '$lib/book/carousel.svelte';
	import { projectsOutro } from '$lib/data/resume';
	import PageShell from '../PageShell.svelte';
	import SpreadTitle from '../SpreadTitle.svelte';
	import ProjectShot from '../ProjectShot.svelte';
	import { ChevronLeft, ChevronRight, ExternalLink } from '@lucide/svelte';

	/**
	 * One leaf of the projects spread: the carousel picks on the left, the picked
	 * project is written out on the right. Both leaves read the same
	 * `ProjectCarousel`, so the two halves can never disagree about what is shown.
	 */
	let { carousel, side, background }: { carousel: ProjectCarousel; side: SpreadSide; background: string } =
		$props();
</script>

<PageShell {background} cover contentTop="3rem">
	<div class="leaf">
		{#if side === 'left'}
			<SpreadTitle chapter={5} title="Projects" />

			<!-- The whole carousel is flip-proofed: the cards are plain elements, so
			     without this a drag across them turns the page instead of reading as
			     an interaction with the carousel. -->
			<div class="carousel" use:blockFlip>
				<!-- One card wide, and the track slides. The cards are all rendered so
				     the slide has something to move between; the viewport clips the rest. -->
				<div class="viewport">
					<div class="track" style="transform: translateX(-{carousel.selected * 100}%)">
						{#each carousel.projects as project, i (project.name)}
							<article
								class="card"
								class:active={i === carousel.selected}
								aria-hidden={i !== carousel.selected}
							>
								<span class="index">{String(i + 1).padStart(2, '0')}</span>
								<h3>{project.name}</h3>
								<p class="tagline">{project.tagline}</p>
								<ul class="stack">
									{#each project.stack as tech (tech)}
										<li>{tech}</li>
									{/each}
								</ul>
							</article>
						{/each}
					</div>
				</div>

				<div class="controls">
					<button type="button" onclick={() => carousel.prev()} aria-label="Previous project">
						<ChevronLeft size={16} aria-hidden="true" />
					</button>

					<div class="dots" role="tablist" aria-label="Projects">
						{#each carousel.projects as project, i (project.name)}
							<button
								type="button"
								role="tab"
								class="dot"
								class:on={i === carousel.selected}
								aria-selected={i === carousel.selected}
								aria-label={project.name}
								onclick={() => carousel.select(i)}
							></button>
						{/each}
					</div>

					<button type="button" onclick={() => carousel.next()} aria-label="Next project">
						<ChevronRight size={16} aria-hidden="true" />
					</button>
				</div>
			</div>

			<p class="outro">{projectsOutro}</p>
		{:else}
			{@const project = carousel.current}
			<SpreadTitle title={project.name} />

			<ProjectShot {project} index={carousel.selected} />

			<p class="description">{project.description}</p>

			{#if project.href}
				<a class="repo" href={project.href} target="_blank" rel="noreferrer">
					<ExternalLink size={14} aria-hidden="true" />
					<span>View the repository</span>
				</a>
			{/if}
		{/if}
	</div>
</PageShell>

<style>
	.leaf {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 20rem;
	}

	/* --- left leaf: the carousel --- */

	.viewport {
		overflow: hidden;
		/* The cards are the drag target now that flips are blocked here, so the
		   cursor should stop advertising a page turn. */
		cursor: default;
	}

	.track {
		display: flex;
		transition: transform 0.45s cubic-bezier(0.33, 1, 0.68, 1);
	}

	@media (prefers-reduced-motion: reduce) {
		.track {
			transition-duration: 0.01ms;
		}
	}

	/* Each card is exactly one viewport wide, which is what makes the track's
	   `translateX(-n * 100%)` land on card n. */
	.card {
		flex: 0 0 100%;
		box-sizing: border-box;
		padding: 1rem 0.9rem 1.1rem;
		border: 1px solid color-mix(in srgb, var(--book-accent-deep) 30%, transparent);
		border-radius: 0.6rem;
		background: color-mix(in srgb, var(--book-parchment) 55%, transparent);
		/* Off-slide cards fade rather than vanish, so the slide reads as movement
		   between two things rather than a swap. */
		opacity: 0.35;
		transition: opacity 0.45s ease;
	}

	.card.active {
		opacity: 1;
	}

	.index {
		font-size: 0.7rem;
		letter-spacing: 0.18em;
		color: var(--book-accent);
		opacity: 0.7;
	}

	.card h3 {
		margin: 0.2rem 0 0;
		font-size: 1.05rem;
		font-weight: 700;
		color: var(--book-accent-deep);
	}

	.tagline {
		font-size: 0.85rem;
		line-height: 1.4;
		margin: 0.25rem 0 0;
		color: var(--book-ink-soft);
	}

	.stack {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem;
		margin: 0.7rem 0 0;
		list-style: none;
		padding: 0;
	}

	.stack li {
		padding: 0.1rem 0.45rem;
		border: 1px solid color-mix(in srgb, var(--book-accent-deep) 25%, transparent);
		border-radius: 999px;
		font-size: 0.7rem;
		color: var(--book-accent-deep);
	}

	.controls {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.9rem;
		margin-top: 0.9rem;
	}

	.controls button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.25rem;
		border: 1px solid color-mix(in srgb, var(--book-accent-deep) 30%, transparent);
		border-radius: 999px;
		background: none;
		color: var(--book-accent-deep);
		cursor: pointer;
		transition: background-color 0.15s ease;
	}

	.controls button:hover {
		background: var(--book-accent-wash);
	}

	.dots {
		display: flex;
		gap: 0.4rem;
	}

	.dot {
		width: 7px;
		height: 7px;
		padding: 0;
		border-radius: 999px;
		border: 1px solid var(--book-accent-deep);
		background: none;
		opacity: 0.45;
		transition:
			opacity 0.15s ease,
			background-color 0.15s ease;
	}

	.dot.on {
		background: var(--book-accent-deep);
		opacity: 1;
	}

	.outro {
		margin-top: 1.4rem;
		font-size: 0.8rem;
		font-style: italic;
		text-align: center;
		opacity: 0.6;
	}

	/* --- right leaf: the detail --- */

	.description {
		font-size: 0.9rem;
		line-height: 1.6;
		margin-top: 1rem;
	}

	.repo {
		display: inline-flex;
		align-self: flex-start;
		align-items: center;
		gap: 0.4rem;
		margin-top: 1rem;
		padding: 0.35rem 0.7rem;
		border: 1px solid color-mix(in srgb, var(--book-accent-deep) 35%, transparent);
		border-radius: 999px;
		font-size: 0.85rem;
		color: var(--book-accent-deep);
		text-decoration: none;
		transition:
			background-color 0.15s ease,
			border-color 0.15s ease;
	}

	.repo:hover {
		background: var(--book-accent-wash);
		border-color: var(--book-accent-deep);
	}
</style>
