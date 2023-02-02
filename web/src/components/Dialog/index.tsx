import React, { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

interface DialogInfoProps {
  message?: string;
  closeChild?: ReactNode;
  openChild?: ReactNode;
  title?: string
}

const DialogInfo = ({ title = 'Info', ...props }: DialogInfoProps) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      {props.openChild}
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
      <Dialog.Content className='bg-[#2A2634] py-8 px-12 text-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-full shadow-black/25 sm:w-[590px]'>
        <Dialog.Title className='text-center mb-2 text-lg'>
          {title}
        </Dialog.Title>
        <Dialog.Description className='text-center'>
          {props.message}
        </Dialog.Description>
        <Dialog.Close asChild>
          {props.closeChild ?
            props.closeChild :
            <div className='flex flex-row justify-end mt-8'>
              <a href='#'>Close</a>
            </div>
          }
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default DialogInfo;