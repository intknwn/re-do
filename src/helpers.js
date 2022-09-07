export const getDayOfTheWeek = () =>
  new Date().toLocaleDateString('en-US', {
    weekday: 'long',
  });

export const getDayOfTheMonth = () =>
  new Date().toLocaleDateString('en-US', {
    day: '2-digit',
  });

export const getMonth = () =>
  new Date().toLocaleDateString('en-US', {
    month: 'long',
  });

export const capitalize = str => str[0].toUpperCase() + str.slice(1);

export const delay = (fn, delay) => e => setTimeout(() => fn(e), delay);
