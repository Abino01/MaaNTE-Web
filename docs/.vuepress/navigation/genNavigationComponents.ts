import * as fs from 'fs'
import * as path from 'path'
import { default as matter } from 'gray-matter'
import { ThemeCollectionItem, ThemeNavItem, ThemeSidebarItem } from 'vuepress-theme-plume'

interface MetaData {
  baseName: string
  order: number
  title: string
  icon: string
  index: boolean
}

interface NavigationComponents {
  navbar: ThemeNavItem[]
  collections: ThemeCollectionItem[]
}

type SidebarItem = ThemeSidebarItem | string

function getMetaData(dir: string, entry: fs.Dirent): MetaData | null {
  const currentPath = path.join(dir, entry.name)
  if (!fs.existsSync(currentPath)) {
    return null
  }

  let mdFilePath = ''
  if (entry.isDirectory()) {
    mdFilePath = path.join(currentPath, 'README.md')
  } else if (entry.isFile() && entry.name.endsWith('.md') && entry.name.toLowerCase() !== 'readme.md') {
    mdFilePath = currentPath
  } else {
    return null
  }

  if (!fs.existsSync(mdFilePath)) {
    // For files without a corresponding README.md in a directory,
    // still try to read the file itself
    if (entry.isDirectory()) {
      return null
    }
    mdFilePath = currentPath
  }

  const fileContent = fs.readFileSync(mdFilePath, 'utf-8')
  const meta = matter(fileContent).data ?? {}

  const baseName = path.parse(entry.name).name
  const order = Number((entry.isDirectory() ? meta?.dir?.order : meta?.order) ?? Number.MAX_SAFE_INTEGER)
  const title = String(meta?.title ?? RegExp('# (.+)').exec(fileContent)?.[1] ?? baseName)
  const icon = String(meta?.icon ?? '')
  const index = entry.isDirectory() ? (Boolean(meta?.index) ?? true) : true

  return {
    baseName,
    order,
    title,
    icon,
    index,
  }
}

function getSidebarItems(dir: string): SidebarItem[] {
  interface WrappedSidebarItem {
    sidebarItem: SidebarItem
    order: number
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true }).filter((e) => !e.name.startsWith('.'))

  const sidebarItemsWithOrder: WrappedSidebarItem[] = []
  for (const entry of entries) {
    let sidebarItem: SidebarItem

    const metaData = getMetaData(dir, entry)
    if (!metaData) {
      continue
    }

    if (entry.isDirectory()) {
      const children = getSidebarItems(path.join(dir, entry.name))
      sidebarItem = {
        text: metaData.title,
        link: metaData.index ? `${metaData.baseName}/` : undefined,
        icon: metaData.icon,
        collapsed: true,
        prefix: `${metaData.baseName}/`,
        items: children,
      }
    } else if (entry.isFile() && entry.name.endsWith('.md') && entry.name.toLowerCase() !== 'readme.md') {
      sidebarItem = entry.name
    }

    sidebarItemsWithOrder.push({ sidebarItem, order: metaData.order })
  }
  sidebarItemsWithOrder.sort((a, b) => a.order - b.order)
  return sidebarItemsWithOrder.map((i) => i.sidebarItem)
}

export function genNavigationComponents(
  baseDir = path.resolve(__dirname, '../../zh_cn'),
): NavigationComponents {
  interface WrappedNavigationComponent {
    navItem: ThemeNavItem
    collectionItem: ThemeCollectionItem
    order: number
  }

  const navigationComponentsWithOrder: WrappedNavigationComponent[] = []

  if (!fs.existsSync(baseDir)) {
    return { navbar: [], collections: [] }
  }

  const entries = fs.readdirSync(baseDir, { withFileTypes: true }).filter((e) => !e.name.startsWith('.'))

  for (const entry of entries) {
    if (!entry.isDirectory()) continue

    const metaData = getMetaData(baseDir, entry)
    if (!metaData) {
      continue
    }

    const navbarItem: ThemeNavItem = {
      text: metaData.title,
      icon: metaData.icon,
      link: `/zh_cn/${metaData.baseName}/`,
    }

    const collectionItem: ThemeCollectionItem = {
      type: 'doc',
      title: metaData.title,
      dir: `zh_cn/${metaData.baseName}`,
      linkPrefix: `/zh_cn/${metaData.baseName}/`,
      sidebar: getSidebarItems(path.join(baseDir, entry.name)),
    }

    navigationComponentsWithOrder.push({
      navItem: navbarItem,
      collectionItem,
      order: metaData.order,
    })
  }

  navigationComponentsWithOrder.sort((a, b) => a.order - b.order)

  return {
    navbar: navigationComponentsWithOrder.map((i) => i.navItem),
    collections: navigationComponentsWithOrder.map((i) => i.collectionItem),
  }
}
