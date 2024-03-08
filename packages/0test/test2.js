var ff = 2,
  line = 1,
  column = 3;
function removeBreakpoint({ url: ff, line, column }) {
  console.log(888, url, line, column);
}

removeBreakpoint({
  ff: 1,
  line: 2
});
