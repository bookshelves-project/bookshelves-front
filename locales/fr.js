export default async (context, locale) => {
  return await Promise.resolve({
    // Generic
    welcome: 'Bienvenue',
    language: 'Langue',
    // Navigation
    nav: {
      books: 'Livres',
      series: 'Séries',
      authors: 'Auteurs',
      guides: 'Guides',
      search: {
        placeholder: 'Rechercher un livre, une série ou un auteur',
      },
    },
    footer: {
      text: '',
      nav: {
        discover: 'Découvrir',
        support: 'Aide',
        more: 'Plus',
        legal: 'Légal',
        'advanced-search': 'Recherche avancée',
        about: 'À propos',
        features: 'Features',
        'more-ebooks': "Plus d'eBooks",
        faq: 'FAQ',
        contact: 'Nous contacter',
        'genres-tags': 'Genres & tags',
        languages: 'Langues',
        publishers: 'Éditeurs',
        legality: 'Légalité',
        privacy: 'Vie privée',
      },
    },
    // Pages
    pages: {
      home: {
        hero: {
          title: 'lisez en toute tranquilité...',
          text: 'Si vous possédez une liseuse et que vous recherchez de nombreux eBooks à emporter partout avec vous, vous êtes au bon endroit, des heures de lecture en perspective.',
        },
      },
    },
  })
}
