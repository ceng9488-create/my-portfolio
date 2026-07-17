<script lang="ts">
	import { onMount } from 'svelte';
	import '$lib/styles/book.css';

	import { Dial } from '$lib/book/dial.svelte';
	import { Flipbook } from '$lib/book/flipbook.svelte';
	import { chapters, closing, education, experience } from '$lib/data/resume';
	import { timeline } from '$lib/data/timeline';

	import BookPagination from './book/BookPagination.svelte';
	import ChapterMenu from './book/ChapterMenu.svelte';
	import PageShell from './book/PageShell.svelte';
	import AboutPage from './book/pages/AboutPage.svelte';
	import ContactPage from './book/pages/ContactPage.svelte';
	import ContentsPage from './book/pages/ContentsPage.svelte';
	import EntryPage from './book/pages/EntryPage.svelte';
	import ProjectsPage from './book/pages/ProjectsPage.svelte';
	import SkillsPage from './book/pages/SkillsPage.svelte';

	let bookEl: HTMLDivElement;

	const book = new Flipbook();

	// One Dial for both halves of the skills spread: they draw the same dial from
	// opposite edges and must stay in lockstep across the gutter.
	const dial = new Dial(timeline);

	onMount(() => book.mount(bookEl));
</script>

<div class="book-container">
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
			<!-- 4 --><EntryPage entry={experience} background="page2.png" />
			<!-- 5 --><EntryPage entry={education} background="page3.png" />
			<!-- 6 --><ProjectsPage />
			<!-- 7 --><ContactPage />

			<!-- 8 — Closing -->
			<PageShell background="page3.png" contentTop="18rem">
				<div class="max-w-80">
					<p class="text-center">{closing}</p>
				</div>
			</PageShell>

			<!-- 9 — Blank, so the page count stays even and no half-spread is left. -->
			<PageShell background="page3.png" />
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

<style>
	.book-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
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
