import { escapeHtml } from '../utils/html'
import type { NavItem } from '../config/navigation'

export interface FooterSocialLinks {
  whatsapp: string
  instagram: string
  facebook: string
  tiktok: string
}

export interface FooterProps {
  brandName: string
  tagline: string
  items: NavItem[]
  social: FooterSocialLinks
}

function renderSocialLink(label: string, href: string): string {
  return `<li><a class="footer__link" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a></li>`
}

export function renderFooter(props: FooterProps): string {
  const year = new Date().getFullYear()

  return `
    <footer class="footer">
      <div class="footer__inner container">
        <div class="footer__col">
          <p class="footer__brand">${escapeHtml(props.brandName)}</p>
          <p class="footer__tagline">${escapeHtml(props.tagline)}</p>
        </div>
        <div class="footer__col">
          <h3 class="footer__heading">Enlaces rápidos</h3>
          <ul class="footer__links">
            ${props.items
              .map(
                (item) =>
                  `<li><a class="footer__link" href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a></li>`,
              )
              .join('')}
          </ul>
        </div>
        <div class="footer__col">
          <h3 class="footer__heading">Síguenos</h3>
          <ul class="footer__links">
            ${renderSocialLink('WhatsApp', props.social.whatsapp)}
            ${renderSocialLink('Instagram', props.social.instagram)}
            ${renderSocialLink('Facebook', props.social.facebook)}
            ${renderSocialLink('TikTok', props.social.tiktok)}
          </ul>
        </div>
      </div>
      <div class="footer__bottom container">
        <p>&copy; ${year} ${escapeHtml(props.brandName)}. Todos los derechos reservados.</p>
      </div>
    </footer>
  `.trim()
}
