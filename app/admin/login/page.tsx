import { LoginForm } from "@/components/admin/login-form"
import { PageHeader } from "@/components/page-header"

export default function AdminLoginPage() {
  return (
    <div className="container mx-auto py-12 pt-32">
      <PageHeader title="admin.login.title" description="admin.login.description" />

      <div className="max-w-md mx-auto mt-12">
        <LoginForm />
      </div>
    </div>
  )
}

