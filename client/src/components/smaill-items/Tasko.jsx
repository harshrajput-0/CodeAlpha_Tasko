import { TaskoSymbol } from './TaskoSymbol';

export function TaskoLogo({
  size = 40,
  className,
  textClassName,
  style,
  ...props
}) {
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: size * 0.19,
        lineHeight: 1,
        ...style,
      }}
      {...props}
    >
      <TaskoSymbol size={28} decorative />
      <span
        className={textClassName}
        style={{
          fontSize: size * 0.55,
          fontWeight: 500,
          letterSpacing: '-0.026em',
          color: 'inherit',
        }}
      >
        Tasko
      </span>
    </span>
  );
}
