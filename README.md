# Instalasi
## Spesifikasi:
- node: v.20.19.3
- mysql: v.8
- redis: v.8.4.0 or latest
- express: v.5.1.0
## 1. Menggunakan Docker
- Clone project dari repository github dan masuk ke folder project memakai terminal.
- Copy dan rename env.example menjadi .env
- Jalankan perintah:
```bash
docker compose up --build
```
- Tunggu proses selesai sampai diterminal muncul: **Server running on port 3000**
- Mysql (beserta migrate table) & Redis sudah otomatis terinstall, dan tinggal running di http://localhost:3000/api

## 2. Setup Environment Local
- Clone project dari repository github dan masuk ke folder project memakai terminal.
- Copy dan rename env.example menjadi .env dan sesuaikan credential mysql dan redis sesuai credential anda
- Jalankan perintah:
```bash
npm install
npm run migrate
npm run dev
```
- **noted**: npm run migrate memerlukan node version 20, atau bisa juga create table manual menggunakan file **yapindo_api.sql** (add di root folder)
- running di http://localhost:3000/api

# API Documentation
## Postman Collection
- Bisa import collection postman, file ada di root folder: **yapindo.postman_collection.json**
## Base URL
- http://localhost:3000/api

## Autentikasi

Menyertakan **API Key** yang valid di *header* `Authorization`.

- **Metode:** Header `Authorization`
- **Format:** `Authorization: Bearer <API_KEY_ANDA>`

## Endpoints
| url | method | request | param |Deskripsi |
| :--- | :--- | :--- | :--- | :--- |
| `/register` | Post | body raw json | {"name":"admin","email":"admin@admin.co.id","password":"Hahaha12345","role":"admin"} |create new user
| `/login` | Post | body raw json | {"email":"admin@admin.com","password":"Hahaha12345"} |login and get token
| `/movies` | Post | body raw json | {"title":"Avengers","description":"Save the earth","duration_minutes":90} | add movies
| `/movies` | Get  |  | | get all movies
| `/movies/:id` | Get | | | get detail movies
| `/movies/:id` | Put | body raw json | {"title":"Avengers","description":"Save the earth","duration_minutes":90} | Edit movies
| `/movies/:id` | Delete | | | Delete Movies
| `/movies/:id/showtimes` | Get | | | Get movies showtimes
| `/studios` | Post | body raw json | {"studio_number":1,"seat_capacity":200} | add studio
| `/studios` | Get  |  | | get all studio
| `/studios/:id` | Get | | | get detail studio
| `/studios/:id` | Put | body raw json | {"seat_capacity":200} | Edit studio
| `/studios/:id` | Delete | | | Delete Studio
| `/showtimes` | Post | body raw json | {"movie_id":1,"studio_id":1,"start_time":"2025-12-04 13:10"} | add showtime
| `/showtimes` | Get  |  | | get all showtime
| `/showtimes/:id` | Get | | | get detail showtime
| `/showtimes/:id` | Put | body raw json | {"movie_id":1,"studio_id":1,"start_time":"2025-12-04 13:10"} | Edit showtime
| `/showtimes/:id` | Delete | | | Delete showtime
| `/showtimes/:id/seats` | Get | | | Get showtime seat
| `/bookings` | Post | body raw json | {"showtime_id":1,"seats":["A1","A2"]} | Booking seat