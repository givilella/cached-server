const createClient = () => {
  let cache = {};
  let checkTime = 90 * 1000;

  const set = (key, data, { EX }) => {
    return new Promise((resolve) => {
      const expirationDate = new Date();
      expirationDate.setSeconds(expirationDate.getSeconds() + EX);

      cache[key] = { expirationDate, data };
      resolve();
    });
  };

  const get = (key) => {
    return new Promise((resolve) => {
      resolve(cache[key]?.data);
    });
  };

  const _checkExpiration = () => {
    for (const key in cache) {
      const { expirationDate } = cache[key];
      const date = new Date();
      const diff = Math.abs(expirationDate - date);
      if (diff >= 0) {
        console.log(`Cleaning ${key}`);
        delete cache[key];
      }
    }
    setTimeout(() => {
      _checkExpiration();
    }, checkTime);
  };

  _checkExpiration();

  // Mock function
  const connect = () => {
    return new Promise((resolve) => {
      resolve('Cache connected');
    });
  };

  return {
    cache,
    checkTime,
    _checkExpiration,
    connect,
    set,
    get
  };
};

export { createClient };
