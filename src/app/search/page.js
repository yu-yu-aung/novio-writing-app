import SearchClient from "@/components/SearchClient";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <SearchClient />
    </Suspense>
  );
}
