// all credits to jimmywarting - https://github.com/jimmywarting
// original source: https://github.com/eligrey/FileSaver.js/issues/558


export interface ZipFileLike {
    /** File or directory name inside the ZIP archive. */
    name: string;

    /** File modification time, expressed as a Unix timestamp in milliseconds. */
    lastModified?: number;

    /** Whether this entry represents a directory. */
    directory?: boolean;

    /** Optional ZIP entry comment. */
    comment?: string;

    /**
     * Returns a ReadableStream containing the file's uncompressed data.
     *
     * Required for regular files.
     * Not required for directory entries.
     */
    stream?: () => ReadableStream<Uint8Array>;
}

export interface ZipWriter {
    /**
     * Add a file or directory to the ZIP archive.
     */
    enqueue(fileLike: ZipFileLike): void;

    /**
     * Finish adding entries to the ZIP archive.
     */
    close(): void;
}

export interface ZipUnderlyingSource {
    /**
     * Called when the ZIP stream is initialized.
     */
    start?: (controller: ZipWriter) => void | PromiseLike<void>;

    /**
     * Called when the ZIP stream requests more work.
     */
    pull?: (controller: ZipWriter) => void | PromiseLike<void>;
}

/**
 * Creates a streaming ZIP archive.
 *
 * @param underlyingSource Source used to add files/directories to the archive.
 * @returns A ReadableStream containing the generated ZIP data.
 */
export declare function ZIP(
    underlyingSource: ZipUnderlyingSource,
): ReadableStream<Uint8Array>;

declare global {
    interface Window {
        ZIP: typeof ZIP;
    }
}