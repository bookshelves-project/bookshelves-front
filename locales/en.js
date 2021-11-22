export default async (context, locale) => {
  return await Promise.resolve({
    // Generic
    welcome: 'Welcome',
    language: 'Language',
    // Navigation
    nav: {
      books: 'Books',
      series: 'Series',
      authors: 'Authors',
      guides: 'Guides',
      discover: 'Discover',
      support: 'Support',
      more: 'More',
      legal: 'Legal',
      'advanced-search': 'Advanced search',
      about: 'About',
      features: 'Features',
      'more-ebooks': 'More ebooks',
      faq: 'FAQ',
      contact: 'Contact',
      'genres-tags': 'Genres & tags',
      languages: 'Languages',
      publishers: 'Publishers',
      legality: 'Legality',
      privacy: 'Privacy',
      search: {
        placeholder: 'Search for a book, a series or an author',
      },
    },
    footer: {
      text: '',
    },
    // Home
    pages: {
      home: {
        hero: {
          title: 'reading in complete tranquility...',
          text: "If you have an eReader and are looking for plenty of eBooks to take everywhere with you, you've come to the right place, hours of reading in perspective.",
        },
      },
    },
  })
}
