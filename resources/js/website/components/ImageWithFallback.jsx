import React, { useState } from 'react';

export default function ImageWithFallback({ src, alt, className, fallbackText = "Image", ...props }) {
    const [error, setError] = useState(false);

    React.useEffect(() => {
        setError(false);
    }, [src]);

    if (error || !src) {
        return (
            <div className={`bg-slate-200 dark:bg-slate-700 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 ${className} overflow-hidden`}>
                <span className="material-symbols-outlined text-4xl mb-2 opacity-50">broken_image</span>
                <span className="text-xs font-medium uppercase tracking-wider opacity-75">{fallbackText}</span>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => setError(true)}
            {...props}
        />
    );
}
