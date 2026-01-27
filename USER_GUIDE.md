# Chatspace - Private AI - User Guide

## Welcome to Chatspace - Private AI! 👋

Welcome to Chatspace - Private AI - your private AI assistant that helps you chat with your documents and get answers based on your own knowledge. Everything stays on your own servers - no data leaves your environment.

---

## Quick Start

### 1. Create a Workspace (Workspace)
A workspace is like a project or knowledge area. Create one for each team, project, or topic.

**Examples:**
- "HR documents"
- "Product manuals"
- "Legal agreements"
- "Technical documentation"

### 2. Upload documents
Add the documents that AI should answer based on. Supports PDF, Word, text, and markdown files.

### 3. Start chatting!
Ask questions and get answers based on your documents.

---

## How does it work? 🤔

### Two ways to use documents

#### 📚 RAG - Workspace documents (Knowledge base)
**What is it?**
Think of it as a library where AI can search for information when needed.

**How does it work?**
1. You upload documents to your workspace
2. Documents are indexed (made searchable)
3. When you ask a question, AI searches the documents automatically
4. AI uses relevant information to answer

**When to use it?**
- Documents to be used in many chats
- Knowledge base for the entire team
- Manuals, policies, routines

**Example:**
```
You: "What is our remote work policy?"
AI: [Searches in HR documents] → "According to our policy..."
```

#### 📎 CAG - Attached files (Direct questions)
**What is it?**
Upload a file directly in the chat to ask questions about that specific file.

**How does it work?**
1. You attach a file in the chat message
2. AI reads the entire file directly
3. AI answers based on the file's content

**When to use it?**
- One-off questions about specific documents
- Comparing documents
- Analyzing new documents

**Example:**
```
You: [Attach contract.pdf] "Summarize this agreement"
AI: [Reads the file] → "The agreement is about..."
```

---

## How does the search work? 🔍

When AI searches your documents, it uses **two different methods simultaneously** for the best results:

### 1. 🔤 Keyword search (Keyword search)
**Simply explained:** Searches for exact words and phrases.

**Example:**
- You ask: "What is our GDPR policy?"
- Searches for: "GDPR", "policy", "data protection"
- Finds documents containing these words

**Good for:**
- Specific terms
- Product names
- Legal concepts
- Acronyms

### 2. 🧠 Semantic search (Meaning search)
**Simply explained:** Understands what you mean, not just the words you use.

**Example:**
- You ask: "How do we handle customer data?"
- Understands that you mean: data protection, privacy, GDPR
- Finds relevant documents even if they don't use your exact words

**Good for:**
- Conceptual questions
- Different ways to express the same thing
- Finding related information

### 🎯 Hybrid search (Standard)
**Best of both worlds!**
Chatspace - Private AI combines both methods automatically for the best results.

---

## Advanced settings ⚙️

**Do I need to change these?**
**NO!** The standard settings work great for 95% of use cases.

But if you want to fine-tune, here are the options:

### Number of results (top_n)
**Standard:** 5 documents
- **Fewer (3):** Faster responses, more focused
- **More (10):** More comprehensive, may be slower

### Similarity threshold (similarity threshold)
**Standard:** 0.25
- **Higher (0.5):** Only very relevant results
- **Lower (0.1):** More results, even less relevant

### Hybrid search
**Standard:** ON
- **Recommendation:** Keep it on!

### Web search
**Standard:** OFF
- **When to turn it on?**
  - Current news
  - Real-time information
  - Facts outside your documents

---

## Chat modes 💬

### Chat mode (Standard)
AI always responds, even if it doesn't find relevant information in the documents.

**Use when:**
- You want conversation
- General questions
- Brainstorming

### Query mode
AI **only** responds if it finds relevant information in your documents.

**Use when:**
- You only want answers from your documents
- Ensure answers are based on your knowledge
- Avoid guesses

---

## Tips & Tricks 💡

### 📝 Good document management
- **Name clearly:** "HR_Policy_2024.pdf" instead of "document1.pdf"
- **Keep updated:** Remove old versions
- **Organize:** One workspace per topic area

### 🎯 Ask good questions
- **Specific:** "What is the notice period for permanent employees?"
- **Not:** "Tell me about employments"

### 🔄 Combine CAG + RAG
- Attach a new file AND get context from workspace documents
- Perfect for comparing new documents to existing policies

### 🌐 Web search smart
- Turn on only when you need current information
- Turn off for internal questions (faster)

---

## Common questions ❓

### How many documents can I upload?
As many as you want! But think about keeping them relevant to the workspace topic.

### How long does it take to index documents?
Usually a few seconds per document. Larger documents take longer.

### Can AI see all my documents?
Only documents in the workspace you're chatting in. Each workspace is isolated.

### What happens if AI doesn't find answers?
- **Chat mode:** It responds anyway based on its general knowledge
- **Query mode:** It says it doesn't find relevant information

### Is my data safe?
Yes! Everything runs on your own servers. No data is sent to external services.

### Can I share workspaces with colleagues?
No, your workspaces are private. Only you and administrators can see your workspaces. This ensures that your data remains confidential.

---

## Need help? 🆘

Contact your IT department or system administrator for:
- Technical problems
- Access issues
- New feature requests

---

**Good luck with Chatspace - Private AI!** 🚀

*Private AI for your team - safe, smart, and easy.*
