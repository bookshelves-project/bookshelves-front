const hooks: object = {
  'content:file:beforeInsert': (document: any) => {
    if (document.extension === '.md') {
      const readingTime = require('reading-time')
      const stats = readingTime(document.text)

      document.readingTime = stats
    }
  }
}

export default hooks
