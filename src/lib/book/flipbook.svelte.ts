import type { PageFlip } from 'page-flip';

/**
 * Reactive wrapper around the `page-flip` library, which is imperative and
 * DOM-first: it takes over the `.page` elements, and the only way to know where
 * the book is is to ask it or listen for `flip`. This mirrors that into runes so
 * the UI can just read `currentSpread`.
 *
 * page-flip is loaded lazily inside `mount` because it touches `window` at
 * import time and would break SSR.
 */
export class Flipbook {
	currentPage = $state(0);
	totalPages = $state(0);

	#flip: PageFlip | undefined;

	/** Pages are bound in facing pairs, so a spread is two physical pages. */
	get totalSpreads(): number {
		return this.totalPages > 0 ? Math.ceil(this.totalPages / 2) : 1;
	}

	get currentSpread(): number {
		return Math.floor(this.currentPage / 2);
	}

	get canGoPrev(): boolean {
		return this.currentPage > 0;
	}

	get canGoNext(): boolean {
		return this.currentPage < this.totalPages - 1;
	}

	/** True when `page` sits in the spread currently on screen. */
	isOnSpread(page: number): boolean {
		return this.currentSpread === Math.floor(page / 2);
	}

	/**
	 * Attaches page-flip to `element`. Returns a cleanup function, so callers can
	 * hand the result straight back from `onMount`.
	 */
	mount(element: HTMLElement): () => void {
		let disposed = false;

		import('page-flip').then(({ PageFlip }) => {
			// The component may have unmounted while the chunk was in flight; a
			// PageFlip built on a detached element would leak its window listeners.
			if (disposed) return;

			const flip = new PageFlip(element, {
				width: 400,
				height: 580,
				showCover: false,
				mobileScrollSupport: false,
				usePortrait: false,
				// Already the default, but stated because the skills dial depends on
				// it: this is what stops a <button> target from starting a flip.
				clickEventForward: true
			});

			flip.loadFromHTML(element.querySelectorAll('.page'));
			flip.turnToPage(0);

			this.#flip = flip;
			this.totalPages = flip.getPageCount();
			this.currentPage = flip.getCurrentPageIndex();

			flip.on('flip', (e) => {
				this.currentPage = (e as { data: number }).data;
			});
		});

		return () => {
			disposed = true;
			this.#flip?.destroy();
			this.#flip = undefined;
		};
	}

	flipTo(page: number) {
		this.#flip?.flip(page);
	}

	next() {
		this.#flip?.flipNext();
	}

	prev() {
		this.#flip?.flipPrev();
	}
}
