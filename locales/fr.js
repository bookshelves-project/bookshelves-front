export default async (context, locale) => {
  return await Promise.resolve({
    welcome: 'Bienvenue',
    language: 'Langue',
    hero: {
      title: 'lisez en toute tranquilité...',
      text: 'Si vous possédez une liseuse et que vous recherchez de nombreux eBooks à emporter partout avec vous, vous êtes au bon endroit, des heures de lecture en perspective.',
    },
  })
}
