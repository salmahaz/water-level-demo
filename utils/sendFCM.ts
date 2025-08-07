import { adminMessaging } from "./firebaseAdmin";
import FCMToken from "@/models/FCMToken";

type SendNotificationArgs = {
  tokens: string[];
  data?: Record<string, string>;
  notification: {
    title: string;
    body: string;
  };
};

export async function sendNotificationToTokens({
  tokens,
  data = {},
  notification,
}: SendNotificationArgs) {
  if (!tokens || tokens.length === 0) return;

  const payload = {
    data,
    notification,
  };

  try {
    const response = await adminMessaging.sendEachForMulticast({
      tokens,
      ...payload,
    });

    const failed = response.responses.filter((r) => !r.success);

    if (failed.length > 0) {
      console.warn(`[FCM] ${failed.length} messages failed.`);

      const invalidTokens = failed
        .map((res, i) =>
          res.error?.code === "messaging/registration-token-not-registered" ? tokens[i] : null
        )
        .filter(Boolean) as string[];

      if (invalidTokens.length > 0) {
        console.warn(`[FCM] Cleaning up ${invalidTokens.length} invalid tokens...`);

        await FCMToken.deleteMany({ token: { $in: invalidTokens } });
      }
    } 
  } catch (error) {
    console.error("[FCM] Error sending notification:", error);
  }
}
