'use client';

import {
    MDXEditor,
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    thematicBreakPlugin,
    linkPlugin,
    linkDialogPlugin,
    imagePlugin,
    tablePlugin,
    markdownShortcutPlugin,
    frontmatterPlugin,
    codeBlockPlugin,
    sandpackPlugin,
    codeMirrorPlugin,
    diffSourcePlugin,
    toolbarPlugin,
    UndoRedo,
    BoldItalicUnderlineToggles,
    BlockTypeSelect,
    CodeToggle,
    CreateLink,
    InsertImage,
    InsertTable,
    ListsToggle,
    Separator
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import { FC } from 'react';

interface EditorProps {
    markdown: string;
    onChange?: (markdown: string) => void;
    name?: string;
    placeholder?: string;
    className?: string;
}

const Editor: FC<EditorProps> = ({ markdown: initialMarkdown, onChange, name, placeholder, className }) => {
    // Use generic 'textarea' functionality by syncing with a hidden input
    return (
        <div className={`mdx-editor-wrapper bg-neutral-950 border border-neutral-800 rounded-lg overflow-hidden ${className || ''}`}>
            <MDXEditor
                markdown={initialMarkdown}
                onChange={(newMarkdown) => {
                    onChange?.(newMarkdown);
                    // Determine if we need to manually update the hidden input value
                    // Typically in React `onChange` doesn't update the DOM node attribute automatically if we don't hold state
                    // But for a hidden input, we can just let React handle it if we have state, or we can use ref.
                    // Since this is a client component, let's allow it to be used as a controlled or uncontrolled component.
                    // But for the form action to work, the input value must be present.
                    const input = document.getElementById(`hidden-input-${name}`) as HTMLInputElement;
                    if (input) input.value = newMarkdown;
                }}
                plugins={[
                    headingsPlugin(),
                    listsPlugin(),
                    quotePlugin(),
                    thematicBreakPlugin(),
                    linkPlugin(),
                    linkDialogPlugin(),
                    imagePlugin(),
                    tablePlugin(),
                    markdownShortcutPlugin(),
                    frontmatterPlugin(),
                    codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
                    codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', ts: 'TypeScript', css: 'CSS', html: 'HTML', json: 'JSON' } }),
                    diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: 'foo' }),
                    toolbarPlugin({
                        toolbarContents: () => (
                            <>
                                <UndoRedo />
                                <Separator />
                                <BoldItalicUnderlineToggles />
                                <CodeToggle />
                                <Separator />
                                <BlockTypeSelect />
                                <ListsToggle />
                                <Separator />
                                <CreateLink />
                                <InsertImage />
                                <InsertTable />
                            </>
                        )
                    })
                ]}
                className="dark-theme-editor"
                contentEditableClassName="mdx-editor-content prose prose-invert max-w-none min-h-[400px] p-4 focus:outline-none"
            />
            {name && <input type="hidden" id={`hidden-input-${name}`} name={name} defaultValue={initialMarkdown} />}
        </div>
    );
};

export default Editor;
