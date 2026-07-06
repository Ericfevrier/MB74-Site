import React, { useRef, useState } from 'react';
import { marked } from 'marked';
import {
  Bold, Italic, Heading2, Heading3, List, ListOrdered, Quote, Code, Link2,
  ImagePlus, Eye, Columns2, Pencil, SquareCode, Minus,
} from 'lucide-react';
import { MediaPicker } from './MediaPicker';

const BTN = 'p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-brand-dark transition';

type Mode = 'write' | 'split' | 'preview';

/**
 * Éditeur Markdown enrichi : barre d'outils (gras, italique, titres, listes,
 * citation, code, liens, images via la médiathèque), aperçu live et vue côte à côte.
 * Le contenu reste du Markdown (rendu par `marked` sur le site) — portable et robuste.
 */
export function MarkdownEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [mode, setMode] = useState<Mode>('write');
  const [picker, setPicker] = useState(false);

  const apply = (fn: (sel: string) => { text: string; selStart?: number; selEnd?: number }) => {
    const ta = ref.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const sel = value.slice(start, end);
    const { text, selStart, selEnd } = fn(sel);
    const next = value.slice(0, start) + text + value.slice(end);
    onChange(next);
    // Restaure une sélection/position utile après le re-render.
    requestAnimationFrame(() => {
      ta.focus();
      const s = start + (selStart ?? text.length);
      const e = start + (selEnd ?? text.length);
      ta.setSelectionRange(s, e);
    });
  };

  const wrap = (before: string, after = before, placeholder = '') =>
    apply((sel) => {
      const inner = sel || placeholder;
      return { text: `${before}${inner}${after}`, selStart: before.length, selEnd: before.length + inner.length };
    });

  const prefixLines = (prefix: string, placeholder = '') =>
    apply((sel) => {
      const body = sel || placeholder;
      const text = body.split('\n').map((l) => `${prefix}${l}`).join('\n');
      return { text, selStart: 0, selEnd: text.length };
    });

  const insertImage = (url: string) =>
    apply(() => {
      const t = `![Description de l’image](${url})`;
      return { text: t, selStart: 2, selEnd: 2 + 'Description de l’image'.length };
    });

  const insertLink = () => {
    const url = window.prompt('URL du lien :', 'https://');
    if (!url) return;
    apply((sel) => {
      const label = sel || 'texte du lien';
      return { text: `[${label}](${url})`, selStart: 1, selEnd: 1 + label.length };
    });
  };

  const Tool = ({ onClick, title, children }: { onClick: () => void; title: string; children: React.ReactNode }) => (
    <button type="button" onClick={onClick} title={title} className={BTN}>{children}</button>
  );

  const html = marked.parse(value || '*Rien à afficher pour l’instant.*') as string;

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      {/* Barre d'outils */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-gray-100 bg-gray-50">
        <Tool onClick={() => wrap('**', '**', 'gras')} title="Gras"><Bold size={16} /></Tool>
        <Tool onClick={() => wrap('*', '*', 'italique')} title="Italique"><Italic size={16} /></Tool>
        <span className="w-px h-5 bg-gray-200 mx-1" />
        <Tool onClick={() => prefixLines('## ', 'Titre de section')} title="Titre H2"><Heading2 size={16} /></Tool>
        <Tool onClick={() => prefixLines('### ', 'Sous-titre')} title="Titre H3"><Heading3 size={16} /></Tool>
        <Tool onClick={() => prefixLines('- ', 'élément')} title="Liste à puces"><List size={16} /></Tool>
        <Tool onClick={() => prefixLines('1. ', 'élément')} title="Liste numérotée"><ListOrdered size={16} /></Tool>
        <Tool onClick={() => prefixLines('> ', 'citation')} title="Citation"><Quote size={16} /></Tool>
        <span className="w-px h-5 bg-gray-200 mx-1" />
        <Tool onClick={() => wrap('`', '`', 'code')} title="Code en ligne"><Code size={16} /></Tool>
        <Tool onClick={() => wrap('\n```\n', '\n```\n', 'bloc de code')} title="Bloc de code"><SquareCode size={16} /></Tool>
        <Tool onClick={() => apply(() => ({ text: '\n\n---\n\n' }))} title="Séparateur"><Minus size={16} /></Tool>
        <span className="w-px h-5 bg-gray-200 mx-1" />
        <Tool onClick={insertLink} title="Lien"><Link2 size={16} /></Tool>
        <Tool onClick={() => setPicker(true)} title="Insérer une image"><ImagePlus size={16} /></Tool>

        {/* Sélecteur de vue */}
        <div className="ml-auto flex items-center gap-0.5 bg-white border border-gray-200 rounded-lg p-0.5">
          <button type="button" onClick={() => setMode('write')} title="Écrire" className={`p-1.5 rounded ${mode === 'write' ? 'bg-brand-dark text-white' : 'text-gray-500'}`}><Pencil size={15} /></button>
          <button type="button" onClick={() => setMode('split')} title="Côte à côte" className={`p-1.5 rounded ${mode === 'split' ? 'bg-brand-dark text-white' : 'text-gray-500'}`}><Columns2 size={15} /></button>
          <button type="button" onClick={() => setMode('preview')} title="Aperçu" className={`p-1.5 rounded ${mode === 'preview' ? 'bg-brand-dark text-white' : 'text-gray-500'}`}><Eye size={15} /></button>
        </div>
      </div>

      {/* Zone d'édition / aperçu */}
      <div className={`grid ${mode === 'split' ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
        {mode !== 'preview' && (
          <textarea
            ref={ref}
            className="w-full h-80 resize-y p-4 text-sm font-mono leading-relaxed text-brand-dark focus:outline-none border-0"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={'## Sous-titre\n\nVotre texte en **markdown**.\n\n- point 1\n- point 2\n\nUtilisez la barre d’outils ci-dessus.'}
          />
        )}
        {mode !== 'write' && (
          <div className={`prose-mb74 h-80 overflow-y-auto p-5 bg-gray-50 ${mode === 'split' ? 'border-l border-gray-100' : ''}`} dangerouslySetInnerHTML={{ __html: html }} />
        )}
      </div>

      <MediaPicker open={picker} onClose={() => setPicker(false)} onSelect={(urls) => urls[0] && insertImage(urls[0])} />
    </div>
  );
}
