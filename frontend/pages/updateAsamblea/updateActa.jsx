import React from 'react'
import { useRouter } from 'next/router'

const upActa = () => {
    const router = useRouter()
    const upadateActa = router.query

    return (
        <div>updateActa</div>
    )
}

export default upadateActa