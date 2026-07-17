import type { Action } from 'svelte/action';

/**
 * Stops interactions inside a node from turning the page.
 *
 * page-flip begins a flip on mousedown/touchstart, bound on an ancestor of the
 * pages, so anything bubbling out of an interactive overlay turns the page.
 * This stops that.
 *
 * Only needed on plain elements. page-flip's `clickEventForward` setting (on by
 * default) already refuses to start a flip when the target is an <a> or
 * <button>, so buttons are exempt on their own — and must stay that way: Svelte
 * delegates `onclick` to the app root, so stopping the event here would also
 * stop their own click handlers from ever running.
 *
 * Deliberately not stopping mouseup/touchend: those are bound on `window` and
 * are what COMPLETE an in-flight flip. Swallowing them would strand a flip that
 * began outside this node and happened to release over it.
 */
export const blockFlip: Action<HTMLElement> = (node) => {
	const types = ['mousedown', 'touchstart'] as const;
	const stop = (event: Event) => event.stopPropagation();

	for (const type of types) node.addEventListener(type, stop);
	return {
		destroy() {
			for (const type of types) node.removeEventListener(type, stop);
		}
	};
};
