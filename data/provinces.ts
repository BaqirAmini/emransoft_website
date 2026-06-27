export interface Province {
  id: string
  name: string
  nameKey: string
  x: number
  y: number
  isActive: boolean
  products: string[]
  installedYear?: number
}

/** SVG coordinates (viewBox 0 0 600 380.193) mapped from geographic lon/lat */
export const provinces: Province[] = [
  { id: "kabul", name: "Kabul", nameKey: "kabul", x: 362, y: 167, isActive: true, products: ["Crown", "Labra", "Tajviz"], installedYear: 2023 },
  { id: "herat", name: "Herat", nameKey: "herat", x: 70, y: 176, isActive: true, products: ["Crown", "Tajviz"], installedYear: 2023 },
  { id: "balkh", name: "Balkh", nameKey: "balkh", x: 273, y: 75, isActive: true, products: ["Crown", "Labra"], installedYear: 2024 },
  { id: "kandahar", name: "Kandahar", nameKey: "kandahar", x: 215, y: 288, isActive: true, products: ["Crown", "Tajviz"], installedYear: 2024 },
  { id: "nangarhar", name: "Nangarhar", nameKey: "nangarhar", x: 413, y: 171, isActive: true, products: ["Crown"], installedYear: 2024 },
  { id: "kunduz", name: "Kunduz", nameKey: "kunduz", x: 343, y: 75, isActive: true, products: ["Crown", "Tajviz"], installedYear: 2024 },
  { id: "takhar", name: "Takhar", nameKey: "takhar", x: 372, y: 84, isActive: true, products: ["Crown"], installedYear: 2024 },
  { id: "logar", name: "Logar", nameKey: "logar", x: 355, y: 188, isActive: true, products: ["Crown"], installedYear: 2025 },
  { id: "ghazni", name: "Ghazni", nameKey: "ghazni", x: 327, y: 209, isActive: true, products: ["Crown"], installedYear: 2025 },
  { id: "daikundi", name: "Daikundi", nameKey: "daikundi", x: 231, y: 196, isActive: true, products: ["Crown"], installedYear: 2025 },
]

export const hubProvince = provinces[0]
