import { describe, it, expect } from 'vitest'
import {
  aiSecurityProducts,
  areaToProductMap,
  getProductsForAreas,
  getProductByName,
  getProductShortNames,
} from '../aiSecurityProducts.js'

describe('aiSecurityProducts data', () => {
  describe('data integrity', () => {
    it('should have exactly 6 products', () => {
      expect(aiSecurityProducts).toHaveLength(6)
    })

    it('each product should have all required fields', () => {
      const requiredFields = [
        'id',
        'name',
        'shortName',
        'identityFocus',
        'description',
        'painPoints',
        'useCases',
        'color',
      ]

      aiSecurityProducts.forEach((product) => {
        requiredFields.forEach((field) => {
          expect(product).toHaveProperty(field)
          expect(product[field]).toBeDefined()
        })
      })
    })

    it('each product should have non-empty painPoints array', () => {
      aiSecurityProducts.forEach((product) => {
        expect(Array.isArray(product.painPoints)).toBe(true)
        expect(product.painPoints.length).toBeGreaterThan(0)
      })
    })

    it('each product should have non-empty useCases array', () => {
      aiSecurityProducts.forEach((product) => {
        expect(Array.isArray(product.useCases)).toBe(true)
        expect(product.useCases.length).toBeGreaterThan(0)
      })
    })

    it('each product should have a valid hex color', () => {
      const hexColorRegex = /^#[0-9a-fA-F]{6}$/
      aiSecurityProducts.forEach((product) => {
        expect(product.color).toMatch(hexColorRegex)
      })
    })

    it('each product should have unique id', () => {
      const ids = aiSecurityProducts.map((p) => p.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })

    it('should contain expected product ids', () => {
      const expectedIds = [
        'auth-for-genai',
        'token-vault',
        'agent-identity',
        'cross-app-access',
        'ispm',
        'mcp-security',
      ]
      const actualIds = aiSecurityProducts.map((p) => p.id)
      expectedIds.forEach((id) => {
        expect(actualIds).toContain(id)
      })
    })
  })

  describe('areaToProductMap', () => {
    it('should have all expected discovery areas', () => {
      const expectedAreas = [
        'security_concerns',
        'shadow_ai',
        'mcp_tool_access',
        'agent_use_cases',
        'governance_needs',
        'current_approach',
        'ai_initiatives',
        'timeline',
        'decision_process',
      ]
      expectedAreas.forEach((area) => {
        expect(areaToProductMap).toHaveProperty(area)
      })
    })

    it('all product references in map should be valid product names', () => {
      const validNames = aiSecurityProducts.flatMap((p) => [p.name, p.shortName])

      Object.values(areaToProductMap).forEach((products) => {
        products.forEach((productName) => {
          expect(validNames).toContain(productName)
        })
      })
    })
  })
})

describe('getProductsForAreas', () => {
  it('should return empty array for empty input', () => {
    expect(getProductsForAreas([])).toEqual([])
  })

  it('should return products for a single area', () => {
    const result = getProductsForAreas(['shadow_ai'])
    expect(result).toEqual(['ISPM'])
  })

  it('should return combined products for multiple areas', () => {
    const result = getProductsForAreas(['security_concerns', 'shadow_ai'])
    expect(result).toContain('Token Vault')
    expect(result).toContain('Agent Identity')
    expect(result).toContain('ISPM')
  })

  it('should deduplicate products that appear in multiple areas', () => {
    const result = getProductsForAreas(['security_concerns', 'governance_needs'])
    // Token Vault appears in both areas, should only appear once
    const tokenVaultCount = result.filter((p) => p === 'Token Vault').length
    expect(tokenVaultCount).toBe(1)
  })

  it('should handle invalid area gracefully', () => {
    const result = getProductsForAreas(['invalid_area'])
    expect(result).toEqual([])
  })

  it('should handle areas with no products', () => {
    const result = getProductsForAreas(['timeline'])
    expect(result).toEqual([])
  })

  it('should return all unique products for all areas with products', () => {
    const areasWithProducts = [
      'security_concerns',
      'shadow_ai',
      'mcp_tool_access',
      'agent_use_cases',
      'governance_needs',
      'current_approach',
      'ai_initiatives',
    ]
    const result = getProductsForAreas(areasWithProducts)

    // Should include products from all areas (deduplicated)
    expect(result.length).toBeGreaterThan(0)
    expect(new Set(result).size).toBe(result.length) // No duplicates
  })
})

describe('getProductByName', () => {
  it('should return product when searching by name', () => {
    const result = getProductByName('Auth for GenAI')
    expect(result).toBeDefined()
    expect(result.id).toBe('auth-for-genai')
  })

  it('should return product when searching by shortName', () => {
    const result = getProductByName('XAA')
    expect(result).toBeDefined()
    expect(result.id).toBe('cross-app-access')
  })

  it('should return product when name and shortName are the same', () => {
    const result = getProductByName('ISPM')
    expect(result).toBeDefined()
    expect(result.id).toBe('ispm')
  })

  it('should return undefined for invalid name', () => {
    const result = getProductByName('Invalid Product')
    expect(result).toBeUndefined()
  })

  it('should return undefined for empty string', () => {
    const result = getProductByName('')
    expect(result).toBeUndefined()
  })

  it('should be case-sensitive', () => {
    const result = getProductByName('ispm') // lowercase
    expect(result).toBeUndefined()
  })
})

describe('getProductShortNames', () => {
  it('should return array of all short names', () => {
    const result = getProductShortNames()
    expect(Array.isArray(result)).toBe(true)
    expect(result).toHaveLength(6)
  })

  it('should contain expected short names', () => {
    const result = getProductShortNames()
    expect(result).toContain('Auth for GenAI')
    expect(result).toContain('Token Vault')
    expect(result).toContain('Agent Identity')
    expect(result).toContain('XAA')
    expect(result).toContain('ISPM')
    expect(result).toContain('MCP Security')
  })

  it('should return same number of items as products array', () => {
    const result = getProductShortNames()
    expect(result.length).toBe(aiSecurityProducts.length)
  })
})
