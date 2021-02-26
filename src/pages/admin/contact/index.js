import useSWR, { mutate } from "swr";
import Dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios"

Dayjs.extend(relativeTime);

export default function Contact() {
  const { data: contacts, error: contactError,mutate } = useSWR(`/contact`);

  const deleteContact = async (id) => {
    try {
      const res = await axios.delete(`/contact/delete/${id}`)
      mutate("/contact")
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen h-full bg-primary-3 text-white py-10">
      <div className="flex items-center justify-center">
        <Link href="/admin/contact/create">
          <a className="px-6 py-5 hover:bg-blue-800 rounded flex items-center space-x-4 bg-primary-2">
            <span> Add Contact</span>
          </a>
        </Link>
      </div>

      <div className="my-10">
        <div className="max-w-2xl px-6  m-auto ">
          <ul className="bg-primary-1">
            {contacts?.data?.map((contact) => (
              <li key={contact.id} className="px-4 py-6 flex items-center justify-between cursor-pointer" onClick={()=>deleteContact(contact.id)}>
                <div>
                  <div>{contact.name}</div>
                  <div>{contact.value}</div>
                </div>
                <div className="bg-blue-600 text-white w-8 rounded-full flex items-center justify-center h-8">
                  <AiOutlineDelete size="20px" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
