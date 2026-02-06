import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProductPanel } from '../ProductPanel.jsx'
import { aiSecurityProducts } from '../../../data/aiSecurityProducts.js'

describe('ProductPanel', () => {
  describe('initial render', () => {
    it('should render the panel header', () => {
      render(<ProductPanel />)
      expect(screen.getByText('Product Quick Reference')).toBeInTheDocument()
    })

    it('should render the subtitle', () => {
      render(<ProductPanel />)
      expect(screen.getByText('Identity-focused AI security products')).toBeInTheDocument()
    })

    it('should render all 6 products', () => {
      render(<ProductPanel />)
      aiSecurityProducts.forEach((product) => {
        expect(screen.getByText(product.shortName)).toBeInTheDocument()
      })
    })

    it('should show identity focus for each product', () => {
      render(<ProductPanel />)
      aiSecurityProducts.forEach((product) => {
        expect(screen.getByText(product.identityFocus)).toBeInTheDocument()
      })
    })

    it('should not show expanded details initially', () => {
      render(<ProductPanel />)
      // Pain points should not be visible initially
      expect(screen.queryByText('Pain Points to Listen For:')).not.toBeInTheDocument()
    })
  })

  describe('collapse/expand panel', () => {
    it('should collapse panel when toggle is clicked', async () => {
      const user = userEvent.setup()
      render(<ProductPanel />)

      // Find the collapse toggle button
      const toggleButton = screen.getByTitle('Hide Product Reference')
      await user.click(toggleButton)

      // Content should be hidden
      expect(screen.queryByText('Product Quick Reference')).not.toBeInTheDocument()
    })

    it('should expand panel when toggle is clicked while collapsed', async () => {
      const user = userEvent.setup()
      render(<ProductPanel />)

      // Collapse first
      const toggleButton = screen.getByTitle('Hide Product Reference')
      await user.click(toggleButton)

      // Now expand
      const expandButton = screen.getByTitle('Show Product Reference')
      await user.click(expandButton)

      // Content should be visible again
      expect(screen.getByText('Product Quick Reference')).toBeInTheDocument()
    })
  })

  describe('product card expansion', () => {
    it('should expand product details when product header is clicked', async () => {
      const user = userEvent.setup()
      render(<ProductPanel />)

      // Click on Auth for GenAI product
      const productButton = screen.getByRole('button', { name: /Auth for GenAI/i })
      await user.click(productButton)

      // Should show expanded details
      expect(screen.getByText('Pain Points to Listen For:')).toBeInTheDocument()
      expect(screen.getByText('Use Cases:')).toBeInTheDocument()
    })

    it('should show product description when expanded', async () => {
      const user = userEvent.setup()
      render(<ProductPanel />)

      const product = aiSecurityProducts[0] // Auth for GenAI
      const productButton = screen.getByRole('button', { name: new RegExp(product.shortName, 'i') })
      await user.click(productButton)

      expect(screen.getByText(product.description)).toBeInTheDocument()
    })

    it('should show pain points when expanded', async () => {
      const user = userEvent.setup()
      render(<ProductPanel />)

      const product = aiSecurityProducts[0] // Auth for GenAI
      const productButton = screen.getByRole('button', { name: new RegExp(product.shortName, 'i') })
      await user.click(productButton)

      // Check for quoted pain points
      product.painPoints.forEach((point) => {
        expect(screen.getByText(`"${point}"`)).toBeInTheDocument()
      })
    })

    it('should show use cases when expanded', async () => {
      const user = userEvent.setup()
      render(<ProductPanel />)

      const product = aiSecurityProducts[0] // Auth for GenAI
      const productButton = screen.getByRole('button', { name: new RegExp(product.shortName, 'i') })
      await user.click(productButton)

      product.useCases.forEach((useCase) => {
        expect(screen.getByText(useCase)).toBeInTheDocument()
      })
    })

    it('should collapse product when clicked again', async () => {
      const user = userEvent.setup()
      render(<ProductPanel />)

      const productButton = screen.getByRole('button', { name: /Auth for GenAI/i })

      // Expand
      await user.click(productButton)
      expect(screen.getByText('Pain Points to Listen For:')).toBeInTheDocument()

      // Collapse
      await user.click(productButton)
      expect(screen.queryByText('Pain Points to Listen For:')).not.toBeInTheDocument()
    })

    it('should only show one expanded product at a time', async () => {
      const user = userEvent.setup()
      render(<ProductPanel />)

      // Expand first product
      const firstProduct = screen.getByRole('button', { name: /Auth for GenAI/i })
      await user.click(firstProduct)
      expect(screen.getByText(aiSecurityProducts[0].description)).toBeInTheDocument()

      // Expand second product
      const secondProduct = screen.getByRole('button', { name: /Token Vault/i })
      await user.click(secondProduct)

      // First product should collapse, second should be expanded
      expect(screen.queryByText(aiSecurityProducts[0].description)).not.toBeInTheDocument()
      expect(screen.getByText(aiSecurityProducts[1].description)).toBeInTheDocument()
    })
  })

  describe('product indicator colors', () => {
    it('should display colored indicators for each product', () => {
      render(<ProductPanel />)

      aiSecurityProducts.forEach((product) => {
        const productCard = screen.getByText(product.shortName).closest('.product-card')
        const indicator = productCard.querySelector('.product-indicator')
        expect(indicator).toHaveStyle({ backgroundColor: product.color })
      })
    })
  })

  describe('accessibility', () => {
    it('should have accessible button for toggle', () => {
      render(<ProductPanel />)
      const toggleButton = screen.getByRole('button', { name: /Hide Product Reference/i })
      expect(toggleButton).toBeInTheDocument()
    })

    it('should have accessible buttons for each product', () => {
      render(<ProductPanel />)
      aiSecurityProducts.forEach((product) => {
        const productButton = screen.getByRole('button', {
          name: new RegExp(product.shortName, 'i'),
        })
        expect(productButton).toBeInTheDocument()
      })
    })
  })
})
