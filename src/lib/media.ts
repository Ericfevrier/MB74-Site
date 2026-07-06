/** Utilitaires médias partagés (conversion WebP navigateur, formatage). */

export const fmtSize = (n: number) =>
  n < 1024 ? `${n} o` : n < 1024 * 1024 ? `${(n / 1024).toFixed(0)} Ko` : `${(n / 1024 / 1024).toFixed(2)} Mo`;

export const isImageFile = (f: File) => f.type.startsWith('image/');

/** Lit un fichier tel quel en data URL base64 (PDF, vidéo…). */
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

/** Charge un fichier/URL image dans un HTMLImageElement. */
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/** Convertit un fichier en WebP (redimensionné si plus large que maxW), renvoie une data URL. */
export async function toWebp(file: File, quality = 0.82, maxW = 2200): Promise<string> {
  const url = URL.createObjectURL(file);
  try {
    const img = await loadImage(url);
    let w = img.naturalWidth || img.width;
    let h = img.naturalHeight || img.height;
    if (maxW && w > maxW) {
      h = Math.round((h * maxW) / w);
      w = maxW;
    }
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas indisponible.');
    ctx.drawImage(img, 0, 0, w, h);
    return canvas.toDataURL('image/webp', quality);
  } finally {
    URL.revokeObjectURL(url);
  }
}
