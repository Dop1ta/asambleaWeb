function useRegex(input) {
  let regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/;
  return regex.test(input);
}

module.exports = useRegex;