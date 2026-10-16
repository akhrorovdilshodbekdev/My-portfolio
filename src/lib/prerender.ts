/**
 * Helpers for the build-time prerender pass.
 *
 * Motion resolves its `initial` variant *during render* and writes the result
 * into the inline `style` attribute. Left alone, that means the prerendered
 * HTML ships with `style="opacity:0"` on the hero headline and every scroll-
 * revealed section — so a crawler would receive an invisible page, which is
 * exactly the problem the prerender is meant to solve.
 *
 * `ssrInitial` neutralises that ONLY inside the prerender pass. The client keeps
 * the real value, so the entrance animations are untouched.
 *
 * Note we deliberately do NOT use a bare `initial={false}` on the reveal
 * sections: motion's animation-state skips animating on the first
 * `animateChanges()` when `props.initial === false`, which would silently stop
 * the scroll reveals from playing at all.
 */

/** True only while rendering in Node (the `vite build --ssr` pass). */
export const isPrerender = typeof window === 'undefined';

/**
 * Returns `false` during the prerender pass so motion falls back to the
 * `animate` values (or emits no style at all), and the real value on the client.
 */
export function ssrInitial<T>(value: T): T | false {
  return isPrerender ? false : value;
}
