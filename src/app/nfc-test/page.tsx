"use client";
import { set } from "firebase/database";
import { FC, useEffect, useState } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const [feauture, setFeauture] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    setFeauture("NDEFReader" in window);
  }, []);

  const addMessage = (message: string) => {
    const new_messages = [...messages, message];
    setMessages(new_messages);
  };

  const scan = () => {
    setMessages([]);
    if (feauture) {
      // @ts-ignore
      const ndef = new NDEFReader();
      ndef
        .scan()
        .then(() => {
          addMessage("Scan started successfully.");

          ndef.onreadingerror = (event: any) => {
            addMessage(
              `Cannot read data from the NFC tag. Try another one? ${JSON.stringify(
                event
              )}}`
            );
          };

          ndef.onreading = (event: any) => {
            for (const record of event.message.records) {
              const message = `
              Record type: ${record.recordType}
              mediaType = ${record.mediaType}
              data = ${record.data}
              id = ${record.id}`;
              addMessage(message);
            }
          };
        })
        .catch((error: any) => {
          setMessages([...messages, `Error! Scan failed to start: ${error}.`]);
        });
    } else {
      setMessages([
        ...messages,
        "Your browser does not support the Web NFC API.",
      ]);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6 m-6">
      <h1 className="text-xl font-semibold">NFC Debug Page</h1>
      <p>Feature in Browser: {feauture ? "Yes" : "No"}</p>
      <button className="btn btn-primary" onClick={scan}>
        Scan
      </button>
      {messages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </div>
  );
};

export default page;
