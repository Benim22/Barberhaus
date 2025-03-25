import { AdminDashboard } from "@/components/admin/dashboard"
import { PageHeader } from "@/components/page-header"

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto py-12 pt-32">
      <PageHeader title="admin.dashboard.title" description="admin.dashboard.description" />

      <div className="mt-12">
        <AdminDashboard />
      </div>
    </div>
  )
}

