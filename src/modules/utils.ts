export const isLocalStorageAvailable = (): boolean => {
    if (typeof localStorage === 'object') {
        try {
            localStorage.setItem('localStorage', 'test');
            localStorage.removeItem('localStorage');
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    }
    return false
}