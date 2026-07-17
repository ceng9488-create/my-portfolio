import {
	siTypescript,
	siJavascript,
	siSvelte,
	siReact,
	siNextdotjs,
	siNodedotjs,
	siTailwindcss,
	siGreensock,
	siGit,
	siVite
} from 'simple-icons';
import { Webhook } from '@lucide/svelte';
import type { Component } from 'svelte';

/** A brand mark from `simple-icons`: a hex colour and a single SVG path. */
export type SimpleIcon = { hex: string; path: string };

/** Skills carry either a brand mark or, where no brand exists, a Lucide glyph. */
export type Skill = {
	name: string;
	icon?: SimpleIcon;
	lucide?: Component<{ class?: string; size?: number; color?: string }>;
};

/** The story behind a year: what the work was, and what picking it up taught. */
export type Note = { headline: string; body: string };

/** `year` is free-form label text — a single year or a range like `2014–2018`. */
export type TimelineEntry = { year: string; skills: Skill[]; note: Note };

// NOTE: years and notes are placeholders — swap in your real dates and stories.
export const timeline: TimelineEntry[] = [
	{
		year: '2014–2018',
		skills: [
			{ name: 'Java 8', icon: siJavascript },
			{ name: 'MySQL', icon: siGit },
			{ name: 'Tomcat', icon: siGit }
		],
		note: {
			headline: 'Where it started',
			body: 'Wrote my first "Hello World" and began my programming journey with Java and MySQL. Spent this period deep in problem-solving, building projects like a Sudoku solver, and exploring machine learning fundamentals through algorithms such as k-nearest neighbors (KNN).'
		}
	},
	{
		year: '2019–2020',
		skills: [
			{ name: 'React', icon: siReact },
			{ name: 'Node.js', icon: siNodedotjs }
		],
		note: {
			headline: 'Both ends of the wire',
			body: 'Picked up React on a project that outgrew its jQuery roots. Node followed almost by accident — once I could write the API too, I stopped waiting on anyone to unblock me.'
		}
	},
	{
		year: '2021',
		skills: [
			{ name: 'TypeScript', icon: siTypescript },
			{ name: 'REST APIs', lucide: Webhook }
		],
		note: {
			headline: 'Types earned their keep',
			body: 'I resisted TypeScript until a refactor went sideways in production. Designing REST contracts alongside it changed how I think about a system before writing any of it.'
		}
	},
	{
		year: '2022',
		skills: [
			{ name: 'Next.js', icon: siNextdotjs },
			{ name: 'Tailwind CSS', icon: siTailwindcss }
		],
		note: {
			headline: 'Shipping faster',
			body: 'Next.js made rendering a decision rather than a default. Tailwind I disliked for a week and have not given up since — it kept styles from drifting as the team grew.'
		}
	},
	{
		year: '2023',
		skills: [
			{ name: 'Svelte', icon: siSvelte },
			{ name: 'Vite', icon: siVite }
		],
		note: {
			headline: 'Less framework, more app',
			body: 'Svelte was a side project that quietly became my default. Writing less to do the same thing is a real feature, and Vite made the feedback loop instant.'
		}
	},
	{
		year: '2024–2025',
		skills: [
			{ name: 'SvelteKit', icon: siSvelte },
			{ name: 'GSAP', icon: siGreensock }
		],
		note: {
			headline: 'Craft on top of the stack',
			body: 'SvelteKit for the whole product surface, GSAP for the parts that should feel alive. This book you are flipping through is where both went to be tested.'
		}
	}
];
