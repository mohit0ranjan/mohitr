'use client';

import dynamic from 'next/dynamic';
import { FC } from 'react';

interface EditorProps {
    markdown: string;
    onChange?: (markdown: string) => void;
    name?: string;
    placeholder?: string;
    className?: string;
}

const InitializedMDXEditor = dynamic(() => import('./InitializedMDXEditor'), {
    ssr: false,
    loading: () => <div className="min-h-[400px] w-full bg-neutral-950 border border-neutral-800 rounded-lg animate-pulse"></div>
});

const Editor: FC<EditorProps> = (props) => {
    return <InitializedMDXEditor {...props} />;
};

export default Editor;
