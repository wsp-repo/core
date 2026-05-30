import { describe, it, expect } from 'vitest';

import { camelCase } from '../camelCase';

type Test = { input: string; result: string };

const TESTS: Test[] = [
  // Проблемный случай
  { input: 'auth-user', result: 'authUser' },
  { input: 'auth_user', result: 'authUser' },
  { input: 'auth user', result: 'authUser' },

  // Другие случаи с нижним регистром
  { input: 'get-user-by-id', result: 'getUserById' },
  { input: 'create_new_record', result: 'createNewRecord' },
  { input: 'parse json data', result: 'parseJsonData' },

  // Смешанные случаи
  { input: 'user-id', result: 'userId' },
  { input: 'first-name', result: 'firstName' },
  { input: 'last_name', result: 'lastName' },
  { input: 'confirm-password', result: 'confirmPassword' },
  { input: 'user__full-name', result: 'userFullName' },

  // С аббревиатурами
  { input: 'user-html-parser', result: 'userHtmlParser' },
  { input: 'api-key-generator', result: 'apiKeyGenerator' },
  { input: 'xml-http-request', result: 'xmlHttpRequest' },

  // С цифрами
  { input: 'user-2-id', result: 'user2Id' },
  { input: 'html5-parser', result: 'html5Parser' },
  { input: 'css3-generator', result: 'css3Generator' },

  // Уже с camelCase блоками
  { input: 'camelCase', result: 'camelCase' },
  { input: 'PascalCase', result: 'pascalCase' },
  { input: 'xmlHttpRequest', result: 'xmlHttpRequest' },
  { input: 'xml_HttpRequest', result: 'xmlHttpRequest' },
  { input: 'XMLHttpRequest', result: 'xmlHttpRequest' },

  // Пограничные случаи
  { input: 'a', result: 'a' },
  { input: 'A', result: 'a' },
  { input: 'AB', result: 'ab' },
  { input: 'ABCDe', result: 'abcDe' },
  { input: 'a-b', result: 'aB' },
  { input: 'a_b', result: 'aB' },
  { input: 'a b', result: 'aB' },
  { input: 'aB', result: 'aB' },
  { input: '', result: '' },

  { input: 'hello-world', result: 'helloWorld' },
  { input: 'hello_world_example', result: 'helloWorldExample' },
  { input: 'helloWorldExample', result: 'helloWorldExample' },
  { input: 'HelloWorldExample', result: 'helloWorldExample' },
  { input: 'hello-world-123-example', result: 'helloWorld123Example' },
  { input: 'HTML-CSS-JavaScript', result: 'htmlCssJavaScript' },
  { input: 'get_HTML_Code_from_server', result: 'getHtmlCodeFromServer' },
  {
    input: 'this_is_a_very_long_string_with_many_words_to_test_performance',
    result: 'thisIsAVeryLongStringWithManyWordsToTestPerformance',
  },
  { input: 'XMLHttpRequest', result: 'xmlHttpRequest' },
  { input: 'hello world example test', result: 'helloWorldExampleTest' },
  { input: 'hello!world@example#test', result: 'helloWorldExampleTest' },
  { input: 'HELLO-world_Example-TEST', result: 'helloWorldExampleTest' },
];

describe('TypeBox. Helper "toCamelCase"', () => {
  it.each(TESTS)('camelCase', ({ result, input }) => {
    expect(camelCase(input)).toEqual(result);
  });
});
