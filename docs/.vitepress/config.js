export default {
	title: 'ggproxy',
	description: 'GraphGuard Proxy',
	themeConfig: {
		siteTitle: "GraphGuard Proxy",
		logo: 'graph-guard.svg',
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