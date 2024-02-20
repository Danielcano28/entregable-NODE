const request = require("supertest");
const app = require("../app");

const BASE_DIRECTORS = '/directors'

let DirectorsId;

const director = {
  firstName: "carlo",
  lastName: "ancheloty",
  nationality: "españa",
  image: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Carlo_Ancelotti_2016_%28cropped%29.jpg",
  birthay: "1996-2-21"
}

test("Post -> ' BASE_DIRECTORS', should return status code 201, and res.body to be defined and res.body.firstName = director.firstName", async () => {
    const res = await request(app)
      .post( BASE_DIRECTORS)
  
      .send(director);

       DirectorsId = res.body.id
  
    expect(res.status).toBe(201);
  
    expect(res.body).toBeDefined();
  
    expect(res.body.firstName).toBe(director.firstName);
  });

  test("Get -> ' BASE_DIRECTORS', should return status code 200, res.body to be defined and res.body.length = 1", async () => {
    const res = await request(app)
    
    .get( BASE_DIRECTORS);
  
    expect(res.statusCode).toBe(200);
  
    expect(res.body).toBeDefined();
  
    expect(res.body).toHaveLength(1);
  });

  test("Get -> ' BASE_DIRECTORS/:id', should return status code 200, res.body to be defined and res.body.firstName = director.firstName", async () => {
    const res = await request(app)
    
    .get( `${BASE_DIRECTORS}/ ${DirectorsId} `);
  
    expect(res.statusCode).toBe(200);
  
    expect(res.body).toBeDefined();
  
    expect(res.body.firstName).toBe(director.firstName)
  });

  test("Put -> ' BASE_DIRECTORS/:id ', should return status code 200,res.body to be defined", async () => {
    const res = await request(app)
      .put(`${ BASE_DIRECTORS}/${DirectorsId}`)

      .send({ firstName: 'el cholo', })
  
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe('el cholo')
  
  })

  test("Delete -> ' BASE_DIRECTORS/:id', should return status code 204", async () => {
    const res = await request(app)
      .delete(`${ BASE_DIRECTORS}/${DirectorsId}`)
  
    expect(res.statusCode).toBe(204)

  })

  

