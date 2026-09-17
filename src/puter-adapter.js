// puter-adapter.js
// Lazily initialize Puter so it does not ship in the initial app bundle unless
// the cloud filesystem/auth features are actually used.

let puterInstance = null;
let puterPromise = null;

export async function loadPuter() {
  if (puterInstance) return puterInstance;
  if (!puterPromise) {
    puterPromise = import('@heyputer/puter.js').then((mod) => mod.default ?? mod);
  }
  puterInstance = await puterPromise;
  return puterInstance;
}

export default {
  async get() {
    return loadPuter();
  },
};
