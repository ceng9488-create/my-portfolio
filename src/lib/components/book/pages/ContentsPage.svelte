<script lang="ts">
	import type { Chapter } from '$lib/data/resume';
	import PageShell from '../PageShell.svelte';

	let { chapters, onSelect }: { chapters: Chapter[]; onSelect: (page: number) => void } = $props();
</script>

<PageShell background="page6.png">
	<div class="toc-block">
		<h2 class="page-heading">Contents</h2>
		<ul class="toc-list">
			{#each chapters as chapter (chapter.page)}
				<li>
					<button class="toc-entry" onclick={() => onSelect(chapter.page)}>
						<span>{chapter.label}</span>
						<span class="toc-leader"></span>
						<!-- Printed page numbers are 1-based; `page` is a 0-based index. -->
						<span class="toc-page">{chapter.page + 1}</span>
					</button>
				</li>
			{/each}
		</ul>
	</div>
</PageShell>

<style>
	.toc-block {
		width: 100%;
		max-width: 16rem;
		margin: 0 auto;
	}

	.toc-list {
		list-style: none;
		padding-top: 50px;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
	}

	.toc-entry {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		width: 100%;
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		color: var(--book-ink-soft);
		font: inherit;
		font-size: 0.95rem;
		letter-spacing: 0.02em;
		text-align: left;
		transition: color 0.2s ease;
	}

	.toc-entry:hover {
		color: var(--book-accent);
	}

	.toc-leader {
		flex: 1;
		border-bottom: 1px dotted var(--book-accent-soft);
		transform: translateY(-0.25rem);
	}

	.toc-page {
		font-variant-numeric: tabular-nums;
		color: var(--book-accent);
	}
</style>
