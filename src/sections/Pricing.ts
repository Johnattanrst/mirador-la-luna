import { escapeHtml } from '../utils/html'
import { renderSection } from '../components/Section'
import { renderCard } from '../components/Card'
import pricing from '../data/pricing.json'
import features from '../config/features.json'

const currencyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

export function renderPricing(): string {
  const bodyHtml = pricing.categories
    .map(
      (category) => `
        <div class="pricing__category">
          <h3 class="pricing__category-title">${escapeHtml(category.name)}</h3>
          <div class="card-grid">
            ${category.items
              .map((item) =>
                renderCard({
                  title: item.name,
                  description: item.description,
                  meta: `${currencyFormatter.format(item.price)} · ${item.unit}`,
                  featured: item.featured,
                  headingLevel: 4,
                }),
              )
              .join('')}
          </div>
        </div>
      `,
    )
    .join('')

  return renderSection({
    id: 'pricing',
    title: 'Precios',
    bodyHtml,
    visible: features.sections.pricing,
  })
}
