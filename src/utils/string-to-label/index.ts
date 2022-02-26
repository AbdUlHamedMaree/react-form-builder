export const stringToLabel = (source: string) =>
  source
    .replace(/-|_|\./g, ' ')
    .split(/(?=[A-Z])/)
    .map((el, ind) =>
      ind === 0
        ? el.charAt(0).toUpperCase() + el.slice(1)
        : el.charAt(0).toLowerCase() + el.slice(1)
    )
    .join(' ');
