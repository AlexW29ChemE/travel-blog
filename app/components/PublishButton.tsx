
'use client'

import axios from "axios"
import { Blog } from "../model/types"
import { useRouter } from "next/navigation"
import { useState } from "react"
export default function PublishButton({id,published}:{id:string,published?:boolean|null}){

const router = useRouter()
const [pending,setPending] = useState(false)

const handler = async ()=>{
    setPending(true)
    await axios.patch(`api/blogs/${published?"unpublish":"publish"}`,{id})
    router.refresh()
    setPending(false)
}

return(
<button className="editButton" disabled={pending} onClick={handler}>{published?'Unpublish':'Publish'}</button>
)
}

