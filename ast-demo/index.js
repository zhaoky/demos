const esprima = require('esprima');
const estraverse = require('estraverse');
const escodegen = require('escodegen');

let code = `var a = b=>{console.log(123);}`;
let tree = esprima.parseScript(code);
estraverse.traverse(tree, {
  leave(node) {
    if (node.type === 'ArrowFunctionExpression') {
      node.type = 'FunctionDeclaration';
    }
  }
});
let r = escodegen.generate(tree);
console.log(r);
