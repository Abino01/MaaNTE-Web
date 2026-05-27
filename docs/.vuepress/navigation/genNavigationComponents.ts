import * as fs from 'fs'
import * as path from 'path'
import { default as matter } from 'gray-matter'
import { ThemeCollectionItem, ThemeNavItem, ThemeSidebarItem } from 'vuepress-theme-plume'

import { Locale } from './i18n.ts'

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

  if (!fs.existsSync(dir)) return []

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
  locale: Locale,
  baseDir = path.resolve(__dirname, '../../'),
): NavigationComponents {
  interface WrappedNavigationComponent {
    navItem: ThemeNavItem
    collectionItem: ThemeCollectionItem
    order: number
  }

  const navigationComponentsWithOrder: WrappedNavigationComponent[] = []

  const langDir = path.join(baseDir, locale.name)

  if (!fs.existsSync(langDir)) {
    return { navbar: [], collections: [] }
  }

  const entries = fs.readdirSync(langDir, { withFileTypes: true }).filter((e) => !e.name.startsWith('.'))

  for (const entry of entries) {
    if (!entry.isDirectory()) continue

    const metaData = getMetaData(langDir, entry)
    if (!metaData) {
      continue
    }

    const navbarItem: ThemeNavItem = {
      text: metaData.title,
      icon: metaData.icon,
      link: `/${locale.name}/${metaData.baseName}/`,
    }

    const collectionItem: ThemeCollectionItem = {
      type: 'doc',
      title: metaData.title,
      dir: metaData.baseName,
      linkPrefix: `/${metaData.baseName}/`,
      sidebar: getSidebarItems(path.join(langDir, entry.name)),
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
