export function fetchCountries(name) {
  const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
  return fetch(url).then(function (response) {
    console.log(Promise.resolve(response));
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
