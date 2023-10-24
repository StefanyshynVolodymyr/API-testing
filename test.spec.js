const axios = require('axios');
const { expect } = require('chai');

const baseUrl = 'https://petstore.swagger.io/v2';

describe('Pet Store API Tests', function () {
  let createdUserId;
  let createdPetId;

  it('should allow creating a User', async function () {
    const response = await axios.post(`${baseUrl}/user`, {
      id: 1,
      username: 'Vova',
      firstName: 'Volodymyr',
      lastName: 'Stefanyshyn',
      email: 'vs@example.com',
      password: 'v',
      phone: '0671727617',
    });

    expect(response.status).to.equal(200);
    createdUserId = response.data.id;
  });

  it('should allow login as a User', async function () {
    const response = await axios.get(`${baseUrl}/user/login?username=Vova&password=password`);
    expect(response.status).to.equal(200);
  });

  it('should allow creating a list of Users', async function () {
    const response = await axios.post(`${baseUrl}/user/createWithList`, 
    [
      {
        "id": 2,
        "username": "TestAList",
        "firstName": "TestAList",
        "lastName": "TestAList",
        "email": "test@gmail.com",
        "password": "pass123",
        "phone": "0671727617",
        "userStatus": 2
      },
     {
        "id": 3,
        "username": "TestAListsecondU",
        "firstName": "TestAListsecondF",
        "lastName": "TestAListsecondL",
        "email": "testsecond@gmail.com",
        "password": "pass1233",
        "phone": "0671727618",
        "userStatus": 3
      }
    ]
    );
    
  });

  it('should allow Log out User', async function () {
    const response = await axios.get(`${baseUrl}/user/logout`)  
  });


  it('should allow adding a new Pet', async function () {
    const response = await axios.post(`${baseUrl}/pet`, {
      id: 10,
      name: 'Ted',
      photoUrls: ['https://dog.com/ted.jpg'],
      status: 'available',
    });
    expect(response.status).to.equal(200);
    createdPetId = response.data.id;
  });

  it('should allow updating Pet’s image', async function () {
    const response = await axios.post(`${baseUrl}/pet/`, {
        "id": 10,
        photoUrls: ['https://newDog.com/ted.jpg'],
      });
  
  expect(response.status).to.equal(200);
});

  it('should allow updating Pet’s name and status', async function () {
    const response = await axios.post(`${baseUrl}/pet`, {
      "id": 10,
      "name": "TedDogNewName",
      "status": "newStatus"
    });

expect(response.status).to.equal(200);
});

  it('should allow deleting Pet', async function () {
    const response = await axios.delete(`${baseUrl}/pet/${createdPetId}`);
    expect(response.status).to.equal(200);
  });

after(async function () {
    if (createdUserId) {
      const response = await axios.delete(`${baseUrl}/user/${createdUserId}`);
      expect(response.status).to.equal(200);
    }
  });
});
