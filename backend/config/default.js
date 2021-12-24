module.exports = {
  'database_config': {
    'type': 'mongodb',
    'host': 'localhost',
    'port': 27017,
    'username':'',
    'password':'',
    'name': 'test'
  },
  'jwt_config':{ expiresIn: 360000, algorithm: 'HS384' },
  "jwtSecret":"Secret Secret",
  "SALT_WORK_FACTOR" : 10 ,
  "corsOrigin":"http://localhost:3000",
  "perPage":10,
  "gmail":{
    "user": 'cobrahotel5@gmail.com',
    "pass": 'cobrahotelcobrahotel'
  },
};