const request = require("supertest");
const app = require("../app");

const BASE_GENRE = '/genres'

let GenreId;

const genre = {
    name : "comedia"
}

test("Post -> ' BASE_GENRE', should return status code 201, and res.body to be defined and res.body.name = genre.name", async () => {
    const res = await request(app)
      .post(BASE_GENRE)
  
      .send(genre);

      GenreId = res.body.id

    expect(res.status).toBe(201);
  
    expect(res.body).toBeDefined();
  
    expect(res.body.name).toBe(genre.name);
  });

  test("Get -> '  BASE_GENRE', should return status code 200, res.body to be defined and res.body.length = 1", async () => {
    const res = await request(app)
    
    .get(  BASE_GENRE);
  
    expect(res.statusCode).toBe(200);
  
    expect(res.body).toBeDefined();
  
    expect(res.body).toHaveLength(1);
  });

  
  test("Get -> 'BASE_GENRE/:id', should return status code 200, res.body to be defined and res.body.firstName = genre.name", async () => {
    const res = await request(app)
    
    .get( `${BASE_GENRE}/ ${GenreId} `);
  
    expect(res.statusCode).toBe(200);
  
    expect(res.body).toBeDefined();
  
    expect(res.body.name).toBe(genre.name)
  });

  test("Put -> ' BASE_GENRE/:id ', should return status code 200,res.body to be defined", async () => {
    const res = await request(app)
      .put(`${BASE_GENRE}/${GenreId}`)

      .send({ name: 'terror', })
  
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe('terror')
  
  })

  test("Delete -> 'BASE_GENRE/:id', should return status code 204", async () => {
    const res = await request(app)
      .delete(`${BASE_GENRE}/${GenreId}`)
  
    expect(res.statusCode).toBe(204)

  })