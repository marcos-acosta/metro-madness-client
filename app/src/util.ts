export const combineClasses = (
  ...classnames: (string | undefined | false | null)[]
) => classnames.filter(Boolean).join(" ");
