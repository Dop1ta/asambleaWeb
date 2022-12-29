import React from 'react'
import { useRouter } from 'next/router'


const Update = () => {

  const router = useRouter()
  const { updateAsamblea } = router.query


  return (
    <div>{updateAsamblea}</div>
  )
}

export default Update