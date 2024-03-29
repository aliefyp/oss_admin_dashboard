const usePascalToParamCase = () => {
  return (str: string) => str
    .replace(/([A-Z])/g, "-$1")
    .replace(/^-/, "")
    .toLowerCase();
}

export default usePascalToParamCase;
