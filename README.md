# RezerwacjeAPP2 – System rezerwacji stolików w restauracjach

## 🌍 Opis projektu

"RezerwacjeAPP2" to aplikacja mobilna umożliwiająca użytkownikom rezerwowanie miejsc w restauracjach poprzez komunikację z backendowym API. Projekt zakłada komunikację między aplikacją mobilną a serwerem Flask, integrację z bazą danych oraz uwierzytelnianie użytkownika przy pomocy JWT.

## 🌐 Skład zespołu

* **Dominika Tułacz** – backend (Flask, REST API, JWT, baza danych, dokumentacja)
* **Jakub Radzik** – frontend (React Native, UI/UX, ekran rejestracji/logowania, rezerwacje)

## ⚖️ Technologie

### Backend:

* Python 3
* Flask
* Flask-JWT-Extended (uwierzytelnianie)
* Flask-CORS
* SQLAlchemy
* SQLite (możliwe rozszerzenie na PostgreSQL)

### Frontend:

* React Native
* Expo
* Fetch API (do komunikacji z backendem)

### Inne:

* Git & GitHub (współpraca i wersjonowanie)
* Postman (testowanie API)

## 🎓 Funkcje

* Rejestracja i logowanie użytkownika (JWT)
* Przeglądanie listy restauracji
* Tworzenie rezerwacji
* Przeglądanie własnych rezerwacji
* Prosty interfejs mobilny

## 🔧 Uruchomienie projektu lokalnie

### Backend:

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

Backend uruchomi się na `http://127.0.0.1:5000/`

### Frontend:

```bash
cd frontend
npm install
npm start
```

Lub przez Expo:

```bash
npx expo start
```

## 🔗 Połączenie frontend ↔ backend

Frontend wysyła żądania HTTP do lokalnego backendu (np. przez `fetch`), używając JWT w nagłówkach `Authorization: Bearer <token>`.

## 📃 Dokumentacja API – [ZOBACZ TUTAJ](API.md)

(opis endpointów w osobnym pliku)

---

**Status:** W trakcie prac, backend gotowy i przetestowany w Postmanie. Frontend w trakcie podpinania do prawdziwego API. Dokumentacja i UI dopinane na bieżąco.

**Repozytorium:** [https://github.com/Radzik23/RezerwacjeAPP2](https://github.com/Radzik23/RezerwacjeAPP2)
