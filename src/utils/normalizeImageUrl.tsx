// utils/normalizeImageUrl.ts
export const normalizeImageUrl = (url?: string): string | null => {
  if (!url) return null;

  try {
    // 1️⃣ Quita espacios y caracteres extraños
    let cleanUrl = url.trim();

    // 2️⃣ Elimina query params problemáticos
    const [base] = cleanUrl.split("?");

    // 3️⃣ Asegura que empiece con https://
    if (!base.startsWith("http")) {
      cleanUrl = `https://${base}`;
    } else {
      cleanUrl = base;
    }

    // 4️⃣ Verifica que termine en una extensión de imagen válida
    const validExt = [".png", ".jpg", ".jpeg", ".webp"];
    const hasValidExt = validExt.some((ext) => cleanUrl.toLowerCase().includes(ext));

    if (!hasValidExt) {
      return null; // No es una imagen válida
    }

    return cleanUrl;
  } catch (error) {
    console.error("Error normalizando URL:", error);
    return null;
  }
};
