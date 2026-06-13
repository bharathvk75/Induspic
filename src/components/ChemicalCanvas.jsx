import './ChemicalCanvas.css'

export default function ChemicalCanvas() {
  return (
    <div className="chemical-canvas" aria-hidden="true">
      <div className="chemical-canvas__blob chemical-canvas__blob--green" />
      <div className="chemical-canvas__blob chemical-canvas__blob--orange" />
    </div>
  )
}
