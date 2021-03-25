const axios = require("axios")

exports.handler = async event => {
  const apiKey =  process.env.API_KEY

  const response = await axios.get(/* ... */)

  const pass = (body) => {
    return {
      statusCode: 200,
      body: JSON.stringify(body)
    }
  }

  return pass(response)
}