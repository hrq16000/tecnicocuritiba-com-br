import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Disparada pelo cliente logo após o insert da triagem. Pública por natureza
 * (o remetente é o visitante), mas só aceita um UUID de submissão recém-criada
 * e nunca retorna dados do lead — apenas o status do alerta.
 */
export const notifyAdminLead = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ submissionId: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    const { sendAdminAlert } = await import("./notifyAdmin.server");
    const result = await sendAdminAlert(data.submissionId);
    return { ok: result.ok, kind: result.kind };
  });
