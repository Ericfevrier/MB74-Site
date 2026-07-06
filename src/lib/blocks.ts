/**
 * Modèle de contenu « par blocs » pour les pages libres (page-builder).
 * Types partagés entre l'éditeur admin et le rendu public (BlockRenderer).
 */
export type BlockType = 'heading' | 'richtext' | 'image' | 'imageText' | 'cards' | 'cta' | 'faq' | 'gallery';

export interface Block {
  id: string;
  type: BlockType;
  data: any;
}

export interface CustomPage {
  slug: string;
  title: string;
  blocks: Block[];
  seo?: import('./seo').Seo;
  status?: 'published' | 'draft';
}

export const uid = () => Math.random().toString(36).slice(2, 9);

/** Métadonnées des blocs pour la palette admin. */
export const BLOCK_META: Record<BlockType, { label: string; desc: string }> = {
  heading: { label: 'Titre', desc: 'Un titre de section' },
  richtext: { label: 'Texte', desc: 'Paragraphe(s) en texte riche' },
  image: { label: 'Image', desc: 'Une image pleine largeur' },
  imageText: { label: 'Image + texte', desc: 'Image à gauche/droite + texte' },
  cards: { label: 'Cartes', desc: 'Une grille de cartes (titre + texte)' },
  cta: { label: "Appel à l'action", desc: 'Encart avec bouton' },
  faq: { label: 'FAQ', desc: 'Questions / réponses dépliables' },
  gallery: { label: 'Galerie', desc: "Plusieurs images en grille" },
};

export const BLOCK_ORDER: BlockType[] = ['heading', 'richtext', 'image', 'imageText', 'cards', 'cta', 'faq', 'gallery'];

/** Crée un bloc avec ses valeurs par défaut. */
export function newBlock(type: BlockType): Block {
  const data: Record<BlockType, any> = {
    heading: { text: 'Titre de section', level: 'h2', align: 'left' },
    richtext: { markdown: 'Votre texte ici. **Gras**, *italique*, listes, [liens](https://…) supportés.' },
    image: { url: '', alt: '', caption: '', rounded: true },
    imageText: { image: '', position: 'left', title: 'Un titre accrocheur', text: 'Décrivez votre offre ici.', buttonLabel: '', buttonUrl: '' },
    cards: { title: '', items: [{ title: 'Carte 1', text: 'Description', url: '' }, { title: 'Carte 2', text: 'Description', url: '' }] },
    cta: { title: 'Prêt à naviguer ?', text: 'Contactez-nous dès aujourd’hui.', buttonLabel: 'Nous contacter', buttonUrl: '/contact', style: 'cyan' },
    faq: { title: 'Questions fréquentes', items: [{ q: 'Votre question ?', a: 'Votre réponse.' }] },
    gallery: { images: [] },
  };
  return { id: uid(), type, data: data[type] };
}
