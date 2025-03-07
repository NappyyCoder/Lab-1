import { useState, useEffect } from 'react';

export const useImageLoader = (imageUrl, fallbackUrl = '') => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [imgSrc, setImgSrc] = useState(imageUrl);

    useEffect(() => {
        const img = new Image();
        
        img.onload = () => {
            setLoading(false);
            setError(false);
        };

        img.onerror = () => {
            setLoading(false);
            setError(true);
            if (fallbackUrl) {
                setImgSrc(fallbackUrl);
            }
        };

        img.src = imageUrl;

        return () => {
            img.onload = null;
            img.onerror = null;
        };
    }, [imageUrl, fallbackUrl]);

    return { loading, error, imgSrc };
};