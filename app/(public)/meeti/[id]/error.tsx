"use client"

import Heading from "@/src/shared/components/typography/Heading";

export default function error( {error} : {error: Error & {digest?: string}} ) {
  return (
    <>
      <Heading level={2}>{error.message}</Heading>
    </>
  );
}