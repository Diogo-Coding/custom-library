// Importar solo los iconos que vas a usar
import {
  Hamburger,
  Hotel,
  MapPin,
  LayoutGrid,
  List,
  Box,
  AlertTriangle,
  ShoppingCart,
  ChartBar,
  Building,
  SquareMenu,
  Wheat,
  WheatOff,
  Lock,
  Unlock,
  Users,
  Pin,
  PinOff,
  Home,
  Cog,
  Shield,
  Store,
  Receipt,
  Settings2
} from 'lucide-vue-next'

import {
  IconSettings,
  IconSearch,
  IconLock,
  IconLockOpen,
  IconFileTypeXls,
  IconFileTypeCsv,
  IconJson,
  IconFileTypeTxt,
  IconFileTypeHtml,
  IconFileTypeXml
} from '@tabler/icons-vue'

export default function registerIcons(app) {
  // Lucide icons
  app.component('IconBurguer', Hamburger)
  app.component('IconHotel', Hotel)
  app.component('IconMapPin', MapPin)
  app.component('IconLayoutGrid', LayoutGrid)
  app.component('IconList', List)
  app.component('IconBox', Box)
  app.component('IconAlertTriangle', AlertTriangle)
  app.component('IconShoppingCart', ShoppingCart)
  app.component('IconChartBar', ChartBar)
  app.component('IconBuilding', Building)
  app.component('IconSquareMenu', SquareMenu)
  app.component('IconWheat', Wheat)
  app.component('IconWheatOff', WheatOff)
  app.component('IconLock', Lock)
  app.component('IconUnlock', Unlock)
  app.component('IconUsers', Users)
  app.component('IconPin', Pin)
  app.component('IconPinOff', PinOff)
  app.component('IconHome', Home)
  app.component('IconCog', Cog)
  app.component('IconShield', Shield)
  app.component('IconStore', Store)
  app.component('IconReceipt', Receipt)
  app.component('IconSettings2', Settings2)

  // Tabler icons
  app.component('IconSettings', IconSettings)
  app.component('IconSearch', IconSearch)
  app.component('IconLock2', IconLock)
  app.component('IconUnlock2', IconLockOpen)
  app.component('IconFileTypeXls', IconFileTypeXls)
  app.component('IconFileTypeCsv', IconFileTypeCsv)
  app.component('IconJson', IconJson)
  app.component('IconFileTypeTxt', IconFileTypeTxt)
  app.component('IconFileTypeHtml', IconFileTypeHtml)
  app.component('IconFileTypeXml', IconFileTypeXml)
}
