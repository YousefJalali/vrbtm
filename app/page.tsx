"use client";

import "./mark.css";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import debounce from "lodash.debounce";
import keyword_extractor from "keyword-extractor";

export default function Home() {
  const [showOptions, toggleOptions] = useState(false);
  const [wordLength, setWordLength] = useState(2);
  const [difficulty, setDifficulty] = useState(0.1);
  // const [exclude, setExclude] = useState("");
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string[]>([]);
  const [hiddenWord, setHiddenWord] = useState<string[]>([]);

  const hide = (word: string) => {
    if (Math.random() <= difficulty && word.length >= wordLength) {
      setHiddenWord((prevState) => [...prevState, word]);
    }

    // return word;
  };

  const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    debouncedOmit(e.target.value);
  };

  const removeUselessWords = (txt: string) => {
    const txtWithoutUselessWords = keyword_extractor.extract(txt, {
      language: "english",
      remove_digits: false,
      return_changed_case: false,
      remove_duplicates: false,
    });

    return txtWithoutUselessWords;
  };

  const debouncedOmit = useRef(
    debounce(async (text) => {
      if (text.length > 0) {
        removeUselessWords(text).forEach((word, i) => hide(word));

        setResult(text.split(" "));
      } else {
        console.log("else");
        setResult([]);
        setHiddenWord([]);
      }
    }, 500)
  ).current;

  useEffect(() => {
    return () => {
      debouncedOmit.cancel();
    };
  }, [debouncedOmit]);

  const displayResult =
    result.length > 0
      ? result
          .map((word) =>
            hiddenWord.includes(word)
              ? `<mark class='mark' >${word}</mark>`
              : word
          )
          .join(" ")
      : "";

  return (
    <main className="min-w-screen min-h-screen p-5">
      <nav className="flex w-full items-center justify-between">
        <h1 className="font-sans text-2xl">VRBTM</h1>
        <a onClick={() => toggleOptions(!showOptions)}>
          <HiOutlineAdjustmentsHorizontal className="text-2xl" />
        </a>
      </nav>

      {showOptions && (
        <div className="mt-4 mb-4 rounded-lg bg-layout-level1 p-3">
          <ul className="space-y-4">
            <li>
              <div>
                <div className="relative flex pt-1">
                  <label htmlFor="customRange1" className="form-label">
                    Difficulty
                  </label>
                  <input
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.valueAsNumber)}
                    type="range"
                    className="form-range  h-6  w-full  appearance-none  bg-transparent  p-0  focus:shadow-none focus:outline-none focus:ring-0"
                    id="customRange1"
                  />
                </div>
              </div>
            </li>
            <li>Word length</li>
            <li>Word length</li>
            <li>Word length</li>
          </ul>
        </div>
      )}

      <section>
        <textarea
          value={input}
          onChange={changeHandler}
          cols={5}
          rows={20}
          className="my-4 w-full bg-brand-primary-100 p-4"
        ></textarea>

        {result.length > 0 && (
          <p dangerouslySetInnerHTML={{ __html: displayResult }}></p>
        )}
      </section>
    </main>
  );
}
