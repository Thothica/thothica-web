export const indices = ["indic-lit-index", "arabic-poems-index", "libertarian-chunks-index", "loc-new-index",
    "legaltext-index", "cleaned-dutchtext-index", "openalex-index", "cleaned-arabicbooks-index"] as const

export type Index = typeof indices[number]
