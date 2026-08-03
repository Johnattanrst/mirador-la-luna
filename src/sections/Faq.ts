import { escapeHtml } from '../utils/html'
import { renderSection } from '../components/Section'
import faqItems from '../data/faq.json'
import features from '../config/features.json'

export function renderFaq(): string {
  const bodyHtml = `
    <div class="faq__list">
      ${faqItems
        .map((item) => {
          const answerHTML = escapeHtml(item.answer).replace(/\n/g, '<br />')
          return `
            <details class="faq__item">
              <summary class="faq__question">${escapeHtml(item.question)}</summary>
              <p class="faq__answer">${answerHTML}</p>
            </details>
          `
      })
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
