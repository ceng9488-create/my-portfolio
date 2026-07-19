import {
	siJavascript,
	siSvelte,
	siReact,
	siAngular,
	siDotnet,
	siVuedotjs,
	siFirebase,
	siPython,
	siDjango,
	siOpenjdk,
	siMysql,
	siApachetomcat,
	siVite
} from 'simple-icons';
import { Layers, Webhook } from '@lucide/svelte';
import type { Component } from 'svelte';

export type SimpleIcon = { hex: string; path: string };

export type Skill = {
	name: string;
	icon?: SimpleIcon;
	lucide?: Component<{ class?: string; size?: number; color?: string }>;
};

export type Note = { headline: string; body: string };

export type TimelineEntry = { year: string; skills: Skill[]; note: Note };


export const timeline: TimelineEntry[] = [
	{
		year: '2014–2018',
		skills: [
			{ name: 'Java 8', icon: siOpenjdk },
			{ name: 'MySQL', icon: siMysql },
			{ name: 'Tomcat', icon: siApachetomcat }
		],
		note: {
			headline: 'Where it started',
			body: 'Wrote my first "Hello World" in Java and picked up MySQL along the way. This is where OOP and the core programming concepts clicked, and where I realised code was a magic door — you could build almost anything behind it. Most of this period went to problem-solving for its own sake, like building a Sudoku solver.'
		}
	},
	{
		year: '2017–2018',
		skills: [
			// No C# brand mark in simple-icons; .NET is the closest official one.
			{ name: 'Microsoft .NET C#', icon: siDotnet },
			{ name: 'Angular 2', icon: siAngular }
		],
		note: {
			headline: 'First code that shipped',
			body: 'Six months of internship. It opened with two weeks training on ERP systems and coding standards. I worked in C# on the back end and Angular 2 on the front, with Git and TortoiseGit underneath, and deployment skills starting to pick up. A challenging but rewarding experience that laid the foundation for my development career — and one that led to a full-time offer to continue the journey.'
		}
	},
	{
		year: '2018-2020',
		skills: [
			{ name: 'JavaScript ES6', icon: siJavascript },
			{ name: 'REST APIs', lucide: Webhook }
		],
		note: {
			headline: 'The language itself',
			body: 'Spent two years going deeper than just using frameworks — really learning JavaScript itself. ES6 features like promises, modules and closures became tools I understood. Building that foundation helped me understand why React was created in the first place. Around the same time, I started designing REST API contracts, which shifted my focus from "how does this look on screen" to "what do the frontend and backend agree on before either is built".'
		}
	},
	{
		year: '2020-2021',
		skills: [
			{ name: 'Vue2', icon: siVuedotjs },
			{ name: 'Firebase', icon: siFirebase }
		],
		note: {
			headline: 'Shipping faster',
			body: 'On a freelance project, I chose Vue 2 and Firebase — Vue because I wanted to pick up a new framework, and Firebase because it fit the project\'s needs. The project was a web application for data entry that generated PDF outputs. Firebase handled the backend needs — auth, data storage and hosting.'
		}
	},
	{
		year: '2022-2025',
		skills: [
			{ name: 'React', icon: siReact },
			// Zustand has no brand mark; Layers stands in for the store.
			{ name: 'Zustand', lucide: Layers },
			{ name: 'Svelte', icon: siSvelte },
			{ name: 'Vite', icon: siVite }
		],
		note: {
			headline: 'Less framework, more app',
			body: 'React for the work that had to last, with Zustand once prop-drilling stopped being funny — a store small enough that state never became its own subsystem. Svelte for everything since: writing less to do the same thing turns out to be a real feature, and Vite made the feedback loop instant enough to stop thinking about it.'
		}
	},
	{
		year: '2025-2026',
		skills: [
			{ name: 'Python', icon: siPython },
			{ name: 'Django', icon: siDjango }
		],
		note: {
			headline: 'Back to the backend',
			body: 'Python for how little sits between an idea and a working script, and Django for the moment that script has to become a system — models, migrations and admin that arrive already built. A decade after starting on Java, coming back to the server end feels less like a new direction than a return with better instincts.'
		}
	}
];
