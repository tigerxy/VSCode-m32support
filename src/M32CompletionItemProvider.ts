import * as vscode from 'vscode';
import { M32Shared, com } from './M32Shared';

export class M32CompletionItemProvider implements vscode.CompletionItemProvider
{
    public provideCompletionItems(
        document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken):
        Thenable<vscode.CompletionItem[]>
    {
        let list: vscode.CompletionList = new vscode.CompletionList()
        let word = this.findWord(document, position)
        console.log(word)
        M32Shared
            .constant
            .concat(M32Shared.commands, this.scanDocForNames(document))
            .filter(value =>
            {
                return value.name.startsWith(word)
            })
            .forEach(element =>
            {
                let item = new vscode.CompletionItem(element.name)
                item.detail = element.detail
                item.documentation = ""
                element.doc.forEach(line => item.documentation += line + "\n")
                item.kind = element.kind
                list.items.push(item)
            })
        return list
    }

    private findWord(document: vscode.TextDocument, position: vscode.Position): string
    {
        return document.getText(document.getWordRangeAtPosition(position));
    }

    private scanDocForNames(document: vscode.TextDocument): Array<com>
    {
        let ret = new Array<com>()
        for (var index = 0; index < document.lineCount; index++)
        {
            let line: string = document.lineAt(index).text;
            let nameExp = /^(?!ADD|SUB|AND|(X)?OR|NOT|MUL|DIV|MOD|MOV|CMP|NOP|HALT|JMP|J(N)?Z|JG(T|E)|CALL|RET(I)?|INT|PR(N|T|L)|ORG|OFFSET|EQU|D(S|W)|INCLUDE|END)([a-zA-Z])+/gm

            let match = line.match(nameExp)
            if (match != null) {
                ret.push({
                    name: match[0],
                    detail: `Zeile ${index}`,
                    doc: [],
                    kind: vscode.CompletionItemKind.Variable
                })
            }
        }
        return ret
    }
}
