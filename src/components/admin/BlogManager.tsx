import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Loader2, ArrowLeft, Save, Eye, EyeOff } from 'lucide-react';
import { marked } from 'marked';
import { adminApi, type AdminArticle } from '../../lib/adminApi';
import { BLOG_CATEGORIES } from '../../data/blog';

const INPUT =
  'w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-brand-dark focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 transition';
const LABEL = 'block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1.5';

type Draft = Partial<AdminArticle>;

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // diacritiques
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function emptyDraft(): Draft {
  return {
    category: BLOG_CATEGORIES[0]?.slug || '',
    status: 'published',
    date: new Date().toISOString().slice(0, 10),
    content: '',
  };
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={LABEL}>{label}</label>
      {children}
    </div>
  );
}

function ArticleForm({ initial, onCancel, onSaved }: { initial: Draft; onCancel: () => void; onSaved: () => void }) {
  const [d, setD] = useState<Draft>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState(false);
  const set = (k: keyof Draft, v: any) => setD((p) => ({ ...p, [k]: v }));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      if (d.id) await adminApi.updateArticle(d.id, d);
      else await adminApi.createArticle(d);
      onSaved();
    } catch (err: any) {
      setError(err.message || "Échec de l'enregistrement.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={save} className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 lg:p-8">
      <div className="flex items-center justify-between gap-4 mb-6">
        <button type="button" onClick={onCancel} className="flex items-center gap-1.5 text-sm font-bold text-gray-500 hover:text-brand-dark transition">
          <ArrowLeft size={16} /> Retour
        </button>
        <h2 className="font-bold uppercase tracking-tight text-brand-dark">{d.id ? "Modifier l'article" : 'Nouvel article'}</h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Titre *">
          <input
            className={INPUT}
            value={d.title || ''}
            onChange={(e) => {
              const title = e.target.value;
              setD((p) => ({ ...p, title, slug: p.id || (p.slug && p.slug !== slugify(p.title || '')) ? p.slug : slugify(title) }));
            }}
            required
          />
        </Field>
        <Field label="Slug (URL) *"><input className={INPUT} value={d.slug || ''} onChange={(e) => set('slug', e.target.value)} placeholder="mon-article" required /></Field>
        <Field label="Catégorie">
          <select className={INPUT} value={d.category || ''} onChange={(e) => set('category', e.target.value)}>
            {BLOG_CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </Field>
        <Field label="Date"><input className={INPUT} type="date" value={(d.date || '').slice(0, 10)} onChange={(e) => set('date', e.target.value)} /></Field>
        <Field label="Image (URL)"><input className={INPUT} value={d.image || ''} onChange={(e) => set('image', e.target.value)} placeholder="https://… ou /images/…" /></Field>
        <Field label="Temps de lecture"><input className={INPUT} value={d.readingTime || ''} onChange={(e) => set('readingTime', e.target.value)} placeholder="8 min" /></Field>
      </div>

      <div className="mt-5">
        <Field label="Extrait (résumé affiché dans la liste)">
          <textarea className={`${INPUT} h-20 resize-y`} value={d.excerpt || ''} onChange={(e) => set('excerpt', e.target.value)} />
        </Field>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between mb-1.5">
          <label className={`${LABEL} mb-0`}>Contenu (Markdown)</label>
          <button type="button" onClick={() => setPreview((p) => !p)} className="flex items-center gap-1.5 text-xs font-bold text-brand-cyan hover:underline">
            {preview ? <EyeOff size={14} /> : <Eye size={14} />} {preview ? 'Éditer' : 'Aperçu'}
          </button>
        </div>
        {preview ? (
          <div
            className="prose-mb74 border border-gray-200 rounded-xl p-5 min-h-[16rem] bg-gray-50"
            dangerouslySetInnerHTML={{ __html: marked.parse(d.content || '*Rien à afficher*') as string }}
          />
        ) : (
          <textarea
            className={`${INPUT} h-64 resize-y font-mono text-xs leading-relaxed`}
            value={d.content || ''}
            onChange={(e) => set('content', e.target.value)}
            placeholder={'## Sous-titre\n\nVotre texte en **markdown**.\n\n- point 1\n- point 2\n\n[lien](https://…)'}
          />
        )}
        <p className="text-xs text-gray-400 mt-1.5">Markdown : <code>## titre</code>, <code>**gras**</code>, <code>- liste</code>, <code>[texte](url)</code>, <code>![alt](image)</code>.</p>
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-brand-dark mt-6">
        Statut :
        <select className="border border-gray-300 rounded-lg px-2 py-1.5 text-sm" value={d.status || 'published'} onChange={(e) => set('status', e.target.value)}>
          <option value="published">Publié</option>
          <option value="draft">Brouillon</option>
        </select>
      </label>

      {error && <p className="text-red-600 text-sm font-medium mt-5">{error}</p>}

      <div className="flex justify-end gap-3 mt-7">
        <button type="button" onClick={onCancel} className="px-5 py-3 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 transition">Annuler</button>
        <button type="submit" disabled={saving} className="flex items-center gap-2 bg-brand-dark text-white px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wide hover:bg-brand-cyan hover:text-brand-dark disabled:opacity-50 transition">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Enregistrer
        </button>
      </div>
    </form>
  );
}

export function BlogManager() {
  const [articles, setArticles] = useState<AdminArticle[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Draft | null>(null);

  const load = () => {
    setError(null);
    adminApi
      .listArticles()
      .then((r) => setArticles(r.articles))
      .catch((e) => setError(e.message));
  };
  useEffect(load, []);

  const remove = async (a: AdminArticle) => {
    if (!confirm(`Supprimer l'article « ${a.title} » ?`)) return;
    try {
      await adminApi.deleteArticle(a.id);
      load();
    } catch (e: any) {
      alert(e.message);
    }
  };

  if (editing) {
    return <ArticleForm initial={editing} onCancel={() => setEditing(null)} onSaved={() => { setEditing(null); load(); }} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-xl font-bold uppercase tracking-tight text-brand-dark">
          Blog {articles ? <span className="text-gray-400 font-normal">({articles.length})</span> : null}
        </h1>
        <button onClick={() => setEditing(emptyDraft())} className="flex items-center gap-2 bg-brand-cyan text-brand-dark px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wide hover:brightness-110 transition">
          <Plus size={16} /> Nouvel article
        </button>
      </div>

      {error && <p className="text-red-600 text-sm font-medium mb-4">{error}</p>}
      {!articles && !error && <div className="flex justify-center py-16 text-gray-400"><Loader2 className="animate-spin" /></div>}

      {articles && articles.length === 0 && (
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center text-gray-500">
          Aucun article. Clique sur « Nouvel article » pour écrire le premier.
        </div>
      )}

      {articles && articles.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden divide-y divide-gray-100">
          {articles.map((a) => (
            <div key={a.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition">
              <div className="w-20 h-14 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                {a.image ? <img src={a.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" /> : null}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-brand-dark truncate">{a.title}</p>
                <p className="text-xs text-gray-500 truncate">{a.date} · {a.category} · /blog/{a.slug}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {a.status === 'draft' && <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-700 px-2 py-1 rounded">Brouillon</span>}
                <button onClick={() => setEditing(a)} className="p-2 text-gray-500 hover:text-brand-cyan transition" title="Modifier"><Pencil size={16} /></button>
                <button onClick={() => remove(a)} className="p-2 text-gray-500 hover:text-red-600 transition" title="Supprimer"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
