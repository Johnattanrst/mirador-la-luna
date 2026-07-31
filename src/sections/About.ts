import { renderSection } from '../components/Section'
import features from '../config/features.json'

const ABOUT_IMAGE = {
  src: '/images/about/restaurant-pool.jpg',
  alt: 'Vista del restaurante junto a la piscina, rodeada de montañas',
}

export function renderAbout(): string {
  const bodyHtml = `
    <div class="about__grid">
      <div class="about__image">
        <img
          class="about__image-photo"
          data-blur-img
          data-fallback-img
          src="${ABOUT_IMAGE.src}"
          alt="${ABOUT_IMAGE.alt}"
          loading="lazy"
          decoding="async"
        />
        <span class="about__image-fallback">Foto: restaurante y piscina entre montañas</span>
      </div>
      <div class="about__text">
        <p>
          Mirador La Luna nació del deseo de crear un refugio donde la naturaleza, la gastronomía y la
          calidez humana se encuentran. En lo alto de Bello, Antioquia, ofrecemos una experiencia donde
          cada detalle —desde las luces cálidas hasta el agua de la piscina— invita a desconectarse del
          ritmo de la ciudad.
        </p>
        <p>
          Nuestra misión es sencilla: que cada visita se sienta como una escapada. Familias, parejas y
          amigos encuentran aquí un espacio íntimo y premium, con vistas panorámicas a la montaña y un
          servicio que cuida cada momento del día, del atardecer y de la noche.
        </p>
      </div>
    </div>
  `

  return renderSection({
    id: 'about',
    title: 'Sobre Nosotros',
    bodyHtml,
    visible: features.sections.about,
  })
}
