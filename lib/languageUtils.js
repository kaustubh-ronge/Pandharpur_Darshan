export const supportedLanguages = [
    { label: "English (English)", name: "English", code: "en" },
    { label: "हिंदी (Hindi)", name: "Hindi", code: "hi" },
    { label: "मराठी (Marathi)", name: "Marathi", code: "mr" },
    { label: "ಕನ್ನಡ (Kannada)", name: "Kannada", code: "kn" }
];

export const getCookie = (name) => {
    if (typeof window === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

export const getCurrentLanguageCode = () => {
    if (typeof window === 'undefined') return 'en';
    const googtrans = getCookie('googtrans');
    if (googtrans) {
        const parts = googtrans.split('/');
        const code = parts[parts.length - 1];
        if (code && supportedLanguages.some(l => l.code === code)) {
            return code;
        }
    }
    return 'en';
};

export const getLanguageByCode = (code) => {
    return supportedLanguages.find(l => l.code === code) || supportedLanguages[0];
};

export const detectDeviceLanguage = () => {
    if (typeof window === 'undefined') return 'en';
    const browserLangs = navigator.languages ? Array.from(navigator.languages) : [navigator.language || navigator.userLanguage];
    for (let lang of browserLangs) {
        if (!lang) continue;
        const code = lang.toLowerCase().split('-')[0];
        const match = supportedLanguages.find(l => l.code === code);
        if (match) return match.code;
    }
    return 'en';
};
