const PRIMARY = 'var(--color-primary, var(--primary, currentColor))';
const ON_PRIMARY =
  'var(--color-primary-foreground, var(--primary-foreground, #fff))';

export function TaskoSymbol({
  size = 40,
  title = 'Tasko',
  decorative = false,
  className,
  ...props
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 138 138"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative ? true : undefined}
      {...props}
    >
      {!decorative && <title>{title}</title>}
      <rect
        x="28"
        y="0"
        width="110"
        height="110"
        rx="28"
        fill={PRIMARY}
        fillOpacity="0.25"
      />
      <rect
        x="14"
        y="14"
        width="110"
        height="110"
        rx="28"
        fill={PRIMARY}
        fillOpacity="0.55"
      />
      <rect x="0" y="28" width="110" height="110" rx="28" fill={PRIMARY} />
      <path
        d="M28 85L48 105L84 63"
        stroke={ON_PRIMARY}
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
