const errors = (error) => {
  let list = []
  
  Object.keys(error.response.data.errors).forEach((key) => {
    list = list.concat(error.response.data.errors[key])
  })

  return list
}

export default errors
