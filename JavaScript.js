let input = document.getElementById("result");

function addToInput(value) {
  input.value += value;
}

function clearInput() {
  input.value = "";
}

function calculate() {
  try {
    const expression = input.value;
    const result = evalExpression(expression);
    input.value = result;
  } catch (error) {
    console.error("Ошибка вычисления:", error);
    input.value = "Ошибка";
  }
}

function evalExpression(expression) {
  const sanitizedExpression = sanitizeExpression(expression);
  const tokens = tokenizeExpression(sanitizedExpression);
  const postfixTokens = convertToPostfix(tokens);
  const result = evaluatePostfix(postfixTokens);
  return result;
}

function sanitizeExpression(expression) {
  // Удаление недопустимых символов или обработка безопасности
  // В этом примере просто удаляем пробелы
  return expression.replace(/\s/g, "");
}

function tokenizeExpression(expression) {
  // Разделение выражения на токены (числа, операторы)
  // В этом примере используем регулярное выражение для разделения по операторам и числам
  return expression.match(/\d+|\+|\-|\*|\//g);
}

function convertToPostfix(infixTokens) {
  // Преобразование инфиксной нотации в постфиксную нотацию (обратная польская запись)
  // В этом примере используется алгоритм с использованием стека
  const postfixTokens = [];
  const operatorStack = [];

  const operatorPrecedence = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
  };

  for (let i = 0; i < infixTokens.length; i++) {
    const token = infixTokens[i];
    if (!isNaN(parseFloat(token))) {
      postfixTokens.push(token); // Если токен - число, добавляем его в выходную очередь
    } else {
      while (
        operatorStack.length > 0 &&
        operatorPrecedence[operatorStack[operatorStack.length - 1]] >= operatorPrecedence[token]
      ) {
        // Если токен - оператор, выполняем перемещение операторов из стека в выходную очередь
        postfixTokens.push(operatorStack.pop());
      }
      operatorStack.push(token); // Помещаем текущий оператор в стек
    }
  }

  // Выполняем перемещение оставшихся операторов из стека в выходную очередь
  while (operatorStack.length > 0) {
    postfixTokens.push(operatorStack.pop());
  }

  return postfixTokens;
}

function evaluatePostfix(postfixTokens) {
  // Вычисление значения постфиксного выражения
  // В этом примере используется стек для выполнения операций
  const operandStack = [];

  for (let i = 0; i < postfixTokens.length; i++) {
    const token = postfixTokens[i];
    if (!isNaN(parseFloat(token))) {
      operandStack.push(parseFloat(token)); // Если токен - число, помещаем его в стек операндов
    } else {
        const operand2 = operandStack.pop(); // Извлекаем два операнда из стека
const operand1 = operandStack.pop();
const result = performOperation(token, operand1, operand2); // Выполняем операцию над операндами
operandStack.push(result); // Помещаем результат обратно в стек операндов
}
}

return operandStack.pop(); // Возвращаем окончательный результат
}

function performOperation(operator, operand1, operand2) {
// Выполнение операции между двумя операндами
switch (operator) {
case "+":
return operand1 + operand2;
case "-":
return operand1 - operand2;
case "*":
return operand1 * operand2;
case "/":
if (operand2 === 0) {
throw new Error("Деление на ноль");
}
return operand1 / operand2;
default:
throw new Error("Недопустимый оператор");
}
}
    
