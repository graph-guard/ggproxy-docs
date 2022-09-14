export default {
	title: 'ggproxy',
	description: 'GraphGuard Proxy',
	head: [
		['link', {rel: 'apple-touch-icon', sizes: '57x57', href: 'logo/57.png'}],
		['link', {rel: 'apple-touch-icon', sizes: '60x60', href: 'logo/60.png'}],
		['link', {rel: 'apple-touch-icon', sizes: '72x72', href: 'logo/72.png'}],
		['link', {rel: 'apple-touch-icon', sizes: '76x76', href: 'logo/76.png'}],
		['link', {rel: 'apple-touch-icon', sizes: '114x114', href: 'logo/114.png'}],
		['link', {rel: 'apple-touch-icon', sizes: '120x120', href: 'logo/120.png'}],
		['link', {rel: 'apple-touch-icon', sizes: '144x144', href: 'logo/144.png'}],
		['link', {rel: 'apple-touch-icon', sizes: '152x152', href: 'logo/152.png'}],
		['link', {rel: 'apple-touch-icon', sizes: '167x167', href: 'logo/167.png'}],
		['link', {rel: 'apple-touch-icon', sizes: '180x180', href: 'logo/180.png'}],

		['link', {rel: 'icon', type: 'image/png', sizes: '16x16', href: 'logo/16.png'}],
		['link', {rel: 'icon', type: 'image/png', sizes: '32x32', href: 'logo/32.png'}],
		['link', {rel: 'icon', type: 'image/png', sizes: '64x64', href: 'logo/64.png'}],
		['link', {rel: 'icon', type: 'image/png', sizes: '96x96', href: 'logo/96.png'}],
		['link', {rel: 'icon', type: 'image/png', sizes: '128x128', href: 'logo/128.png'}],
		['link', {rel: 'icon', type: 'image/png', sizes: '196x196', href: 'logo/196.png'}],

		['link', {rel: 'mask-icon', href: 'logo/graph-guard.svg', color: '#009966'}],
		['link', {rel: 'shortcut icon', href: 'logo/favicon.ico'}],
		['meta', {name: 'msapplication-TileColor', content: '#009966'}],
		['meta', {name: 'theme-color', content: '#009966'}],
	],
	themeConfig: {
		siteTitle: "GraphGuard Proxy",
		logo: 'logo/graph-guard.svg',
		nav: [
			{ text: 'FAQ', link: '/faq' },
			{ text: 'Roadmap', link: '/roadmap' },
			{ text: 'Team', link: '/team' }
		],
		sidebar: [{
			text: 'Guide',
			items: [
				{ text: 'Introduction', link: '/' },
				{ text: 'Installation', link: '/installation' },
				{ text: 'Quick Start', link: '/quick-start' },
				{ text: 'Configuration', link: '/configuration' }
			]
		}, {
			text: "GraphQL Template Language",
			items: [{
				text: 'Introduction to GQT',
				link: '/gqt'
			}, {
				text: 'Document Structure',
				link: '/gqt-document-structure'
			}, {
				text: 'Constraints',
				link: '/gqt-constraints'
			}, {
				text: 'Logical Operators',
				link: '/gqt-logical-operators'
			}, {
				text: 'Map Operator',
				link: '/gqt-map-operator'
			}, {
				text: 'Variables',
				link: '/gqt-variables'
			}, {
				text: 'Combination Set',
				link: '/gqt-combination-set'
			}]
		}]
	}
}