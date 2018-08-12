class HttpService{
    get(url){
        return new Promise((resolve, reject) =>{
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);

            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        console.log('obtendo as negociacoes do servidor');
                        resolve(JSON.parse(xhr.responseText));
                    }else{
                        console.log(xhr.responseText);
                        reject(JSON.parse(xhr.responseText));
                    }
                }
            };

            xhr.send();
        });
    }
}