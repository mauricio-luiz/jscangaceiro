class ProxyFactory{
    static create(objeto, props, armidilha){
        
        return new Proxy(objeto, {
            get(target, prop, receiver){
                if(ProxyFactory.ehFuncao(target[prop]) && 
                props.includes(prop)){
                        return function(){
                            console.log(`"${prop}" disparou a armadilha`);
                            target[prop].apply(target, arguments);
                            armidilha(target);
                        }
                }else{
                    return target[prop];
                }
            },
            set(target, prop, value, receiver){
                const updated = Reflect.set(target, prop, value);
                if(props.includes(prop)) armidilha(target);
                return updated;
            }
        });
    }

    static ehFuncao(fn){
        return typeof(fn) == typeof(Function);
    }
}