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
	{ label: 'Education', page: 6 },
	{ label: 'Projects', page: 8 },
	{ label: 'Contact', page: 9 }
];

export const about = {
	title: 'About Me',
	body: `I am a Singapore-based Full-Stack Developer with over 5 years of experience specializing in the JavaScript ecosystem, React, and TypeScript. My background uniquely bridges creative engineering and robust product delivery—spanning everything from hardware-integrated installations to scalable software deployment. I love tackling technical challenges with a creative twist.
	Flip to the next page to see how my skills have evolved across my career timeline.`,
	/** Substring of `body` the About page sweeps a highlighter over. Must appear
	 * in the copy verbatim, or the paragraph renders with no highlight at all. */
	highlight: 'Flip to the next page'
};


export type Role = { title: string; period: string; points: string[] };

export const experience: { title: string; roles: Role[] } = {
	title: 'Experience',
	roles: [
		{
			title: 'Senior Full-Stack Developer',
			period: 'EdTech · Singapore · 2025 — 2026',
			points: [
				'Django on the back end, with an older JavaScript front end kept alive alongside it.',
				'Kept data consistent across a handful of internal and third-party systems.',
				'Worked on a learning platform, mostly on the parts that had been there a while.'
			]
		},
		{
			title: 'Full-Stack Developer',
			period: 'Digital Studio · Singapore · 2022 — 2025',
			points: [
				'React and NestJS products end to end — APIs, data layer, third-party integrations.',
				'Prototyped early to find out what was worth building before it got built.',
				'Reviewed wireframes with PMs and stakeholders, and sat in the weekly client meetings.',
				'Mentored the juniors and interns, and set the coding standards we reviewed against.'
			]
		},
		{
			title: 'Frontend Developer',
			period: 'SaaS Product · Malaysia · 2018 — 2020',
			points: [
				'Built a report builder in vanilla ES6 so clients could shape their own analytics.',
				'Redesigned the dashboard around D3 charts, and did the Figma work behind it.',
				'Wired a social API into the product to automate some of the customer follow-up.',
				'Tailored the same system to fit clients in retail, healthcare, and services.'
			]
		},
		{
			title: 'Software Developer',
			period: 'Enterprise Software · Malaysia · 2017 — 2018',
			points: [
				'Angular 2 and C# across web and mobile, from one codebase.',
				'Put REST APIs in front of a legacy ERP so the manual steps could go away.',
				'Tuned the stored procedures the slow reports leaned on.',
				'Git and Bitbucket underneath it all — my first taste of a real review workflow.'
			]
		}
	]
};


export type School = { institution: string; qualification: string; period: string };


export type Certification = {
	name: string;
	issuer: string;
	issued: string;
	url?: string;
};


export const education: {
	title: string;
	certificationsTitle: string;
	schools: School[];
	certifications: Certification[];
} = {
	title: 'Education',
	certificationsTitle: 'Certifications',
	schools: [
		{
			institution: 'Universiti Sultan Zainal Abidin',
			qualification: "Bachelor's degree, Computer Science",
			period: '2014 — 2018'
		}
	],
	certifications: [
		{
			name: 'Frontend Web Development with TypeScript',
			issuer: 'Edureka',
			issued: 'May 2026',
			url: 'https://www.coursera.org/account/accomplishments/verify/Q6HI38P9O0FX'
		},
		{
			name: 'Getting Started with TypeScript',
			issuer: 'Edureka',
			issued: 'May 2026',
			url: 'https://www.coursera.org/account/accomplishments/verify/R8DQYK09GWWL'
		},
		{
			name: 'Introduction to Front-End Development',
			issuer: 'Meta',
			issued: 'Mar 2026',
			url: 'https://www.coursera.org/account/accomplishments/verify/446Y2P3YEJTQ'
		},
		{
			name: 'Frontend Expert',
			issuer: 'AlgoExpert',
			issued: 'Feb 2025',
			url: 'https://certificate.algoexpert.io/FrontendExpert%20Certificate%20FE-a487f0632c'
		},
		{
			name: 'AWS Certified Solutions Architect – Associate',
			issuer: 'Amazon Web Services (AWS)',
			issued: 'May 2024 · Expires May 2027'
		},
		{
			name: 'Deno: The Complete Guide Zero to Mastery',
			issuer: 'Zero To Mastery Academy',
			issued: '2020'
		}
	]
};

export type Project = { name: string; description: string; href?: string };

export const projects: Project[] = [
	{
		name: 'Task Tracker',
		description:
			'A personal productivity app for daily tasks — priority management, drag-to-reorder, and real-time completion stats. Built with React 19, TypeScript, and Vite.',
		href: 'https://github.com/ceng9488-create/task-tracker'
	}
];

export const projectsOutro = 'More to come — new projects coming soon.';

export const contact = {
	title: 'Get In Touch',
	blurb: "Let's build something great together.",
	links: [
		{ label: 'eng5128@gmail.com', href: 'mailto:eng5128@gmail.com', icon: 'mail' as const },
		{
			label: 'github.com/ceng9488-create',
			href: 'https://github.com/ceng9488-create',
			icon: 'github' as const
		},
		{
			label: 'linkedin.com/in/chue-eng',
			href: 'https://www.linkedin.com/in/chue-eng/',
			icon: 'linkedin' as const
		}
	]
};
