import React from 'react'
import { useRouter } from 'next/router'


const Product = () => {
  const router = useRouter()

  const { id } = router.query

  return (
    <div>product: {id}</div>
  )
}

export default Product;