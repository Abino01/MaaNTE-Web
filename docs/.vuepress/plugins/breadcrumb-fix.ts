const SITE_BASE_URL = 'https://maa-nte.github.io/MaaNTE-Web'

export default () => ({
  name: 'breadcrumb-seo-fix',
  extendsPage: (page: any) => {
    const breadcrumbData = generateBreadcrumbStructuredData(page)
    if (breadcrumbData) {
      page.frontmatter.head = page.frontmatter.head || []
      page.frontmatter.head.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify(breadcrumbData),
      ])
    }
  },
})

function generateBreadcrumbStructuredData(page: any) {
  const pagePath = page.path
  if (pagePath === '/' || pagePath === '/index.html') return null

  const segments = pagePath.split('/').filter(Boolean)
  const itemListElement = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: { '@id': `${SITE_BASE_URL}/` },
    },
  ]

  let currentPath = ''
  segments.forEach((segment: string, index: number) => {
    currentPath += '/' + segment
    const position = index + 2
    const isLast = index === segments.length - 1
    const name = isLast && page.title
      ? page.title
      : decodeURIComponent(segment).replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())

    itemListElement.push({
      '@type': 'ListItem',
      position,
      name,
      item: { '@id': `${SITE_BASE_URL}${currentPath}/` },
    })
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  }
}
