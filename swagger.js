const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger.json'
const endpointsFiles = ['./server.js']

const doc = {
    info: {
        title: process.env.PROJECT_NAME,
        description: process.env.PROJECT_DESC,
    },
    host: process.env.HOST,
    schemes: ['http'],
};

swaggerAutogen(outputFile,
    endpointsFiles, doc).then(() => {
    console.log('doc generated');
})