<script lang="ts">
	import { onMount } from 'svelte';
	import '$lib/styles/book.css';

	import { scaleToFit } from '$lib/actions/scale-to-fit';
	import { Dial } from '$lib/book/dial.svelte';
	import { Flipbook } from '$lib/book/flipbook.svelte';
	import { chapters } from '$lib/data/resume';
	import { timeline } from '$lib/data/timeline';

	import BookLoader from './book/BookLoader.svelte';
	import BookPagination from './book/BookPagination.svelte';
	import ChapterMenu from './book/ChapterMenu.svelte';
	import AboutPage from './book/pages/AboutPage.svelte';
	import ContactPage from './book/pages/ContactPage.svelte';
	import ContentsPage from './book/pages/ContentsPage.svelte';
	import EducationPage from './book/pages/EducationPage.svelte';
	import ExperiencePage from './book/pages/ExperiencePage.svelte';
	import ProjectsPage from './book/pages/ProjectsPage.svelte';
	import SkillsPage from './book/pages/SkillsPage.svelte';

	let bookEl: HTMLDivElement;

	// Every texture the first paint depends on. The loader holds until these are
	// decoded, so the book is never shown mid-download.
	const assets = [
		'/images/book.png',
		'/images/page2.png',
		'/images/page4.png',
		'/images/leftPage.png'
	];

	let ready = $state(false);

	const book = new Flipbook();

	// One Dial for both halves of the skills spread: they draw the same dial from
	// opposite edges and must stay in lockstep across the gutter.
	const dial = new Dial(timeline);

	onMount(() => book.mount(bookEl));
</script>

<BookLoader {assets} onReady={() => (ready = true)} />

<div class="book-viewport" class:ready>
	<!--
		The stage stays at its native 1000x700 and is scaled as one piece. Nothing
		inside it should be sized against the viewport, or it will drift out of
		register with the artwork underneath.
	-->
	<div class="book-container book-stage" use:scaleToFit={{ width: 1000, height: 700 }}>
		<a href="/" class="home-btn">&#8592; Main page</a>

		<img src="/images/book.png" alt="" class="book-image" />

		<ChapterMenu
			{chapters}
			isActive={(page) => book.isOnSpread(page)}
			onSelect={(p) => book.flipTo(p)}
		/>

	<!--
		Page order IS the book: page-flip binds these in source order, and the
		`page` numbers in `chapters` index into this list. Adding or reordering a
		page means updating those too.
	-->
		<div class="flipbook-wrapper font-spectral text-black">
			<div bind:this={bookEl}>
				<!-- 0 --><ContentsPage {chapters} onSelect={(p) => book.flipTo(p)} />
				<!-- 1 --><AboutPage />
				<!-- 2 --><SkillsPage {dial} side="left" background="page2.png" />
				<!-- 3 --><SkillsPage {dial} side="right" background="page4.png" />
				<!-- 4 --><ExperiencePage side="left" background="page2.png" />
				<!-- 5 --><ExperiencePage side="right" background="page4.png" />
				<!-- 6 --><EducationPage side="left" background="page2.png" />
				<!-- 7 --><EducationPage side="right" background="page4.png" />
				<!-- 8 --><ProjectsPage />
				<!-- 9 --><ContactPage />
			</div>
		</div>

		<BookPagination
			totalSpreads={book.totalSpreads}
			currentSpread={book.currentSpread}
			canGoPrev={book.canGoPrev}
			canGoNext={book.canGoNext}
			onPrev={() => book.prev()}
			onNext={() => book.next()}
		/>
	</div>
</div>

<style>
	/* The viewport owns the entrance animation; the stage owns the fit scale.
	   They're separate elements because both need `transform` and a single
	   element can only have one. */
	.book-viewport {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100dvh;
		/* The stage reserves its unscaled 1000x700 no matter how far it's scaled
		   down, so the overflow has to be clipped here. */
		overflow: hidden;
		/* Settles in behind the loader as it fades, so the book appears to be
		   handed over rather than swapped. */
		opacity: 0;
		transform: scale(0.94) translateY(12px);
		transition:
			opacity 0.7s ease-out,
			transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.book-viewport.ready {
		opacity: 1;
		transform: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.book-viewport {
			transform: none;
			transition-duration: 0.01ms;
		}
	}

	/* Native design size, never fluid — `--book-scale` does all the adapting. */
	.book-stage {
		position: relative;
		flex: none;
		width: 1000px;
		height: 700px;
		transform: scale(var(--book-scale, 1));
		transform-origin: center;
	}

	.home-btn {
		position: absolute;
		top: -20px;
		left: 50px;
		z-index: 10;
		padding: 0.4rem 0.9rem;
		border: 1px solid var(--book-accent);
		border-radius: 999px;
		color: #ffffff;
		font-size: 0.9rem;
		line-height: 1;
		text-decoration: none;
		transition: background 0.2s ease;
	}

	.home-btn:hover {
		background: var(--book-accent-wash);
	}

	@media (prefers-reduced-motion: reduce) {
		.home-btn {
			transition-duration: 0.01ms;
		}
	}

	.book-image {
		width: 1000px;
		height: 700px;
		max-width: 100%;
	}

	.flipbook-wrapper {
		position: absolute;
		top: 48%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 800px;
		height: 580px;
		overflow: hidden;
	}
</style>
