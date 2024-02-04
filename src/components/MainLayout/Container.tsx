function Container({ children }) {
  return (
    <div className="flex flex-col flex-1 h-full overflow-hidden">
      {children}
    </div>
  )
}

export default Container;