export function makeImagePath(id: string, format?: string): string {
  return `https://image.tmdb.org/t/p/${format !== undefined ? format : 'original'}/${id}`;
}
