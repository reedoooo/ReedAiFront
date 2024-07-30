function createLocalStorage(options) {
  const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7; // Default cache time is one week

  const { expire, crypto } = Object.assign(
    {
      expire: DEFAULT_CACHE_TIME,
      crypto: true,
    },
    options
  );

  function set(key, data) {
    const storageData = {
      data,
      expire: expire !== null ? new Date().getTime() + expire * 1000 : null,
    };

    const json = JSON.stringify(storageData);
    window.localStorage.setItem(key, json);
  }

  function get(key) {
    const json = window.localStorage.getItem(key);
    if (json) {
      let storageData = null;

      try {
        storageData = JSON.parse(json);
      } catch {
        // Prevent failure
      }

      if (storageData) {
        const { data, expire } = storageData;
        if (expire === null || expire >= Date.now()) return data;
      }

      remove(key);
      return null;
    }
  }

  function remove(key) {
    window.localStorage.removeItem(key);
  }

  function clear() {
    window.localStorage.clear();
  }

  return {
    set,
    get,
    remove,
    clear,
  };
}

export const ls = createLocalStorage();
export const ss = createLocalStorage({ expire: null, crypto: false });
