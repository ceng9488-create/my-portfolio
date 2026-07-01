declare module 'page-flip' {
	export interface PageFlipOptions {
		width: number;
		height: number;
		size?: 'fixed' | 'stretch';
		minWidth?: number;
		maxWidth?: number;
		minHeight?: number;
		maxHeight?: number;
		drawShadow?: boolean;
		flippingTime?: number;
		usePortrait?: boolean;
		startZIndex?: number;
		autoSize?: boolean;
		maxShadowOpacity?: number;
		showCover?: boolean;
		mobileScrollSupport?: boolean;
		swipeDistance?: number;
		clickEventForward?: boolean;
		useMouseEvents?: boolean;
		startPage?: number;
	}

	export class PageFlip {
		constructor(element: HTMLElement, options: PageFlipOptions);
		loadFromHTML(items: NodeListOf<Element> | HTMLElement[]): void;
		loadFromImages(urls: string[]): void;
		destroy(): void;
		flipNext(corner?: 'top' | 'bottom'): void;
		flipPrev(corner?: 'top' | 'bottom'): void;
		flip(pageNum: number, corner?: 'top' | 'bottom'): void;
		getCurrentPageIndex(): number;
		getPageCount(): number;
		on(event: string, callback: (e: unknown) => void): void;
	}
}
