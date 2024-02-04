function Content({ children }) {
  return (
    <main
      id="scrollable-section"
      className="md:p4 max-h-full max-w-none flex-1 overflow-hidden overflow-y-scroll bg-gray-50 p-5"
    >
      <div className="mx-auto max-w-screen-2xl">{children}</div>
    </main>
  );
}

export default Content;
