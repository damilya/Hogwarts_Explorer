"use client";

import { useParams } from "next/navigation";
import FacultyPageClient from "@/components/FacultyPageClient";

export default function FacultyPage() {
  const params = useParams();
  // `params.house` can be `string | string[] | undefined` — normalize safely
  const rawHouse = params?.house;
  let house = "";
  if (Array.isArray(rawHouse)) house = rawHouse[0] ?? "";
  else if (typeof rawHouse === "string") house = rawHouse;
  house = house.toLowerCase();

  return <FacultyPageClient house={house} />;
}
