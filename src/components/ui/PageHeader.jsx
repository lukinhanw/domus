import { RiUser3Line } from 'react-icons/ri'

export function PageHeader({ 
    icon: Icon = RiUser3Line,
    title, 
    description 
}) {
    return (
        <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-purple-900/30 to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/20 via-purple-900/20 to-transparent"></div>
            <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full filter blur-3xl transform translate-x-1/3 -translate-y-1/2"></div>
                <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-blue-500/10 rounded-full filter blur-3xl"></div>
                <div className="absolute -bottom-32 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl"></div>
            </div>
            <div className="max-w-2xl mx-auto relative">
                <div className="flex items-center space-x-6">
                    <div className="bg-white/5 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/5">
                        <Icon className="w-16 h-16 text-white/90" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-white/90">
                            {title}
                        </h2>
                        <p className="text-white/70 mt-1">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
} 