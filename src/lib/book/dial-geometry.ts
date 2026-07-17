/**
 * Pure geometry for the skills dial. No DOM, no state — every export here is a
 * function of its arguments, so the maths can be reasoned about (and tested)
 * without mounting a book.
 *
 * The dial is a half circle standing on the bottom edge, centred on the spine.
 * Each page draws one quarter, so every radius is measured from the
 * spine-bottom corner and 90° is the apex.
 */

export const ARC_RADIUS = 200;

// Clearance stacks outward: the 18px dot sits on the arc, the year label clears
// it, and the panel clears the enlarged focal year.
export const YEAR_RADIUS = ARC_RADIUS + 38;
export const PANEL_RADIUS = ARC_RADIUS + 92;

/**
 * Where the selected year comes to rest. 90° is the apex — which is exactly the
 * spine, so the focal year and its chips are split down the gutter (each page
 * renders half; they rejoin in the open spread). Drop this to ~60 to park the
 * focus on the right page instead and avoid the gutter entirely.
 */
export const FOCAL_ANGLE = 90;

/** Which half of the spread a marker is being placed on. */
export type SpreadSide = 'left' | 'right';

/**
 * The years occupy a FULL circle, evenly spaced — that is what makes the dial
 * wrap: past the last year the next one has simply come back around. Only the
 * top half is on the page, so the rest wait below the bottom edge (clipped by
 * `.page`) and rotate up into view. Add more years and they pack closer
 * together; the dial re-spaces itself.
 */
export function stepAngle(count: number): number {
	return 360 / count;
}

/**
 * Signed number of steps from `from` to `to`, taking the short way round: the
 * result is always within half a turn, so no hop ever scrambles the long way.
 */
export function shortestDelta(from: number, to: number, count: number): number {
	const delta = (((to - from) % count) + count) % count; // 0 … count-1
	return delta > count / 2 ? delta - count : delta; // → -count/2 … count/2
}

/**
 * Rotation of an entry's spoke, in CSS degrees (clockwise from straight up).
 * The spoke pivots on the spine-bottom corner, so both pages agree on where a
 * year is; whatever overhangs the spine is clipped by `.page`'s overflow, which
 * is what lets the focal year straddle the gutter and rejoin as one piece
 * across the open spread.
 */
export function spokeAngle(index: number, rotation: number, step: number): number {
	return index * step - rotation + (90 - FOCAL_ANGLE);
}

/**
 * Places a marker `radius` out along a spoke sitting at `spokeDeg`. The
 * trailing counter-rotation cancels the spoke's, keeping years upright while
 * they swing. Both animate on the same curve, so the text never wobbles en
 * route.
 */
export function markerTransform(spokeDeg: number, radius: number): string {
	return `transform: translate(-50%, -50%) translateY(-${radius}px) rotate(${-spokeDeg}deg);`;
}

/** The focal slot never moves, so the panel is placed once, not rotated. */
export function focalTransform(radius: number, side: SpreadSide): string {
	const rad = (FOCAL_ANGLE * Math.PI) / 180;
	const x = Math.cos(rad) * radius;
	const y = Math.sin(rad) * radius;
	const anchor = side === 'left' ? 50 : -50;
	return `transform: translate(calc(${anchor}% + ${x}px), calc(50% - ${y}px));`;
}
