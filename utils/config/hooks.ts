const hooks: object = {
  'content:file:beforeInsert': (document: any) => {
    if (document.extension === '.md') {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const readingTime = require('reading-time')
      const stats = readingTime(document.text)

      document.readingTime = stats
    }
  }
}

export default hooks
