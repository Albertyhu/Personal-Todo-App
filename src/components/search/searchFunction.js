//This method handles the search query that is typed into the search bar
export const SearchQuery = (query, list) => {
  var result = list.filter((item) => item.toLowerCase().search(query.toLowerCase().trim()) > -1);
  return result;
};
