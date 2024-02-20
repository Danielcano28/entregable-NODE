const request = require("supertest");
const app = require("../app");
require('../models')

let MovideId;

const BASE_MOVIE = '/movies'

const movie = {
    name: "la monja",
    image : "https://hips.hearstapps.com/hmg-prod/images/hechos-reales-insipiraron-la-monja2-1537099184.jpg?crop=0.564xw:1.00xh;0.219xw,0&resize=1200:*",
    synopsis: "Una monja se suicida en una abadía rumana y el Vaticano envía a un sacerdote y una novicia a investigar lo sucedido",
    relaiseYear: 1993
}

test("Post -> 'BASE_MOVIE', should return status code 201, and res.body to be defined and res.body.name = movie.name", async () => {
    const res = await request(app)
      .post(BASE_MOVIE)
  
      .send(movie);

      MovideId = res.body.id

    expect(res.status).toBe(201);
  
    expect(res.body).toBeDefined();
  
    expect(res.body.name).toBe(movie.name);
  });

  test("Get -> 'BASE_MOVIE', should return status code 200, res.body to be defined and res.body.length = 1", async () => {
    const res = await request(app)
    
    .get(BASE_MOVIE);
  
    expect(res.statusCode).toBe(200);
  
    expect(res.body).toBeDefined();
  
    expect(res.body).toHaveLength(1);
  });

  
  test("Get -> 'BASE_MOVIE/:id', should return status code 200, res.body to be defined and res.body.firstName =  movie.name", async () => {
    const res = await request(app)
    
    .get( `${BASE_MOVIE}/ ${ MovideId} `);
  
    expect(res.statusCode).toBe(200);
  
    expect(res.body).toBeDefined();
  
    expect(res.body.name).toBe( movie.name)
  });

  
  test("Put -> 'BASE_MOVIE/:id ', should return status code 200,res.body to be defined", async () => {
    const res = await request(app)
      .put(`${ BASE_MOVIE}/${ MovideId}`)

      .send({ name: 'mi abuelo es un peligro' })
  
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe('mi abuelo es un peligro')
  
  })