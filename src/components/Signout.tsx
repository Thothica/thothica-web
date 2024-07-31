"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import Spinner from "./spinner";
import { useState } from "react";

export default function Signout() {
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    await signOut();
    setLoading(false);
  };

  return (
    <div>
      {loading ? <Spinner /> : <Button onClick={handleClick}>Sign Out</Button>}
    </div>
  );
}
