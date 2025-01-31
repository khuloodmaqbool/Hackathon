import { createClient } from '@sanity/client'
import axios from 'axios'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2021-08-31'
})

// Upload images to Sanity
async function uploadImageToSanity(imageUrl) {
  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' })
    const imageAsset = await client.assets.upload('image', response.data, {
      filename: path.basename(imageUrl)
    })
    return imageAsset._id
  } catch (error) {
    console.error('Image upload failed for:', imageUrl, error.message)
    return null
  }
}

// Import data from API to Sanity
async function importData() {
  try {
    console.log('Fetching products from API...')
    const response = await axios.get('https://678a6c29dd587da7ac2a1b2a.mockapi.io/products/product')
    const products = response.data
    console.log(`Fetched ${products.length} products`)

    for (const product of products) {
      console.log(`Processing product: ${product.name}`)

      // Uploading all images and storing references
      let imageRefs = []
      if (product.images && product.images.length > 0) {
        for (const imageUrl of product.images) {
          const imageRef = await uploadImageToSanity(imageUrl)
          if (imageRef) {
            imageRefs.push({
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: imageRef
              }
            })
          }
        }
      }

      const discountPercentage = parseFloat(product.offer.replace('%', '')) || 0
      const priceWithoutDiscount = discountPercentage > 0 
        ? product.price / (1 - discountPercentage / 100)
        : product.price

      const sanityProduct = {
        _type: 'product',
        name: product.name,
        description: product.description,
        price: product.price,
        discountPercentage,
        priceWithoutDiscount,
        stock: product.stock,
        weight: product.weight,
        tags: product.tags || [],
        colors: product.colors || [],
        sizes: product.sizes || [],
        images: imageRefs,
        reviews: (product.reviews || []).map(review => ({
          _type: 'review',
          reviewer: review.reviewer,
          comment: review.comment,
          rating: review.rating
        }))
      }

      console.log('Uploading product to Sanity:', sanityProduct.name)
      const result = await client.create(sanityProduct)
      console.log(`Product uploaded successfully: ${result._id}`)
    }

    console.log('Data import completed successfully!')
  } catch (error) {
    console.error('Error importing data:', error.message)
  }
}

importData()
