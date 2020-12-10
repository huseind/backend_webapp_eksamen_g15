// higher order function, som tar imot en annen funksjon
// andre funksjon tar imot parameterne, fanger feil og sender dem til next( neste kode som kjører)
// sender feil til global errorhandling errors.js
export default (func) => (req, res, next) => {
  Promise.resolve(func(req, res, next)).catch(next);
};

// gotten from lectures