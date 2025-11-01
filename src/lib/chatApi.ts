// src/lib/chatApi.ts

export type ChatReply = {
  reply: string;
  intent?: string | null;
};

type BaseResponse<T> = {
  code: number;
  message: string;
  data: T;
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "") ||
  "https://api.eccubestudio.click";

function parseIntentAndReply(text: string): ChatReply {
  // Hỗ trợ format: "[Intent: XYZ] trả lời..."
  const m = text.match(/^\s*\[Intent:\s*([^\]]+)\]\s*([\s\S]*)$/);
  if (m) {
    return { intent: m[1]?.trim() || null, reply: (m[2] || "").trim() };
  }
  return { reply: (text || "").trim(), intent: null };
}

/**
 * Gửi tin nhắn tới Chat API (non-stream).
 * Backend yêu cầu body là text/plain (String), KHÔNG phải JSON.
 * Trả về { reply, intent } để UI dùng ngay.
 */
export async function sendChatMessage(
  sessionId: string,
  message: string
): Promise<ChatReply> {
  const url = `${API_BASE}/api/chat/send?sessionId=${encodeURIComponent(
    sessionId || "guest"
  )}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
      Accept: "application/json",
    },
    body: message, // chú ý: body là string thô
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(txt || `Chat API error ${res.status}`);
  }

  const json = (await res.json()) as BaseResponse<string>;
  if (typeof json?.data !== "string") {
    throw new Error("Phản hồi không hợp lệ từ Chat API");
  }

  return parseIntentAndReply(json.data);
}

/**
 * Reset phiên chat trên backend (xóa ngữ cảnh).
 */
export async function resetChatSession(sessionId: string): Promise<void> {
  const url = `${API_BASE}/api/chat/reset?sessionId=${encodeURIComponent(
    sessionId || "guest"
  )}`;

  const res = await fetch(url, {
    method: "POST",
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(txt || `Reset API error ${res.status}`);
  }
}
