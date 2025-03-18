export const selectStyles = {
    control: (base, state) => ({
        ...base,
        padding: '2px',
        borderRadius: '0.75rem',
        borderColor: state.isFocused ? '#6366F1' : '#E5E7EB',
        boxShadow: state.isFocused ? '0 0 0 1px #6366F1' : 'none',
        '&:hover': {
            borderColor: '#6366F1'
        }
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected ? '#6366F1' : state.isFocused ? '#EEF2FF' : 'transparent',
        color: state.isSelected ? 'white' : '#111827',
        '&:active': {
            backgroundColor: '#6366F1'
        }
    }),
    menu: (base) => ({
        ...base,
        borderRadius: '0.75rem',
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    }),
    menuPortal: (base) => ({
        ...base,
        zIndex: 9999
    }),
    input: (base) => ({
        ...base,
        color: '#111827'
    }),
    singleValue: (base) => ({
        ...base,
        color: '#111827'
    })
} 