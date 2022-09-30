export const groupBy = <T>(items: T[], key: (item: T) => string) => {
  return items.reduce((rv, x) => {
    (rv[key(x)] = rv[key(x)] || []).push(x);
    return rv;
  }, {} as Record<string, T[]>);
};
