/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';

import * as vscode from 'vscode';
import { M32HoverProvider } from './M32HoverProvider';
import { M32CompletionItemProvider } from './M32CompletionItemProvider';
import { M32DefinitionProvider } from './M32DefinitionProvider';

const M32_MODE: vscode.DocumentFilter = { language: 'M32', scheme: 'file' };
let diagnosticCollection: vscode.DiagnosticCollection;

export function activate(ctx: vscode.ExtensionContext)
{

	// Create the language client and start the client.
	ctx.subscriptions.push(
		vscode.languages.registerHoverProvider(
			M32_MODE, new M32HoverProvider()));
	ctx.subscriptions.push(
		vscode.languages.registerCompletionItemProvider(
			M32_MODE, new M32CompletionItemProvider()));
	ctx.subscriptions.push(
		vscode.languages.registerDefinitionProvider(
			M32_MODE, new M32DefinitionProvider()));
}