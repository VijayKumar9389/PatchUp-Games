import type { Template } from './types'

// Butterfly template - symmetrical design with 8 regions
const butterflyTemplate: Template = {
  id: 'butterfly',
  name: 'Butterfly',
  viewBox: '0 0 200 160',
  regions: [
    // Left wing - upper section
    {
      id: 'left-wing-upper',
      path: 'M100,80 C80,40 40,20 20,40 C10,55 20,75 50,80 C65,82 85,82 100,80 Z',
      currentColor: '#FFFFFF',
    },
    // Left wing - lower section
    {
      id: 'left-wing-lower',
      path: 'M100,80 C85,82 65,85 50,85 C20,90 10,110 25,125 C45,145 80,130 100,95 Z',
      currentColor: '#FFFFFF',
    },
    // Right wing - upper section
    {
      id: 'right-wing-upper',
      path: 'M100,80 C120,40 160,20 180,40 C190,55 180,75 150,80 C135,82 115,82 100,80 Z',
      currentColor: '#FFFFFF',
    },
    // Right wing - lower section
    {
      id: 'right-wing-lower',
      path: 'M100,80 C115,82 135,85 150,85 C180,90 190,110 175,125 C155,145 120,130 100,95 Z',
      currentColor: '#FFFFFF',
    },
    // Left wing spot
    {
      id: 'left-wing-spot',
      path: 'M55,55 C50,50 40,52 38,60 C36,68 45,75 55,72 C65,69 62,58 55,55 Z',
      currentColor: '#FFFFFF',
    },
    // Right wing spot
    {
      id: 'right-wing-spot',
      path: 'M145,55 C150,50 160,52 162,60 C164,68 155,75 145,72 C135,69 138,58 145,55 Z',
      currentColor: '#FFFFFF',
    },
    // Body
    {
      id: 'body',
      path: 'M95,30 C92,35 92,140 95,145 C100,150 105,150 105,145 C108,140 108,35 105,30 C102,25 98,25 95,30 Z',
      currentColor: '#FFFFFF',
    },
    // Head
    {
      id: 'head',
      path: 'M100,25 C110,25 115,18 115,12 C115,5 108,0 100,0 C92,0 85,5 85,12 C85,18 90,25 100,25 Z',
      currentColor: '#FFFFFF',
    },
  ],
}

// Flower template - 7 regions
const flowerTemplate: Template = {
  id: 'flower',
  name: 'Flower',
  viewBox: '0 0 200 200',
  regions: [
    // Petal top
    {
      id: 'petal-top',
      path: 'M100,70 C85,50 75,25 100,10 C125,25 115,50 100,70 Z',
      currentColor: '#FFFFFF',
    },
    // Petal top-right
    {
      id: 'petal-top-right',
      path: 'M110,75 C130,60 155,55 165,80 C160,105 135,100 110,85 Z',
      currentColor: '#FFFFFF',
    },
    // Petal bottom-right
    {
      id: 'petal-bottom-right',
      path: 'M110,95 C135,100 160,115 155,140 C130,150 115,125 105,100 Z',
      currentColor: '#FFFFFF',
    },
    // Petal bottom-left
    {
      id: 'petal-bottom-left',
      path: 'M90,95 C65,100 40,115 45,140 C70,150 85,125 95,100 Z',
      currentColor: '#FFFFFF',
    },
    // Petal top-left
    {
      id: 'petal-top-left',
      path: 'M90,75 C70,60 45,55 35,80 C40,105 65,100 90,85 Z',
      currentColor: '#FFFFFF',
    },
    // Center
    {
      id: 'center',
      path: 'M100,90 C115,90 125,100 125,115 C125,130 115,140 100,140 C85,140 75,130 75,115 C75,100 85,90 100,90 Z',
      currentColor: '#FFFFFF',
    },
    // Stem
    {
      id: 'stem',
      path: 'M95,140 L95,190 C95,195 100,195 105,195 L105,140 C103,138 97,138 95,140 Z',
      currentColor: '#FFFFFF',
    },
  ],
}

// Tree template - 6 regions
const treeTemplate: Template = {
  id: 'tree',
  name: 'Tree',
  viewBox: '0 0 200 200',
  regions: [
    // Canopy left
    {
      id: 'canopy-left',
      path: 'M100,80 C70,80 35,65 30,40 C25,20 45,5 70,15 C85,20 95,35 100,50 C100,60 100,70 100,80 Z',
      currentColor: '#FFFFFF',
    },
    // Canopy center
    {
      id: 'canopy-center',
      path: 'M100,50 C90,25 95,5 100,5 C105,5 110,25 100,50 C100,35 95,15 100,5 C105,15 100,35 100,50 C85,30 80,10 100,5 C120,10 115,30 100,50 Z',
      currentColor: '#FFFFFF',
    },
    // Canopy right
    {
      id: 'canopy-right',
      path: 'M100,80 C130,80 165,65 170,40 C175,20 155,5 130,15 C115,20 105,35 100,50 C100,60 100,70 100,80 Z',
      currentColor: '#FFFFFF',
    },
    // Canopy bottom
    {
      id: 'canopy-bottom',
      path: 'M60,85 C55,70 65,55 100,50 C135,55 145,70 140,85 C130,110 110,105 100,95 C90,105 70,110 60,85 Z',
      currentColor: '#FFFFFF',
    },
    // Trunk
    {
      id: 'trunk',
      path: 'M85,95 L85,170 C85,175 90,180 100,180 C110,180 115,175 115,170 L115,95 C110,98 105,100 100,100 C95,100 90,98 85,95 Z',
      currentColor: '#FFFFFF',
    },
    // Ground
    {
      id: 'ground',
      path: 'M20,180 C40,175 60,178 80,180 C90,182 110,182 120,180 C140,178 160,175 180,180 L180,195 L20,195 Z',
      currentColor: '#FFFFFF',
    },
  ],
}

export const templates: Template[] = [
  butterflyTemplate,
  flowerTemplate,
  treeTemplate,
]

export function getRandomTemplate(): Template {
  const index = Math.floor(Math.random() * templates.length)
  // Return a deep copy to avoid mutating the original
  const template = templates[index]
  return {
    ...template,
    regions: template.regions.map(r => ({ ...r })),
  }
}
