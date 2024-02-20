const request = require("supertest");
const app = require("../app");

const BASE_ACTORES = '/actors'

let actorsId;

const actors = {
    firstName: "daniel",
    lastName: "cano",
    nationality: "colombia",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg",
    birthday: "2002-12-12"
}

test("Post -> ' BASE_ACTORES', should return status code 201, and res.body to be defined and res.body.firstName = actors.firstName", async () => {
    const res = await request(app)
      .post( BASE_ACTORES)
  
      .send(actors);

      actorsId = res.body.id
  
    
  
    expect(res.status).toBe(201);
  
    expect(res.body).toBeDefined();
  
    expect(res.body.firstName).toBe(actors.firstName);
  });

  test("Get -> ' BASE_ACTORES', should return status code 200, res.body to be defined and res.body.length = 1", async () => {
    const res = await request(app)
    
    .get( BASE_ACTORES);
  
    expect(res.statusCode).toBe(200);
  
    expect(res.body).toBeDefined();
  
    expect(res.body).toHaveLength(1);
  });

  test("Get -> ' BASE_ACTORES/:id', should return status code 200, res.body to be defined and res.body.firstName = actors.firstName", async () => {
    const res = await request(app)
    
    .get( `${BASE_ACTORES}/ ${actorsId} `);
  
    expect(res.statusCode).toBe(200);
  
    expect(res.body).toBeDefined();
  
    expect(res.body.firstName).toBe(actors.firstName)
  });

  test("Put -> 'BASE_ACTORES/:id ', should return status code 200,res.body to be defined", async () => {
    const res = await request(app)
      .put(`${BASE_ACTORES}/${actorsId}`)

      .send({ firstName: 'ana', })
  
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe('ana')
  
  })

  test("Delete -> 'URL_ALBUM/:id', should return status code 204", async () => {
    const res = await request(app)
      .delete(`${BASE_ACTORES}/${actorsId}`)
  
    expect(res.statusCode).toBe(204)

  })







  
  

  

  