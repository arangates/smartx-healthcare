## Synopsis

A cheap health monitoring system for people who really needs it.

## Code Example

We are using MongoDB databas (Hosted on MongoLab), HTML5/CSS3/JavaScript in frontend. PHP/Python3 in backend.<br />
Ubuntu 14.04.4 LTS, AWS server is used for backend.

## MongoDB credentials
URL: ds047666.mlab.com
User: test<br />
Pass: test<br />
shell connection string: mongo ds047666.mlab.com:47666/pdata -u test -p test<br />
Mongo connection string: mongodb://test:test@ds047666.mlab.com:47666/pdata<br />

## Server credentials
Public IP: http://52.39.9.186/<br />
User: ubuntu<br />
key is used for authentication.

## Instructions to run code
1.git clone https://github.com/arangates/smartx-healthcare.git<br />
2.cd smartx-healthcare<br />
2.npm install -g bower<br />
3.bower install<br />
4.python -m SimpleHTTPServer 8000<br />
5.view dashboard at localhost:8000/<br />
