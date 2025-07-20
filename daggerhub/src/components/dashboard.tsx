'use client';

import GeneralBundlesTable from "./generalBundlesTable";

import type { Bundle } from '../../types/bundle';
import { useEffect, useState } from "react";
import getBundles from "@/api/getBundles";

const Dashboard = () => {
    const fields: (keyof Bundle)[] = ['name', 'description', 'username', 'createdAt', 'lastUpdated', 'downloads'];
    const columns = ['Name', 'Description', 'Username', 'Created At', 'Last Updated', 'Downloads'];

    const [data, setData] = useState<Bundle[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const bundles = await getBundles();
            setData(bundles);
        };
        fetchData();
    }, []);

    return (
        <>
            <GeneralBundlesTable
                columns={columns}
                fields={fields}
                data={data}
            />
        </>
    )
}

export default Dashboard;