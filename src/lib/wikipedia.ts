const imageCache = new Map<string, string | null>();

export async function getDriverImageUrl(
  wikipediaUrl: string
): Promise<string | null> {
  const cached = imageCache.get(wikipediaUrl);
  if (cached !== undefined) return cached;

  try {
    const title = wikipediaUrl.split("/wiki/").pop();
    if (!title) return null;

    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
    );
    if (!res.ok) return null;

    const data = await res.json();
    const url: string | null = data.thumbnail?.source ?? null;
    imageCache.set(wikipediaUrl, url);
    return url;
  } catch {
    imageCache.set(wikipediaUrl, null);
    return null;
  }
}
