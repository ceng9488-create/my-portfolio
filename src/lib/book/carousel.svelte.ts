import type { Project } from '$lib/data/resume';

/**
 * Which project the projects spread is showing.
 *
 * ONE instance is shared by both leaves, the same arrangement the skills dial
 * uses: the left leaf picks, the right leaf renders. Give each leaf its own
 * instance and the description across the gutter stops matching the card that
 * looks selected.
 */
export class ProjectCarousel {
	readonly projects: Project[];

	selected = $state(0);

	constructor(projects: Project[]) {
		this.projects = projects;
	}

	get current(): Project {
		return this.projects[this.selected];
	}

	select(index: number) {
		this.selected = index;
	}

	/** Wraps, so the arrows never dead-end on the first or last card. */
	next() {
		this.selected = (this.selected + 1) % this.projects.length;
	}

	prev() {
		this.selected = (this.selected - 1 + this.projects.length) % this.projects.length;
	}
}
