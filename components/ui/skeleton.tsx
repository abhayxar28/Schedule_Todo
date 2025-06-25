
export default function Skeleton(){
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#f3f0ff] via-[#f8f4ff] to-[#f4faff] p-6 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center mb-8">
            <div className="w-32 h-6 bg-gray-300 rounded" />
            <div className="flex gap-4">
            <div className="w-20 h-6 bg-gray-300 rounded" />
            <div className="w-20 h-6 bg-gray-300 rounded" />
            </div>
        </div>

        {/* Hero Section Skeleton */}
        <div className="text-center mt-20 space-y-4">
            <div className="mx-auto w-3/4 h-10 bg-gray-300 rounded" />
            <div className="mx-auto w-1/2 h-5 bg-gray-300 rounded" />
            <div className="mx-auto w-32 h-10 bg-gray-300 rounded mt-4" />
        </div>

        {/* Floating Card Skeleton */}
        <div className="relative mt-24 flex justify-center items-center">
            <div className="w-96 h-48 bg-gray-300 rounded-2xl shadow-md" />
        </div>

        {/* Features Section Skeleton */}
        <div className="mt-24 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array(4).fill(0).map((_, i) => (
            <div key={i} className="p-6 border rounded-xl shadow-sm bg-white space-y-3">
                <div className="w-3/4 h-4 bg-gray-300 rounded" />
                <div className="w-full h-3 bg-gray-200 rounded" />
                <div className="w-2/3 h-3 bg-gray-200 rounded" />
            </div>
            ))}
        </div>

        {/* Benefits Section Skeleton */}
        <div className="mt-24 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array(3).fill(0).map((_, i) => (
            <div key={i} className="space-y-2 text-center">
                <div className="mx-auto w-24 h-4 bg-gray-300 rounded" />
                <div className="mx-auto w-3/4 h-3 bg-gray-200 rounded" />
            </div>
            ))}
        </div>

        {/* Testimonial Skeleton */}
        <div className="mt-20 max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-sm space-y-4">
            <div className="w-full h-4 bg-gray-300 rounded" />
            <div className="w-1/4 h-3 bg-gray-200 rounded" />
        </div>
        </div>
    )
}