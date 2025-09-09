import { SignIn } from "@/module/auth/ui/components/sign-in";
import { AuthLayout } from "@/module/auth/ui/layouts/auth-layout";

export default function Page() {
    return (
        <AuthLayout>
            <SignIn />
        </AuthLayout>
    );
}