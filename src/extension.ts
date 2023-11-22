import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('extension.highlightText', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const doc = editor.document;
    const selection = editor.selection;
    const range = doc.getWordRangeAtPosition(selection.active, /["'][^"']*["']/);

    if (range) {
      editor.selection = new vscode.Selection(range.start, range.end);
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
