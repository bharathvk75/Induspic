import './CrystalPanel.css'

export default function CrystalPanel({ 
  children, 
  className = '', 
  glowColor = 'green', 
  hover = false,
  compact = false,
  flush = false,
  as: Tag = 'div',
  ...props 
}) {
  const classes = [
    'crystal-panel',
    `crystal-panel--glow-${glowColor}`,
    hover && 'crystal-panel--hover',
    compact && 'crystal-panel--compact',
    flush && 'crystal-panel--flush',
    className,
  ].filter(Boolean).join(' ')

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  )
}
