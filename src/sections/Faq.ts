import { escapeHtml } from '../utils/html'
import { renderSection } from '../components/Section'
import faqItems from '../data/faq.json'
import features from '../config/features.json'

export function renderFaq(): string {
  const bodyHtml = `
    <div class="faq__list">
      ${faqItems
        .map(
          (item) => `
            <details class="faq__item">
              <summary class="faq__question">${escapeHtml(item.question)}</summary>
              <p class="faq__answer">${escapeHtml(item.answer)}</p>
            </details>
          `,
        )
        .join('')}
    </div>
  `

  return renderSection({
    id: 'faq',
    title: 'Preguntas Frecuentes',
    bodyHtml,
    visible: features.sections.faq,
  })
}
