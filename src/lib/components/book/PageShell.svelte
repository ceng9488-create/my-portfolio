<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * One leaf of the book: the `.page` element page-flip binds to, plus its
	 * parchment backdrop.
	 *
	 * The root element must keep the bare `page` class and stay a direct child of
	 * the element Flipbook mounts — that is what `loadFromHTML` collects, and what
	 * fixes this page's position in the sequence.
	 */
	type Props = {
		/** File under /images, e.g. `page2.png`. */
		background: string;
		/**
		 * Scales the artwork to fill the leaf. Off by default: the pages whose art
		 * is already sized to the leaf are laid out against its natural size, and
		 * covering them shifts the blank band the text sits in.
		 */
		cover?: boolean;
		/** Overrides the default top padding for pages whose art needs the room. */
		contentTop?: string;
		/** Extra classes for the inner `.page-content`. */
		contentClass?: string;
		children?: Snippet;
	};

	let { background, cover = false, contentTop, contentClass = '', children }: Props = $props();

	let style = $derived(
		[
			`background-image: url('/images/${background}')`,
			cover ? 'background-size: cover; background-position: center' : '',
			contentTop ? `--content-top: ${contentTop}` : ''
		]
			.filter(Boolean)
			.join('; ')
	);
</script>

<div class="page">
	<div class="page-content {contentClass}" {style}>
		{@render children?.()}
	</div>
</div>
