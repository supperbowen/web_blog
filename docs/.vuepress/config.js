module.exports = {
	title: 'Bowen 的前端BLOG',
	head: [
		['link', { rel: 'icon', href: `/favicon.png` }]
	],
	ga: '',
	description: '叨叨前端开发那些事',
	themeConfig: {
		repo: 'https://github.com/supperbowen?tab=repositories',
		editLinks: true,
		editLinkText: 'Edit this page',
		lastUpdated: 'Last updated',
		nav: [
			{
				text: 'Home',
				link: '/'
			},
			// {
			// 	text: 'mvvm',
			// 	link: '/mvvm/'
			// },
			// {
			// 	text: 'Component Example',
			// 	link: '/component-example'
			// },
			// {
			// 	text: 'Section',
			// 	items: [
			// 		{
			// 			text: 'Section Introduction',
			// 			link: '/section/#section-introduction'
			// 		},
			// 		{
			// 			text: 'Some More Content!',
			// 			link: '/section/#some-more-content'
			// 		}
			// 	]
			// },
			// {
			// 	text: 'Contact',
			// 	items: [
			// 		{
			// 			text: 'Twitter',
			// 			link: 'https://www.twitter.com/'
			// 		},
			// 		{
			// 			text: 'Email',
			// 			link: 'mailto:hello@email.com'
			// 		}
			// 	]
			// }
		],
		docsDir: 'docs'
	}
}
