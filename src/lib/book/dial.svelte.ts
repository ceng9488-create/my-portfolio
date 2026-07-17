import type { TimelineEntry } from '$lib/data/timeline';
import { markerTransform, shortestDelta, spokeAngle, stepAngle } from './dial-geometry';

/**
 * Selection + rotation state for the skills dial.
 *
 * ONE instance is shared by both halves of the spread. The two pages each draw
 * the whole dial and clip away the half that isn't theirs, so they must agree on
 * the selected year down to the degree — give each page its own Dial and the
 * focal year tears apart at the gutter.
 */
export class Dial {
	readonly entries: TimelineEntry[];

	selected = $state(0);

	/**
	 * Accumulated dial rotation in degrees, kept CONTINUOUS rather than derived
	 * from `selected`. Deriving it would make the 2024 → 2019 wrap animate as a
	 * 300° scramble backwards instead of one 60° step forwards; here the wrap is
	 * just rotation += 60, and nothing knows it crossed the seam.
	 * Invariant: rotation ≡ selected × step (mod 360).
	 */
	rotation = $state(0);

	constructor(entries: TimelineEntry[]) {
		this.entries = entries;
	}

	get step(): number {
		return stepAngle(this.entries.length);
	}

	get skills() {
		return this.entries[this.selected].skills;
	}

	get note() {
		return this.entries[this.selected].note;
	}

	get year() {
		return this.entries[this.selected].year;
	}

	/** Turns the dial the short way round, so any hop is at most half a turn. */
	select(index: number) {
		this.rotation += shortestDelta(this.selected, index, this.entries.length) * this.step;
		this.selected = index;
	}

	spokeAngle(index: number): number {
		return spokeAngle(index, this.rotation, this.step);
	}

	markerStyle(index: number, radius: number): string {
		return markerTransform(this.spokeAngle(index), radius);
	}
}
