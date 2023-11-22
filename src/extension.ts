import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('extension.highlightText', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const doc = editor.document;
    const selection = editor.selection;
    // Regex updated to include groups for different quotes
    const regex = /(`([^`]*)`)|("([^"]*)")|('([^']*)')/;
    const range = doc.getWordRangeAtPosition(selection.active, regex);

    if (range) {
      const matchedText = doc.getText(range);

      // Determine the offset based on the type of quote
      let startOffset = 0, endOffset = 0;
      if (matchedText.startsWith("`")) {
        startOffset = endOffset = 1; // offset for backticks
      } else if (matchedText.startsWith("\"") || matchedText.startsWith("'")) {
        startOffset = endOffset = 1; // offset for single or double quotes
      }

      // Create a new range that adjusts for the type of quote
      const textInsideQuotesRange = new vscode.Range(
        range.start.translate(0, startOffset),
        range.end.translate(0, -endOffset)
      );
      
      editor.selection = new vscode.Selection(textInsideQuotesRange.start, textInsideQuotesRange.end);
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
