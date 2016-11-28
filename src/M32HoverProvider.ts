import * as vscode from 'vscode';
import { M32Shared } from './M32Shared';

export class M32HoverProvider implements vscode.HoverProvider
{
    public provideHover(
        document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken):
        Thenable<vscode.Hover>
    {
        return new Promise((resolve, reject) =>
        {
            let word = M32Shared.findWord(document, position);
            resolve(new vscode.Hover({ language: "M32", value: this.findDesc(word) }))
        })
    }

    private findDesc(word: string): string
    {
        return M32Shared
            .constant
            .concat(M32Shared.commands)
            .filter(value =>
            {
                return value.name == word
            })
            .pop().detail
    }
}
