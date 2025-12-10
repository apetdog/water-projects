<script setup>
  import { ref, onMounted } from "vue";
  import { CHAT_QA_LIST, CHAT_CONFIG } from "../config/chatConfig.js";

  const messages = ref([{ role: "ai", content: "" }]);
  const isTyping = ref(false);
  const contentRef = ref(null);
  const userInput = ref("");
  const inputRef = ref(null);

  function typewrite(text, onUpdate, onDone) {
    let i = 0;
    const step = () => {
      if (i <= text.length) {
        onUpdate(text.slice(0, i));
        i += 1;
        setTimeout(step, CHAT_CONFIG.typingDelayMs || 28);
      } else {
        onDone && onDone();
      }
    };
    step();
  }

  function sendQuestion(item) {
    if (isTyping.value) return;
    messages.value.push({ role: "user", content: item.q });
    const aiIndex = messages.value.length;
    messages.value.push({ role: "ai", content: "" });
    isTyping.value = true;
    typewrite(
      item.a,
      (t) => {
        messages.value[aiIndex].content = t;
        const el = contentRef.value;
        if (el) el.scrollTop = el.scrollHeight;
      },
      () => {
        isTyping.value = false;
      }
    );
  }

  function findAnswer(text) {
    const norm = (s) => s.toLowerCase().replace(/[^\u4e00-\u9fa5a-z0-9]/g, "");
    const bigrams = (s) => {
      const arr = [];
      for (let i = 0; i < s.length - 1; i++) arr.push(s.slice(i, i + 2));
      return arr;
    };
    const t = norm(text.trim());
    let bestScore = -1;
    let bestAns = CHAT_QA_LIST[0]?.a || "";
    for (const item of CHAT_QA_LIST) {
      const qn = norm(item.q);
      let score = 0;
      if (t === qn) score += 1000;
      if (t && qn) {
        const ts = bigrams(t);
        const qs = new Set(bigrams(qn));
        for (const bg of ts) if (qs.has(bg)) score += 2;
        if (t.includes(qn) || qn.includes(t))
          score += Math.min(t.length, qn.length);
      }
      if (score > bestScore) {
        bestScore = score;
        bestAns = item.a;
      }
    }
    return bestAns;
  }

  function sendText() {
    if (isTyping.value) return;
    const text = userInput.value.trim();
    if (!text) return;
    messages.value.push({ role: "user", content: (CHAT_CONFIG.userPrefix || "") + text });
    const aiIndex = messages.value.length;
    messages.value.push({ role: "ai", content: "" });
    isTyping.value = true;
    const ans = findAnswer(text);
    typewrite(
      ans,
      (t) => {
        messages.value[aiIndex].content = t;
        const el = contentRef.value;
        if (el) el.scrollTop = el.scrollHeight;
      },
      () => {
        isTyping.value = false;
        if (inputRef.value) inputRef.value.focus();
      }
    );
    userInput.value = "";
    if (inputRef.value) inputRef.value.focus();
  }

  function refreshChat() {
    if (isTyping.value) return;
    messages.value = [{ role: "ai", content: "" }];
    isTyping.value = true;
    const hello = "你好，我是园区智能助手。";
    typewrite(
      hello,
      (t) => {
        messages.value[0].content = t;
      },
      () => {
        isTyping.value = false;
        if (inputRef.value) inputRef.value.focus();
      }
    );
  }

  onMounted(() => {
    isTyping.value = true;
    const hello = "你好，我是园区智能助手。";
    typewrite(
      hello,
      (t) => {
        messages.value[0].content = t;
      },
      () => {
        isTyping.value = false;
      }
    );
    if (inputRef.value) inputRef.value.focus();
  });
</script>

<template>
  <div class="chat-dialog">
    <div class="chat-header">
      <div class="title">智能助手</div>
      <div class="chat-actions">
        <button
          class="refresh-btn"
          @click="refreshChat">
          刷新
        </button>
      </div>
    </div>
    <div
      class="chat-content"
      ref="contentRef">
      <div
        v-for="(m, idx) in messages"
        :key="idx"
        :class="['chat-msg', m.role === 'ai' ? 'ai' : 'user']">
        <div
          :class="[
            'bubble',
            isTyping && idx === messages.length - 1 && m.role === 'ai'
              ? 'typing'
              : '',
          ]">
          {{ m.content }}
        </div>
      </div>
    </div>
    <div class="chat-input">
      <input
        class="input"
        ref="inputRef"
        v-model="userInput"
        placeholder="请输入问题，按回车或点击发送"
        @keyup.enter="sendText" />
      <button
        class="send-btn"
        @click="sendText"
        :disabled="isTyping || !userInput.trim()">
        发送
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .chat-dialog {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 10vh;
    width: 50%;
    max-width: 980px;
    background: rgba(15, 24, 36, 0.6);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(240, 160, 10, 0.5);
    border-radius: 12px;
    pointer-events: all;
    z-index: 1000;
  }

  .chat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 16px;
    border-bottom: 1px solid rgba(240, 160, 10, 0.25);
  }
  .title {
    font-size: 16px;
    color: #f8eac0;
  }
  .chat-actions {
    display: flex;
    gap: 8px;
  }
  .refresh-btn {
    padding: 6px 10px;
    font-size: px;
    // color: #111;
    background: transparent;
    color: rgba(240, 160, 10, 0.9);
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }

  .chat-content {
    // max-height: 24vh;
    height: 20vh;
    overflow: auto;
    padding: 14px 16px;
  }

  .chat-msg {
    display: flex;
    margin-bottom: 10px;
  }
  .chat-msg.ai {
    justify-content: flex-start;
  }
  .chat-msg.user {
    justify-content: flex-end;
  }

  .bubble {
    max-width: 80%;
    padding: 10px 12px;
    border-radius: 12px;
    font-size: 14px;
    line-height: 1.6;
  }

  .chat-msg.ai .bubble {
    background: rgba(32, 44, 60, 0.9);
    color: #cfe7ff;
    border: 1px solid rgba(120, 160, 220, 0.3);
  }

  .chat-msg.user .bubble {
    background: rgba(240, 160, 10, 0.9);
    color: #111;
  }

  .chat-input {
    display: flex;
    gap: 10px;
    padding: 10px 16px 16px 16px;
  }
  .input {
    flex: 1;
    padding: 8px 12px;
    font-size: 13px;
    color: #f8eac0;
    background: rgba(48, 58, 72, 0.8);
    border: 1px solid rgba(240, 160, 10, 0.35);
    border-radius: 10px;
  }
  .send-btn {
    padding: 8px 14px;
    font-size: 13px;
    color: #111;
    background: rgba(240, 160, 10, 0.9);
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
  .send-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .typing::after {
    content: "▌";
    margin-left: 4px;
    animation: blink 1s step-end infinite;
  }
  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
</style>
