class CacheDriver {
  constructor() {
    this.cache = {};
    this.checkTime = 90 * 1000;
    this._checkExpiration();
  }

  set(key, data, { EX }) {
    return new Promise((resolve) => {
      const expirationDate = new Date();
      expirationDate.setSeconds(expirationDate.getSeconds() + EX);

      this.cache[key] = { expirationDate, data };
      resolve();
    });
  }

  get(key) {
    return new Promise((resolve) => {
      resolve(this.cache[key]?.data);
    });
  }

  _checkExpiration() {
    for (const key in this.cache) {
      const { expirationDate } = this.cache[key];
      const date = new Date();
      const diff = Math.abs(expirationDate - date);
      if (diff >= 0) {
        console.log(`Cleaning ${key}`);
        delete this.cache[key];
      }
    }
    setTimeout(() => {
      this._checkExpiration();
    }, this.checkTime);
  }
}
export default CacheDriver;
