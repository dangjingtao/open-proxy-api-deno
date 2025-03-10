export function modifyUrlPath(inputUrl: string, prefix: string): string {
  const url = new URL(inputUrl);
  const path = url.pathname;
  const modifiedPath = path.replace(new RegExp(`^/${prefix}`), "");
  return modifiedPath;
}
