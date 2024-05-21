import "../../index.css";
import {ClientOnly} from "./client";

export function generateStaticParams() {
  return [
    {slug: [""]}, // Default route
    {slug: ["create-will"]},
    {slug: ["public-wills"]},
    {slug: ["how-to-create-will"]},
    {slug: ["search-will"]},
    {slug: ["revoke-will"]},
  ];
}

export default function Page() {
  return <ClientOnly />;
}
