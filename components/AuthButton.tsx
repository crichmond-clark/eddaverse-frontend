import { useSession, signIn, signOut } from "next-auth/react";
export default function AuthButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button
          className="text-sm font-semibold leading-6 text-gray-900"
          onClick={() => signOut()}
        >
          Sign out<span aria-hidden="true">&rarr;</span>
        </button>
      </>
    );
  }
  return (
    <>
      <button onClick={() => signIn()}>
        Sign in<span aria-hidden="true">&rarr;</span>
      </button>
    </>
  );
}
