import { useState } from "react";

export const useFetch = (
  callback: () => any,
): [() => Promise<any>, boolean, string] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetch = async () => {
    try {
      setLoading(true);
      await callback();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return [fetch, loading, error];
};
