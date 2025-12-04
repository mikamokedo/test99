export const delayWithError = (ms) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      const random = Math.random();
      if (random < 0.7) {
        resolve();
      } else {
        reject(new Error("Simulated network error"));
      }
    }, ms)
  );

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
