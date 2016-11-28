import * as vscode from 'vscode'
import {M32Shared} from './M32Shared'

export class M32DefinitionProvider implements vscode.DefinitionProvider
{
    public provideDefinition(
        document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken):
        Thenable<vscode.Location>
    {
        let word = M32Shared.findWord(document, position);
        //return new vscode.Location(document.uri, new vscode.Position(0,0))
        for (var index = 0; index < document.lineCount; index++)
        {
            let line: string = document.lineAt(index).text;
            let nameExp = /^(?!ADD|SUB|AND|(X)?OR|NOT|MUL|DIV|MOD|MOV|CMP|NOP|HALT|JMP|J(N)?Z|JG(T|E)|CALL|RET(I)?|INT|PR(N|T|L)|ORG|OFFSET|EQU|D(S|W)|INCLUDE|END)([a-zA-Z])+/gm

            let match = line.match(nameExp)
            if (match != null && match[0] === word) {
                return new vscode.Location(document.uri, new vscode.Position(index,0))
            }
        }
        token.cancel()
    }
}