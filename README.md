# INOVIT e-Segregator HACCP PWA

To jest wersja Progressive Web App (PWA) e-Segregatora HACCP.

## Struktura plików

- `index.html`: Główny plik aplikacji.
- `style.css`: Arkusze stylów.
- `app.js`: Logika aplikacji.
- `manifest.json`: Manifest aplikacji webowej.
- `sw.js`: Service Worker (obsługa offline).
- `icons/`: Folder z ikonami aplikacji.

## Uruchomienie

Aby uruchomić aplikację i przetestować funkcje PWA (np. instalację), należy serwować pliki przez serwer HTTP (HTTPS jest wymagane dla Service Workers, ale `localhost` jest wyjątkiem).

### Python
```bash
python3 -m http.server
```
Następnie otwórz `http://localhost:8000` w przeglądarce.

### Node.js (http-server)
```bash
npx http-server
```

## Ikony

Pamiętaj o dodaniu poprawnych ikon w folderze `icons/`. Patrz `icons/README.md`.
