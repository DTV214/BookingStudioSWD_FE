"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, Send, X, RotateCcw } from "lucide-react";
import { sendChatMessage, resetChatSession } from "@/lib/chatApi";

type Msg = {
  id: string;
  role: "user" | "ai";
  text: string;
  intent?: string | null;
};

const SUGGESTIONS = [
  "Chi nhánh đang có?",
  "Dịch vụ hiện có?",
  "Bảng giá cơ bản?",
  "Giờ mở cửa?",
  "Danh sách studio?",
];

function uuid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto)
    return crypto.randomUUID();
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  // Khởi tạo session + tải lịch sử
  useEffect(() => {
    const sid = localStorage.getItem("bs_chat_session") || uuid();
    localStorage.setItem("bs_chat_session", sid);
    setSessionId(sid);

    const saved = localStorage.getItem("bs_chat_history");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Msg[];
        setMessages(parsed);
      } catch {
        // ignore
      }
    }
  }, []);

  // Lưu lịch sử, auto scroll
  useEffect(() => {
    localStorage.setItem("bs_chat_history", JSON.stringify(messages));
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const hasUnread = useMemo(
    () => !open && messages.some((m) => m.role === "ai"),
    [open, messages]
  );

  async function handleSend(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const userMsg: Msg = { id: uuid(), role: "user", text: content };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const { reply, intent } = await sendChatMessage(
        sessionId || "guest",
        content
      );
      const aiMsg: Msg = { id: uuid(), role: "ai", text: reply, intent };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (e: unknown) {
      const errMsg: Msg = {
        id: uuid(),
        role: "ai",
        text: "Xin lỗi, có lỗi khi kết nối tới trợ lý.",
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  async function handleReset() {
    try {
      await resetChatSession(sessionId || "guest");
    } catch {
      // ignore lỗi reset
    }
    setMessages([]);
    localStorage.removeItem("bs_chat_history");
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-[60] rounded-full bg-primary text-primary-foreground p-4 shadow-xl hover:brightness-110 transition-all"
        aria-label="Mở chat trợ lý AI"
      >
        <div className="relative">
          <MessageCircle className="h-6 w-6" />
          {hasUnread && (
            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-primary" />
          )}
        </div>
      </button>

      {/* Panel Chat */}
      {open && (
        <div
          className="fixed z-[60] right-6 bottom-24 w-[360px] max-h-[70vh] rounded-xl border bg-card text-card-foreground shadow-2xl flex flex-col overflow-hidden
  sm:right-3 sm:bottom-24 sm:w-[calc(100%-1.5rem)]
  md:right-6 md:bottom-24 md:w-[420px]
  lg:w-[480px]"
          role="dialog"
          aria-label="Hộp thoại trợ lý AI"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b bg-[--popover]">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              <h3 className="text-sm font-semibold">
                Trợ lý AI — Booking Studio
              </h3>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs border hover:bg-secondary
  transition-colors"
                aria-label="Đặt lại hội thoại"
                title="Đặt lại hội thoại"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </button>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
                aria-label="Đóng"
                title="Đóng"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Gợi ý nhanh */}
          {messages.length === 0 && (
            <div className="px-3 pt-3 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="px-3 py-1.5 text-xs rounded-full border hover:bg-secondary transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Danh sách tin nhắn */}
          <div
            ref={listRef}
            className="flex-1 overflow-y-auto px-3 py-3 space-y-2"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={[
                    "max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed border",
                    m.role === "user"
                      ? "bg-white text-slate-800 dark:text-slate-100 dark:bg-slate-800/50 border-slate-200"
                      : "bg-white text-slate-800 dark:text-slate-100 dark:bg-slate-800/50",
                  ].join(" ")}
                >
                  <div style={{ whiteSpace: "pre-wrap" }}>{m.text}</div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div
                  className="max-w-[80%] rounded-2xl px-3 py-2 text-sm border bg-white text-slate-600 dark:text-
  slate-200 dark:bg-slate-800/50"
                >
                  Đợi mình xíu nha, mình đang tìm thông tin phù hợp cho bạn…
                </div>
              </div>
            )}
          </div>

          {/* Ô nhập */}
          <div className="border-t p-2 flex items-end gap-2 bg-[--popover]">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              rows={1}
              placeholder="Nhập câu hỏi của bạn..."
              className="flex-1 resize-none rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none
  focus:ring-2 focus:ring-ring"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground h-10 w-
  10 disabled:opacity-50 hover:brightness-110 transition-all"
              aria-label="Gửi"
              title="Gửi"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
