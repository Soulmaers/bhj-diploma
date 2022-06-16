/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    let url = options.url
    if (options.method === 'GET') {
        url += '?';
        for (let key in options.data) {
            url += `${key}=&{options.data[key]}&`;
        }
    } else {
        formData = new FormData();
        for (let key in options.data) {
            formData.append(key, options.data[key]);
        }
    }
    try {
        xhr.open(options.method, url)
        xhr.send(options.method === 'GET' ? null : formData);

    } catch (err) {
        options.callback(err);

    }
    xhr.addEventListener('load', () => {
        options.callback(null, xhr.response);

    })

}

