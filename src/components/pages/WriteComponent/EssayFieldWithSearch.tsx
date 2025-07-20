"use client";

import { useSearchParams } from "next/navigation";
import EssayField from "./EssayField";

function EssayFieldWithSearchParams() {
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  return <EssayField editId={editId} />;
}

export default EssayFieldWithSearchParams;
