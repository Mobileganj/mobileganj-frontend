import AuthModal from "@/components/shared/AuthModal";
import RegisterPage from "@/app/(auth-layout)/register/page";

export default function RegisterModal() {
  return (
    <AuthModal>
      <RegisterPage />
    </AuthModal>
  );
}
