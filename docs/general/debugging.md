# Debugging

- [Debugging](#debugging)
  - [Debugging with Visual Studio Code](#debugging-with-visual-studio-code)

## Debugging with Visual Studio Code

You can super charge your React debugging workflow via VS Code and Chrome. Here are the steps:

1. Install the [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) extension in VS Code.
2. Add the `Launch Chrome` option to your `launch.json` config:

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Chrome",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}"
    },
    {
      "type": "firefox",
      "request": "launch",
      "name": "Firefox",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}"
    },
    {
      "type": "edge",
      "request": "launch",
      "name": "Edge",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

3. Start your dev server with `yarn start`.
4. Launch the VS Code Debugger with the `Launch Chrome` configuration.

You can then set breakpoints directly from inside VS Code, use stepping with the Chrome or VS Code buttons and more.

Read all about it in the [Debugger for Chrome page](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome).
