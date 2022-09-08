const axios = require('axios')
const { expect } = require('chai')
const fs = require('fs')
const envVariable = require('./env.json')
const { faker } = require('@faker-js/faker')
const { randomNumber } = require('./random_number')


describe('User API Automation', async () => {

    it('User can login with valid information', async () => {
        var { data } = await axios.post(`${envVariable.baseUrl}/user/login`,
            {
                "email": "salman@grr.la",
                "password": "1234"
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        var token = data.token;
        console.log(token);
        envVariable.token = token;
        fs.writeFileSync('./env.json', JSON.stringify(envVariable));
        expect(data.message).contains('Login successfully')
    })

    var id;
    it('User can view list with valid authorization', async () => {
        var { data } = await axios.get(`${envVariable.baseUrl}/user/list`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': envVariable.token
                }
            })
        id = data.users[0].id;
        console.log(data.users[0].id);
        expect(data.message).contains('User list')
    })

    it('Create new user', async () => {
        var { data } = await axios.post(`${envVariable.baseUrl}/user/create`,
            {
                "name": `${faker.name.firstName()} ${faker.name.lastName()}`,
                "email": faker.internet.email(),
                "password": faker.internet.password(),
                "phone_number": `0151${randomNumber(1000000, 9999999)}`,
                "nid": `123${randomNumber(1000000, 9999999)}`,
                "role": "Customer"
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': envVariable.token,
                    'X-AUTH-SECRET-KEY': envVariable['X-AUTH-SECRET-KEY']
                }
            })
        console.log(data.user);
        console.log(data.message);
        expect(data.message).contains('User created successfully')

        envVariable.id = data.user.id;
        envVariable.name = data.user.name;
        envVariable.email = data.user.email;
        envVariable.phoneNumber = data.user.phone_number;

        fs.writeFileSync('./env.json', JSON.stringify(envVariable))
    })

    it('Create existing user', async () => {
        var { data } = await axios.post(`${envVariable.baseUrl}/user/create`,
            {
                "name": "Mr. Jamal 2",
                "email": "jamal2@test.com",
                "password": "12345678",
                "phone_number": "01504474770",
                "nid": "124654",
                "role": "Customer"
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': envVariable.token,
                    'X-AUTH-SECRET-KEY': envVariable['X-AUTH-SECRET-KEY']
                }
            })
        console.log(data.message);
        expect(data.message).contains('User already exists')
    })

    it('Search user by Id', async () => {
        var { data } = await axios.get(`${envVariable.baseUrl}/user/search?id=${envVariable.id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': envVariable.token,
                    'X-AUTH-SECRET-KEY': envVariable['X-AUTH-SECRET-KEY']
                }
            })
        console.log(data.user.name);
        expect(data.user.name).contains(`${envVariable.name}`)
    })

    it('Update user by Id', async () => {
        var { data } = await axios.put(`${envVariable.baseUrl}/user/update/${envVariable.id}`,
            {
                "name": "Shahriar Sadi",
                "email": "shahriar.sadi@gmail.com",
                "password": "gt$35tru",
                "phone_number": "01763553077",
                "nid": "54646464",
                "role": "Customer"
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': envVariable.token,
                    'X-AUTH-SECRET-KEY': envVariable['X-AUTH-SECRET-KEY']
                }
            })
        console.log(data.user);
        expect(data.message).contains('User updated successfully')
    })

    it('User update phone_nember', async () => {
        var { data } = await axios.patch(`${envVariable.baseUrl}/user/update/${envVariable.id}`,
            {
                "phone_number": "01734657987"
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': envVariable.token,
                    'X-AUTH-SECRET-KEY': envVariable['X-AUTH-SECRET-KEY']
                }
            })
        console.log(data.message);
        console.log(data.user);
        expect(data.message).contains('User updated successfully');
    })

    it('Delete user', async () => {
        var { data } = await axios.delete(`${envVariable.baseUrl}/user/delete/${envVariable.id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': envVariable.token,
                    'X-AUTH-SECRET-KEY': envVariable['X-AUTH-SECRET-KEY']
                }
            })
        console.log(data.message);
        expect(data.message).contains('User deleted successfully')    
    })
})