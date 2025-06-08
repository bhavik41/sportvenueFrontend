import { Ground } from "@/types/ground";

export default async function ({
  params,
}: {
  params: Promise<{ GroundId: string }>;
}) {
  const { GroundId } = await params;
  return (
    <div>
      <h1>Ground {GroundId}</h1>
    </div>
  );
}
