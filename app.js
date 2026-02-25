        // Global state management
        let currentPage = 'welcome';
        let appData = {
            facility: {},
            procedures: [],
            hazards: [],
            temperatureLog: [],
            trainings: [],
            audits: [],
            tests: []
        };

        // Page navigation
        function showPage(pageId) {
            // Hide all pages
            const pages = document.querySelectorAll('#welcome, #dashboard, #wprowadzenie, #opis-zakladu, #ghp-gmp, #rejestry, #analiza, #schemat, #korekty, #szkolenia, #audyty, #badania');
            pages.forEach(page => {
                page.classList.add('page-hidden');
            });

            // Show selected page
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.remove('page-hidden');
                targetPage.classList.add('fade-in-up');
                currentPage = pageId;
            }

            // Update browser URL without reloading
            if (history.pushState) {
                history.pushState(null, null, '#' + pageId);
            }
        }

        // Data management functions
        function saveData(section) {
            const data = {};
            const inputs = document.querySelectorAll(`#${section} .form-control`);

            inputs.forEach(input => {
                const label = input.previousElementSibling?.textContent || input.placeholder;
                data[label] = input.value;
            });

            appData[section] = data;

            // Show success message
            showNotification('Dane zostały zapisane pomyślnie!', 'success');

            // Save to localStorage for persistence
            localStorage.setItem('inovit-haccp-data', JSON.stringify(appData));
        }

        function loadData() {
            const saved = localStorage.getItem('inovit-haccp-data');
            if (saved) {
                appData = JSON.parse(saved);
            }
        }

        function exportData() {
            const dataStr = JSON.stringify(appData, null, 2);
            const dataBlob = new Blob([dataStr], {type: 'application/json'});

            const link = document.createElement('a');
            link.href = URL.createObjectURL(dataBlob);
            link.download = 'inovit-haccp-export-' + new Date().toISOString().split('T')[0] + '.json';
            link.click();

            showNotification('Dane zostały wyeksportowane', 'success');
        }

        // Interactive functions
        function addTemperatureRecord() {
            const now = new Date();
            const date = now.toISOString().split('T')[0];
            const time = now.toTimeString().split(' ')[0].substring(0, 5);

            const newRow = `
                <tr>
                    <td>${date}</td>
                    <td>${time}</td>
                    <td><input type="text" class="form-control" placeholder="Nazwa urządzenia" style="min-width: 150px;"></td>
                    <td><input type="number" class="form-control" placeholder="0.0" style="width: 80px;"></td>
                    <td><input type="text" class="form-control" placeholder="Norma" style="width: 100px;"></td>
                    <td><select class="form-control" style="width: 100px;"><option>OK</option><option>Odchylenie</option></select></td>
                    <td><input type="text" class="form-control" placeholder="Uwagi" style="min-width: 120px;"></td>
                    <td><input type="text" class="form-control" placeholder="Inicjały" style="width: 80px;"></td>
                </tr>
            `;

            document.getElementById('temperature-log').insertAdjacentHTML('beforeend', newRow);
        }

        function addProcedure() {
            showNotification('Funkcja dodawania procedur będzie dostępna w pełnej wersji', 'info');
        }

        function addHazard() {
            showNotification('Funkcja analizy zagrożeń będzie dostępna w pełnej wersji', 'info');
        }

        function addCorrectiveAction() {
            showNotification('Funkcja zgłaszania działań korygujących będzie dostępna w pełnej wersji', 'info');
        }

        function addTraining() {
            showNotification('Funkcja planowania szkoleń będzie dostępna w pełnej wersji', 'info');
        }

        function addAudit() {
            showNotification('Funkcja planowania audytów będzie dostępna w pełnej wersji', 'info');
        }

        function addTest() {
            showNotification('Funkcja planowania badań będzie dostępna w pełnej wersji', 'info');
        }

        function editFlowChart() {
            showNotification('Edytor schematu technologicznego będzie dostępny w pełnej wersji', 'info');
        }

        function showHelp() {
            const helpText = `
                🔹 INOVIT e-Segregator HACCP - Pomoc

                📋 Nawigacja:
                • Kliknij na moduły w centrum dokumentacji
                • Użyj przycisków "Wróć" do nawigacji
                • Dane są automatycznie zapisywane

                💾 Funkcje:
                • Eksport danych do pliku JSON
                • Automatyczne zapisywanie w przeglądarce
                • Responsywny interfejs

                📞 Wsparcie INOVIT:
                • Tel: +48 575-757-638
                • Email: kontakt@inovit.com.pl
                • Web: www.inovit.com.pl

                ⚡ To jest wersja demonstracyjna
                Pełna funkcjonalność dostępna w wersji Cloud
            `;

            alert(helpText);
        }

        // Notification system
        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === 'success' ? '#28a745' : type === 'warning' ? '#ffc107' : '#007380'};
                color: ${type === 'warning' ? '#333' : 'white'};
                padding: 15px 25px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 1000;
                max-width: 300px;
                font-weight: 500;
                animation: slideInRight 0.3s ease-out;
            `;

            notification.textContent = message;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.3s ease-in';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        }

        // Initialize app
        document.addEventListener('DOMContentLoaded', function() {
            loadData();

            // Handle browser back/forward
            window.addEventListener('popstate', function() {
                const hash = window.location.hash.substring(1);
                if (hash) {
                    showPage(hash);
                } else {
                    showPage('welcome');
                }
            });

            // Set initial page from URL
            const initialHash = window.location.hash.substring(1);
            if (initialHash) {
                showPage(initialHash);
            }

            // Add CSS animations
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        });

        // Auto-save forms
        document.addEventListener('input', function(e) {
            if (e.target.classList.contains('form-control')) {
                // Debounced auto-save
                clearTimeout(window.autoSaveTimeout);
                window.autoSaveTimeout = setTimeout(() => {
                    const section = e.target.closest('[id]')?.id;
                    if (section && section !== 'welcome' && section !== 'dashboard') {
                        saveData(section);
                    }
                }, 2000);
            }
        });
