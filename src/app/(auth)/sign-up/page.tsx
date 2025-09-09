import { SignUp } from "@/module/auth/ui/components/sign-up";
import { AuthLayout } from "@/module/auth/ui/layouts/auth-layout";

export default function Page() {
    return (
        <AuthLayout>
            <SignUp />
        </AuthLayout>
    );
}