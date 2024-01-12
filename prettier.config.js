module.exports = {
    parser: "typescript",
    printWidth: 80,
    semi: true,
    tabWidth: 2,
    trailingComma: "all",
    importOrder: [
      "<THIRD_PARTY_MODULES>",
      "^@samchon/shopping-api(.*)$",
      "(.*)providers/(.*)$",
      "^[./]",
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
    importOrderParserPlugins: ["decorators-legacy", "typescript"],
  };
  