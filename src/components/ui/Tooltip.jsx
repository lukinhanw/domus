import { useState, useRef, useEffect } from 'react'

export function Tooltip({ children, content, position = 'top' }) {
    const [isVisible, setIsVisible] = useState(false)
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
    const targetRef = useRef(null)

    const updatePosition = () => {
        if (targetRef.current) {
            const rect = targetRef.current.getBoundingClientRect()
            let x = 0
            let y = 0

            switch (position) {
                case 'top':
                    x = rect.left + (rect.width / 2)
                    y = rect.top - 10
                    break
                case 'bottom':
                    x = rect.left + (rect.width / 2)
                    y = rect.bottom + 10
                    break
                case 'left':
                    x = rect.left - 10
                    y = rect.top + (rect.height / 2)
                    break
                case 'right':
                    x = rect.right + 10
                    y = rect.top + (rect.height / 2)
                    break
            }

            setTooltipPosition({ x, y })
        }
    }

    useEffect(() => {
        if (isVisible) {
            updatePosition()
            window.addEventListener('scroll', updatePosition)
            window.addEventListener('resize', updatePosition)
        }

        return () => {
            window.removeEventListener('scroll', updatePosition)
            window.removeEventListener('resize', updatePosition)
        }
    }, [isVisible])

    return (
        <div 
            ref={targetRef}
            className="relative inline-flex"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div
                    style={{
                        position: 'fixed',
                        left: tooltipPosition.x,
                        top: tooltipPosition.y,
                        transform: `translate(${position === 'right' ? '0' : position === 'left' ? '-100%' : '-50%'}, 
                                  ${position === 'bottom' ? '0' : position === 'top' ? '-100%' : '-50%'})`
                    }}
                    className="pointer-events-none z-[9999]"
                >
                    <div className="relative bg-gray-900 text-white text-sm rounded-md px-2.5 py-1.5 whitespace-nowrap shadow-lg">
                        {content}
                        <div 
                            className={`absolute w-0 h-0 border-[5px] border-transparent
                                ${position === 'top' ? 'border-t-gray-900 -bottom-[10px] left-1/2 -translate-x-1/2' : ''}
                                ${position === 'bottom' ? 'border-b-gray-900 -top-[10px] left-1/2 -translate-x-1/2' : ''}
                                ${position === 'left' ? 'border-l-gray-900 -right-[10px] top-1/2 -translate-y-1/2' : ''}
                                ${position === 'right' ? 'border-r-gray-900 -left-[10px] top-1/2 -translate-y-1/2' : ''}`}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}