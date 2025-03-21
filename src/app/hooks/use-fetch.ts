/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";

type FetchCallback<T> = (...args: any[]) => Promise<T>;

const useFetch = <T>(cb: FetchCallback<T>) => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState<boolean | null>(null);
	const [error, setError] = useState<Error | null>(null);

	const fn = async (...args: any[]) => {
		setLoading(true);
		setError(null);
		try {
			const res = await cb(...args);
			setData(res);
		} catch (error: any) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	return { data, loading, error, fn, setData };
};

export default useFetch;
