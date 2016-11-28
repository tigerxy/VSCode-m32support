import * as vscode from 'vscode'

export enum vars 
{
    L,  // Links
    R,  // Rechts
    A,  // Ausdruck
    N,  // 0..15
    K,  // Nummerischer Wert
    S   // String in ""
}

export interface com
{
    name: string,
    detail: string,
    doc: Array<string>,
    vars?: Array<vars>,
    kind: vscode.CompletionItemKind
}

export class M32Shared
{
    public static findWord(document: vscode.TextDocument, position: vscode.Position): string
    {
        return document.getText(document.getWordRangeAtPosition(position));
    }
    public static checkValue(value: string, type: vars): boolean
    {
        let R = new RegExp("^(([0-9]+)|([01]{1,32}B)|([0-9A-F]{1,8}H))$")
        let L = new RegExp("^(PC|STATUS|R(0|1|2|3|4|5|5|7)|INTFLAGS|INTBASE|TIMER|TRELOAD|(U|S)?SP|(S|U)?BASE|(S|U)?LIMIT|TOS)$")
        let A1 = new RegExp("^([\@]([0-9]*|[01]{1,32}[B]|[0-9A-F]{1,8}[H])|((([0-9]*)|([01]{1,32}B)|([0-9A-F]{1,8}H))[(](PC|STATUS|R(0|1|2|3|4|5|5|7)|INTFLAGS|INTBASE|TIMER|TRELOAD|(U|S)?SP|(S|U)?BASE|(S|U)?LIMIT)[)]))(\[(PC|STATUS|R(0|1|2|3|4|5|5|7)|INTFLAGS|INTBASE|TIMER|TRELOAD|(U|S)?SP|(S|U)?BASE|(S|U)?LIMIT)\])?$")
        let A2 = new RegExp("^([\*](([0-9]*|[01]{1,32}[B]|[0-9A-F]{1,8}[H])|(PC|STATUS|R(0|1|2|3|4|5|5|7)|INTFLAGS|INTBASE|TIMER|TRELOAD|(U|S)?SP|(S|U)?BASE|(S|U)?LIMIT)))$")
        let N = new RegExp("^[0-9][0-5]?$")
        let K = new RegExp("^[0-9]+$")
        let S = new RegExp("^\".*\"$")
        switch (type)
        {
            case vars.R:
                return R.test(value) || L.test(value) || A1.test(value) || A2.test(value)
            case vars.L:
                return L.test(value) || A1.test(value) || A2.test(value)
            case vars.A:
                return A1.test(value) || A2.test(value)
            case vars.N:
                return N.test(value)
            case vars.K:
                return K.test(value)
            case vars.S:
                return S.test(value)
            default:
                return true;
        }
    }
    public static commands: Array<com> = [
        {
            name: "ADD",
            detail:
            "ADD a,b",
            doc: [
                "a = a + b",
                "Addition"
            ],
            vars: [
                vars.L,
                vars.R
            ],
            kind: vscode.CompletionItemKind.Function
        },
        {
            name: "SUB",
            detail:
            "SUB a,b",
            doc: [
                "a = a - b",
                "Subtraktion"
            ],
            vars: [
                vars.L,
                vars.R
            ],
            kind: vscode.CompletionItemKind.Function
        },
        {
            name: "AND",
            detail:
            "AND a,b",
            doc: [
                "a = a & b",
                "bitweises UND"
            ],
            vars: [
                vars.L,
                vars.R
            ],
            kind: vscode.CompletionItemKind.Function
        },
        {
            name: "OR",
            detail: "OR a,b",
            doc: [
                "a = a | b",
                "bitweises OR"
            ],
            vars: [
                vars.L,
                vars.R
            ],
            kind: vscode.CompletionItemKind.Function
        },
        {
            name: "XOR",
            detail:
            "XOR a,b",
            doc: [
                "a = a ^ b",
                "bitweises XOR"
            ],
            vars: [
                vars.L,
                vars.R
            ],
            kind: vscode.CompletionItemKind.Function
        },
        {
            name: "NOT",
            detail:
            "NOT a,b",
            doc: [
                "a = ~b",
                "Einerkomplement"
            ],
            vars: [
                vars.L,
                vars.R
            ],
            kind: vscode.CompletionItemKind.Function
        },
        {
            name: "MUL",
            detail:
            "MUL a,b",
            doc: [
                "a = a * b",
                "Multiplikation"
            ],
            vars: [
                vars.L,
                vars.R
            ],
            kind: vscode.CompletionItemKind.Function
        },
        {
            name: "DIV",
            detail:
            "DIV a,b",
            doc: [
                "a = a / b",
                "Division"
            ],
            vars: [
                vars.L,
                vars.R
            ],
            kind: vscode.CompletionItemKind.Function
        },
        {
            name: "MOD",
            detail:
            "MOD a,b",
            doc: [
                "a = a % b",
                "Modulo-Operation"
            ],
            vars: [
                vars.L,
                vars.R
            ],
            kind: vscode.CompletionItemKind.Function
        },
        {
            name: "MOV",
            detail:
            "MOV a,b",
            doc: [
                "a = b",
                "Zuweisung"
            ],
            vars: [
                vars.L,
                vars.R
            ],
            kind: vscode.CompletionItemKind.Function
        },
        {
            name: "CMP",
            detail:
            "CMP a,b",
            doc: [
                "a>=b?",
                "Vergleich der Operanden a und b, Greater-Equal-Bit wird gesetzt, wenn a>=b ist. Das ZERO Bit wird gesetzt, wenn a=b ist."
            ],
            vars: [
                vars.L,
                vars.R
            ],
            kind: vscode.CompletionItemKind.Function
        },
        {
            name: "NOP",
            detail:
            "NOP",
            doc: [
                "Keine Operation"
            ],
            vars: [],
            kind: vscode.CompletionItemKind.Function
        },
        {
            name: "HALT",
            detail:
            "HALT",
            doc: [
                "Halt der CPU"
            ],
            vars: [],
            kind: vscode.CompletionItemKind.Function
        },
        {
            name: "JMP",
            detail:
            "JMP a",
            doc: [
                "Springe zu Adresse a"
            ],
            vars: [
                vars.A
            ],
            kind: vscode.CompletionItemKind.Function
        },
        {
            name: "JNZ",
            detail:
            "JNZ a",
            doc: [
                "Springe, wenn ZERO Bit nicht gesetzt zu Adresse a"
            ],
            vars: [
                vars.A
            ],
            kind: vscode.CompletionItemKind.Function
        },
        {
            name: "JZ",
            detail:
            "JZ a",
            doc: [
                "Springe wenn ZERO Bit gesetzt zu Adresse a"
            ],
            vars: [
                vars.A
            ],
            kind: vscode.CompletionItemKind.Function
        },
        {
            name: "JGT",
            detail:
            "JGT a",
            doc: [
                "Springe, wenn Greater-Equal-Bit gesetzt und Zero-Bit nicht gesetzt zu Adresse a"
            ],
            vars: [
                vars.A
            ],
            kind: vscode.CompletionItemKind.Function
        },
        {
            name: "JGE",
            detail:
            "JGE a",
            doc: [
                "Springe, wenn Greater-Equal-Bit gesetzt zu Adresse a"
            ],
            vars: [
                vars.A
            ],
            kind: vscode.CompletionItemKind.Function
        },
        {
            name: "CALL",
            detail:
            "CALL a",
            doc: [
                "Unterprogrammaufruf zu Adresse a"
            ],
            vars: [
                vars.A
            ],
            kind: vscode.CompletionItemKind.Function
        },
        {
            name: "RET",
            detail:
            "RET",
            doc: [
                "Rückkehr vom Unterprogramm"
            ],
            vars: [],
            kind: vscode.CompletionItemKind.Function
        },
        {
            name: "INT",
            detail:
            "INT n",
            doc: [
                "n (0..15)",
                "Führe Softwareinterrupt n aus"
            ],
            vars: [
                vars.N
            ],
            kind: vscode.CompletionItemKind.Function
        },
        {
            name: "RETI",
            detail:
            "RETI",
            doc: [
                "Rückkehr vom Interrupt"
            ],
            vars: [],
            kind: vscode.CompletionItemKind.Function
        },
        {
            name: "PRN",
            detail:
            "PRN a",
            doc: [
                "hexadezimale Ausgabe des Operanden"
            ],
            vars: [
                vars.A
            ],
            kind: vscode.CompletionItemKind.Function
        },
        {
            name: "PRT",
            detail:
            "PRT a",
            doc: [
                "Textausgabe des bei der Adresse des Operanden stehenden Textes",
                "Die Operanden müssen A-Werte sein, die Text im Speicher adressieren. Textende wird im Speicher durch 0 markiert!"
            ],
            vars: [
                vars.A
            ],
            kind: vscode.CompletionItemKind.Function
        },
        {
            name: "PRL",
            detail:
            "PRL a",
            doc: [
                "Textausgabe des bei der Adresse des Operanden stehenden Textes mit Zeilenvorschub (Linefeed) nach der Ausgabe",
                "Die Operanden müssen A-Werte sein, die Text im Speicher adressieren. Textende wird im Speicher durch 0 markiert!"
            ],
            vars: [
                vars.A
            ],
            kind: vscode.CompletionItemKind.Function
        },
        {
            name: "ORG",
            detail:
            "ORG konstante",
            doc: [
                "Platzzeiger erhält Wert der Konstanten"
            ],
            vars: [
                vars.K
            ],
            kind: vscode.CompletionItemKind.Function
        },
        {
            name: "OFFSET",
            detail:
            "OFFSET konstante",
            doc: [
                "OFFSET-Wert im Assenbler wird auf den Wert der Konstanten gesetzt"
            ],
            vars: [
                vars.K
            ],
            kind: vscode.CompletionItemKind.Function
        },
        {
            name: "EQU",
            detail:
            "name EQU konstante",
            doc: [
                "In der Symboltabelle wird dem Symbol „name“ der Wert der Konstanten zugewiesen"
            ],
            vars: [
                vars.K
            ],
            kind: vscode.CompletionItemKind.Function
        },
        {
            name: "DS",
            detail:
            "DS konstante",
            doc: [
                "Platzzeiger wird um den Wert der Konstanten erhöht"
            ],
            vars: [
                vars.K
            ],
            kind: vscode.CompletionItemKind.Function
        },
        {
            name: "DW",
            detail:
            "DW konstante{,konstante}",
            doc: [
                "An der Stelle des Platzzeigers Konstanten ablegen"
            ],
            vars: [
                vars.K,
                vars.K,
                vars.K,
                vars.K,
                vars.K,
                vars.K,
                vars.K
            ],
            kind: vscode.CompletionItemKind.Function
        },
        {
            name: "INCLUDE",
            detail:
            "INCLUDE „name“",
            doc: [
                "Datei mit dem Namen „name“ einfügen"
            ],
            vars: [
                vars.S
            ],
            kind: vscode.CompletionItemKind.Function
        },
        {
            name: "END",
            detail: "",
            doc: [
                "Bezeichnung für das Ende der Assembler-Quelldatei"
            ],
            vars: [],
            kind: vscode.CompletionItemKind.Function
        }
    ]
    public static constant: Array<com> = [
        {
            name: "R1",
            detail: "Allgemeine Register",
            doc: [
                "Frei benutzbar"
            ],
            kind: vscode.CompletionItemKind.Variable
        },
        {
            name: "R2",
            detail: "Allgemeine Register",
            doc: [
                "Frei benutzbar"
            ],
            kind: vscode.CompletionItemKind.Variable
        },
        {
            name: "R3",
            detail: "Allgemeine Register",
            doc: [
                "Frei benutzbar"
            ],
            kind: vscode.CompletionItemKind.Variable
        },
        {
            name: "R4",
            detail: "Allgemeine Register",
            doc: [
                "Frei benutzbar"
            ],
            kind: vscode.CompletionItemKind.Variable
        },
        {
            name: "R5",
            detail: "Allgemeine Register",
            doc: [
                "Frei benutzbar"
            ],
            kind: vscode.CompletionItemKind.Variable
        },
        {
            name: "R6",
            detail: "Allgemeine Register",
            doc: [
                "Frei benutzbar"
            ],
            kind: vscode.CompletionItemKind.Variable
        },
        {
            name: "R7",
            detail: "Allgemeine Register",
            doc: [
                "Frei benutzbar"
            ],
            kind: vscode.CompletionItemKind.Variable
        },
        {
            name: "PC",
            detail: "Program-Counter, Befehlszähler",
            doc: [
                "Logische Adresse, von wo die CPU den nächsten Befehl holt"
            ],
            kind: vscode.CompletionItemKind.Variable
        },
        {
            name: "STATUS",
            detail: "Status-Bits",
            doc: [
                "Bit 0: ZERO Bit",
                "Bit 1: Greater-Equal",
                "Bit 8: Timer-Run",
                "Bit 16: User",
                "Bit 17: MMU-Fault"
            ],
            kind: vscode.CompletionItemKind.Variable
        },
        {
            name: "INTFLAGS",
            detail: "Interrupt-Flags",
            doc: [
                "Bit 0: INTENA",
                "Interrupt-enable, allgemeine Interrupt-Freigabe",
                "Bit 1: TIENA",
                "Timer-Interrupt-Enable",
                "Bit 2: TINT",
                "Timer-Interrupt-Bit",
                "Bit 3: EX1ENA EXTERN1-Interrupt-Enable",
                "Bit 4: EX1INT",
                "EXTERN1-Interrupt-Bit",
                "Bit 5: EX2ENA EXTERN2-Interrupt-Enable",
                "Bit 6: EX2INT",
                "EXTERN2-Interrupt-Bit",
                "(freigeben = 1, sperren = 0)"
            ],
            kind: vscode.CompletionItemKind.Variable
        },
        {
            name: "INTBASE",
            detail: "",
            doc: [
                "Basis der Interrupt-Sprungtabelle"
            ],
            kind: vscode.CompletionItemKind.Variable
        },
        {
            name: "TIMER",
            detail: "Timer Inhalt",
            doc: [
                "Zähler, hier steht der aktuelle Wert"
            ],
            kind: vscode.CompletionItemKind.Variable
        },
        {
            name: "TRELOAD",
            detail: "Timer-Nachladewert",
            doc: [
                "Wert, mit dem der Zähler beim Unterlauf neu gesetzt wird"
            ],
            kind: vscode.CompletionItemKind.Variable
        },
        {
            name: "SP",
            detail: "Stack-Pointer, Stapelzeiger",
            doc: [
                "SSP,USP: Stack-Pointer, TOS angeben, Stapel wächst nach unten",
                "Nach dem Retten eines Wertes auf dem Stapel wird SP erniedrigt"
            ],
            kind: vscode.CompletionItemKind.Variable
        },
        {
            name: "SSP",
            detail: "Stack-Pointer, Stapelzeiger",
            doc: [
                "SSP,USP: Stack-Pointer, TOS angeben, Stapel wächst nach unten",
                "Nach dem Retten eines Wertes auf dem Stapel wird SP erniedrigt"
            ],
            kind: vscode.CompletionItemKind.Variable
        },
        {
            name: "USP",
            detail: "Stack-Pointer, Stapelzeiger",
            doc: [
                "SSP,USP: Stack-Pointer, TOS angeben, Stapel wächst nach unten",
                "Nach dem Retten eines Wertes auf dem Stapel wird SP erniedrigt"
            ],
            kind: vscode.CompletionItemKind.Variable
        },
        {
            name: "BASE",
            detail: "MMU Basisregister",
            doc: [
                "MMU Basisregister des Segments wird auf die logische Adresse aufaddiert"
            ],
            kind: vscode.CompletionItemKind.Variable
        },
        {
            name: "SBASE",
            detail: "MMU Basisregister",
            doc: [
                "MMU Basisregister des Segments wird auf die logische Adresse aufaddiert"
            ],
            kind: vscode.CompletionItemKind.Variable
        },
        {
            name: "UBASE",
            detail: "MMU Basisregister",
            doc: [
                "MMU Basisregister des Segments wird auf die logische Adresse aufaddiert"
            ],
            kind: vscode.CompletionItemKind.Variable
        },
        {
            name: "LIMIT",
            detail: "MMU Grenzregister",
            doc: [
                "LIMIT wird geprüft:",
                "\ta<LIMIT * physik. Adr. = a+S-/UBASE",
                "\ta>LIMIT * Speicherzugriffsverletzung",
                "LIMIT=0:",
                "\tTest ausgeschaltet"
            ],
            kind: vscode.CompletionItemKind.Variable
        },
        {
            name: "SLIMIT",
            detail: "MMU Grenzregister",
            doc: [
                "SLIMIT wird geprüft:",
                "\ta<SLIMIT * physik. Adr. = a+S-/UBASE",
                "\ta>SLIMIT * Speicherzugriffsverletzung",
                "SLIMIT=0:",
                "\tTest ausgeschaltet"
            ],
            kind: vscode.CompletionItemKind.Variable
        },
        {
            name: "ULIMIT",
            detail: "MMU Grenzregister",
            doc: [
                "ULIMIT wird geprüft:",
                "\ta<ULIMIT * physik. Adr. = a+S-/UBASE",
                "\ta>ULIMIT * Speicherzugriffsverletzung",
                "ULIMIT=0:",
                "\tTest ausgeschaltet"
            ],
            kind: vscode.CompletionItemKind.Variable
        },
        {
            name: "TOS",
            detail: "Top of Stack",
            doc: [
                "Das oberste Stackelement ist der Operand"
            ],
            kind: vscode.CompletionItemKind.Variable
        }
    ]
}