import { useState } from 'react'
import { motion } from 'framer-motion'
import { Tooltip } from './Tooltip'

export function Checkbox({ label, description, checked, onChange }) {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    onChange?.({ target: { checked: !checked } })
  }

  const checkboxContent = (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative flex items-center space-x-2 cursor-pointer select-none"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick()
        }
      }}
    >
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
          aria-hidden="true"
        />
        <motion.div
          className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
            checked ? 'bg-primary-500 border-primary-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          animate={{
            scale: isHovered ? 1.1 : 1,
            borderColor: checked ? '#3949ab' : isHovered ? '#5c6bc0' : '#e2e8f0'
          }}
        >
          {checked && (
            <motion.svg
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-3 h-3 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
            </motion.svg>
          )}
        </motion.div>
      </div>
      <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
    </motion.div>
  )

  return description ? (
    <Tooltip content={description}>
      {checkboxContent}
    </Tooltip>
  ) : (
    checkboxContent
  )
}