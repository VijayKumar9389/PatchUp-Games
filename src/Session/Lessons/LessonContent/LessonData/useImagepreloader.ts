// useImagePreloader.ts
import { useEffect, useRef, useState } from "react";

export function useImagePreloader(urls: string[] = []) {
    const [loaded, setLoaded] = useState(0);
    const done = useRef(new Set<string>());

    useEffect(() => {
        let cancelled = false;
        const unique = Array.from(new Set(urls)).filter(Boolean);

        unique.forEach((url) => {
            if (done.current.has(url)) return;

            const img = new Image();
            img.decoding = "async";          // nice-to-have
            img.loading = "eager";           // force eager fetch
            img.referrerPolicy = "no-referrer"; // if you prefer

            img.onload = img.onerror = () => {
                if (!cancelled) {
                    done.current.add(url);
                    setLoaded((n) => n + 1);
                }
            };
            img.src = url;
        });

        return () => { cancelled = true; };
    }, [urls.join("|")]);

    return { loaded, total: urls.length, ready: loaded === urls.length };
}
