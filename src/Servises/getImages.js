export const getImages = (searchQuery, page) => {
  return fetch(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=38606630-60b5de12fba7ddb52266a30c0&image_type=photo&orientation=horizontal&per_page=12`
  );
};
