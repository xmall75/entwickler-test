# Developer Test
This repository contains 3 directories: frontend, backend, and logic. **Frontend** and **backend** should be run together while **logic** can be run separately.

## Backend
![Database Design](https://github.com/user-attachments/assets/279f8356-96a2-48ff-a9bc-021fa9ee3ec3)
The image above is the database design for this system. This system has 7 tables but I only managed to create API for 4 tables only.

The backend is developed using Mas [Kurniacf](https://github.com/kurniacf)'s template which uses [Express.js](https://expressjs.com/) with [Sequelize](https://sequelize.org/) to manage the database.

### Features
1. CRUD for Pegawai
2. Read only API for Jabatan, Unit Kerja, and Tempat Tugas

API Documentation: [Postman](https://documenter.getpostman.com/view/27920384/2sB2j7cUzh)

For more details about **how to run**, **folder structures**, and many more can check the [README.md from backend directory](https://github.com/xmall75/entwickler-test/tree/main/backend#readme).

## Frontend
The frontend is developed using [Next.js](https://nextjs.org/) 15 with [TypeScript](https://www.typescriptlang.org/) and [Ant Design](https://ant.design/).

For more details about **how to run** and more, check out the [README.md from frontend directory](https://github.com/xmall75/entwickler-test/tree/main/frontend#readme).

## Logic
All problems are solved using JavaScript. The scripts can be run by attaching it into HTML code or simply `node scripts.js` if you have Node installed.
