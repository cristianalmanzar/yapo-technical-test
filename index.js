const axios = require('axios');

//Obtener el ID de la propiedad por el comando 
const propertyId  = process.argv[2];

const url = "https://graph.infocasas.com.uy/graphql";

const headers = {
  "Content-Type": "application/json",
  "X-Origin": "www.infocasas.com.uy",
};

// Obtener la propiedad por id (GraphQL)
const query = `
  query {
    property(id: ${propertyId}) { 
      price { 
        amount
        currency {
          name
        }
      }
    }
  }
`;

axios.post(url, { query }, { headers })
  .then(response => {
    const data = response.data.data.property
    // Verifica si la propiedad no es existe
    if (!data) {
      console.log( `Propiedad no fue encontrada con el ID: ${propertyId}`);
      return false;
    }
    console.log(`${data.price.currency.name} ${data.price.amount}` );
  })
  .catch(error => {
    console.error('Error:', error.response);
  });
