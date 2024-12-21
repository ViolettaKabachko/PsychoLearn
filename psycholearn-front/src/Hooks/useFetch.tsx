import { useState } from "react";

export const useFetch = (
  callback: () => any | Promise<any>,
): [() => Promise<void>, boolean, string] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetch = async () => {
    setLoading(true);
    setError("");
    try {
      await callback();
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return [fetch, loading, error];
};
