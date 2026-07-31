import { escapeHtml } from '../utils/html'
import { renderSection } from '../components/Section'
import { renderButton } from '../components/Button'
import siteConfig from '../data/site-config.json'
import features from '../config/features.json'

export function renderContact(): string {
  const { contact, openingHours } = siteConfig

  const bodyHtml = `
    <div class="contact__grid">
      <div class="contact__col">
        <h3 class="contact__heading">Escríbenos</h3>
        <div class="contact__actions">
          ${renderButton({ label: 'WhatsApp', href: contact.whatsapp, variant: 'primary', target: '_blank', visible: features.buttons.reserveWhatsapp })}
          ${renderButton({ label: 'Instagram', href: contact.instagram, variant: 'secondary', target: '_blank' })}
          ${renderButton({ label: 'Facebook', href: contact.facebook, variant: 'secondary', target: '_blank' })}
          ${renderButton({ label: 'TikTok', href: contact.tiktok, variant: 'secondary', target: '_blank' })}
        </div>
        <p class="contact__detail"><a href="mailto:${escapeHtml(contact.email)}">${escapeHtml(contact.email)}</a></p>
        <p class="contact__detail"><a href="tel:${escapeHtml(contact.phone.replace(/\s+/g, ''))}">${escapeHtml(contact.phone)}</a></p>
      </div>
      <div class="contact__col">
        <h3 class="contact__heading">Horario</h3>
        <table class="contact__hours">
          ${openingHours
            .map(
              (row) => `<tr><td>${escapeHtml(row.days)}</td><td>${escapeHtml(row.hours)}</td></tr>`,
            )
            .join('')}
        </table>
      </div>
    </div>
  `

  return renderSection({
    id: 'contact',
    title: 'Contacto',
    bodyHtml,
    visible: features.sections.contact,
  })
}
