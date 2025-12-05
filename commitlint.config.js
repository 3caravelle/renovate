// commitlint.config.js
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "header-max-length": [2, "always", 72],
    "body-leading-blank": [2, "always"],
    "body-max-line-length": [2, "always", 100],
    "footer-leading-blank": [2, "always"],
    "footer-max-line-length": [2, "always", 100],
    "footer-requires-ai-fields": [2, "always"],
  },
  plugins: [
    {
      rules: {
        "footer-requires-ai-fields": (parsed) => {
          const { footer = "", body = "" } = parsed || {};
          // Some parsers do not populate "footer" for custom keys: also check in body
          const text = `${footer}\n${body}`;
          const hasAssisted = /AI-Assisted:\s*(true|false)/i.test(text);
          const hasTool = /AI-Tool:\s*\S+/i.test(text);
          const hasScope = /AI-Scope:\s*\S+/i.test(text);
          return hasAssisted && hasTool && hasScope
            ? [true]
            : [
                false,
                "Missing required AI metadata fields (AI-Assisted, AI-Tool, AI-Scope) in commit message.",
              ];
        },
      },
    },
  ],
};
