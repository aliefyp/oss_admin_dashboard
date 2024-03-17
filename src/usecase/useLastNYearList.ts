const useLastNYearList = (n: number) => {
  const currentYear = new Date().getFullYear()
  const years = []
  for (let i = 0; i < n; i++) {
    years.push(currentYear - i)
  }
  return years
}

export default useLastNYearList;