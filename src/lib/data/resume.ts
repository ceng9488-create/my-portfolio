/**
 * All the copy in the book, plus the page numbers the chapter menu jumps to.
 *
 * `page` is a physical index into the sequence of `.page` elements rendered in
 * ExperienceBook — reorder the pages there and these must move with them.
 */

export type Chapter = { label: string; page: number };

export const chapters: Chapter[] = [
	{ label: 'About Me', page: 1 },
	{ label: 'Skills', page: 2 },
	{ label: 'Experience', page: 4 },
	{ label: 'Education', page: 5 },
	{ label: 'Projects', page: 6 },
	{ label: 'Contact', page: 7 }
];

/** A titled entry with a role, a date range, and bullet points. */
export type ResumeEntry = {
	title: string;
	role: string;
	period: string;
	points: string[];
};

export const about = {
	title: 'About Me',
	body: `I am a Singapore-based Full-Stack Developer with over 5 years of experience specializing in the JavaScript ecosystem, React, and TypeScript. My background uniquely bridges creative engineering and robust product delivery—spanning everything from hardware-integrated installations to scalable software deployment. I love tackling technical challenges with a creative twist. Flip to the next page to see how my skills have evolved across my career timeline.`
};

export const experience: ResumeEntry = {
	title: 'Experience',
	role: 'Frontend Developer',
	period: 'Company Name · 2023 — Present',
	points: [
		'Built responsive UIs with React and TypeScript.',
		'Shipped features used by thousands of users.',
		'Collaborated with design to craft micro-interactions.'
	]
};

export const education: ResumeEntry = {
	title: 'Education',
	role: 'B.Sc. in Computer Science',
	period: 'University Name · 2019 — 2023',
	points: [
		'Focus on web development and human-computer interaction.',
		'Relevant coursework: Algorithms, UI/UX, Databases.'
	]
};

export type Project = { name: string; description: string };

export const projects: Project[] = [
	{
		name: 'Portfolio Site',
		description: 'This site — built with SvelteKit, Tailwind, and page-flip animations.'
	},
	{
		name: 'Project Two',
		description: 'A short one-line description of what it does and the stack.'
	},
	{
		name: 'Project Three',
		description: 'Another highlight — swap in your real work here.'
	}
];

export const contact = {
	title: 'Get In Touch',
	blurb: "Let's build something great together.",
	links: ['📧 eng5128@gmail.com', '🐙 github.com/yourusername', '💼 linkedin.com/in/yourusername']
};

export const closing = 'Thanks for reading.';
