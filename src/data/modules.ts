import type { ModuleId, Lang } from '../types'

type Mod = { id: ModuleId; title: string; subtitle: string }

export const MODULES_FR: Mod[] = [
  { id: 'M2', title: 'Module 2', subtitle: 'Gestion des Services – Concepts clés' },
  { id: 'M3', title: 'Module 3', subtitle: 'Principes directeurs' },
  { id: 'M4', title: 'Module 4', subtitle: 'Quatre dimensions de la gestion des services' },
  { id: 'M5', title: 'Module 5', subtitle: 'Système de valeur des services ITIL' },
  { id: 'M6', title: 'Module 6', subtitle: 'Amélioration continue' },
  { id: 'M7', title: 'Module 7', subtitle: 'Pratiques ITIL' },
  { id: 'EX1', title: 'Examen blanc 1', subtitle: "Échantillon d'examen – 1" },
]

export const MODULES_EN: Mod[] = [
  { id: 'M2', title: 'Module 2', subtitle: 'Service Management – Key concepts' },
  { id: 'M3', title: 'Module 3', subtitle: 'Guiding principles' },
  { id: 'M4', title: 'Module 4', subtitle: 'Four dimensions of service management' },
  { id: 'M5', title: 'Module 5', subtitle: 'ITIL service value system' },
  { id: 'M6', title: 'Module 6', subtitle: 'Continual improvement' },
  { id: 'M7', title: 'Module 7', subtitle: 'ITIL practices' },
  { id: 'EX1', title: 'Mock exam 1', subtitle: 'Sample exam – 1' },
]

export function getModulesByLang(lang: Lang): Mod[] {
  return lang === 'en' ? MODULES_EN : MODULES_FR
}

// Backward compatibility (default to French)
export const MODULES = MODULES_FR
