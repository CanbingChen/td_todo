import { createContext, useContext } from "react";

export const SearchContext = createContext<string>("");

// SearchContext.Provider

function replace(content, keyword) {
  if (!content || !keyword) return content;
  content = content + "";
  const reg = new RegExp(keyword, "gi");
  return content.replace(reg, `<span style="color:#ff6600">${keyword}</span>`);
}

const MatchSpan = ({ content }) => {
  const search = useContext(SearchContext);
  const replaceText = replace(content, search);
  console.log(search, content, replaceText, "search");
  return <span dangerouslySetInnerHTML={{ __html: replaceText }} />;
};

export default MatchSpan;
