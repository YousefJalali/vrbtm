import keyword_extractor from "keyword-extractor"

export const removeUselessWords = (txt: string) =>
  keyword_extractor.extract(txt, {
    language: "english",
    remove_duplicates: false,
    remove_digits: false,
    return_changed_case: false,
    // return_chained_words: true,
  })
