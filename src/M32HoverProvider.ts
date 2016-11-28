import { HoverProvider, Hover } from 'vscode';
import { M32Shared } from './M32Shared';

export class M32HoverProvider implements HoverProvider
{
    public provideHover(
        document: TextDocument, position: Position, token: CancellationToken):
        Thenable<Hover>
    {
        let word = M32Shared.findWord(document, position);
        return new Hover({ language: "M32", value: this.findDesc(word) });
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
