function containsAll(haystack) {
  console.log(33, haystack);

  for (var i = 1; i < arguments.length; i++) {
    var needle = arguments[i];
    if (haystack.indexOf(needle) === -1) {
      return false;
    }
  }
  return true;
}
containsAll('banana', 'b', 'nan');

//善用 arguments 与参数个数
