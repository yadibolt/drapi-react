import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ContentSimplePage({
  content,
}: {
  content: Record<string, unknown>;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const title = (content?.title as any) ?? "{{ %title% }}";
  const htmlContent =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (content as any)?.field_content?.value ?? "{{ %content% }}";

  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardAction>
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              Go home
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: String(htmlContent) }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
