/**
 * Prefix a public-folder asset path with the deployment basePath.
 * Use for raw HTML attributes (video src, <source>, audio src, etc.)
 * — `next/image` and `next/link` apply basePath automatically.
 *
 *   <source src={asset("/media/intro.mp4")} />
 */
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!path.startsWith("/")) return `${base}/${path}`;
  return `${base}${path}`;
}
