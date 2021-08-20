export function storeCurrentUser(currentUser) {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

export function getCurrentUser() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser ? currentUser : false;
}

export function checkToken() {
    const token = localStorage.getItem('token');
    return token ? true : false;
}

export function clearCurrentUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
}