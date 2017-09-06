const axios = require('axios')

// This function gets the images for the home page
exports.getImages = async (req, res) => {
  const result = await axios.get('https://unsplash.it/list') // Grab images from unsplash
  const allImages = result.data

  // Unsplash returns 1000+ images. Let's generate 20 random ID's to grab from the image set
  let randoms = []
  for(let i=0; i<20; i++) {
      randoms.push( Math.round(Math.random()*allImages.length) )
  }

  // Filter the images based on the 20 random ID's
  const images = allImages.filter(image => {
      return randoms.includes(image.id)
  })

  // Render the home page. Pass the title and the list of images
  res.render('index', {title:'Home', images})
}

// This function displays the full image after a thumbnail is clicked
exports.fullImage = async (req, res) => {
  // Grab the ID from the URL params
  const fullImage = req.params.id

  // Render the full-image page. Pass the title and the id of the image to show
  res.render('full-image', {title:`Image ${fullImage}`, id:fullImage})
}

// The search function fakes a search. The search term is displayed on the page, but random images are displayed
// because unsplash doesn't have search.
exports.search = async (req, res) => {
  // Grab bth search term
  const searchTerm = req.query.q

  // This next code is just like the home page. Grab 20 random images
  const result = await axios.get('https://unsplash.it/list')
  const allImages = result.data
  let randoms = []
  for(let i=0; i<20; i++) {
      randoms.push( Math.round(Math.random()*allImages.length) )
  }
  const images = allImages.filter(image => {
      return randoms.includes(image.id)
  })

  //Render the search page. Pass the title, serchTerm and images
  res.render('search', {title: `${searchTerm} Results`, searchTerm, images})
}
