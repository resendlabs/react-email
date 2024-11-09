import { Writable } from "node:stream";
import {
  PipeableStream,
  ReactDOMServerReadableStream,
} from "react-dom/server.browser";

const decoder = new TextDecoder("utf-8");

const promisify = (writable: Writable) => {
  return new Promise<void>((resolve, reject) => {
    writable.on("error", reject);
    writable.on("close", () => {
      resolve();
    });
  });
};

export const readStream = async (
  stream: PipeableStream | ReactDOMServerReadableStream,
) => {
  const chunks: Uint8Array[] = [];

  if ("pipeTo" in stream) {
    // means it's a readable stream
    const writableStream = new WritableStream({
      write(chunk: Uint8Array) {
        chunks.push(chunk);
      },
    });
    await stream.pipeTo(writableStream);
  } else {
    const writable = new Writable({
      write(chunk: Uint8Array, _encoding, callback) {
        chunks.push(chunk);

        callback();
      },
    });
    stream.pipe(writable);

    await promisify(writable);
  }

  let length = 0;
  chunks.forEach((item) => {
    length += item.length;
  });
  const mergedChunks = new Uint8Array(length);
  let offset = 0;
  chunks.forEach((item) => {
    mergedChunks.set(item, offset);
    offset += item.length;
  });

  return decoder.decode(mergedChunks);
};
