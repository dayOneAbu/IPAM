"use client";

import { signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";

export const LoginButton = () => {
  return (
    <Button className="mr-3" onClick={() => signIn()}>
      Sign in
    </Button>
  );
};

export const LogoutButton = () => {
  return (
    <Button variant="secondary" className="mr-3 mt-4 mx-2" onClick={() => signOut({ callbackUrl: '/' })}>
      Sign Out
    </Button>
  );
};
