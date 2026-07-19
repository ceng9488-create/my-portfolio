/**
 * Scales a fixed-size design to fit its parent.
 *
 * The book is three pixel-locked layers stacked on each other — the artwork, the
 * flipbook wrapper pinned over its pages, and page-flip's own internal geometry.
 * They only line up at one size, so instead of making each fluid we keep the
 * design at its native size and scale the whole stage as a unit.
 *
 * Writes `--book-scale` on the node for its own `transform` to consume. The node
 * keeps its native layout size — `transform` doesn't affect layout, so the
 * parent still reserves the unscaled box and must clip it.
 */
export function scaleToFit(
	node: HTMLElement,
	{ width, height, max = 1 }: { width: number; height: number; max?: number }
) {
	const parent = node.parentElement;
	if (!parent) return;

	const apply = () => {
		const { width: availableWidth, height: availableHeight } =
			parent.getBoundingClientRect();

		const scale = Math.min(availableWidth / width, availableHeight / height, max);

		node.style.setProperty('--book-scale', String(scale));
	};

	const observer = new ResizeObserver(apply);
	observer.observe(parent);
	apply();

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
