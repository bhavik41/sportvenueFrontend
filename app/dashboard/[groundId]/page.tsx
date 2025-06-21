import ProtectedRoute from "@/components/ProtectedRoute";
import GroundDetailes from "@/components/user/groundDetailes";

export default async function ({
  params,
}: {
  params: Promise<{ groundId: string }>;
}) {
  const { groundId } = await params;

  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <GroundDetailes groundId={groundId} />
    </ProtectedRoute>
  );
}
