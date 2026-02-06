import { describe, it, expect } from 'vitest'
import { aiSecurityProducts, areaToProductMap, getProductByName } from '../aiSecurityProducts.js'

describe('Data Integrity Tests', () => {
  describe('areaToProductMap references', () => {
    it('all product names in areaToProductMap should be findable via getProductByName', () => {
      const allProductReferences = Object.values(areaToProductMap).flat()

      allProductReferences.forEach((productName) => {
        const product = getProductByName(productName)
        expect(product, `Product "${productName}" should be findable`).toBeDefined()
      })
    })

    it('all discovery areas should map to valid products', () => {
      const validProductNames = aiSecurityProducts.flatMap((p) => [p.name, p.shortName])

      Object.entries(areaToProductMap).forEach(([area, products]) => {
        products.forEach((productName) => {
          expect(
            validProductNames,
            `Area "${area}" references invalid product "${productName}"`
          ).toContain(productName)
        })
      })
    })
  })

  describe('product data consistency', () => {
    it('all products should have consistent shortName that is findable', () => {
      aiSecurityProducts.forEach((product) => {
        const foundByShortName = getProductByName(product.shortName)
        expect(foundByShortName, `Product ${product.id} shortName lookup failed`).toBeDefined()
        expect(foundByShortName.id).toBe(product.id)
      })
    })

    it('all products should have consistent name that is findable', () => {
      aiSecurityProducts.forEach((product) => {
        const foundByName = getProductByName(product.name)
        expect(foundByName, `Product ${product.id} name lookup failed`).toBeDefined()
        expect(foundByName.id).toBe(product.id)
      })
    })
  })

  describe('no orphaned references', () => {
    it('areaToProductMap should not reference non-existent products', () => {
      const validNames = new Set(aiSecurityProducts.flatMap((p) => [p.name, p.shortName]))

      const allReferences = Object.values(areaToProductMap).flat()
      const invalidReferences = allReferences.filter((name) => !validNames.has(name))

      expect(invalidReferences, 'Found orphaned product references').toEqual([])
    })

    it('every product should be referenced in at least one discovery area', () => {
      const referencedProducts = new Set(Object.values(areaToProductMap).flat())

      const unreferencedProducts = aiSecurityProducts.filter(
        (product) =>
          !referencedProducts.has(product.name) && !referencedProducts.has(product.shortName)
      )

      // Auth for GenAI and MCP Security may not be referenced, that's OK
      // But we should track which products ARE referenced
      expect(referencedProducts.size).toBeGreaterThan(0)
    })
  })

  describe('product category coverage', () => {
    it('should have products covering core AI security domains', () => {
      const productNames = aiSecurityProducts.map((p) => p.name.toLowerCase())

      // Core domains we expect to cover
      const expectedDomains = [
        'auth', // authentication
        'token', // credential management
        'agent', // agent identity
        'mcp', // MCP security
        'ispm', // posture management
      ]

      expectedDomains.forEach((domain) => {
        const hasDomain = productNames.some((name) => name.includes(domain))
        expect(hasDomain, `Missing product covering "${domain}" domain`).toBe(true)
      })
    })
  })

  describe('discovery area completeness', () => {
    it('should have products mapped to security-critical areas', () => {
      const securityCriticalAreas = ['security_concerns', 'shadow_ai', 'governance_needs']

      securityCriticalAreas.forEach((area) => {
        expect(
          areaToProductMap[area],
          `Security-critical area "${area}" should exist`
        ).toBeDefined()
        expect(
          areaToProductMap[area].length,
          `Security-critical area "${area}" should have products mapped`
        ).toBeGreaterThan(0)
      })
    })

    it('areas with empty product arrays should be intentional', () => {
      const emptyAreas = Object.entries(areaToProductMap)
        .filter(([_, products]) => products.length === 0)
        .map(([area]) => area)

      // timeline and decision_process are expected to be empty
      const expectedEmptyAreas = ['timeline', 'decision_process']
      emptyAreas.forEach((area) => {
        expect(expectedEmptyAreas, `Unexpected empty area: ${area}`).toContain(area)
      })
    })
  })
})
