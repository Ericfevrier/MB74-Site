import React, { useEffect, useState } from 'react';
import { Loader2, Trash2, Mail, MailOpen, Phone, ExternalLink } from 'lucide-react';
import { adminApi, type ContactMessage } from '../../lib/adminApi';

const fmt = (iso: string) => {
  const d = new Date(iso.replace(' ', 'T'));
  return isNaN(d.getTime()) ? iso : d.toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' });
};

export function MessagesInbox({ onChange }: { onChange?: () => void } = {}) {
  const [messages, setMessages] = useState<ContactMessage[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<number | null>(null);

  const load = () => {
    setError(null);
    adminApi
      .listMessages()
      .then((r) => setMessages(r.messages))
      .catch((e) => setError(e.message));
  };
  useEffect(load, []);

  const toggleOpen = async (m: ContactMessage) => {
    const next = openId === m.id ? null : m.id;
    setOpenId(next);
    if (next !== null && !m.is_read) {
      setMessages((list) => (list ? list.map((x) => (x.id === m.id ? { ...x, is_read: 1 } : x)) : list));
      adminApi.markMessage(m.id, true).then(() => onChange?.()).catch(() => {});
    }
  };

  const remove = async (m: ContactMessage, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Supprimer ce message ?')) return;
    try {
      await adminApi.deleteMessage(m.id);
      load();
      onChange?.();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const unread = messages ? messages.filter((m) => !m.is_read).length : 0;

  return (
    <div>
      <h1 className="text-xl font-bold uppercase tracking-tight text-brand-dark mb-6">
        Messages {messages ? <span className="text-gray-400 font-normal">({messages.length}{unread ? ` · ${unread} non lus` : ''})</span> : null}
      </h1>

      {error && <p className="text-red-600 text-sm font-medium mb-4">{error}</p>}
      {!messages && !error && <div className="flex justify-center py-16 text-gray-400"><Loader2 className="animate-spin" /></div>}

      {messages && messages.length === 0 && (
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center text-gray-500">
          Aucun message pour l'instant.
        </div>
      )}

      {messages && messages.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden divide-y divide-gray-100">
          {messages.map((m) => {
            const open = openId === m.id;
            return (
              <div key={m.id} className={m.is_read ? '' : 'bg-brand-cyan/[0.04]'}>
                <button onClick={() => toggleOpen(m)} className="w-full flex items-center gap-4 p-4 text-left hover:bg-gray-50 transition">
                  <span className={`flex-shrink-0 ${m.is_read ? 'text-gray-400' : 'text-brand-cyan'}`}>
                    {m.is_read ? <MailOpen size={18} /> : <Mail size={18} />}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={`truncate ${m.is_read ? 'text-brand-dark' : 'font-bold text-brand-dark'}`}>
                      {m.nom || '(sans nom)'} <span className="text-gray-400 font-normal">· {m.subject || 'Contact'}</span>
                    </p>
                    <p className="text-xs text-gray-500 truncate">{m.email}{m.message ? ` — ${m.message}` : ''}</p>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0 hidden sm:block">{fmt(m.created_at)}</span>
                  <button onClick={(e) => remove(m, e)} className="p-2 text-gray-400 hover:text-red-600 transition flex-shrink-0" title="Supprimer">
                    <Trash2 size={15} />
                  </button>
                </button>

                {open && (
                  <div className="px-5 pb-5 pt-1 text-sm">
                    <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                      <div className="flex flex-wrap gap-x-6 gap-y-1 text-gray-600">
                        <a href={`mailto:${m.email}`} className="inline-flex items-center gap-1.5 text-brand-cyan font-medium hover:underline">
                          <Mail size={14} /> {m.email}
                        </a>
                        {m.tel && (
                          <a href={`tel:${m.tel}`} className="inline-flex items-center gap-1.5 text-brand-cyan font-medium hover:underline">
                            <Phone size={14} /> {m.tel}
                          </a>
                        )}
                        <span className="text-gray-400 sm:hidden">{fmt(m.created_at)}</span>
                      </div>
                      {m.message && <p className="text-brand-dark whitespace-pre-wrap leading-relaxed pt-1">{m.message}</p>}
                      {m.source_page && (
                        <p className="text-xs text-gray-400 inline-flex items-center gap-1 pt-1">
                          <ExternalLink size={12} /> {m.source_page}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
