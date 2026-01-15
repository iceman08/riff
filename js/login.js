// Sistema de autenticación para RIFF
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Usuarios de demostración (en producción, esto vendría de un backend)
    const users = [
        { email: 'demo@riff.com', password: 'demo123', name: 'Usuario Demo' },
        { email: 'admin@riff.com', password: 'admin123', name: 'Administrador' }
    ];

    // Función para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Función para mostrar mensajes
    function showMessage(message, type = 'error') {
        // Eliminar mensaje anterior si existe
        const existingMessage = document.querySelector('.auth-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `auth-message p-4 mb-4 rounded-lg ${
            type === 'error' ? 'bg-red-100 text-red-700 border border-red-400' : 'bg-green-100 text-green-700 border border-green-400'
        }`;
        messageDiv.textContent = message;
        
        loginForm.insertBefore(messageDiv, loginForm.firstChild);

        // Eliminar mensaje después de 5 segundos
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    // Función para iniciar sesión
    function login(email, password) {
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Guardar sesión en localStorage
            const session = {
                email: user.email,
                name: user.name,
                loginTime: new Date().toISOString()
            };
            localStorage.setItem('riffUserSession', JSON.stringify(session));
            
            showMessage('¡Inicio de sesión exitoso! Redirigiendo...', 'success');
            
            // Redirigir después de 1.5 segundos
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
            
            return true;
        }
        
        return false;
    }

    // Manejar envío del formulario
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Validaciones
        if (!email || !password) {
            showMessage('Por favor, completa todos los campos');
            return;
        }

        if (!isValidEmail(email)) {
            showMessage('Por favor, ingresa un correo electrónico válido');
            return;
        }

        // Mostrar indicador de carga
        const submitButton = loginForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Iniciando sesión...';

        // Simular delay de red (en producción, esto sería una llamada al servidor)
        setTimeout(() => {
            if (login(email, password)) {
                // Login exitoso - la redirección se maneja en la función login()
            } else {
                showMessage('Correo o contraseña incorrectos');
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        }, 800);
    });

    // Manejar login con Google (simulado)
    const googleButton = document.querySelector('button:has(img[alt="Google"])');
    if (googleButton) {
        googleButton.addEventListener('click', function(e) {
            e.preventDefault();
            showMessage('El inicio de sesión con Google estará disponible próximamente', 'error');
        });
    }

    // Manejar login con Facebook (simulado)
    const facebookButton = document.querySelector('button:has(.bi-facebook)');
    if (facebookButton) {
        facebookButton.addEventListener('click', function(e) {
            e.preventDefault();
            showMessage('El inicio de sesión con Facebook estará disponible próximamente', 'error');
        });
    }

    // Verificar si ya hay una sesión activa
    const currentSession = localStorage.getItem('riffUserSession');
    if (currentSession) {
        const session = JSON.parse(currentSession);
        showMessage(`Ya tienes una sesión activa como ${session.name}`, 'success');
        
        // Agregar botón para ir al inicio
        setTimeout(() => {
            const goHomeButton = document.createElement('button');
            goHomeButton.className = 'w-full mt-4 px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700';
            goHomeButton.textContent = 'Ir al inicio';
            goHomeButton.onclick = () => window.location.href = 'index.html';
            
            const logoutButton = document.createElement('button');
            logoutButton.className = 'w-full mt-2 px-5 py-2.5 text-sm font-medium text-center text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300';
            logoutButton.textContent = 'Cerrar sesión';
            logoutButton.onclick = () => {
                localStorage.removeItem('riffUserSession');
                location.reload();
            };
            
            loginForm.appendChild(goHomeButton);
            loginForm.appendChild(logoutButton);
        }, 100);
    }
});

// Agregar información de usuarios demo en consola (solo para desarrollo)
console.log('=== USUARIOS DE DEMOSTRACIÓN ===');
console.log('Email: demo@riff.com | Contraseña: demo123');
console.log('Email: admin@riff.com | Contraseña: admin123');
console.log('================================');
