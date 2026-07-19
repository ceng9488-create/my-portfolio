<script lang="ts">
	import {
		siJavascript,
		siHtml5,
		siCss,
		siNodedotjs,
		siReact,
		siOpenjdk,
		siSvelte,
		siTypescript,
		siMysql
	} from 'simple-icons';
	import { blockFlip } from '$lib/actions/block-flip';
	import type { Dial } from '$lib/book/dial.svelte';
	import type { SimpleIcon } from '$lib/data/timeline';

	
	type Tile = { label: string; area: string; icon: SimpleIcon; matches?: string[] };

	/** `debug` outlines every cell of the 3x4 so empty slots show while placing tiles. */
	let { dial, debug = false }: { dial: Dial; debug?: boolean } = $props();

	// Rebuilt as the dial turns; a Set so each tile is one lookup, not a scan.
	const focal = $derived(new Set(dial.skills.map((skill) => skill.name)));

	const COLUMNS = 3;
	const ROWS = 4;
	const cells = Array.from({ length: COLUMNS * ROWS }, (_, i) => ({
		row: Math.floor(i / COLUMNS) + 1,
		column: (i % COLUMNS) + 1
	}));

	const tiles: Tile[] = [
		{ label: 'JS', area: '1 / 1 / 3 / 2', icon: siJavascript },
		{ label: 'HTML', area: '1 / 2 / 2 / 3', icon: siHtml5 },
		{ label: 'CSS', area: '2 / 2 / 3 / 3', icon: siCss, matches: ['Tailwind CSS'] },
		{ label: 'NodeJS', area: '1 / 3 / 3 / 4', icon: siNodedotjs, matches: ['Node.js'] },
		{ label: 'React', area: '3 / 1 / 4 / 3', icon: siReact, matches: ['React'] },
		// No Java brand mark in simple-icons; OpenJDK is the closest official one.
		{ label: 'Java', area: '3 / 3 / 4 / 4', icon: siOpenjdk, matches: ['Java 8'] },
		{ label: 'Svelte', area: '4 / 1 / 5 / 2', icon: siSvelte, matches: ['Svelte', 'SvelteKit'] },
		{ label: 'TS', area: '4 / 2 / 5 / 3', icon: siTypescript, matches: ['TypeScript'] },
		{ label: 'MySQL', area: '4 / 3 / 5 / 4', icon: siMysql, matches: ['MySQL'] }
	];

	const isLit = (tile: Tile) => tile.matches?.some((name) => focal.has(name)) ?? false;
</script>

<div class="sk-grid" use:blockFlip>
	{#if debug}
		{#each cells as cell (`${cell.row}-${cell.column}`)}
			<div class="sk-cell" style="grid-row: {cell.row}; grid-column: {cell.column};"></div>
		{/each}
	{/if}
	{#each tiles as tile (tile.label)}
		<div class="sk-tile" class:is-lit={isLit(tile)} style="grid-area: {tile.area};">
			<!-- `currentColor`, not the brand hex: the tile inverts when lit, and the
			     mark has to invert with it. -->
			<svg class="sk-logo" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
				<path d={tile.icon.path} />
			</svg>
			<span>{tile.label}</span>
		</div>
	{/each}
</div>

<style>
	/* Sits under the title and stops well clear of the dial arc, which rises
	   ~290px from the spine-bottom corner. */
	.sk-grid {
		position: absolute;
		top: 7rem;
		left: 1.2rem;
		right: 1.2rem;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(4, 34px);
		gap: 6px;
		/* Narrower than the leaf, centred in what's left of it. */
		max-width: 300px;
		margin-inline: auto;
	}

	/* Behind the tiles, so a placed tile hides its own cell outline. */
	.sk-cell {
		/* border: 1px dashed rgba(139, 94, 60, 0.45); */
		border-radius: 6px;
	}

	.sk-tile {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.35rem;
		border: 1px solid var(--book-accent);
		border-radius: 6px;
		/* background: var(--book-parchment);
		color: var(--book-accent-deep); */
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		transition:
			background 0.3s ease,
			border-color 0.3s ease,
			color 0.3s ease,
			box-shadow 0.3s ease;
	}

	.sk-logo {
		width: 14px;
		height: 14px;
		flex-shrink: 0;
	}

	/* Lit while the focal year on the dial includes this stack. Same accent fill
	   and halo as the selected dot, so the two read as one selection. */
	.sk-tile.is-lit {
		border-color: var(--book-accent-deep);
		background: var(--book-accent);
		color: var(--book-parchment);
		box-shadow: 0 0 0 3px rgba(139, 94, 60, 0.25);
	}

	@media (prefers-reduced-motion: reduce) {
		.sk-tile {
			transition-duration: 0.01ms;
		}
	}
</style>
