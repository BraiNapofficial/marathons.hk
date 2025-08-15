// Simple class value type
type ClassValue = string | number | boolean | undefined | null | ClassArray | ClassDictionary
type ClassArray = ClassValue[]
type ClassDictionary = Record<string, any>

// Simple clsx alternative
function clsx(...inputs: ClassValue[]): string {
  const classes: string[] = []
  
  for (const input of inputs) {
    if (!input) continue
    
    if (typeof input === 'string' || typeof input === 'number') {
      classes.push(String(input))
    } else if (Array.isArray(input)) {
      const result = clsx(...input)
      if (result) classes.push(result)
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key)
      }
    }
  }
  
  return classes.join(' ')
}

// Simple tailwind merge alternative - removes duplicate classes, keeping the last one
function twMerge(classNames: string): string {
  if (!classNames) return ''
  
  const classes = classNames.split(' ').filter(Boolean)
  const classMap = new Map<string, string>()
  
  // Group classes by their base property (e.g., 'bg', 'text', 'p', 'm', etc.)
  for (const className of classes) {
    const baseClass = getBaseClass(className)
    classMap.set(baseClass, className)
  }
  
  return Array.from(classMap.values()).join(' ')
}

// Extract base class for conflict resolution
function getBaseClass(className: string): string {
  // Handle responsive prefixes (sm:, md:, lg:, xl:, 2xl:)
  const responsiveMatch = className.match(/^(sm:|md:|lg:|xl:|2xl:)(.+)/)
  if (responsiveMatch) {
    return responsiveMatch[1] + getBaseClass(responsiveMatch[2])
  }
  
  // Handle state prefixes (hover:, focus:, active:, etc.)
  const stateMatch = className.match(/^(hover:|focus:|active:|disabled:|group-hover:|group-focus:)(.+)/)
  if (stateMatch) {
    return stateMatch[1] + getBaseClass(stateMatch[2])
  }
  
  // Extract base property
  const baseMatch = className.match(/^([a-z]+)/)
  return baseMatch ? baseMatch[1] : className
}

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(...inputs))
}

export { type ClassValue }