export function ParticlesBackground() {
  const renderParticles = () => {
    const particles = []
    for (let i = 0; i < 50; i++) {
      particles.push(
        <div
          key={i}
          className="particle"
          style={{
            '--size': `${Math.random() * 50 + 20}px`,
            '--left': `${Math.random() * 100}%`,
            '--delay': `-${Math.random() * 20}s`,
          }}
        />
      )
    }
    return particles
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
      {renderParticles()}
    </div>
  )
}