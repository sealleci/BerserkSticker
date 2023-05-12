/**
 * Get the URL of asset from the given relative path, the base path is `/src/utils`.
 */
function getAssetUrl(relative_path: string): string {
    return new URL(relative_path, import.meta.url).href
}

export { getAssetUrl }
