export default async (context, locale) => {
  return await Promise.resolve({
    welcome: 'Welcome',
    language: 'Language',
    hero: {
      title: 'reading in complete tranquility...',
      text: "If you have an eReader and are looking for plenty of eBooks to take everywhere with you, you've come to the right place, hours of reading in perspective.",
    },
  })
}
