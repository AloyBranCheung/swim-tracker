import React from "react";

export default function Page403() {
  return (
    <div>
      Not authorized.
      <a href="/api/auth/login">Login</a>
    </div>
  );
}
