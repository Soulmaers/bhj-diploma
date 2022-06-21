/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', () => {
        options.callback(null, xhr.response);

    })

    if (options.method === 'GET') {
        let url = options.url
        if (options.data) {
            url += '?';
            for (let key in options.data) {
                url += `${key}=${options.data[key]}&`;
            }
        }
        xhr.open(options.method, url);
    }

    else {
        formData = new FormData();
        for (let key in options.data) {
            formData.append(key, options.data[key]);
        }
        xhr.open(options.method, options.url);
    }
    xhr.send(options.method === 'GET' ? null : formData);
}

