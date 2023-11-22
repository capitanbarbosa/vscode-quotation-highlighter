import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('extension.highlightText', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const doc = editor.document;
    const selection = editor.selection;
    const range = doc.getWordRangeAtPosition(selection.active, /["']([^"']*)["']/);

    if (range) {
      // Create a new range that starts right after the opening quote and ends right before the closing quote
      const textInsideQuotesRange = new vscode.Range(
        range.start.translate(0, 1), // Move start position one character to the right
        range.end.translate(0, -1)   // Move end position one character to the left
      );
      
      editor.selection = new vscode.Selection(textInsideQuotesRange.start, textInsideQuotesRange.end);
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
