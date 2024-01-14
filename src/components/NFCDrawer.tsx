"use client";
import { FC } from "react";
import { Drawer } from "vaul";
import DrawerText from "./DrawerText";

interface DrawerProps {
  text: string;
  route: string;
}

const NFCDrawer: FC<DrawerProps> = ({ text, route }) => {
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger className="btn btn-primary rounded-full text-white text-xl w-full">
        {text}
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] h-[65%] mt-24 fixed bottom-0 left-0 right-0">
          <div className="p-4 bg-white rounded-t-[10px] flex-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
            <div className="max-w-md mx-auto">
              <Drawer.Title className="font-bold text-xl text-secondary mb-4 text-center">
                Bereit die Gesundheitskarte zu scannen.
              </Drawer.Title>
              <DrawerText route={route} />

              <Drawer.Close className="btn btn-neutral rounded-full mt-6 text-xl w-full">
                Abbrechen
              </Drawer.Close>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default NFCDrawer;
