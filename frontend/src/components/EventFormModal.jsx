"use client";

import { Dialog, DialogPanel, DialogTitle,Button } from "@headlessui/react";
import { useState } from "react";
import EventFormPage from "../app/events/form/page";


export default function EventFormModal() {
  const [isOpen, setIsOpen] = useState(true)

  const open = ()=> setIsOpen(true)
  const close = () => setIsOpen(false)

  return(
    <>
    <Button onClick={open} className="w-5% bg-blue-600 text-white px-4 py-2 rounded-2xl ">
    + 新規イベント
    </Button>

    <Dialog open={isOpen} onClose={close}  as="div" className=" relative z-50"> 
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
        <DialogPanel transition className="w-full max-w-md p-6 bg-white border rounded-2xl shadow-lg space-y-4">
          <DialogTitle className="text-lg font-bold">
          イベント登録
          </DialogTitle>
          <EventFormPage/>
        </DialogPanel>
      </div>
      </div>
    </Dialog>

    </>

  )
}


// export default function EventFormModal({
//   isOpen,
//   setIsOpen
// }) {
//   // const [formState, formAction] = useActionState(registerEvent, {
//   //   message: "",
//   //   success: false
//   // });
  


//   // useEffect(() => {
//   //   if (formState.success) {
//   //     setIsOpen(false);
//   //     router.refresh(); // ページ再取得でイベント一覧更新
//   //   }
//   // }, [formState.success, setIsOpen, router]);

//   return (
//     <Transition appear show={isOpen} as={Fragment}>
//       <Dialog
//         as="div"
//         onClose={() => setIsOpen(false)}
//         className=" relative z-50"
//       >
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-300"
//           leave="ease-in duration-200"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0  bg-opacity-25" />
//         </Transition.Child>

//         <div className="fixed inset-0 flex items-center justify-center p-4">
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             leave="ease-in duration-200"
//             enterFrom="opacity-0 scale-95"
//             enterTo="opacity-100 scale-100"
//             leaveFrom="opacity-100 scale-100"
//             leaveTo="opacity-0 scale-95"
//           >
//             <DialogPanel className="w-full max-w-md p-6 bg-white border rounded-2xl shadow-lg space-y-4">
//               <DialogTitle className="text-lg font-bold">
//                 イベント登録
//               </DialogTitle>
//               {formState.message && (
//                 <p className="text-red-500">{formState.message}</p>
//               )}
//               <EventRegisterForm />
//             </DialogPanel>
//           </Transition.Child>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// }
