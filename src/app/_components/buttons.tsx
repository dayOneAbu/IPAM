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
export const ClearButton = ({ onClick }: {
  onClick: () => void
}) => {
  return (
    <Button variant="destructive" type="reset" className="mr-3 mt-4 mx-2" onClick={onClick}>
      clear
    </Button>
  );
};
export function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <Button variant="default" className="mr-3 mt-4 mx-2" type="submit">
      {isSubmitting ? "Submitting..." : "Submit"}
    </Button>
  );
};
