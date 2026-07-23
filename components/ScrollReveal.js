'use client';

export default function ScrollReveal({
  children,
  className = '',
  animation = 'slideUp',
  delay = 0
}) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
