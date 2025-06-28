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

            {Array.isArray(bundles) && bundles.length > 0 ? (
                <ul className="space-y-2">
                {bundles.map((bundle) => (
                    <li key={bundle.id} className="p-2 border rounded">
                    <strong>{bundle.name}</strong>: {bundle.description}
                    <br />
                    <strong>By:</strong> {bundle.username ?? 'Unknown'}
                    </li>
                ))}
                </ul>
            ) : (
                <p>No bundles found.</p>
            )}

            <a href="/api/auth/logout" className="text-blue-600 underline mt-4 block">
                Logout
            </a>
            </div>
    );
}