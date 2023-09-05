export function useToc() {
  /**
   * From https://stackoverflow.com/questions/187619/is-there-a-javascript-solution-to-generating-a-table-of-contents-for-a-page
   * */
  const parse = (headingSet: NodeListOf<HTMLElement>) => {
    const tocData: TocItem[] = []
    // const curLevel = 0
    // const preTocItem: TocItem = {}
    headingSet.forEach((heading) => {
      const tocItem: TocItem = {}
      const hLevel = heading.outerHTML.match(/<h([\d]).*>/)
      if (hLevel) {
        tocItem.level = parseInt(hLevel[1])
        tocItem.text = heading.innerText

        const reg = /[^a-zA-Z0-9_ %[\].()%&-]/s
        let id = tocItem.text
        id = id.replace(reg, '').trim().replace(/ /g, '-').toLowerCase()

        tocItem.id = id
        tocData.push(tocItem)
      }
    })

    return tocData
  }

  const create = (body: string): TocItem[] => {
    const document = new DOMParser().parseFromString(body, 'text/html')
    const headingSet: NodeListOf<HTMLHeadingElement>
      = document.querySelectorAll('h2, h3, h4')

    return parse(headingSet)
  }

  return {
    parse,
    create,
  }
}
