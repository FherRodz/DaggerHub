'use client';

import { useEffect, useState } from "react";
import getBundles, { Bundle } from "@/api/getBundles";

export default function Bundles() {
    const [bundles, setBundles] = useState<Bundle[]>([]);

    useEffect(() => {
        const loadBundles = async () =>{
            try {
                const data = await getBundles();
                setBundles(data);
            } catch (error) {
                console.error('Error loading bundles: ', error);
            }
        };

        loadBundles();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-xl font-semibold mb-4">Bundles</h1>
            {/* {bundles.length > 0 ? ( */}
                <ul className="space-y-2">
                {bundles.map((bundle) => (
                    <li key={bundle.id} className="p-2 border rounded">
                    <strong>{bundle.name}</strong>: {bundle.description}
                    </li>
                ))}
                </ul>
            {/* ) : (
                <p>No bundles found.</p>
            )} */}
        </div>
    );
}