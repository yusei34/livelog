import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  ChevronDown,
  EllipsisVertical,
  Pencil,
  Trash2,
} from "lucide-react"

const ExpenseOptionMenu = ({onEdit, onDelete}) => {
  return (
    <div className=" text-right"> 
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm/6 font-semibold shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover: data-open:">
          <EllipsisVertical className="size-4 fill-gray-700" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom"
          className="w-52 origin-top-right shadow-xl rounded-xl bg-white text-sm/6 transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
        >
          <MenuItem>
            <button onClick={onEdit} className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-hover:bg-gray-300 data-focus:bg-gray-300">
              <Pencil className="size-4 fill-white/30" />
              Edit
              <kbd className="ml-auto hidden font-sans text-xs group-data-focus:inline">⌘E</kbd>
            </button>
          </MenuItem>
          
          <div className="my-1 h-px bg-white/5" />

          <MenuItem>
            <button onClick={onDelete} className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-hover:bg-gray-300 data-focus:bg-gray-300">
              <Trash2 className="size-4 fill-white/30" />
              Delete
              <kbd className="ml-auto hidden font-sans text-xs group-data-focus:inline">⌘D</kbd>
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  )
}




export default ExpenseOptionMenu;

// fixed top-24 w-52