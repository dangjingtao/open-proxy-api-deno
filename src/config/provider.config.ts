export const providerConfig = {
  groq: {
    api_host: "https://api.groq.com",
  },
  cohere: {
    api_host: "https://api.cohere.ai",
  },
  deepseek: {
    api_host: "https://api.deepseek.com",
  },
  kimi: {
    api_host: "https://api.moonshot.cn",
  },
  gemini: {
    api_host: "https://generativelanguage.googleapis.com",
  },
};

export type ProviderKeys = keyof typeof providerConfig;
