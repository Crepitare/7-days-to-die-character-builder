"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Brain,
  Heart,
  Dumbbell,
  Zap,
  Shield,
  Crosshair,
  Hammer,
  Shirt,
  Footprints,
  Glasses,
  Hand,
  Target,
  Compass,
  Key,
  Search,
  Wrench,
  Skull,
  Axe,
  Bomb,
  Pickaxe,
  Package,
  RabbitIcon as Deer,
  Activity,
  Apple,
  TreesIcon as Lungs,
  Leaf,
  Pill,
  PenIcon as Gun,
  BoxIcon as Bow,
  Scissors,
  MonitorIcon as Running,
  Feather,
  Mountain,
  Map,
  ShoppingCart,
  Users,
  Cog,
  Cpu,
  PenToolIcon as Tool,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Types
type Attribute = {
  name: string
  value: number
  icon: React.ReactNode
  color: string
  skills: Skill[]
}

type Skill = {
  name: string
  value: number
  icon: React.ReactNode
  maxLevel: number
  description: string
}

type Equipment = {
  id: string
  name: string
  slot: "head" | "body" | "feet" | "hands"
  attributes: {
    [key: string]: number
  }
}

type CharacterBuild = {
  level: number
  availablePoints: number
  attributes: {
    [key: string]: {
      level: number
      skills: {
        [key: string]: number
      }
    }
  }
  equipment: {
    head: Equipment | null
    body: Equipment | null
    feet: Equipment | null
    hands: Equipment | null
  }
}

// Sample equipment data with expanded properties
const equipmentData: Equipment[] = [
  {
    id: "steel-helmet",
    name: "Steel Helmet",
    slot: "head",
    attributes: {
      armor: 15,
      explosionResistance: 5,
      armorCritResist: 3,
      coldResist: 5,
      heatResist: 0,
      mobility: -2,
      staminaRegen: -5,
      noise: 10,
    },
  },
  {
    id: "military-helmet",
    name: "Military Helmet",
    slot: "head",
    attributes: {
      armor: 12,
      explosionResistance: 8,
      armorCritResist: 5,
      coldResist: 3,
      heatResist: 3,
      mobility: -3,
      staminaRegen: -3,
      noise: 8,
    },
  },
  {
    id: "cowboy-hat",
    name: "Cowboy Hat",
    slot: "head",
    attributes: {
      armor: 5,
      explosionResistance: 0,
      armorCritResist: 0,
      coldResist: 2,
      heatResist: 8,
      mobility: 0,
      staminaRegen: 0,
      noise: 2,
    },
  },
  {
    id: "leather-armor",
    name: "Leather Armor",
    slot: "body",
    attributes: {
      armor: 20,
      explosionResistance: 5,
      armorCritResist: 5,
      coldResist: 5,
      heatResist: 0,
      mobility: -5,
      staminaRegen: -5,
      noise: 15,
    },
  },
  {
    id: "military-vest",
    name: "Military Vest",
    slot: "body",
    attributes: {
      armor: 30,
      explosionResistance: 15,
      armorCritResist: 10,
      coldResist: 0,
      heatResist: -5,
      mobility: -10,
      staminaRegen: -10,
      noise: 20,
    },
  },
  {
    id: "padded-jacket",
    name: "Padded Jacket",
    slot: "body",
    attributes: {
      armor: 10,
      explosionResistance: 2,
      armorCritResist: 2,
      coldResist: 15,
      heatResist: -10,
      mobility: -3,
      staminaRegen: -3,
      noise: 8,
    },
  },
  {
    id: "running-shoes",
    name: "Running Shoes",
    slot: "feet",
    attributes: {
      armor: 5,
      explosionResistance: 0,
      armorCritResist: 0,
      coldResist: 0,
      heatResist: 0,
      mobility: 5,
      staminaRegen: 5,
      noise: 5,
    },
  },
  {
    id: "military-boots",
    name: "Military Boots",
    slot: "feet",
    attributes: {
      armor: 10,
      explosionResistance: 2,
      armorCritResist: 2,
      coldResist: 5,
      heatResist: 0,
      mobility: 0,
      staminaRegen: 0,
      noise: 10,
    },
  },
  {
    id: "steel-toe-boots",
    name: "Steel Toe Boots",
    slot: "feet",
    attributes: {
      armor: 15,
      explosionResistance: 5,
      armorCritResist: 3,
      coldResist: 5,
      heatResist: -2,
      mobility: -5,
      staminaRegen: -5,
      noise: 15,
    },
  },
  {
    id: "leather-gloves",
    name: "Leather Gloves",
    slot: "hands",
    attributes: {
      armor: 5,
      explosionResistance: 0,
      armorCritResist: 0,
      coldResist: 3,
      heatResist: 0,
      mobility: 0,
      staminaRegen: 0,
      noise: 0,
    },
  },
  {
    id: "tactical-gloves",
    name: "Tactical Gloves",
    slot: "hands",
    attributes: {
      armor: 8,
      explosionResistance: 2,
      armorCritResist: 1,
      coldResist: 2,
      heatResist: 0,
      mobility: 0,
      staminaRegen: 0,
      noise: 0,
    },
  },
  {
    id: "work-gloves",
    name: "Work Gloves",
    slot: "hands",
    attributes: {
      armor: 3,
      explosionResistance: 0,
      armorCritResist: 0,
      coldResist: 1,
      heatResist: 0,
      mobility: 0,
      staminaRegen: 0,
      noise: 0,
    },
  },
]

// Calculate the cost of upgrading an attribute to a specific level
const getAttributeLevelCost = (level: number): number => {
  if (level <= 5) return 1
  if (level <= 8) return 2
  return 3
}

// Calculate the total cost of an attribute at a specific level
const getAttributeTotalCost = (level: number): number => {
  let total = 0
  for (let i = 1; i < level; i++) {
    total += getAttributeLevelCost(i + 1)
  }
  return total
}

export default function CharacterBuilder() {
  const [build, setBuild] = useState<CharacterBuild>({
    level: 1,
    availablePoints: 0,
    attributes: {
      perception: {
        level: 1,
        skills: {
          deadEye: 0,
          animalTracker: 0,
          lockPicking: 0,
          luckyLooter: 0,
          salvageOperations: 0,
        },
      },
      strength: {
        level: 1,
        skills: {
          skullCrusher: 0,
          pummelPete: 0,
          boomstick: 0,
          miner69er: 0,
          motherLode: 0,
          packMule: 0,
        },
      },
      fortitude: {
        level: 1,
        skills: {
          huntsman: 0,
          healingFactor: 0,
          ironGut: 0,
          cardio: 0,
          livingOffTheLand: 0,
          painTolerance: 0,
        },
      },
      agility: {
        level: 1,
        skills: {
          gunslinger: 0,
          archery: 0,
          deepCuts: 0,
          runAndGun: 0,
          lightArmor: 0,
          parkour: 0,
        },
      },
      intellect: {
        level: 1,
        skills: {
          daringAdventurer: 0,
          betterBarter: 0,
          charismaticNature: 0,
          advancedEngineering: 0,
          roboticsInventor: 0,
          greaseMonkey: 0,
        },
      },
    },
    equipment: {
      head: null,
      body: null,
      feet: null,
      hands: null,
    },
  })

  // Calculate total points based on level
  useEffect(() => {
    const totalPoints = build.level - 1

    // Calculate used points
    let usedPoints = 0

    // Add up attribute costs
    Object.values(build.attributes).forEach((attribute) => {
      usedPoints += getAttributeTotalCost(attribute.level)

      // Add up skill costs
      Object.values(attribute.skills).forEach((skillLevel) => {
        usedPoints += skillLevel
      })
    })

    setBuild((prev) => ({
      ...prev,
      availablePoints: totalPoints - usedPoints,
    }))
  }, [build.level, build.attributes])

  // Handle level change
  const handleLevelChange = (value: number) => {
    setBuild((prev) => ({
      ...prev,
      level: value,
    }))
  }

  // Handle attribute level change
  const handleAttributeLevelChange = (attribute: string, newLevel: number) => {
    if (newLevel < 1 || newLevel > 10) return

    const currentLevel = build.attributes[attribute].level

    // Calculate point difference
    let pointDifference = 0
    if (newLevel > currentLevel) {
      for (let i = currentLevel; i < newLevel; i++) {
        pointDifference += getAttributeLevelCost(i + 1)
      }
    } else {
      for (let i = newLevel; i < currentLevel; i++) {
        pointDifference -= getAttributeLevelCost(i + 1)
      }
    }

    // Check if we have enough points
    if (pointDifference > build.availablePoints) return

    setBuild((prev) => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [attribute]: {
          ...prev.attributes[attribute],
          level: newLevel,
        },
      },
    }))
  }

  // Handle skill level change
  const handleSkillLevelChange = (attribute: string, skill: string, newLevel: number) => {
    if (newLevel < 0 || newLevel > 4) return

    const currentLevel = build.attributes[attribute].skills[skill]
    const pointDifference = newLevel - currentLevel

    // Check if we have enough points
    if (pointDifference > build.availablePoints) return

    setBuild((prev) => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [attribute]: {
          ...prev.attributes[attribute],
          skills: {
            ...prev.attributes[attribute].skills,
            [skill]: newLevel,
          },
        },
      },
    }))
  }

  // Handle equipment change
  const handleEquipmentChange = (slot: string, equipmentId: string) => {
    if (equipmentId === "none") {
      setBuild((prev) => ({
        ...prev,
        equipment: {
          ...prev.equipment,
          [slot]: null,
        },
      }))
      return
    }

    const selectedEquipment = equipmentData.find((item) => item.id === equipmentId) || null

    setBuild((prev) => ({
      ...prev,
      equipment: {
        ...prev.equipment,
        [slot]: selectedEquipment,
      },
    }))
  }

  // Calculate derived stats
  const calculateStats = () => {
    // Base stats from attributes
    const stats = {
      health: 100 + build.attributes.fortitude.level * 10,
      stamina: 100 + build.attributes.agility.level * 10,
      carryCapacity: 50 + build.attributes.strength.level * 10,
      craftingSpeed: 100 + build.attributes.intellect.level * 5,
      damageResistance: build.attributes.fortitude.level * 2,
      meleeAttack: build.attributes.strength.level * 5,
      rangedAttack: build.attributes.perception.level * 5,
      mobility: 100,
      armor: 0,
      explosionResistance: 0,
      armorCritResist: 0,
      coldResist: 0,
      heatResist: 0,
      staminaRegen: 100,
      noise: 0,
    }

    // Add equipment bonuses
    Object.values(build.equipment).forEach((item) => {
      if (!item) return

      Object.entries(item.attributes).forEach(([attr, value]) => {
        if (stats.hasOwnProperty(attr)) {
          stats[attr] += value
        }
      })
    })

    return stats
  }

  const stats = calculateStats()

  // Skill definitions with icons
  const skillDefinitions = {
    perception: [
      {
        name: "deadEye",
        label: "Dead Eye",
        icon: <Target className="h-5 w-5" />,
        description: "Increases headshot damage with rifles and pistols",
      },
      {
        name: "animalTracker",
        label: "Animal Tracker",
        icon: <Compass className="h-5 w-5" />,
        description: "Reveals animal locations on the compass",
      },
      {
        name: "lockPicking",
        label: "Lock Picking",
        icon: <Key className="h-5 w-5" />,
        description: "Allows you to pick locks more effectively",
      },
      {
        name: "luckyLooter",
        label: "Lucky Looter",
        icon: <Search className="h-5 w-5" />,
        description: "Increases the quality of items found while looting",
      },
      {
        name: "salvageOperations",
        label: "Salvage Operations",
        icon: <Wrench className="h-5 w-5" />,
        description: "Increases the amount of resources gained from salvaging",
      },
    ],
    strength: [
      {
        name: "skullCrusher",
        label: "Skull Crusher",
        icon: <Skull className="h-5 w-5" />,
        description: "Increases damage with clubs and sledgehammers",
      },
      {
        name: "pummelPete",
        label: "Pummel Pete",
        icon: <Axe className="h-5 w-5" />,
        description: "Increases damage with axes and knives",
      },
      {
        name: "boomstick",
        label: "Boomstick",
        icon: <Bomb className="h-5 w-5" />,
        description: "Increases damage with shotguns",
      },
      {
        name: "miner69er",
        label: "Miner 69'er",
        icon: <Pickaxe className="h-5 w-5" />,
        description: "Increases mining speed and block damage",
      },
      {
        name: "motherLode",
        label: "Mother Lode",
        icon: <Pickaxe className="h-5 w-5" />,
        description: "Increases the amount of resources gained from mining",
      },
      {
        name: "packMule",
        label: "Pack Mule",
        icon: <Package className="h-5 w-5" />,
        description: "Increases carrying capacity",
      },
    ],
    fortitude: [
      {
        name: "huntsman",
        label: "The Huntsman",
        icon: <Deer className="h-5 w-5" />,
        description: "Increases damage against animals and harvesting yield",
      },
      {
        name: "healingFactor",
        label: "Healing Factor",
        icon: <Activity className="h-5 w-5" />,
        description: "Increases health regeneration",
      },
      {
        name: "ironGut",
        label: "Iron Gut",
        icon: <Apple className="h-5 w-5" />,
        description: "Reduces food poisoning chance and increases food effectiveness",
      },
      {
        name: "cardio",
        label: "Cardio",
        icon: <Lungs className="h-5 w-5" />,
        description: "Increases stamina and stamina regeneration",
      },
      {
        name: "livingOffTheLand",
        label: "Living Off The Land",
        icon: <Leaf className="h-5 w-5" />,
        description: "Increases harvesting yield from plants",
      },
      {
        name: "painTolerance",
        label: "Pain Tolerance",
        icon: <Pill className="h-5 w-5" />,
        description: "Reduces damage taken and increases resistance to stunning",
      },
    ],
    agility: [
      {
        name: "gunslinger",
        label: "Gunslinger",
        icon: <Gun className="h-5 w-5" />,
        description: "Increases damage with pistols",
      },
      {
        name: "archery",
        label: "Archery",
        icon: <Bow className="h-5 w-5" />,
        description: "Increases damage with bows and crossbows",
      },
      {
        name: "deepCuts",
        label: "Deep Cuts",
        icon: <Scissors className="h-5 w-5" />,
        description: "Increases bleeding damage with bladed weapons",
      },
      {
        name: "runAndGun",
        label: "Run and Gun",
        icon: <Running className="h-5 w-5" />,
        description: "Reduces stamina cost when running and shooting",
      },
      {
        name: "lightArmor",
        label: "Light Armor",
        icon: <Feather className="h-5 w-5" />,
        description: "Increases effectiveness of light armor",
      },
      {
        name: "parkour",
        label: "Parkour",
        icon: <Mountain className="h-5 w-5" />,
        description: "Increases jumping height and reduces fall damage",
      },
    ],
    intellect: [
      {
        name: "daringAdventurer",
        label: "Daring Adventurer",
        icon: <Map className="h-5 w-5" />,
        description: "Increases quest reward choices",
      },
      {
        name: "betterBarter",
        label: "Better Barter",
        icon: <ShoppingCart className="h-5 w-5" />,
        description: "Improves buying and selling prices",
      },
      {
        name: "charismaticNature",
        label: "Charismatic Nature",
        icon: <Users className="h-5 w-5" />,
        description: "Improves interactions with NPCs",
      },
      {
        name: "advancedEngineering",
        label: "Advanced Engineering",
        icon: <Cog className="h-5 w-5" />,
        description: "Unlocks advanced crafting recipes",
      },
      {
        name: "roboticsInventor",
        label: "Robotics Inventor",
        icon: <Cpu className="h-5 w-5" />,
        description: "Allows crafting and controlling of robotic devices",
      },
      {
        name: "greaseMonkey",
        label: "Grease Monkey",
        icon: <Tool className="h-5 w-5" />,
        description: "Improves vehicle crafting and maintenance",
      },
    ],
  }

  // Attribute components with icons
  const attributeComponents: Attribute[] = [
    {
      name: "perception",
      value: build.attributes.perception.level,
      icon: <Crosshair className="h-5 w-5" />,
      color: "text-yellow-500",
      skills: [],
    },
    {
      name: "strength",
      value: build.attributes.strength.level,
      icon: <Dumbbell className="h-5 w-5" />,
      color: "text-red-500",
      skills: [],
    },
    {
      name: "fortitude",
      value: build.attributes.fortitude.level,
      icon: <Shield className="h-5 w-5" />,
      color: "text-blue-500",
      skills: [],
    },
    {
      name: "agility",
      value: build.attributes.agility.level,
      icon: <Zap className="h-5 w-5" />,
      color: "text-green-500",
      skills: [],
    },
    {
      name: "intellect",
      value: build.attributes.intellect.level,
      icon: <Brain className="h-5 w-5" />,
      color: "text-purple-500",
      skills: [],
    },
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">7 Days to Die Character Builder</h1>

      <div className="grid gap-8">
        {/* Level Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Character Level</CardTitle>
            <CardDescription>Set your character level to determine available skill points</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Label htmlFor="level">Level: {build.level}</Label>
              <Slider
                id="level"
                min={1}
                max={50}
                step={1}
                value={[build.level]}
                onValueChange={(value) => handleLevelChange(value[0])}
                className="flex-1"
              />
              <Badge variant="outline" className="ml-2">
                Available Points: {build.availablePoints}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Main Sections */}
        <Tabs defaultValue="skills" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="skills">Skill Points</TabsTrigger>
            <TabsTrigger value="equipment">Equipment</TabsTrigger>
            <TabsTrigger value="summary">Character Summary</TabsTrigger>
          </TabsList>

          {/* Skills Tab */}
          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>Skill Points Distribution</CardTitle>
                <CardDescription>Allocate your skill points to different attributes and skills</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="perception" className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="perception" className="flex items-center gap-2">
                      <Crosshair className="h-4 w-4 text-yellow-500" />
                      <span>Perception</span>
                    </TabsTrigger>
                    <TabsTrigger value="strength" className="flex items-center gap-2">
                      <Dumbbell className="h-4 w-4 text-red-500" />
                      <span>Strength</span>
                    </TabsTrigger>
                    <TabsTrigger value="fortitude" className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-blue-500" />
                      <span>Fortitude</span>
                    </TabsTrigger>
                    <TabsTrigger value="agility" className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-green-500" />
                      <span>Agility</span>
                    </TabsTrigger>
                    <TabsTrigger value="intellect" className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-purple-500" />
                      <span>Intellect</span>
                    </TabsTrigger>
                  </TabsList>

                  {/* Perception Tab */}
                  <TabsContent value="perception">
                    <div className="space-y-6">
                      {/* Attribute Level */}
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Crosshair className="h-5 w-5 text-yellow-500" />
                          <Label className="text-lg font-semibold">
                            Perception Level: {build.attributes.perception.level}
                          </Label>
                          <Badge variant="outline" className="ml-auto">
                            {build.attributes.perception.level < 10
                              ? `Next Level: ${getAttributeLevelCost(build.attributes.perception.level + 1)} points`
                              : "Max Level"}
                          </Badge>
                        </div>
                        <Progress value={build.attributes.perception.level * 10} className="h-2 mb-2" />
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleAttributeLevelChange("perception", build.attributes.perception.level - 1)
                            }
                            disabled={build.attributes.perception.level <= 1}
                          >
                            -
                          </Button>
                          <div className="flex-1 text-center">
                            <span className="text-sm text-muted-foreground">
                              Level {build.attributes.perception.level}/10
                            </span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleAttributeLevelChange("perception", build.attributes.perception.level + 1)
                            }
                            disabled={
                              build.attributes.perception.level >= 10 ||
                              build.availablePoints < getAttributeLevelCost(build.attributes.perception.level + 1)
                            }
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Perception Skills</h3>
                        {skillDefinitions.perception.map((skill) => (
                          <div key={skill.name} className="p-4 border rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              {skill.icon}
                              <Label className="font-medium">{skill.label}</Label>
                              <Badge variant="outline" className="ml-auto">
                                Level: {build.attributes.perception.skills[skill.name]}/4
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{skill.description}</p>
                            <Progress
                              value={build.attributes.perception.skills[skill.name] * 25}
                              className="h-2 mb-2"
                            />
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleSkillLevelChange(
                                    "perception",
                                    skill.name,
                                    build.attributes.perception.skills[skill.name] - 1,
                                  )
                                }
                                disabled={build.attributes.perception.skills[skill.name] <= 0}
                              >
                                -
                              </Button>
                              <div className="flex-1 text-center">
                                <span className="text-sm text-muted-foreground">
                                  {build.attributes.perception.skills[skill.name] === 0
                                    ? "Not Learned"
                                    : `Level ${build.attributes.perception.skills[skill.name]}`}
                                </span>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleSkillLevelChange(
                                    "perception",
                                    skill.name,
                                    build.attributes.perception.skills[skill.name] + 1,
                                  )
                                }
                                disabled={
                                  build.attributes.perception.skills[skill.name] >= 4 ||
                                  build.availablePoints < 1 ||
                                  build.attributes.perception.level < build.attributes.perception.skills[skill.name] + 1
                                }
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Strength Tab */}
                  <TabsContent value="strength">
                    <div className="space-y-6">
                      {/* Attribute Level */}
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Dumbbell className="h-5 w-5 text-red-500" />
                          <Label className="text-lg font-semibold">
                            Strength Level: {build.attributes.strength.level}
                          </Label>
                          <Badge variant="outline" className="ml-auto">
                            {build.attributes.strength.level < 10
                              ? `Next Level: ${getAttributeLevelCost(build.attributes.strength.level + 1)} points`
                              : "Max Level"}
                          </Badge>
                        </div>
                        <Progress value={build.attributes.strength.level * 10} className="h-2 mb-2" />
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAttributeLevelChange("strength", build.attributes.strength.level - 1)}
                            disabled={build.attributes.strength.level <= 1}
                          >
                            -
                          </Button>
                          <div className="flex-1 text-center">
                            <span className="text-sm text-muted-foreground">
                              Level {build.attributes.strength.level}/10
                            </span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAttributeLevelChange("strength", build.attributes.strength.level + 1)}
                            disabled={
                              build.attributes.strength.level >= 10 ||
                              build.availablePoints < getAttributeLevelCost(build.attributes.strength.level + 1)
                            }
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Strength Skills</h3>
                        {skillDefinitions.strength.map((skill) => (
                          <div key={skill.name} className="p-4 border rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              {skill.icon}
                              <Label className="font-medium">{skill.label}</Label>
                              <Badge variant="outline" className="ml-auto">
                                Level: {build.attributes.strength.skills[skill.name]}/4
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{skill.description}</p>
                            <Progress value={build.attributes.strength.skills[skill.name] * 25} className="h-2 mb-2" />
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleSkillLevelChange(
                                    "strength",
                                    skill.name,
                                    build.attributes.strength.skills[skill.name] - 1,
                                  )
                                }
                                disabled={build.attributes.strength.skills[skill.name] <= 0}
                              >
                                -
                              </Button>
                              <div className="flex-1 text-center">
                                <span className="text-sm text-muted-foreground">
                                  {build.attributes.strength.skills[skill.name] === 0
                                    ? "Not Learned"
                                    : `Level ${build.attributes.strength.skills[skill.name]}`}
                                </span>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleSkillLevelChange(
                                    "strength",
                                    skill.name,
                                    build.attributes.strength.skills[skill.name] + 1,
                                  )
                                }
                                disabled={
                                  build.attributes.strength.skills[skill.name] >= 4 ||
                                  build.availablePoints < 1 ||
                                  build.attributes.strength.level < build.attributes.strength.skills[skill.name] + 1
                                }
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Fortitude Tab */}
                  <TabsContent value="fortitude">
                    <div className="space-y-6">
                      {/* Attribute Level */}
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="h-5 w-5 text-blue-500" />
                          <Label className="text-lg font-semibold">
                            Fortitude Level: {build.attributes.fortitude.level}
                          </Label>
                          <Badge variant="outline" className="ml-auto">
                            {build.attributes.fortitude.level < 10
                              ? `Next Level: ${getAttributeLevelCost(build.attributes.fortitude.level + 1)} points`
                              : "Max Level"}
                          </Badge>
                        </div>
                        <Progress value={build.attributes.fortitude.level * 10} className="h-2 mb-2" />
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleAttributeLevelChange("fortitude", build.attributes.fortitude.level - 1)
                            }
                            disabled={build.attributes.fortitude.level <= 1}
                          >
                            -
                          </Button>
                          <div className="flex-1 text-center">
                            <span className="text-sm text-muted-foreground">
                              Level {build.attributes.fortitude.level}/10
                            </span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleAttributeLevelChange("fortitude", build.attributes.fortitude.level + 1)
                            }
                            disabled={
                              build.attributes.fortitude.level >= 10 ||
                              build.availablePoints < getAttributeLevelCost(build.attributes.fortitude.level + 1)
                            }
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Fortitude Skills</h3>
                        {skillDefinitions.fortitude.map((skill) => (
                          <div key={skill.name} className="p-4 border rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              {skill.icon}
                              <Label className="font-medium">{skill.label}</Label>
                              <Badge variant="outline" className="ml-auto">
                                Level: {build.attributes.fortitude.skills[skill.name]}/4
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{skill.description}</p>
                            <Progress value={build.attributes.fortitude.skills[skill.name] * 25} className="h-2 mb-2" />
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleSkillLevelChange(
                                    "fortitude",
                                    skill.name,
                                    build.attributes.fortitude.skills[skill.name] - 1,
                                  )
                                }
                                disabled={build.attributes.fortitude.skills[skill.name] <= 0}
                              >
                                -
                              </Button>
                              <div className="flex-1 text-center">
                                <span className="text-sm text-muted-foreground">
                                  {build.attributes.fortitude.skills[skill.name] === 0
                                    ? "Not Learned"
                                    : `Level ${build.attributes.fortitude.skills[skill.name]}`}
                                </span>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleSkillLevelChange(
                                    "fortitude",
                                    skill.name,
                                    build.attributes.fortitude.skills[skill.name] + 1,
                                  )
                                }
                                disabled={
                                  build.attributes.fortitude.skills[skill.name] >= 4 ||
                                  build.availablePoints < 1 ||
                                  build.attributes.fortitude.level < build.attributes.fortitude.skills[skill.name] + 1
                                }
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Agility Tab */}
                  <TabsContent value="agility">
                    <div className="space-y-6">
                      {/* Attribute Level */}
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="h-5 w-5 text-green-500" />
                          <Label className="text-lg font-semibold">
                            Agility Level: {build.attributes.agility.level}
                          </Label>
                          <Badge variant="outline" className="ml-auto">
                            {build.attributes.agility.level < 10
                              ? `Next Level: ${getAttributeLevelCost(build.attributes.agility.level + 1)} points`
                              : "Max Level"}
                          </Badge>
                        </div>
                        <Progress value={build.attributes.agility.level * 10} className="h-2 mb-2" />
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAttributeLevelChange("agility", build.attributes.agility.level - 1)}
                            disabled={build.attributes.agility.level <= 1}
                          >
                            -
                          </Button>
                          <div className="flex-1 text-center">
                            <span className="text-sm text-muted-foreground">
                              Level {build.attributes.agility.level}/10
                            </span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAttributeLevelChange("agility", build.attributes.agility.level + 1)}
                            disabled={
                              build.attributes.agility.level >= 10 ||
                              build.availablePoints < getAttributeLevelCost(build.attributes.agility.level + 1)
                            }
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Agility Skills</h3>
                        {skillDefinitions.agility.map((skill) => (
                          <div key={skill.name} className="p-4 border rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              {skill.icon}
                              <Label className="font-medium">{skill.label}</Label>
                              <Badge variant="outline" className="ml-auto">
                                Level: {build.attributes.agility.skills[skill.name]}/4
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{skill.description}</p>
                            <Progress value={build.attributes.agility.skills[skill.name] * 25} className="h-2 mb-2" />
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleSkillLevelChange(
                                    "agility",
                                    skill.name,
                                    build.attributes.agility.skills[skill.name] - 1,
                                  )
                                }
                                disabled={build.attributes.agility.skills[skill.name] <= 0}
                              >
                                -
                              </Button>
                              <div className="flex-1 text-center">
                                <span className="text-sm text-muted-foreground">
                                  {build.attributes.agility.skills[skill.name] === 0
                                    ? "Not Learned"
                                    : `Level ${build.attributes.agility.skills[skill.name]}`}
                                </span>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleSkillLevelChange(
                                    "agility",
                                    skill.name,
                                    build.attributes.agility.skills[skill.name] + 1,
                                  )
                                }
                                disabled={
                                  build.attributes.agility.skills[skill.name] >= 4 ||
                                  build.availablePoints < 1 ||
                                  build.attributes.agility.level < build.attributes.agility.skills[skill.name] + 1
                                }
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Intellect Tab */}
                  <TabsContent value="intellect">
                    <div className="space-y-6">
                      {/* Attribute Level */}
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Brain className="h-5 w-5 text-purple-500" />
                          <Label className="text-lg font-semibold">
                            Intellect Level: {build.attributes.intellect.level}
                          </Label>
                          <Badge variant="outline" className="ml-auto">
                            {build.attributes.intellect.level < 10
                              ? `Next Level: ${getAttributeLevelCost(build.attributes.intellect.level + 1)} points`
                              : "Max Level"}
                          </Badge>
                        </div>
                        <Progress value={build.attributes.intellect.level * 10} className="h-2 mb-2" />
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleAttributeLevelChange("intellect", build.attributes.intellect.level - 1)
                            }
                            disabled={build.attributes.intellect.level <= 1}
                          >
                            -
                          </Button>
                          <div className="flex-1 text-center">
                            <span className="text-sm text-muted-foreground">
                              Level {build.attributes.intellect.level}/10
                            </span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleAttributeLevelChange("intellect", build.attributes.intellect.level + 1)
                            }
                            disabled={
                              build.attributes.intellect.level >= 10 ||
                              build.availablePoints < getAttributeLevelCost(build.attributes.intellect.level + 1)
                            }
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Intellect Skills</h3>
                        {skillDefinitions.intellect.map((skill) => (
                          <div key={skill.name} className="p-4 border rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              {skill.icon}
                              <Label className="font-medium">{skill.label}</Label>
                              <Badge variant="outline" className="ml-auto">
                                Level: {build.attributes.intellect.skills[skill.name]}/4
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{skill.description}</p>
                            <Progress value={build.attributes.intellect.skills[skill.name] * 25} className="h-2 mb-2" />
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleSkillLevelChange(
                                    "intellect",
                                    skill.name,
                                    build.attributes.intellect.skills[skill.name] - 1,
                                  )
                                }
                                disabled={build.attributes.intellect.skills[skill.name] <= 0}
                              >
                                -
                              </Button>
                              <div className="flex-1 text-center">
                                <span className="text-sm text-muted-foreground">
                                  {build.attributes.intellect.skills[skill.name] === 0
                                    ? "Not Learned"
                                    : `Level ${build.attributes.intellect.skills[skill.name]}`}
                                </span>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleSkillLevelChange(
                                    "intellect",
                                    skill.name,
                                    build.attributes.intellect.skills[skill.name] + 1,
                                  )
                                }
                                disabled={
                                  build.attributes.intellect.skills[skill.name] >= 4 ||
                                  build.availablePoints < 1 ||
                                  build.attributes.intellect.level < build.attributes.intellect.skills[skill.name] + 1
                                }
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Equipment Tab */}
          <TabsContent value="equipment">
            <Card>
              <CardHeader>
                <CardTitle>Equipment Selection</CardTitle>
                <CardDescription>Choose equipment for each slot to enhance your character</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Head Equipment */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Glasses className="h-5 w-5 text-orange-500" />
                      <Label>Head</Label>
                    </div>
                    <Select
                      value={build.equipment.head?.id || "none"}
                      onValueChange={(value) => handleEquipmentChange("head", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select head gear" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {equipmentData
                          .filter((item) => item.slot === "head")
                          .map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    {build.equipment.head && (
                      <div className="text-sm text-muted-foreground mt-2 space-y-1">
                        {Object.entries(build.equipment.head.attributes).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="capitalize">{key.replace(/([A-Z])/g, " $1").trim()}:</span>
                            <span className={value >= 0 ? "text-green-500" : "text-red-500"}>
                              {value > 0 ? `+${value}` : value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Body Equipment */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Shirt className="h-5 w-5 text-blue-500" />
                      <Label>Body</Label>
                    </div>
                    <Select
                      value={build.equipment.body?.id || "none"}
                      onValueChange={(value) => handleEquipmentChange("body", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select body armor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {equipmentData
                          .filter((item) => item.slot === "body")
                          .map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    {build.equipment.body && (
                      <div className="text-sm text-muted-foreground mt-2 space-y-1">
                        {Object.entries(build.equipment.body.attributes).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="capitalize">{key.replace(/([A-Z])/g, " $1").trim()}:</span>
                            <span className={value >= 0 ? "text-green-500" : "text-red-500"}>
                              {value > 0 ? `+${value}` : value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Feet Equipment */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Footprints className="h-5 w-5 text-yellow-500" />
                      <Label>Feet</Label>
                    </div>
                    <Select
                      value={build.equipment.feet?.id || "none"}
                      onValueChange={(value) => handleEquipmentChange("feet", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select footwear" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {equipmentData
                          .filter((item) => item.slot === "feet")
                          .map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    {build.equipment.feet && (
                      <div className="text-sm text-muted-foreground mt-2 space-y-1">
                        {Object.entries(build.equipment.feet.attributes).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="capitalize">{key.replace(/([A-Z])/g, " $1").trim()}:</span>
                            <span className={value >= 0 ? "text-green-500" : "text-red-500"}>
                              {value > 0 ? `+${value}` : value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Hands Equipment */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Hand className="h-5 w-5 text-red-500" />
                      <Label>Hands</Label>
                    </div>
                    <Select
                      value={build.equipment.hands?.id || "none"}
                      onValueChange={(value) => handleEquipmentChange("hands", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gloves" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {equipmentData
                          .filter((item) => item.slot === "hands")
                          .map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    {build.equipment.hands && (
                      <div className="text-sm text-muted-foreground mt-2 space-y-1">
                        {Object.entries(build.equipment.hands.attributes).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="capitalize">{key.replace(/([A-Z])/g, " $1").trim()}:</span>
                            <span className={value >= 0 ? "text-green-500" : "text-red-500"}>
                              {value > 0 ? `+${value}` : value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Summary Tab */}
          <TabsContent value="summary">
            <Card>
              <CardHeader>
                <CardTitle>Character Summary</CardTitle>
                <CardDescription>Overview of your character's statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Base Attributes</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {attributeComponents.map((attribute) => (
                        <div key={attribute.name} className="flex items-center gap-2">
                          <div className={`${attribute.color}`}>{attribute.icon}</div>
                          <span className="capitalize">{attribute.name}:</span>
                          <span className="font-bold">{build.attributes[attribute.name].level}</span>
                        </div>
                      ))}
                    </div>

                    <Separator className="my-4" />

                    <h3 className="text-lg font-semibold mb-2">Equipment</h3>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Glasses className="h-4 w-4 text-orange-500" />
                        <span>Head:</span>
                        <span className="font-medium">{build.equipment.head?.name || "None"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shirt className="h-4 w-4 text-blue-500" />
                        <span>Body:</span>
                        <span className="font-medium">{build.equipment.body?.name || "None"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Footprints className="h-4 w-4 text-yellow-500" />
                        <span>Feet:</span>
                        <span className="font-medium">{build.equipment.feet?.name || "None"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Hand className="h-4 w-4 text-red-500" />
                        <span>Hands:</span>
                        <span className="font-medium">{build.equipment.hands?.name || "None"}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Derived Statistics</h3>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span>Health:</span>
                        <span className="font-bold">{stats.health}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        <span>Stamina:</span>
                        <span className="font-bold">{stats.stamina}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-blue-500" />
                        <span>Armor:</span>
                        <span className="font-bold">{stats.armor}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Dumbbell className="h-4 w-4 text-orange-500" />
                        <span>Carry Capacity:</span>
                        <span className="font-bold">{stats.carryCapacity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Hammer className="h-4 w-4 text-purple-500" />
                        <span>Melee Damage:</span>
                        <span className="font-bold">{stats.meleeAttack}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Crosshair className="h-4 w-4 text-green-500" />
                        <span>Ranged Damage:</span>
                        <span className="font-bold">{stats.rangedAttack}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Brain className="h-4 w-4 text-indigo-500" />
                        <span>Crafting Speed:</span>
                        <span className="font-bold">{stats.craftingSpeed}%</span>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <h3 className="text-lg font-semibold mb-2">Armor Properties</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2">
                        <span>Explosion Resistance:</span>
                        <span className="font-bold">{stats.explosionResistance}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>Armor Crit Resist:</span>
                        <span className="font-bold">{stats.armorCritResist}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>Cold Resist:</span>
                        <span className="font-bold">{stats.coldResist}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>Heat Resist:</span>
                        <span className="font-bold">{stats.heatResist}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>Mobility:</span>
                        <span className={stats.mobility < 100 ? "font-bold text-red-500" : "font-bold text-green-500"}>
                          {stats.mobility}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>Stamina Regen:</span>
                        <span
                          className={stats.staminaRegen < 100 ? "font-bold text-red-500" : "font-bold text-green-500"}
                        >
                          {stats.staminaRegen}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>Noise:</span>
                        <span className={stats.noise > 0 ? "font-bold text-red-500" : "font-bold"}>
                          {stats.noise > 0 ? `+${stats.noise}%` : `${stats.noise}%`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

