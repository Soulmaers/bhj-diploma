/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    if (options.method === 'GET') {
        url += '?';
        for (let key in options.data) {
            url += '${key}=&{options.data[key]}&';
        }
    } else {
        formData = new FormData();
        for (let key in options.data) {
            formData.append(key, options.data[key]);
        }
    }
    try {
        xhr.open(options.method, url)
        if (options.method === 'GET') {
            xhr.send();
        } else {
            xhr.send(formData);
        }
    } catch (err) {
        options.callback(err);

    }
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4 && xhr.status == 200) {
            options.callback(null, xhr.response);
        }
    })

}

