import SignInForm from "@/components/SignInForm";

export const metadata = { title: "সাইন ইন — বাজার দর" };

export default function SignInPage() {
  return (
    <main className="max-w-md mx-auto px-4 py-12">
      <SignInForm />
    </main>
  );
}
