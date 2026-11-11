import { Building2, Expand, Factory, Files, HardHat, House, MapPinned, Sofa, type LucideProps } from 'lucide-react'
import type { ServiceIcon as IconName } from '../data/services'

const ICONS = { House, Files, Expand, Sofa, Factory, Building2, MapPinned, HardHat }

export function ServiceIcon({ name, ...props }: { name: IconName } & LucideProps) {
  const Icon = ICONS[name]
  return <Icon aria-hidden="true" {...props} />
}
